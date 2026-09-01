import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../../lib/mongodb";
import { User } from "../../../../models/User.js";
import { connectDB } from "../../../../lib/db.js";

// HYBRID BACKEND: NextAuth (Google OAuth) is the identity layer - it
// verifies who someone actually is. The app's own data (role, isApproved,
// galleries, etc.) still lives on the Mongoose User model, in the SAME
// `users` collection the adapter uses by default (both "users" - no
// separate profile collection needed). The jwt callback below links the
// two: on every session check, it upserts/reads the matching Mongoose
// profile by email and bakes role/isApproved/the Mongoose _id into the
// session token, which src/app/api/graphql/route.js reads via
// getServerSession() to populate GraphQL's `context.userId`.
export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.email) {
        token.email = user.email;
      }
      if (!token.email) {
        return token;
      }

      await connectDB();
      // Bootstrap: the first APPROVED_EMAILS entry becomes admin on first
      // sign-in (matching the old email-allowlist system's behavior) - with
      // no admin, nobody could ever approve anyone via approveUser. Any
      // other approved email is pre-approved as a connoisseur; everyone
      // else signs in fine (Google already verified who they are) but
      // starts unapproved until an admin approves them.
      const approvedEmails =
        process.env.APPROVED_EMAILS?.split(",").map((e) => e.trim()) || [];
      const isBootstrapAdmin = token.email === approvedEmails[0];
      const isPreApproved = approvedEmails.includes(token.email);

      // BUG FIX: $setOnInsert only applies on an actual insert, but
      // @auth/mongodb-adapter's createUser() already inserts a bare
      // document (email/emailVerified/name/image only) BEFORE this
      // callback ever runs - so this is always a match, never an insert,
      // and role/isApproved never got set at all. Using an aggregation-
      // pipeline update instead: $ifNull fills in a field only when it's
      // genuinely missing, whether that's because this is a brand new
      // document OR an existing one the adapter created first. This also
      // means it's safe to re-run on every sign-in - it won't stomp on a
      // role/isApproved an admin already changed via approveUser/
      // changeUserRole, since those are no longer null once set.
      const dbUser = await User.findOneAndUpdate(
        { email: token.email },
        [
          {
            $set: {
              role: {
                $ifNull: ["$role", isBootstrapAdmin ? "admin" : "connoisseur"],
              },
              isApproved: { $ifNull: ["$isApproved", isPreApproved] },
            },
          },
        ],
        { upsert: true, new: true, updatePipeline: true }
      );

      token.userId = dbUser._id.toString();
      token.role = dbUser.role;
      token.isApproved = dbUser.isApproved;
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId;
        session.user.role = token.role;
        session.user.isApproved = token.isApproved;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

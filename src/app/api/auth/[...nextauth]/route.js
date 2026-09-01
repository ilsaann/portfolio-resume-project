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
      const dbUser = await User.findOneAndUpdate(
        { email: token.email },
        { $setOnInsert: { role: "connoisseur", isApproved: false } },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      token.userId = dbUser._id.toString();
      // Fallback in case the adapter created this doc first (no role/
      // isApproved present yet) and $setOnInsert didn't apply since it
      // wasn't actually an insert.
      token.role = dbUser.role ?? "connoisseur";
      token.isApproved = dbUser.isApproved ?? false;
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

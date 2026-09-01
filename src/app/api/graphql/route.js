// NOTE: apollo-server-micro is EOL (Apollo Server v2/v3 line). If this
// GraphQL backend gets picked back up for Jane's Guild, migrate to
// @apollo/server (+ its Next.js integration) rather than building on a
// deprecated package.
import { ApolloServer } from 'apollo-server-micro';
import { typeDefs } from '../../../graphql/schema.js';
import { resolvers } from '../../../graphql/resolvers.js';

// BUG FIX: apolloServer used to be constructed and .start()ed here at module
// scope. Next.js imports every route.js during `next build` to collect page
// data, regardless of whether the route is ever requested - that import was
// triggering Apollo's schema-hash generation at build time, which crashed
// with "Expected {...} to be a GraphQL schema" (a known apollo-server-micro/
// Turbopack bundling incompatibility) and failed the entire build. Lazily
// creating+starting the server on first actual request avoids running any
// of this during the build.
let apolloServerPromise;

function getApolloServer() {
  if (!apolloServerPromise) {
    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => {
        // SECURITY: this trusts a raw, client-supplied header with no signature
        // check. Anyone can send `x-user-id: <any Mongo ObjectId>` (including an
        // admin's id) and every resolver in resolvers.js that calls
        // getAuthenticatedUser(context) will treat them as that user — full
        // impersonation, no auth required. src/lib/auth.js already has
        // getAuthFromHeaders()/verifyToken() (JWT-based) that should replace this
        // before the GraphQL API is ever exposed to real traffic.
        const userId = req.headers['x-user-id'] || null;
        return { userId };
      },
    });
    apolloServerPromise = apolloServer.start().then(() => apolloServer);
  }
  return apolloServerPromise;
}

export const POST = async (req) => {
  const apolloServer = await getApolloServer();

  try {
    const body = await req.json();

    const result = await apolloServer.executeOperation({
      query: body.query,
      variables: body.variables,
      operationName: body.operationName,
    });

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('GraphQL Error:', error);
    return new Response(
      JSON.stringify({
        errors: [{ message: error.message }],
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};

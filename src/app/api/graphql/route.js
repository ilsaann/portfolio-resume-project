// Migrated from apollo-server-micro (EOL, and incompatible with Next.js's
// Turbopack bundler - importing it caused "Cannot use GraphQLSchema from
// another module or realm", a dual-module-instance error) to @apollo/server's
// core HTTP API, called directly against Next's native Fetch Request/Response
// - no framework-specific integration package needed.
import { ApolloServer, HeaderMap } from '@apollo/server';
import { getServerSession } from 'next-auth';
import { typeDefs } from '../../../graphql/schema.js';
import { resolvers } from '../../../graphql/resolvers.js';
import { authOptions } from '../auth/[...nextauth]/route.js';

// Constructed lazily (on first request, not at module import time) so that
// `next build` importing this file to collect page data never touches
// Apollo at all - see the git history of this file for why that mattered.
let apolloServerPromise;

function getApolloServer() {
  if (!apolloServerPromise) {
    const apolloServer = new ApolloServer({ typeDefs, resolvers });
    apolloServerPromise = apolloServer.start().then(() => apolloServer);
  }
  return apolloServerPromise;
}

async function getContext() {
  // HYBRID BACKEND: identity comes from the NextAuth session (Google OAuth
  // + the jwt/session callbacks in [...nextauth]/route.js), not a
  // separately-issued Bearer token. getServerSession(authOptions) with no
  // req/res reads the session cookie via next/headers, which works inside
  // a Route Handler the same way it would in a Server Component.
  const session = await getServerSession(authOptions);
  return { userId: session?.user?.id || null };
}

export const POST = async (req) => {
  const apolloServer = await getApolloServer();

  const headerMap = new HeaderMap();
  for (const [key, value] of req.headers) {
    headerMap.set(key, value);
  }

  let parsedBody;
  try {
    const rawBody = await req.text();
    parsedBody = rawBody ? JSON.parse(rawBody) : {};
  } catch {
    return new Response(
      JSON.stringify({ errors: [{ message: 'Invalid JSON body' }] }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const httpGraphQLResponse = await apolloServer.executeHTTPGraphQLRequest({
    httpGraphQLRequest: {
      method: req.method,
      headers: headerMap,
      search: new URL(req.url).search,
      body: parsedBody,
    },
    context: () => getContext(),
  });

  const responseHeaders = Object.fromEntries(httpGraphQLResponse.headers);
  responseHeaders['Content-Type'] ||= 'application/json';

  if (httpGraphQLResponse.body.kind === 'complete') {
    return new Response(httpGraphQLResponse.body.string, {
      status: httpGraphQLResponse.status || 200,
      headers: responseHeaders,
    });
  }

  // Chunked (e.g. @defer/@stream multipart) responses - not used by this
  // schema today, but handled so a future change doesn't silently break.
  let assembled = '';
  for await (const chunk of httpGraphQLResponse.body.asyncIterator) {
    assembled += chunk;
  }
  return new Response(assembled, {
    status: httpGraphQLResponse.status || 200,
    headers: responseHeaders,
  });
};

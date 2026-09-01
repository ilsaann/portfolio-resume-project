// Minimal client-side GraphQL fetch wrapper, shared by anything that needs
// to call /api/graphql from a Client Component (auth comes from the
// session cookie automatically, no token handling needed here).
export async function graphqlRequest(query, variables) {
  const res = await fetch('/api/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(json.errors[0].message);
  }
  return json.data;
}

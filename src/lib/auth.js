import { jwtVerify, SignJWT } from 'jose';

// SECURITY: hardcoded fallback secret. If NEXTAUTH_SECRET is ever unset in a
// deploy environment, every JWT gets signed with this public string, which
// lets anyone forge a valid token. Currently .env.local also still has the
// literal placeholder value ("generate_a_random_secret_here") instead of a
// real random secret — rotate before this ever goes live.
const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || 'default-secret-key');

export async function createToken(userId) {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(secret);

  return token;
}

export async function verifyToken(token) {
  try {
    const verified = await jwtVerify(token, secret);
    return verified.payload;
  } catch (error) {
    return null;
  }
}

// CRUFT/GAP: verifyToken and getAuthFromHeaders below are never imported
// anywhere (only createToken is used, by the login routes). This is the
// piece that SHOULD be wired into src/app/api/graphql/route.js's context()
// function to verify the caller's JWT — right now that route just trusts a
// raw, unsigned `x-user-id` header instead (see the SECURITY note there).
// Don't delete these — finish wiring them up.
export async function getAuthFromHeaders(headers) {
  const authHeader = headers.get('authorization') || headers.get('Authorization');

  if (!authHeader) {
    return null;
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null;
  }

  const token = parts[1];
  return verifyToken(token);
}

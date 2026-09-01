// SUPERSEDED: this hand-rolled JWT auth (custom createToken/verifyToken +
// an email-allowlist login route) has been replaced by NextAuth + Google
// OAuth as the identity layer (see src/app/api/auth/[...nextauth]/route.js
// and src/app/api/graphql/route.js's getServerSession()-based context).
// Nothing in the app imports this file anymore. Kept for reference/rollback
// rather than deleted - safe to remove once the hybrid approach is confirmed
// working end-to-end.
import { jwtVerify, SignJWT } from 'jose';

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

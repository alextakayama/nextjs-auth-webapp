import "server-only";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
 
const expirationInMs: number = Number(process.env.JWT_EXPIRATION_IN_MS);
const secretKey = process.env.JWT_SECRET_KEY;
const encodedKey = new TextEncoder().encode(secretKey);
 
export async function decrypt(token: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (err) {
    console.log('Failed to verify token');
  }
}

export async function createSession(accessToken: string, refreshToken: string) {
  const expiresAt = new Date(Date.now() + expirationInMs);
  const cookieStore = await cookies();

  cookieStore.set(
    'session',
    JSON.stringify({ accessToken, refreshToken }),
    {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: 'lax',
      path: '/',
    }
  );
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}

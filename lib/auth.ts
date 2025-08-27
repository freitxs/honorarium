import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";

const COOKIE_NAME = "honorarium_token";
export type JwtUser = { id: string; email: string; name: string };

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET não definido");
  return new TextEncoder().encode(secret);
}

export async function signJwt(user: JwtUser) {
  const jwt = await new SignJWT(user).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(getSecret());
  return jwt;
}

export async function getUserFromCookie(): Promise<JwtUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  try { const { payload } = await jwtVerify(token, getSecret()); return payload as JwtUser; } catch { return null; }
}

export async function requireUser() {
  const u = await getUserFromCookie();
  if (!u) throw new Error("Não autenticado");
  return u;
}

export async function setAuthCookie(jwt: string) {
  const cookieStore = await cookies();
  cookieStore.set({ name: COOKIE_NAME, value: jwt, httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60*60*24*7 });
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.set({ name: COOKIE_NAME, value: "", httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 0 });
}

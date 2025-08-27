import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
const COOKIE = "honorarium_token";
const PROTECTED_PREFIXES = ["/meus-conteudos", "/protected", "/api/me"];
function matchProtected(pathname: string) { return PROTECTED_PREFIXES.some((p) => pathname.startsWith(p)); }
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl; if (!matchProtected(pathname)) return NextResponse.next();
  const token = req.cookies.get(COOKIE)?.value; if (!token) return NextResponse.redirect(new URL("/auth/login", req.url));
  try { const secret = new TextEncoder().encode(process.env.AUTH_SECRET || ""); await jwtVerify(token, secret); return NextResponse.next(); }
  catch { return NextResponse.redirect(new URL("/auth/login", req.url)); }
}
export const config = { matcher: ["/meus-conteudos", "/protected/:path*", "/api/me/:path*"] };

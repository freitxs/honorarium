import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signJwt, setAuthCookie } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) return NextResponse.json({ message: "Dados inválidos" }, { status: 400 });
    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ message: "Credenciais inválidas" }, { status: 401 });
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return NextResponse.json({ message: "Credenciais inválidas" }, { status: 401 });
    const jwt = await signJwt({ id: user.id, email: user.email, name: user.name });
    await setAuthCookie(jwt);
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ message: "Erro ao autenticar" }, { status: 500 }); }
}

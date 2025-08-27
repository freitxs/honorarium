import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signJwt, setAuthCookie } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) return NextResponse.json({ message: "Dados inválidos" }, { status: 400 });
    const exists = await prisma.users.findUnique({ where: { email } });
    if (exists) return NextResponse.json({ message: "E-mail já cadastrado" }, { status: 400 });
    const password_hash = await bcrypt.hash(password, 10);
    const user = await prisma.users.create({ data: { name, email, password_hash } });
    const jwt = await signJwt({ id: user.id, email: user.email, name: user.name });
    await setAuthCookie(jwt);
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ message: "Erro ao cadastrar" }, { status: 500 }); }
}

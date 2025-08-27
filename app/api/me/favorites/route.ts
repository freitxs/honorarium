import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

export async function GET() {
  const user = await requireUser();
  const items = await prisma.user_favorites.findMany({ where: { user_id: user.id }, include: { video: true } });
  return NextResponse.json({ items });
}
export async function POST(req: Request) {
  const user = await requireUser();
  const { video_id, remove } = await req.json();
  if (remove) { await prisma.user_favorites.delete({ where: { user_id_video_id: { user_id: user.id, video_id } } }).catch(()=>{}); return NextResponse.json({ removed: true }); }
  else { await prisma.user_favorites.create({ data: { user_id: user.id, video_id } }).catch(()=>{}); return NextResponse.json({ added: true }); }
}

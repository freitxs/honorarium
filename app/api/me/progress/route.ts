import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

export async function GET() {
  const user = await requireUser();
  const items = await prisma.user_progress.findMany({ where: { user_id: user.id }, include: { video: true } });
  return NextResponse.json({ items });
}
export async function POST(req: Request) {
  const user = await requireUser();
  const { video_id, seconds, completed } = await req.json();
  const item = await prisma.user_progress.upsert({
    where: { user_id_video_id: { user_id: user.id, video_id } },
    update: { last_position_seconds: seconds ?? 0, completed: completed ?? false },
    create: { user_id: user.id, video_id, last_position_seconds: seconds ?? 0, completed: completed ?? false }
  });
  return NextResponse.json(item);
}

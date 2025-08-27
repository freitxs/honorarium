import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const items = await prisma.videos.findMany({ where: { title: { contains: q } }, select: { title: true, slug: true, thumbnail_url: true } });
  return NextResponse.json({ items });
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || undefined;
  const videos = await prisma.videos.findMany({
    where: { published: true, ...(q ? { title: { contains: q } } : {}) },
    orderBy: { created_at: "desc" },
    select: { slug: true, title: true, thumbnail_url: true, media_url: true, is_hls: true, preview_start_seconds: true, preview_duration_seconds: true }
  });
  return NextResponse.json({ items: videos });
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  const v = await prisma.videos.findFirst({ where: { slug: params.slug, published: true }, include: { materials: true } });
  if (!v) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(v);
}

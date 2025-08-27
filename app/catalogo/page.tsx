import CardVideo from "@/components/CardVideo";
import { prisma } from "@/lib/prisma";

export default async function CatalogPage({ searchParams }: { searchParams: Record<string, string> }) {
  const q = searchParams["q"] || undefined;
  const videos = await prisma.videos.findMany({
    where: { published: true, ...(q ? { title: { contains: q, mode: "insensitive" } } : {}) },
    orderBy: { created_at: "desc" },
    select: { slug: true, title: true, thumbnail_url: true, media_url: true }
  });

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-4">Catálogo</h1>
      <form className="mb-4"><input name="q" placeholder="Buscar..." className="bg-card border border-default rounded-xl px-3 py-2 w-full" defaultValue={q} /></form>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {videos.map(v => (<CardVideo key={v.slug} slug={v.slug} title={v.title} thumbnail_url={v.thumbnail_url} preview_url={v.media_url} />))}
      </div>
    </div>
  );
}

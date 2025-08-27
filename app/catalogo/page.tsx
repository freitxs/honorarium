
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import CardVideo from "@/components/CardVideo";

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const q = (searchParams["q"] as string) || undefined;

  const where = q
    ? {
        published: true,
        OR: [
          { title: { contains: q } },         // sem "mode"
          { description: { contains: q } },   // busca também na descrição
        ],
      }
    : { published: true };

  const videos = await prisma.videos.findMany({
    where,
    orderBy: { created_at: "desc" },
    select: { slug: true, title: true, thumbnail_url: true, media_url: true },
  });

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-4">Catálogo</h1>

      <form className="mb-4">
        <input
          name="q"
          defaultValue={q}
          placeholder="Buscar..."
          className="w-full bg-card border border-default rounded-2xl px-4 py-2"
        />
      </form>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {videos.map((v) => (
          <CardVideo
            key={v.slug}
            slug={v.slug}
            title={v.title}
            thumbnail_url={v.thumbnail_url}
            preview_url={v.media_url}
          />
        ))}
        {videos.length === 0 && (
          <p className="text-muted">Nenhum vídeo encontrado.</p>
        )}
      </div>
    </div>
  );
}

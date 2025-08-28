export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import CardVideo from "@/components/CardVideo";

export default async function CatalogTemaPage({
  params,
}: {
  params: { tema: string };
}) {
  const tema = params.tema?.toLowerCase();

  const where =
    tema === "fundamentos"
      ? { published: true, title: { contains: "Fundamentos" } }
      : {
          published: true,
          OR: [
            { title: { contains: tema } },
            { description: { contains: tema } },
          ],
        };

  const videos = await prisma.videos.findMany({
    where,
    orderBy: { created_at: "desc" },
    select: { slug: true, title: true, thumbnail_url: true, media_url: true },
  });

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-4">
        {tema === "fundamentos" ? "Fundamentos" : `Tema: ${params.tema}`}
      </h1>

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

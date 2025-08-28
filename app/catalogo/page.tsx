export const dynamic = "force-dynamic";

import Link from "next/link";
import type { Route } from "next";
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
          { title: { contains: q } },
          { description: { contains: q } },
        ],
      }
    : { published: true };

  const videos = await prisma.videos.findMany({
    where,
    orderBy: { created_at: "desc" },
    select: { slug: true, title: true, thumbnail_url: true, media_url: true },
  });

  // ---- separa "Fundamentos" (título contendo "Fundamentos") ----
  const fundamentos = videos
    .filter((v) => /fundamentos/i.test(v.title))
    .slice(0, 5);

  // remove os Fundamentos da lista geral para não duplicar
  const outros = videos.filter((v) => !/fundamentos/i.test(v.title));

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-4">Catálogo</h1>

      <form className="mb-6">
        <input
          name="q"
          defaultValue={q}
          placeholder="Buscar..."
          className="w-full bg-card border border-default rounded-2xl px-4 py-2"
        />
      </form>

      {/* ======= CARD RETANGULAR: FUNDAMENTOS ======= */}
      {fundamentos.length > 0 && (
        <Link
          href={"/catalogo/fundamentos" as Route}
          className="block bg-card border border-default rounded-2xl p-4 mb-8 hover-pop"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl font-semibold">Fundamentos</h2>
            <span className="text-sm text-muted">
              {fundamentos.length} conteúdos
            </span>
          </div>

          {/* miniaturas dos 5 fundamentos */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {fundamentos.map((v) => (
              <div
                key={v.slug}
                className="relative aspect-video overflow-hidden rounded-xl border border-default"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={v.thumbnail_url}
                  alt={v.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute bottom-0 left-0 right-0 p-2">
                  <p className="text-xs line-clamp-2">{v.title}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-right">
            <span className="text-sm">Clique para ver todos os Fundamentos →</span>
          </div>
        </Link>
      )}

      {/* ======= GRID DOS OUTROS VÍDEOS ======= */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {outros.map((v) => (
          <CardVideo
            key={v.slug}
            slug={v.slug}
            title={v.title}
            thumbnail_url={v.thumbnail_url}
            preview_url={v.media_url}
          />
        ))}

        {outros.length === 0 && (
          <p className="text-muted">Nenhum vídeo encontrado.</p>
        )}
      </div>
    </div>
  );
}

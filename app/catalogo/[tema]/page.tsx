export const dynamic = "force-dynamic";


import { prisma } from "@/lib/prisma";
import CardVideo from "@/components/CardVideo";

export default async function CatalogThemePage({ params, searchParams }: { params: { tema: string }, searchParams: Record<string,string> }) {
  const order = searchParams["ord"] || "novos";
  const theme = await prisma.themes.findUnique({ where: { slug: params.tema } });
  const orderBy = order === "duracao" ? { duration_seconds: "asc" as const } : { created_at: "desc" as const };

  const vts = await prisma.video_themes.findMany({ where: { theme_id: theme?.id } });
  const ids = vts.map(v => v.video_id);
  const videos = await prisma.videos.findMany({ where: { id: { in: ids }, published: true }, orderBy, select: { slug: true, title: true, thumbnail_url: true, media_url: true } });

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-4">{theme?.name || "Tema"}</h1>
      <form className="mb-4 flex gap-3 items-center">
        <label>Ordenar:</label>
        <select name="ord" defaultValue={order} className="bg-card border border-default rounded-xl px-2 py-1">
          <option value="novos">Mais novos</option>
          <option value="duracao">Duração</option>
        </select>
        <button className="btn">Aplicar</button>
      </form>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {videos.map(v => (<CardVideo key={v.slug} slug={v.slug} title={v.title} thumbnail_url={v.thumbnail_url} preview_url={v.media_url} />))}
      </div>
    </div>
  );
}

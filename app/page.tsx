export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";
import type { Route } from "next";
import Carousel from "@/components/Carousel";
import Reveal from "@/components/Reveal";
import { prisma } from "@/lib/prisma";
import CardVideo from "@/components/CardVideo";
import HomeProgress from "@/components/HomeProgress";
import Testimonials from "@/components/Testimonials";

export default async function HomePage() {
  // total para a barra de progresso
  const totalCount = await prisma.videos.count({ where: { published: true } });

  // últimos vídeos para carrossel + grid
  const videos = await prisma.videos.findMany({
    where: { published: true },
    orderBy: { created_at: "desc" },
    take: 6,
    select: { slug: true, title: true, thumbnail_url: true },
  });

  return (
    <div>
      {/* HERO */}
      <section className="container pt-10 pb-8">
        <h1 className="text-4xl font-bold mb-2">
          Comercial aplicado à contabilidade
        </h1>
        <p className="text-muted mb-6">
          Aulas curtas, objetivas e aplicáveis no seu dia a dia.
        </p>
        <Link href={"/catalogo" as Route} className="btn">
          Explorar Catálogo
        </Link>
      </section>

      {/* CARROSSEL */}
      <section className="container pb-12">
        <Reveal>
          <Carousel items={videos} />
        </Reveal>
      </section>

      {/* TRILHA + CALL “COMECE POR AQUI” */}
      <section className="container pb-10">
        <Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            <HomeProgress totalVideos={totalCount} />
            <div className="bg-card border border-default rounded-2xl p-5">
              <h3 className="text-lg font-semibold mb-2">Comece por aqui</h3>
              <p className="text-muted mb-4">
                Novo por aqui? Recomendamos iniciar pela trilha{" "}
                <strong>Fundamentos Honorarium</strong> para dominar os conceitos essenciais.
              </p>
              <Link href={"/catalogo" as Route} className="btn">
                Ver catálogo
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ÚLTIMOS VÍDEOS (GRID) */}
      <section className="container pb-8">
        <h2 className="text-2xl font-semibold mb-4">Últimos vídeos</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((v) => (
            <Reveal key={v.slug}>
              <CardVideo
                slug={v.slug}
                title={v.title}
                thumbnail_url={v.thumbnail_url}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <Testimonials />
    </div>
  );
}

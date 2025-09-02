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
      {/* HERO - com imagem de fundo discreta */}
      <section className="container pt-10 pb-8">
        <div className="relative overflow-hidden rounded-3xl border border-default p-8 md:p-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1600&auto=format&fit=crop"
            alt="Plano de fundo sofisticado"
            className="absolute inset-0 w-full h-full object-cover opacity-25"
          />
          <div className="relative">
            <h1 className="text-4xl font-bold mb-2">
              Comercial aplicado à contabilidade
            </h1>
            <p className="text-muted mb-6">
              Aulas curtas, objetivas e aplicáveis no seu dia a dia.
            </p>
            <Link href={"/catalogo" as Route} className="btn">
              Explorar Catálogo
            </Link>
          </div>
        </div>
      </section>

      {/* CARROSSEL - com detalhe visual de fundo */}
      <section className="container pb-12">
        <div className="relative">
          {/* detalhe decorativo ao fundo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1551281044-8b89ad3c6de3?q=80&w=1600&auto=format&fit=crop"
            alt="Textura abstrata"
            className="pointer-events-none absolute -z-10 -top-8 right-0 w-2/3 max-w-3xl h-48 object-cover opacity-15 rounded-3xl"
          />
          <Reveal>
            <Carousel items={videos} />
          </Reveal>
        </div>
      </section>

      {/* TRILHA + CALL “COMECE POR AQUI” */}
      <section className="container pb-10">
        <Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            <HomeProgress totalVideos={totalCount} />

            {/* Card com mini-hero ilustrativo no topo */}
            <div className="bg-card border border-default rounded-2xl p-5">
              <div className="relative mb-4 rounded-xl overflow-hidden border border-default">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop"
                  alt="Fundamentos Honorarium"
                  className="w-full h-32 object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
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

      {/* ÚLTIMOS VÍDEOS (GRID) - com faixa visual sutil */}
      <section className="container pb-8">
        <div className="relative mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1600&auto=format&fit=crop"
            alt="Faixa decorativa"
            className="pointer-events-none absolute -z-10 -top-6 left-0 right-0 w-full h-24 object-cover opacity-10 rounded-2xl"
          />
          <h2 className="relative text-2xl font-semibold">Últimos vídeos</h2>
        </div>

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

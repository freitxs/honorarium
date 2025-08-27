import Link from "next/link";
import type { Route } from "next";
import Carousel from "@/components/Carousel";
import Reveal from "@/components/Reveal";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const videos = await prisma.videos.findMany({
    where: { published: true },
    orderBy: { created_at: "desc" },
    take: 6,
    select: { slug: true, title: true, thumbnail_url: true },
  });

  return (
    <div>
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

      <section className="container pb-12">
        <Reveal>
          <Carousel items={videos} />
        </Reveal>
      </section>
    </div>
  );
}

import Link from "next/link";
import Carousel from "@/components/Carousel";
import Reveal from "@/components/Reveal";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const videos = await prisma.videos.findMany({
    where: { published: true },
    orderBy: { created_at: "desc" },
    take: 8,
    select: { slug: true, title: true, thumbnail_url: true },
  });

  return (
    <div>
      <section className="container pt-10 pb-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Comercial para Contadores,<br/> do básico ao avançado.
            </h1>
            <p className="text-muted mt-3">
              Honorarium é uma plataforma premium para dominar o comercial aplicado à contabilidade. 
              Conteúdos práticos, diretos e com exemplos do dia a dia.
            </p>
            <div className="mt-6 flex gap-3">
              <Link href="/catalogo" className="btn">Explorar Catálogo</Link>
              <Link href="/auth/cadastro" className="btn">Começar agora</Link>
            </div>
          </div>
          <div className="bg-card rounded-2xl border border-default p-4 shadow-premium">
            <h3 className="font-semibold mb-2">Em destaque</h3>
            <Carousel items={videos} />
          </div>
        </div>
      </section>

      <section className="container py-12 grid md:grid-cols-3 gap-6">
        {[
          { t: "Aprenda com propósito", s: "Aulas curtas, objetivas e aplicáveis." },
          { t: "Material de apoio", s: "PDFs e links para aprofundar." },
          { t: "Acompanhe seu progresso", s: "Continue de onde parou e salve favoritos." },
        ].map((b, i) => (
          <div key={i} className="bg-card rounded-2xl border border-default p-5">
            <h4 className="font-semibold">{b.t}</h4>
            <p className="text-muted">{b.s}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

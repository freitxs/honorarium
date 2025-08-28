
import Reveal from "@/components/Reveal";

const items = [
  {
    name: "Mariana, Contadora",
    text: "Os vídeos são diretos ao ponto. Em duas semanas já estruturamos uma proposta comercial melhor para nossa carteira."
  },
  {
    name: "Paulo, Sócio de Escritório",
    text: "Transformou nossos atendimentos. A equipe ficou mais segura para falar de valor e fechar contratos."
  },
  {
    name: "Renata, Consultora Fiscal",
    text: "Conteúdo prático e aplicável. Recomendo para quem quer resultados reais no dia a dia."
  }
];

export default function Testimonials() {
  return (
    <section className="container py-12">
      <h2 className="text-2xl font-semibold mb-6">O que estão dizendo</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((t, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div className="bg-card border border-default rounded-2xl p-5 shadow-sm hover:shadow-lg transition-shadow">
              <p className="text-base mb-3">&ldquo;{t.text}&rdquo;</p>
              <p className="text-sm text-muted">— {t.name}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

import Reveal from "@/components/Reveal";

export default function SobrePage() {
  return (
    <div className="container py-8 space-y-10">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border border-default">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1600&auto=format&fit=crop"
          alt="Honorarium - Plataforma de vídeos"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative p-10 md:p-14">
          <Reveal>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Sobre o Honorarium</h1>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-muted max-w-3xl">
              Tornamos acessível o conhecimento de <strong>comercial aplicado à contabilidade</strong>,
              com aulas curtas, objetivas e diretamente aplicáveis no dia a dia do escritório.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { n: "5+", t: "Módulos iniciais" },
                { n: "30+", t: "Aulas práticas" },
                { n: "100%", t: "Foco em aplicação" },
                { n: "D+1", t: "Aprenda e aplique" },
              ].map((s, i) => (
                <div key={i} className="bg-card border border-default rounded-2xl p-4 text-center hover-pop">
                  <div className="text-2xl font-bold">{s.n}</div>
                  <div className="text-sm text-muted">{s.t}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* MISSÃO / VISÃO / VALORES */}
      <section>
        <Reveal>
          <h2 className="text-2xl font-semibold mb-6">Nossa essência</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              title: "Missão",
              text: "Capacitar contadores a estruturarem processos comerciais eficientes, com clareza de proposta de valor e previsibilidade de receita.",
              icon: (
                <svg viewBox="0 0 24 24" className="w-6 h-6">
                  <path fill="currentColor" d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
                </svg>
              ),
            },
            {
              title: "Visão",
              text: "Ser a principal referência de conteúdo comercial aplicado à contabilidade no Brasil.",
              icon: (
                <svg viewBox="0 0 24 24" className="w-6 h-6">
                  <path fill="currentColor" d="M12 4a9 9 0 019 9h-2a7 7 0 10-7 7v2a9 9 0 010-18z" />
                </svg>
              ),
            },
            {
              title: "Valores",
              text: "Praticidade, ética, excelência, foco em resultado e evolução contínua.",
              icon: (
                <svg viewBox="0 0 24 24" className="w-6 h-6">
                  <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5A4.5 4.5 0 016.5 4c1.74 0 3.41.81 4.5 2.09A6 6 0 0115 4a4.5 4.5 0 014.5 4.5c0 3.78-3.4 6.86-8.05 11.54L12 21.35z" />
                </svg>
              ),
            },
          ].map((card, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="bg-card border border-default rounded-2xl p-6 hover-pop">
                <div className="flex items-center gap-3 mb-3 text-[var(--primary)]">
                  {card.icon}
                  <h3 className="font-semibold text-lg">{card.title}</h3>
                </div>
                <p className="text-muted">{card.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* O QUE ENTREGAMOS */}
      <section>
        <Reveal>
          <h2 className="text-2xl font-semibold mb-6">O que você encontra aqui</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              title: "Metodologia prática",
              text: "Aulas curtas, roteiros prontos e playbooks para aplicar imediatamente no seu escritório.",
            },
            {
              title: "Casos do dia a dia",
              text: "Cenários reais e objeções comuns com respostas testadas em campo.",
            },
            {
              title: "Evolução guiada",
              text: "Trilhas com progressão clara: do fundamento às práticas avançadas de negociação.",
            },
          ].map((f, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="bg-card border border-default rounded-2xl p-6 hover-pop">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                     style={{ background: "linear-gradient(180deg, var(--primary-300), var(--primary))", color: "#0b0b0f" }}>
                  {/* ícone simples */}
                  <svg viewBox="0 0 24 24" className="w-5 h-5">
                    <path fill="currentColor" d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h12v2H3v-2z"/>
                  </svg>
                </div>
                <h3 className="font-semibold mb-1">{f.title}</h3>
                <p className="text-muted">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* LINHA DO TEMPO */}
      <section>
        <Reveal>
          <h2 className="text-2xl font-semibold mb-6">Nossa trajetória</h2>
        </Reveal>
        <div className="relative pl-6">
          <span className="absolute left-2 top-0 bottom-0 w-px bg-[var(--border)]" />
          {[
            { ano: "2024", txt: "Concepção do Honorarium e protótipo da plataforma." },
            { ano: "2025", txt: "Lançamento do módulo Fundamentos e primeiros clientes." },
            { ano: "2026", txt: "Expansão de trilhas e parcerias com escritórios de referência." },
          ].map((ev, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="relative mb-5">
                <span className="absolute -left-[11px] top-1 w-5 h-5 rounded-full"
                      style={{ background: "linear-gradient(180deg, var(--primary-300), var(--primary))" }} />
                <div className="bg-card border border-default rounded-2xl p-4">
                  <div className="text-sm text-muted">{ev.ano}</div>
                  <div className="font-medium">{ev.txt}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TIME */}
      <section>
        <Reveal>
          <h2 className="text-2xl font-semibold mb-6">Quem faz</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {[
            { nome: "Fulana", cargo: "Founder & Conteúdo", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop" },
            { nome: "Fulano", cargo: "Parcerias & Operações", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop" },
            { nome: "Time Honorarium", cargo: "Produção & Suporte", img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800&auto=format&fit=crop" },
          ].map((p, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="bg-card border border-default rounded-2xl overflow-hidden hover-pop">
                <div className="relative aspect-[4/3]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.img} alt={p.nome} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
                <div className="p-4">
                  <div className="font-semibold">{p.nome}</div>
                  <div className="text-sm text-muted">{p.cargo}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-card border border-default rounded-3xl p-8 text-center">
        <Reveal>
          <h2 className="text-2xl font-semibold mb-2">Pronto para acelerar seus resultados?</h2>
          <p className="text-muted mb-4">
            Explore o catálogo e comece hoje mesmo pela trilha de Fundamentos.
          </p>
          <a href="/catalogo" className="btn inline-block">Explorar Catálogo</a>
        </Reveal>
      </section>
    </div>
  );
}

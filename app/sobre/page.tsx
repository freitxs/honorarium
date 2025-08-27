export default function SobrePage() {
  return (
    <div className="container py-8 space-y-4">
      <h1 className="text-3xl font-bold">Sobre</h1>
      <p className="text-muted">O Honorarium nasceu com a missão de tornar acessível o conhecimento de comercial aplicado à contabilidade.</p>
      <div className="grid md:grid-cols-3 gap-4">
        {["Missão", "Visão", "Valores"].map((t, i) => (
          <div key={i} className="bg-card border border-default rounded-2xl p-5"><h3 className="font-semibold">{t}</h3><p className="text-muted">Conteúdo direto ao ponto para acelerar seu crescimento.</p></div>
        ))}
      </div>
    </div>
  );
}

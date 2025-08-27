import { Accordion, AccordionItem } from "@/components/ui/accordion";

export default function SuportePage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-4">Suporte</h1>
      <Accordion>
        <AccordionItem title="Como faço login?">
          Crie uma conta em /auth/cadastro e use seu e-mail e senha.
        </AccordionItem>
        <AccordionItem title="Posso baixar os vídeos?">
          O conteúdo é exclusivo para streaming. Não disponibilizamos download.
        </AccordionItem>
        <AccordionItem title="Problemas no player">
          Verifique sua conexão e tente recarregar a página.
        </AccordionItem>
      </Accordion>

      <div className="bg-card border border-default rounded-2xl p-6 space-y-2 mt-6">
        <label className="block">Descreva sua dúvida (mock)</label>
        <textarea className="w-full bg-card border border-default rounded-xl px-3 py-2" rows={4}></textarea>
        <button className="btn" type="button">Enviar</button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Accordion, AccordionItem } from "@/components/ui/accordion";

export default function SuportePage() {
  const [nome, setNome] = useState("");
  const [titulo, setTitulo] = useState("");
  const [mensagem, setMensagem] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!nome.trim() || !titulo.trim() || !mensagem.trim()) {
      alert("Preencha nome, título e a descrição da dúvida.");
      return;
    }

    // MOCK: aqui você poderia enviar para uma API / webhook / email
    console.log("SUPORTE (mock):", { nome, titulo, mensagem });

    alert("Sua solicitação foi registrada! Em breve entraremos em contato.");
    setNome("");
    setTitulo("");
    setMensagem("");
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-4">Suporte</h1>

      <Accordion>
        <AccordionItem title="Como faço login?">
          Crie uma conta em <strong>/auth/cadastro</strong> e use seu e-mail e senha.
        </AccordionItem>
        <AccordionItem title="Posso baixar os vídeos?">
          O conteúdo é exclusivo para streaming. Não disponibilizamos download.
        </AccordionItem>
        <AccordionItem title="Problemas no player">
          Verifique sua conexão e tente recarregar a página.
        </AccordionItem>
      </Accordion>

      {/* Formulário de suporte */}
      <form
        onSubmit={handleSubmit}
        className="bg-card border border-default rounded-2xl p-6 space-y-4 mt-6"
      >
        <div>
          <label className="block mb-1">Nome completo</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome completo"
            className="w-full bg-card border border-default rounded-xl px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Título da dúvida ou do erro</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ex.: Erro ao carregar o vídeo Fundamentos 2"
            className="w-full bg-card border border-default rounded-xl px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Descreva sua dúvida</label>
          <textarea
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            className="w-full bg-card border border-default rounded-xl px-3 py-2"
            rows={5}
            placeholder="Conte o que aconteceu, passos para reproduzir e, se possível, anexe prints quando responder nosso contato."
            required
          />
        </div>

        <div className="flex items-center gap-3">
          <button className="btn" type="submit">Enviar</button>
        </div>
      </form>
    </div>
  );
}

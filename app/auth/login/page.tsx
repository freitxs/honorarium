"use client";
import { useState } from "react";
import Button from "@/components/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
    if (res.ok) window.location.href = "/meus-conteudos";
    else { const j = await res.json().catch(()=>({})); setError(j.message || "Erro ao entrar."); }
  };

  return (
    <div className="container py-12">
      <div className="max-w-md mx-auto bg-card border border-default rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-4">Entrar</h1>
        <form onSubmit={onSubmit} className="space-y-3">
          <div><label className="block mb-1">E-mail</label><input className="w-full bg-card border border-default rounded-xl px-3 py-2" type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} /></div>
          <div><label className="block mb-1">Senha</label><input className="w-full bg-card border border-default rounded-xl px-3 py-2" type="password" required value={password} onChange={(e)=>setPassword(e.target.value)} /></div>
          {error && <p className="text-[var(--error)]">{error}</p>}
          <Button type="submit">Entrar</Button>
        </form>
        <p className="text-muted text-sm mt-4">Não tem conta? <a href="/auth/cadastro">Cadastre-se</a></p>
      </div>
    </div>
  );
}

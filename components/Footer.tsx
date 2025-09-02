"use client";
import Link from "next/link";
import type { Route } from "next";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-default/50">
      <div className="container py-8 text-sm text-muted flex items-center justify-between">
        <p>
          © <span suppressHydrationWarning>{new Date().getFullYear()}</span>{" "}
          Honorarium. Todos os direitos reservados.
        </p>
        <nav className="flex gap-4">
          <Link href={"/sobre" as Route}>Sobre</Link>
          <Link href={"/suporte" as Route}>Suporte</Link>
        </nav>
      </div>
    </footer>
  );
}

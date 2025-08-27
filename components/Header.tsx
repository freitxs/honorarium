"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "/", label: "Início" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/meus-conteudos", label: "Meus Conteúdos" },
  { href: "/suporte", label: "Suporte" },
  { href: "/sobre", label: "Sobre" }
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-default/50 bg-black/30 backdrop-blur">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="font-bold tracking-wide text-xl">
          <span className="text-[var(--primary)]">Honorar</span>ium
        </Link>
        <nav className="hidden md:flex gap-6">
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              className={`hover:text-[var(--primary)] transition ${pathname === l.href ? "text-[var(--primary)]" : "text-muted"}`}>
              {l.label}
            </Link>
          ))}
          <Link href="/auth/login" className="btn">Entrar</Link>
        </nav>
        <button className="md:hidden p-2" onClick={() => setOpen((v) => !v)}><Menu /></button>
      </div>
      {open && (
        <div className="md:hidden border-t border-default bg-card">
          <div className="container py-2 flex flex-col">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="py-2 text-muted hover:text-[var(--primary)]" onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
            <Link href="/auth/login" className="btn mt-2 w-fit" onClick={() => setOpen(false)}>Entrar</Link>
          </div>
        </div>
      )}
    </header>
  );
}

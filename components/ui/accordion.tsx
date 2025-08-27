"use client";
import { useState, ReactNode } from "react";

export function Accordion({ children, className="" }: { children: ReactNode; className?: string }) {
  return <div className={className + " divide-y divide-[var(--border)] rounded-2xl border border-default bg-card"}>{children}</div>;
}
export function AccordionItem({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button className="w-full text-left px-4 py-3 font-semibold hover:text-[var(--primary)]"
        aria-expanded={open} onClick={() => setOpen(o => !o)}>{title}</button>
      {open && <div className="px-4 pb-4 text-muted">{children}</div>}
    </div>
  );
}

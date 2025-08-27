"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Route } from "next";

type Item = {
  slug: string;
  title: string;
  thumbnail_url: string;
};

export default function Carousel({ items }: { items: Item[] }) {
  const [idx, setIdx] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // limpa intervalo anterior, se houver
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }

    // cria novo intervalo
    timer.current = setInterval(() => {
      setIdx((i) => (i + 1) % Math.max(items.length, 1));
    }, 4000);

    // cleanup (sempre retorna void)
    return () => {
      if (timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
    };
  }, [items.length]);

  if (!items.length) return null;

  const it = items[idx];

  return (
    <div className="rounded-2xl overflow-hidden border border-default">
      <Link
        href={{ pathname: "/video/[slug]" as Route, query: { slug: it.slug } }}
        className="relative block aspect-[16/7] bg-card"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={it.thumbnail_url}
          alt={it.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-semibold">{it.title}</h3>
        </div>
      </Link>

      <div className="flex gap-2 p-3">
        {items.map((_, i) => (
          <button
            key={i}
            aria-label={`ir ao slide ${i + 1}`}
            className={`h-2 rounded-full transition ${
              i === idx ? "w-6 bg-[var(--primary)]" : "w-2 bg-[var(--border)]"
            }`}
            onClick={() => setIdx(i)}
          />
        ))}
      </div>
    </div>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Item = { slug: string; title: string; thumbnail_url: string; };

export default function Carousel({ items = [] as Item[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  useEffect(() => { const id = setInterval(() => setIndex((i) => (i + 1) % Math.max(items.length, 1)), 4000); return () => clearInterval(id); }, [items.length]);
  useEffect(() => { if (ref.current) ref.current.scrollTo({ left: index * 280, behavior: "smooth" }); }, [index]);
  return (
    <div className="overflow-hidden">
      <div ref={ref} className="flex gap-4 overflow-x-auto no-scrollbar py-2">
        {items.map((v) => (
          <Link key={v.slug} href={`/video/${v.slug}`} className="min-w-[260px]">
            <div className="bg-card rounded-2xl overflow-hidden shadow-premium border border-default">
              <img src={v.thumbnail_url} alt={v.title} className="w-full h-40 object-cover" />
              <div className="p-3"><h3 className="font-semibold">{v.title}</h3><p className="text-muted text-sm">Assista agora</p></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

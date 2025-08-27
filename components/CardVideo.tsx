"use client";
import Link from "next/link";
import { useRef, useState } from "react";

export default function CardVideo({ slug, title, thumbnail_url, preview_url }: { slug: string; title: string; thumbnail_url: string; preview_url?: string; }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);
  return (
    <Link href={`/video/${slug}`}>
      <div className="bg-card rounded-2xl overflow-hidden border border-default hover:border-[var(--primary)] transition-colors"
        onMouseEnter={() => { setHovered(true); videoRef.current?.play().catch(()=>{}); }}
        onMouseLeave={() => { setHovered(false); videoRef.current?.pause(); if (videoRef.current) videoRef.current.currentTime = 0; }}>
        <div className="relative h-44">
          {!hovered && <img src={thumbnail_url} alt={title} className="w-full h-full object-cover" />}
          {hovered && <video ref={videoRef} src={preview_url || ""} muted playsInline className="w-full h-full object-cover" />}
        </div>
        <div className="p-3"><h3 className="font-semibold line-clamp-2">{title}</h3></div>
      </div>
    </Link>
  );
}

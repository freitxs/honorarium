"use client";
import Link from "next/link";
import { useState } from "react";

type Props = {
  slug: string;
  title: string;
  thumbnail_url: string;
  preview_url?: string;
};

export default function CardVideo({
  slug,
  title,
  thumbnail_url,
  preview_url,
}: Props) {
  const [hover, setHover] = useState(false);

  return (
    <Link
      href={`/video/${slug}`}
      className="group block bg-card border border-default rounded-2xl overflow-hidden"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="aspect-video relative overflow-hidden">
        {/* preview silencioso on hover */}
        {preview_url && hover ? (
          <video
            src={preview_url}
            muted
            playsInline
            autoPlay
            loop
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          
          <img
            src={thumbnail_url}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </div>
      <div className="p-3">
        <h3 className="font-semibold line-clamp-2">{title}</h3>
      </div>
    </Link>
  );
}

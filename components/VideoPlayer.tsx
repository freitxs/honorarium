"use client";

import { useEffect, useRef, useState } from "react";

type Chapter = { start: number; title: string };

export default function VideoPlayer({
  src,
  isHls,
  previewStart = 0,
  previewDuration = 20,
  allowFull,
  onProgress,
  chapters,
}: {
  src: string;
  isHls: boolean;
  previewStart?: number;
  previewDuration?: number;
  allowFull: boolean;
  onProgress?: (sec: number) => void;
  chapters?: Chapter[];
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [locked, setLocked] = useState(false);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    let hls: any | null = null;

    // Carregar fonte (HLS ou MP4)
    const setup = async () => {
      if (isHls) {
        // tenta nativo primeiro
        if (v.canPlayType("application/vnd.apple.mpegurl")) {
          v.src = src;
        } else {
          // fallback com hls.js
          const Hls = await import("hls.js");
          if (Hls.default?.isSupported()) {
            hls = new Hls.default();
            hls.loadSource(src);
            hls.attachMedia(v);
          } else {
            // fallback final como se fosse MP4
            v.src = src;
          }
        }
      } else {
        v.src = src;
      }
    };

    setup();

    const onLoaded = () => {
      // posiciona na prévia
      if (previewStart > 0) v.currentTime = previewStart;
    };

    const onTime = () => {
      const t = v.currentTime;
      onProgress?.(t);
      if (!allowFull) {
        const limit = (previewStart ?? 0) + (previewDuration ?? 20);
        if (t >= limit) {
          v.pause();
          setLocked(true);
        }
      }
    };

    v.addEventListener("loadedmetadata", onLoaded);
    v.addEventListener("timeupdate", onTime);

    return () => {
      v.removeEventListener("loadedmetadata", onLoaded);
      v.removeEventListener("timeupdate", onTime);
      if (hls) {
        try {
          hls.destroy();
        } catch {}
      }
    };
  }, [src, isHls, previewStart, previewDuration, allowFull, onProgress]);

  useEffect(() => {
    if (ref.current) ref.current.playbackRate = speed;
  }, [speed]);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-default bg-black">
      <video
        ref={ref}
        className="w-full h-auto"
        controls
        playsInline
        preload="metadata"
      />
      {/* Controles extras */}
      <div className="absolute bottom-2 right-2 flex items-center gap-2 bg-black/50 backdrop-blur px-2 py-1 rounded-xl">
        <label className="text-xs">Velocidade</label>
        <select
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="bg-card border border-default rounded-md text-sm px-2 py-1"
        >
          {[0.75, 1, 1.25, 1.5, 1.75, 2].map((s) => (
            <option key={s} value={s}>
              {s}x
            </option>
          ))}
        </select>
      </div>

      {/* Gate de prévia */}
      {locked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-center p-6">
          <p className="mb-4">
            Prévia liberada. Faça login para assistir ao conteúdo completo.
          </p>
          <a href="/auth/login" className="btn">
            Entrar
          </a>
        </div>
      )}
    </div>
  );
}

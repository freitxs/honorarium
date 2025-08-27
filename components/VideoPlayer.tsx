"use client";
import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";

type Chapter = { start: number; title: string };
type Props = { src: string; isHls: boolean; previewStart?: number; previewDuration?: number; allowFull?: boolean; chapters?: Chapter[]; onProgress?: (sec: number) => void; };

export default function VideoPlayer({ src, isHls, previewStart = 0, previewDuration = 20, allowFull = false, chapters = [], onProgress }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [speed, setSpeed] = useState(1);
  useEffect(() => {
    const v = ref.current; if (!v) return;
    let hls: Hls | null = null;
    if (isHls && Hls.isSupported()) { hls = new Hls(); hls.loadSource(src); hls.attachMedia(v); }
    else { v.src = src; }
    const onTime = () => {
      const t = v.currentTime; onProgress?.(t);
if (allowFull && video_id) {
  clearTimeout((window as any)._saveTimer);
  (window as any)._saveTimer = setTimeout(() => {
    fetch('/api/me/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ video_id, seconds: t })
    });
  }, 1000);
}

      if (!allowFull && t >= (previewStart + previewDuration)) v.pause();
    };
    v.addEventListener("timeupdate", onTime);
    return () => { v.removeEventListener("timeupdate", onTime); hls?.destroy(); };
  }, [src, isHls, allowFull, previewStart, previewDuration, onProgress]);
  useEffect(() => { const v = ref.current; if (!v) return; if (!allowFull) v.currentTime = previewStart; }, [allowFull, previewStart]);

  return (
    <div className="bg-card border border-default rounded-2xl p-3">
      <video ref={ref} controls className="w-full rounded-xl" />
      <div className="flex items-center gap-3 mt-2 text-sm">
        <button className="btn" onClick={() => { const v = ref.current; if(!v) return; v.paused ? v.play() : v.pause(); }}>Play/Pause</button>
        <label>Velocidade</label>
        <select className="bg-card border border-default rounded-xl px-2 py-1" value={speed} onChange={(e) => { const s = Number(e.target.value); setSpeed(s); if (ref.current) ref.current.playbackRate = s; }}>
          {[0.75, 1, 1.25, 1.5, 1.75, 2].map((s) => (<option key={s} value={s}>{s}x</option>))}
        </select>
        {chapters.length > 0 && (<div className="ml-auto flex gap-2">
          {chapters.map((c, i) => (<button key={i} className="px-2 py-1 border border-default rounded-xl hover:border-[var(--primary)]" onClick={() => { if (ref.current) ref.current.currentTime = c.start; }}>{c.title}</button>))}
        </div>)}
      </div>
      {!allowFull && (<p className="text-muted mt-2">Prévia liberada. Faça login para assistir ao conteúdo completo.</p>)}
    </div>
  );
}

// TODO: Suporte a legendas .vtt via <track> pode ser adicionado aqui.

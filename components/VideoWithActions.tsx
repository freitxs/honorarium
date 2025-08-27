"use client";
import { useCallback, useRef } from "react";
import { useToast } from "@/components/ui/toast";
import VideoPlayer from "@/components/VideoPlayer";
import Tooltip from "@/components/ui/tooltip";
import { strings } from "@/lib/i18n";

function debounce<T extends (...args:any)=>void>(fn:T, ms:number) {
  let t: any;
  return (...args: Parameters<T>) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

export default function VideoWithActions({
  videoId,
  src,
  isHls,
  previewStart,
  previewDuration,
  allowFull
}: {
  videoId: string;
  src: string;
  isHls: boolean;
  previewStart?: number;
  previewDuration?: number;
  allowFull: boolean;
}) {
  const { push } = useToast();
  const saveProgress = useRef(debounce(async (sec: number) => {
    try {
      await fetch("/api/me/progress", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ video_id: videoId, seconds: Math.floor(sec) }) });
    } catch {}
  }, 600)).current;

  const onProgress = useCallback((sec: number) => {
    if (allowFull) saveProgress(sec);
  }, [allowFull, saveProgress]);

  const toggleFavorite = async () => {
    try {
      const res = await fetch("/api/me/favorites", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ video_id: videoId }) });
      if (res.ok) push(strings.saved);
      else push(strings.needLogin);
    } catch { push("Erro ao salvar"); }
  };

  const vtt = src.endsWith(".mp4") ? src.replace(".mp4", ".vtt") : undefined;

  return (
    <div className="space-y-3">
      <VideoPlayer src={src} isHls={isHls} previewStart={previewStart} previewDuration={previewDuration} allowFull={allowFull} onProgress={onProgress} />
      <div className="flex gap-2">
        <Tooltip label="Salvar em favoritos">
          <button className="px-3 py-2 border border-default rounded-xl hover:border-[var(--primary)]" onClick={toggleFavorite}>
            {strings.addFavorite}
          </button>
        </Tooltip>
      </div>
      {/* Track de legendas (se existir no mesmo path) */}
      {/* Nota: o controle do track é feito dentro do VideoPlayer se desejado */}
    </div>
  );
}


"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Props = { totalVideos: number };

export default function HomeProgress({ totalVideos }: Props) {
  const [completed, setCompleted] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch("/api/me/progress", { cache: "no-store" });
        if (!res.ok) throw new Error("auth");
        const data = await res.json();
        if (!active) return;
        const done = (data.items || []).filter((i: any) => i.completed).length;
        setCompleted(done);
      } catch {
        setCompleted(0);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  const pct = Math.min(100, Math.round((completed / Math.max(totalVideos, 1)) * 100));

  return (
    <div className="bg-card border border-default rounded-2xl p-5">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">Sua trilha de aprendizado</h3>
        <span className="text-sm text-muted">{completed} / {totalVideos} concluídos</span>
      </div>
      <div className="h-3 rounded-full bg-black/30 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: loading ? 0 : pct + "%" }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, var(--primary-300), var(--primary))" }}
        />
      </div>
      {!loading && (
        <p className="text-sm text-muted mt-2">
          {completed === 0 ? "Comece pelo módulo Fundamentos." :
           pct < 100 ? "Continue de onde parou para concluir sua trilha." :
           "Parabéns! Você concluiu todos os conteúdos disponíveis."}
        </p>
      )}
    </div>
  );
}

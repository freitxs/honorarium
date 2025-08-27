"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type Toast = { id: number; message: string };
const ToastCtx = createContext<{ push: (m: string)=>void } | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [list, setList] = useState<Toast[]>([]);
  const push = (message: string) => {
    const id = Date.now();
    setList((l) => [...l, { id, message }]);
    setTimeout(() => setList((l) => l.filter((t) => t.id !== id)), 2500);
  };
  return (
    <ToastCtx.Provider value={{ push }}>
      {children}
      <div className="fixed bottom-6 right-6 space-y-2 z-50">
        {list.map(t => (
          <div key={t.id} className="bg-card border border-default rounded-2xl px-4 py-2 shadow-premium">
            {t.message}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}
export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("ToastProvider ausente");
  return ctx;
}

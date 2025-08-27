"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Reveal({ children, y = 20, delay = 0 }: { children: React.ReactNode; y?: number; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) controls.start({ opacity: 1, y: 0, transition: { duration: .5, delay } });
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, [controls, delay]);
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={controls}>
      {children}
    </motion.div>
  );
}

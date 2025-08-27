"use client";
import { ReactNode } from "react";
export default function Tooltip({ label, children }: { label: string; children: ReactNode }) {
  return <span title={label}>{children}</span>;
}

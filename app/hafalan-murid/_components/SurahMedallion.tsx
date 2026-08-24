"use client";

import { TOTAL_SURAH } from "../types";

interface Props {
  total: number;
  variant?: "light" | "dark";
}

export default function SurahMedallion({ total, variant = "light" }: Props) {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(total / TOTAL_SURAH, 1);
  const offset = circumference * (1 - progress);

  const isDark = variant === "dark";

  return (
    <div className="relative h-14 w-14 shrink-0">
      <svg viewBox="0 0 60 60" className="h-14 w-14 -rotate-90">
        <circle
          cx="30"
          cy="30"
          r={radius}
          fill="none"
          stroke={isDark ? "rgba(255,255,255,0.15)" : "#f1f5f9"}
          strokeWidth="3.5"
        />
        <circle
          cx="30"
          cy="30"
          r={radius}
          fill="none"
          stroke="#c1663c"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-500 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={`text-base font-extrabold leading-none tabular-nums ${
            isDark ? "text-white" : "text-[#152e28]"
          }`}
        >
          {total}
        </span>
        <span
          className={`text-[7.5px] font-bold uppercase tracking-wider mt-0.5 ${
            isDark ? "text-emerald-100/70" : "text-slate-400"
          }`}
        >
          / {TOTAL_SURAH}
        </span>
      </div>
    </div>
  );
}
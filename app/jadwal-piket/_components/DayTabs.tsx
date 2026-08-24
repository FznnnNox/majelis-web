"use client";

import { motion } from "framer-motion";
import { Coffee, Users } from "lucide-react";
import { PiketDay } from "../types";

interface Props {
  days: PiketDay[];
  activeDay: number;
  todayIndex: number;
  onSelect: (idx: number) => void;
}

export default function DayTabs({ days, activeDay, todayIndex, onSelect }: Props) {
  return (
    <div className="flex gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar snap-x snap-mandatory sm:grid sm:grid-cols-7 pb-1 -mx-1 px-1">
      {days.map((item, idx) => {
        const isActive = activeDay === idx;
        const isToday = todayIndex === idx;

        return (
          <button
            key={item.day}
            type="button"
            onClick={() => onSelect(idx)}
            className={`relative shrink-0 snap-start min-w-[104px] sm:min-w-0 rounded-2xl p-3.5 text-left transition-all duration-200 border ${
              isActive
                ? "border-transparent shadow-lg shadow-[#152e28]/20"
                : isToday
                ? "border-sky-300 bg-white hover:border-sky-400"
                : "border-slate-200/80 bg-white hover:border-slate-300 hover:-translate-y-0.5"
            }`}
          >
            {/* Background aktif (animasi geser) */}
            {isActive && (
              <motion.div
                layoutId="activeDayTabBg"
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#152e28] to-[#1f4038]"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}

            <div className="relative z-10 flex items-start justify-between gap-2">
              <span
                className={`font-bold text-sm tracking-wide ${
                  isActive ? "text-white" : "text-slate-800"
                }`}
              >
                {item.day}
              </span>

              {isToday && (
                <span className="relative flex h-2 w-2 mt-1 shrink-0">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      isActive ? "bg-sky-300" : "bg-sky-400"
                    }`}
                  />
                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${
                      isActive ? "bg-sky-300" : "bg-sky-500"
                    }`}
                  />
                </span>
              )}
            </div>

            <div
              className={`relative z-10 mt-2.5 inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-[10.5px] font-bold ${
                item.isLibur
                  ? isActive
                    ? "bg-amber-400/20 text-amber-200"
                    : "bg-amber-50 text-amber-600"
                  : isActive
                  ? "bg-white/10 text-emerald-100"
                  : "bg-emerald-50 text-emerald-700"
              }`}
            >
              {item.isLibur ? (
                <>
                  <Coffee className="h-3 w-3" />
                  <span>Libur</span>
                </>
              ) : (
                <>
                  <Users className="h-3 w-3" />
                  <span>{item.petugas.length} orang</span>
                </>
              )}
            </div>

            {isToday && (
              <span
                className={`relative z-10 block mt-1.5 text-[10px] font-semibold ${
                  isActive ? "text-sky-200" : "text-sky-600"
                }`}
              >
                Hari Ini
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
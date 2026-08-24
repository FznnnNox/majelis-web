"use client";

import { Sparkles, TrendingUp } from "lucide-react";

export default function DashboardHeader() {
  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-[28px] bg-gradient-to-r from-[#14352c] via-[#1b4338] to-[#235346] p-5 sm:p-8 text-white shadow-xl shadow-[#14352c]/10">
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-48 sm:w-64 h-48 sm:h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-12 w-36 sm:w-48 h-36 sm:h-48 bg-[#c1663c]/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-emerald-200 text-[11px] sm:text-xs font-medium mb-2.5">
            <Sparkles className="h-3.5 w-3.5 text-[#c1663c]" />
            <span>Ringkasan Sistem Majelis</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
            Assalamu&rsquo;alaikum, Admin!
          </h1>
          <p className="text-emerald-100/70 text-xs sm:text-sm mt-1 max-w-lg leading-relaxed">
            Berikut rekap kegiatan, status piket, dan kas Majelis Al-Inayah hari ini.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 flex items-center gap-3 shrink-0 self-start sm:self-auto">
          <TrendingUp className="h-5 w-5 text-emerald-300" />
          <div>
            <p className="text-[10px] uppercase font-bold text-emerald-200 tracking-wider">
              Status Operasional
            </p>
            <p className="text-xs sm:text-sm font-bold text-white">
              Sistem Aktif & Normal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
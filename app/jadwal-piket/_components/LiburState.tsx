"use client";

import { Sparkles } from "lucide-react";

interface Props {
  day: string;
}

export default function LiburState({ day }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e76f3c]/10 text-[#e76f3c]">
        <Sparkles className="h-8 w-8" />
      </div>
      <h3 className="text-xl font-bold text-slate-900">Hari Libur Piket</h3>
      <p className="max-w-md text-xs sm:text-sm text-slate-500 leading-relaxed">
        Setiap hari {day}, kegiatan piket rutin diliburkan. Pengajian tetap
        berjalan normal sesuai jadwal majelis.
      </p>
    </div>
  );
}   
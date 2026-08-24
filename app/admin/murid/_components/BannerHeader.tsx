"use client";

import { Sparkles, UserPlus } from "lucide-react";

interface BannerHeaderProps {
  onOpenAddModal: () => void;
}

export default function BannerHeader({ onOpenAddModal }: BannerHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-[28px] bg-gradient-to-r from-[#14352c] via-[#1b4338] to-[#235346] p-5 sm:p-8 text-white shadow-xl shadow-[#14352c]/10">
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-emerald-200 text-[11px] sm:text-xs font-medium mb-2.5">
            <Sparkles className="h-3.5 w-3.5 text-[#c1663c]" />
            <span>Pengajian Ba'da Maghrib</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
            Data Murid Majelis Al-Inayah
          </h1>
          <p className="text-emerald-100/70 text-xs sm:text-sm mt-1 max-w-lg leading-relaxed">
            Monitoring bacaan &amp; progres hafalan Al-Qur'an anak-anak
            Kampung Panggang.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenAddModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#c1663c] hover:bg-[#d47244] text-white text-xs font-bold shadow-lg transition-all active:scale-95 cursor-pointer shrink-0"
        >
          <UserPlus className="h-4 w-4" />
          <span>Tambah Murid Baru</span>
        </button>
      </div>
    </div>
  );
}
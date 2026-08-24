"use client";

import { ShieldAlert } from "lucide-react";

export default function CatatanBox() {
  return (
    <div className="mt-8 flex items-start gap-3 rounded-2xl bg-amber-500/10 p-4 border border-amber-500/20 text-amber-900 text-xs sm:text-sm">
      <ShieldAlert className="h-5 w-5 text-[#e76f3c] shrink-0 mt-0.5" />
      <p className="leading-relaxed">
        <span className="font-bold">Catatan Santri:</span> Petugas piket
        diharapkan hadir 15 menit sebelum azan Maghrib untuk mempersiapkan
        tempat dan alat sholat.
      </p>
    </div>
  );
}
"use client";

import { Target } from "lucide-react";
import { formatRupiah } from "../types";

interface Props {
  nama: string;
  deskripsi: string | null;
  target: number;
  terkumpul: number;
}

export default function DonasiCampaign({
  nama,
  deskripsi,
  target,
  terkumpul,
}: Props) {
  const progressPercent = Math.min(
    Math.round((terkumpul / target) * 100),
    100
  );

  return (
    <div className="lg:col-span-2 bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#c1663c] bg-amber-50 border border-amber-100 px-3 py-1 rounded-full">
            <Target className="h-3.5 w-3.5" />
            Program Utama
          </span>
          <span className="text-xs font-bold text-gray-400">
            {progressPercent}% Tercapai
          </span>
        </div>

        <h3 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight">
          {nama}
        </h3>
        {deskripsi && (
          <p className="text-xs text-gray-400 mt-1">{deskripsi}</p>
        )}
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden p-0.5 border border-gray-200/50">
          <div
            className="h-full bg-gradient-to-r from-[#14352c] to-[#c1663c] rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs font-medium">
          <div>
            <span className="text-gray-400 block text-[10px] uppercase font-bold">
              Terkumpul
            </span>
            <span className="font-extrabold text-[#14352c] text-sm">
              {formatRupiah(terkumpul)}
            </span>
          </div>
          <div className="text-right">
            <span className="text-gray-400 block text-[10px] uppercase font-bold">
              Target
            </span>
            <span className="font-bold text-gray-700 text-sm">
              {formatRupiah(target)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
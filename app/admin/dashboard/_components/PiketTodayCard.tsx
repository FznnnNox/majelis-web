"use client";

import { UserCheck, PartyPopper } from "lucide-react";
import { PiketItem, JadwalHariIni } from "../types";

interface Props {
  piketList: PiketItem[];
  jadwal: JadwalHariIni | null;
}

export default function PiketTodayCard({ piketList, jadwal }: Props) {
  const isLibur = jadwal?.isLibur;

  return (
    <div className="lg:col-span-2 bg-white/90 backdrop-blur-md p-5 sm:p-6 rounded-3xl border border-gray-100 shadow-2xs space-y-4">
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-gray-100">
        <div>
          <h2 className="text-sm sm:text-base font-extrabold text-gray-900 flex items-center gap-2">
            <UserCheck className="h-4 w-4 text-[#14352c]" />
            <span>Piket Santri Hari Ini{jadwal ? ` — ${jadwal.hari}` : ""}</span>
          </h2>
          <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5">
            {jadwal?.tugas || "Monitoring pelaksanaan tugas kebersihan majelis"}
          </p>
        </div>
        {!isLibur && (
          <span className="shrink-0 px-3 py-1 text-xs font-bold rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100">
            {piketList.length} Santri Bertugas
          </span>
        )}
      </div>

      {isLibur ? (
        <div className="flex flex-col items-center justify-center py-8 text-center gap-2">
          <PartyPopper className="h-8 w-8 text-amber-400" />
          <p className="text-sm font-bold text-gray-700">Hari ini jadwal piket diliburkan</p>
          <p className="text-xs text-gray-400">Selamat beristirahat, sampai jumpa besok!</p>
        </div>
      ) : piketList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {piketList.map((piket, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3.5 rounded-2xl bg-gray-50/70 border border-gray-100 hover:border-emerald-200 transition-all min-w-0"
            >
              <div className="h-9 w-9 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 bg-emerald-100 text-emerald-800">
                {piket.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-gray-900 truncate">
                  {piket.name}
                </p>
                <p className="text-[11px] font-medium text-gray-500 truncate">
                  {piket.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-gray-400 italic text-center py-6">
          Belum ada petugas piket yang ditentukan untuk hari ini.
        </p>
      )}
    </div>
  );
}
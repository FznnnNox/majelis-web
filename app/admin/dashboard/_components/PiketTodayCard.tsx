"use client";

import { UserCheck } from "lucide-react";
import { PiketItem } from "../types";

interface Props {
  piketList: PiketItem[];
}

export default function PiketTodayCard({ piketList }: Props) {
  return (
    <div className="lg:col-span-2 bg-white/90 backdrop-blur-md p-5 sm:p-6 rounded-3xl border border-gray-100 shadow-2xs space-y-4">
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-gray-100">
        <div>
          <h2 className="text-sm sm:text-base font-extrabold text-gray-900 flex items-center gap-2">
            <UserCheck className="h-4 w-4 text-[#14352c]" />
            <span>Piket Santri Hari Ini</span>
          </h2>
          <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5">
            Monitoring pelaksanaan tugas kebersihan majelis
          </p>
        </div>
        <span className="shrink-0 px-3 py-1 text-xs font-bold rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100">
          {piketList.length} Santri Bertugas
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {piketList.map((piket, i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-gray-50/70 border border-gray-100 hover:border-emerald-200 transition-all"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`h-9 w-9 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 ${
                  piket.done
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
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

            <span
              className={`shrink-0 text-[10px] sm:text-[11px] font-extrabold px-2.5 py-1 rounded-xl ${
                piket.done
                  ? "bg-emerald-100/80 text-emerald-800 border border-emerald-200/60"
                  : "bg-amber-100/80 text-amber-800 border border-amber-200/60"
              }`}
            >
              {piket.done ? "Selesai" : "Belum"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
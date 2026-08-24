"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MuridHafalan, isLancar, formatTanggal } from "../types";
import SurahMedallion from "./SurahMedallion";

interface Props {
  item: MuridHafalan;
  onClick?: () => void;
}

export default function MuridHafalanCard({ item, onClick }: Props) {
  const status = item.hafalanTerakhir?.catatan;
  const lancar = isLancar(status);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25 }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick?.();
      }}
      className="group cursor-pointer rounded-3xl p-5 bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#c1663c]/40 transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Card Header */}
        <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
          <SurahMedallion total={item.totalSurah} />

          <div className="min-w-0 flex-1">
            <h2 className="font-bold text-[#152e28] text-base leading-snug truncate group-hover:text-[#c1663c] transition-colors">
              {item.nama}
            </h2>
            <span className="text-xs text-slate-400 font-medium block mt-0.5 truncate">
              {item.tingkat_ngaji?.nama_tingkat ?? "Belum ada tingkat"}
            </span>
          </div>
        </div>

        {/* Card Details */}
        <div className="py-4 space-y-2.5 text-xs sm:text-sm">
          <div className="flex items-center justify-between gap-3">
            <span className="text-slate-400 font-medium shrink-0">
              Setoran terakhir
            </span>
            <span className="font-bold text-slate-800 text-right truncate max-w-[150px]">
              {item.hafalanTerakhir
                ? `${item.hafalanTerakhir.surah} (${item.hafalanTerakhir.ayat})`
                : "Belum ada setoran"}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-slate-400 font-medium shrink-0">
              Total surah dihafal
            </span>
            <span className="font-semibold px-2.5 py-0.5 rounded-full text-[11px] bg-[#152e28]/10 text-[#152e28]">
              {item.totalSurah} surah
            </span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-slate-400 font-medium shrink-0">
              Status evaluasi
            </span>
            {status ? (
              <span
                className={`inline-flex items-center gap-1.5 font-semibold px-2.5 py-0.5 rounded-full text-[11px] ${
                  lancar
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200/50"
                    : "bg-amber-50 text-amber-700 border border-amber-200/50"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    lancar ? "bg-emerald-500" : "bg-amber-500"
                  }`}
                />
                {status}
              </span>
            ) : (
              <span className="text-slate-400 text-[11px] font-medium">
                Belum dievaluasi
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <span>Terakhir update</span>
        <span className="font-semibold text-slate-600 inline-flex items-center gap-1">
          {formatTanggal(item.hafalanTerakhir?.tanggal)}
          <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#c1663c]" />
        </span>
      </div>
    </motion.div>
  );
}
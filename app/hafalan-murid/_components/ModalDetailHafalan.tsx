"use client";

import { motion } from "framer-motion";
import { X, BookOpen, Calendar } from "lucide-react";
import { MuridHafalan, isLancar, formatTanggal } from "../types";
import SurahMedallion from "./SurahMedallion";

interface Props {
  murid: MuridHafalan;
  onClose: () => void;
}

export default function ModalDetailHafalan({ murid, onClose }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-0 sm:p-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-lg max-h-[85vh] bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="bg-[#152e28] text-white px-5 sm:px-6 py-5 flex items-start justify-between shrink-0">
          <div className="flex items-center gap-3.5 min-w-0">
            <SurahMedallion total={murid.totalSurah} variant="dark" />
            <div className="min-w-0">
              <h2 className="font-bold text-base leading-snug truncate">
                {murid.nama}
              </h2>
              <span className="text-xs text-emerald-100/80 font-medium block mt-0.5 truncate">
                {murid.tingkat_ngaji?.nama_tingkat ?? "Belum ada tingkat"}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body - Riwayat Hafalan */}
        <div className="overflow-y-auto px-5 sm:px-6 py-5 space-y-3 flex-1">
          <span className="text-xs font-bold text-gray-900 uppercase tracking-[0.15em]">
            Riwayat Setoran ({murid.riwayatHafalan.length})
          </span>

          {murid.riwayatHafalan.length === 0 ? (
            <div className="py-10 text-center text-gray-400">
              <BookOpen className="h-8 w-8 mx-auto mb-2 text-slate-300" />
              <p className="text-xs font-medium">Belum ada setoran hafalan.</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {murid.riwayatHafalan.map((h) => {
                const lancar = isLancar(h.catatan);
                return (
                  <div
                    key={h.id}
                    className="rounded-2xl bg-[#f8faf9] border border-gray-200/80 p-3.5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-bold text-sm text-gray-900 truncate">
                          {h.surah}
                        </p>
                        <p className="text-xs text-gray-500 font-medium mt-0.5">
                          Ayat {h.ayat}
                        </p>
                      </div>
                      {h.catatan ? (
                        <span
                          className={`shrink-0 inline-flex items-center gap-1.5 font-semibold px-2.5 py-0.5 rounded-full text-[11px] ${
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
                          {h.catatan}
                        </span>
                      ) : (
                        <span className="shrink-0 text-gray-400 text-[11px] font-medium">
                          Belum dievaluasi
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-medium mt-2.5 pt-2.5 border-t border-gray-200/70">
                      <Calendar className="h-3 w-3" />
                      {formatTanggal(h.tanggal)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
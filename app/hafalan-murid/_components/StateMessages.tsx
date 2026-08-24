"use client";

import { motion } from "framer-motion";
import { BookOpen, Loader2 } from "lucide-react";

export function LoadingState() {
  return (
    <div className="py-20 text-center text-gray-400 bg-white/80 rounded-3xl border border-gray-100">
      <div className="flex items-center justify-center gap-2">
        <Loader2 className="h-5 w-5 animate-spin text-[#152e28]" />
        <span className="text-xs sm:text-sm font-medium">
          Memuat data hafalan santri...
        </span>
      </div>
    </div>
  );
}

export function EmptyState({ search }: { search: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="col-span-full text-center py-16 rounded-3xl border border-dashed border-slate-200 bg-white"
    >
      <BookOpen className="h-9 w-9 text-slate-300 mx-auto mb-3" />
      <p className="text-slate-500 font-medium text-sm">
        {search
          ? `Nama santri "${search}" tidak ditemukan.`
          : "Belum ada data santri."}
      </p>
    </motion.div>
  );
}
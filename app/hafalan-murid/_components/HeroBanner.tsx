"use client";

import { motion } from "framer-motion";
import { BookMarked } from "lucide-react";

export default function HeroBanner() {
  return (
    <section className="bg-[#152e28] text-white py-12 md:py-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-12 -mr-12 h-96 w-96 rounded-full bg-[#c1663c]/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-300 border border-white/10 mb-4 shadow-sm">
            <BookMarked className="h-3.5 w-3.5 text-[#c1663c]" />
            Rekam Jejak Hafalan Santri
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl leading-tight">
            Catatan Hafalan Santri
          </h1>
          <p className="mt-3 text-xs sm:text-sm md:text-base text-emerald-100/80 leading-relaxed">
            Pantau progres setoran hafalan santri Pengajian Al-Inayah secara
            rinci dan diperbarui langsung dari data majelis.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
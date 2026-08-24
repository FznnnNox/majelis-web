"use client";

import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";

export default function HeroBanner() {
  return (
    <section className="bg-[#152e28] text-white py-12 md:py-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-12 -mr-12 h-96 w-96 rounded-full bg-[#e76f3c]/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-300 border border-white/10 mb-4 shadow-xs">
            <CalendarDays className="h-3.5 w-3.5 text-[#e76f3c]" />
            <span>Jadwal Piket Santri</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white sm:text-4xl md:text-5xl leading-tight">
            Tanggung Jawab & Kebersihan Majelis
          </h1>
          <p className="mt-3 text-xs sm:text-sm md:text-base text-emerald-100/80 leading-relaxed">
            Pembagian tugas piket harian santri Majelis Al-Inayah demi
            menjaga kenyamanan bersama dalam menuntut ilmu.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
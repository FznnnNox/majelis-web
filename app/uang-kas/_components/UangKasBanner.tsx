"use client";

import { motion } from "framer-motion";
import { Wallet } from "lucide-react";

export default function UangKasBanner() {
  return (
    <section className="relative overflow-hidden bg-[#152e28] text-white py-12 md:py-16">
      <div className="pointer-events-none absolute top-0 right-0 -mt-12 -mr-12 h-96 w-96 rounded-full bg-[#e76f3c]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-300 ring-1 ring-inset ring-white/10 mb-4 shadow-sm">
            <Wallet className="h-3.5 w-3.5 text-[#e76f3c]" />
            Transparansi keuangan
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl leading-tight">
            Laporan uang kas majelis
          </h1>
          <p className="mt-3 text-sm text-emerald-100/70 md:text-base leading-relaxed">
            Pencatatan pemasukan dan pengeluaran kas Majelis Al-Inayah secara
            terbuka demi menjaga amanah bersama.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
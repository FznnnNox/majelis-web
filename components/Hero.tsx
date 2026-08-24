"use client";

import { motion } from "framer-motion";
import { Play, ArrowRight, Calendar, Users, BookOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section className="bg-[#152e28] text-white pt-24 pb-12 sm:pt-32 sm:pb-16 md:pt-36 md:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7 lg:col-span-8">
            <motion.h1
              initial="hidden"
              animate="show"
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-2xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
            >
              Majelis Taklim Al-Inayah Kampung Panggang
            </motion.h1>
          </div>

          <div className="flex flex-col justify-between md:col-span-5 lg:col-span-4">
            <motion.p
              initial="hidden"
              animate="show"
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              className="text-xs sm:text-sm leading-relaxed text-gray-300 md:text-base"
            >
              Majelis Al Inayah hadir sebagai wadah belajar Al-Qur'an,
              pembentukan akhlak, dan penanaman nilai-nilai Islam sejak dini
              bagi anak-anak di Kampung Panggang.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              className="mt-6 flex flex-wrap items-center gap-4 sm:gap-6"
            >
              <Link
                href="/jadwal-piket"
                className="flex items-center gap-2 rounded-xl bg-[#e76f3c] px-5 py-2.5 text-xs sm:text-sm font-medium text-white transition-all hover:bg-[#d55e2c] active:scale-95 shadow-lg shadow-[#e76f3c]/20"
              >
                Lihat Jadwal
                <ArrowRight className="h-4 w-4" />
              </Link>

              <button
                type="button"
                className="flex items-center gap-2 text-xs sm:text-sm font-medium text-white transition-opacity hover:opacity-80 active:scale-95"
              >
                <span>Tonton video</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/40 bg-white/5 backdrop-blur-xs">
                  <Play className="h-3 w-3 fill-current ml-0.5 text-amber-300" />
                </span>
              </button>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="relative z-20 mt-8 sm:mt-12 overflow-hidden rounded-2xl shadow-2xl -mb-20 sm:-mb-32 md:-mb-44 border border-white/10"
        >
          <div className="relative h-[340px] sm:h-[420px] md:h-[500px] w-full">
            <Image
              src="/assets/bg.jpg"
              alt="Kegiatan Pengajian Al Inayah"
              fill
              priority
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

            <div className="absolute top-3 left-3 sm:top-6 sm:left-6 flex items-center gap-2.5 sm:gap-3 rounded-xl bg-black/50 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-2.5 border border-white/20 text-white shadow-lg">
              <div className="flex h-7 w-7 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg bg-[#e76f3c]">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="text-left">
                <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-amber-300 font-semibold">
                  Jadwal Rutin
                </p>
                <p className="text-[11px] sm:text-sm font-medium leading-tight">
                  Senin – Minggu{" "}
                  <span className="text-rose-300 font-normal block sm:inline">
                    (Jumat Libur)
                  </span>
                </p>
              </div>
            </div>

            <div className="absolute top-3 right-3 sm:top-6 sm:right-6 flex items-center gap-2 rounded-xl bg-black/50 backdrop-blur-md px-3 py-2 sm:px-3.5 sm:py-2 border border-white/20 text-white shadow-lg">
              <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400 shrink-0" />
              <span className="text-[11px] sm:text-xs font-medium">
                150+ Jemaah
              </span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 sm:left-6 sm:right-auto max-w-sm md:max-w-md rounded-xl sm:rounded-2xl bg-black/60 backdrop-blur-md p-3.5 sm:p-5 border border-white/15 text-left shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-[#e76f3c] to-amber-400" />

              <div className="flex items-center gap-2 mb-1.5 sm:mb-2 text-amber-300">
                <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-md bg-[#e76f3c]/20 border border-[#e76f3c]/30">
                  <BookOpen className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-300" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase">
                  Mutiara Hadits
                </span>
              </div>

              <p className="text-[11px] sm:text-xs md:text-sm italic font-normal text-gray-100 leading-relaxed pl-1">
                &ldquo;Barangsiapa menelusuri jalan untuk mencari ilmu, Allah
                akan mudahkan baginya jalan menuju surga.&rdquo;
              </p>

              <div className="mt-2 flex items-center gap-2 pl-1 pt-1.5 border-t border-white/10">
                <span className="h-1.5 w-1.5 rounded-full bg-[#e76f3c]" />
                <p className="text-[10px] sm:text-[11px] font-medium text-gray-300">
                  HR. Muslim
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

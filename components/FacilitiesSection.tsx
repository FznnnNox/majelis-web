"use client";

import { motion } from "framer-motion";
import {
  Wifi,
  BookOpenCheck,
  Armchair,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

const facilities = [
  {
    icon: Armchair,
    title: "Ruang belajar ber-AC",
    description:
      "Ruangan yang bersih, sejuk, dan nyaman agar santri dapat fokus belajar dan mengaji.",
  },
  {
    icon: BookOpenCheck,
    title: "Perpustakaan kitab dan buku",
    description:
      "Koleksi Al-Qur'an, buku tajwid, kitab kuning, serta buku bacaan Islami ramah anak.",
  },
  {
    icon: ShieldCheck,
    title: "Lingkungan aman dan ramah anak",
    description:
      "Area majelis terpantau dan aman bagi tumbuh kembang serta pembentukan akhlak santri.",
  },
  {
    icon: Wifi,
    title: "Sarana pembelajaran digital",
    description:
      "Dilengkapi media proyektor dan akses internet untuk materi edukasi Islami interaktif.",
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function FacilitiesSection() {
  return (
    <section className="bg-[#f8faf9] py-12 sm:py-20 md:py-28 border-y border-gray-100 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-[#152e28]/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#152e28] ring-1 ring-inset ring-[#152e28]/10 mb-3 sm:mb-4">
            <Sparkles className="h-3.5 w-3.5 text-[#e76f3c]" />
            <span>Sarana dan Prasarana</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Fasilitas Majelis Al-Inayah
          </h2>
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-base text-gray-600 leading-relaxed">
            Dukungan sarana terbaik untuk menunjang kenyamanan santri dan jamaah dalam menuntut ilmu.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
          className="mt-10 sm:mt-14 grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {facilities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                variants={fadeUp}
                transition={{ duration: 0.5, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col rounded-2xl bg-white p-5 sm:p-6 ring-1 ring-gray-900/5 transition-all duration-300 hover:shadow-xl hover:shadow-gray-900/5"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e76f3c]/10 text-[#e76f3c] transition-colors duration-300 group-hover:bg-[#e76f3c] group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 sm:mt-5 text-base sm:text-lg font-bold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
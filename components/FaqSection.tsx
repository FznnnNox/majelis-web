"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Bagaimana cara mendaftarkan anak menjadi santri di Majelis Al-Inayah?",
    answer: "Pendaftaran dapat dilakukan secara langsung dengan datang ke Majelis Al-Inayah pada jam kegiatan, atau menghubungi pengurus melalui tombol kontak WhatsApp di situs ini.",
  },
  {
    question: "Berapa biaya pendaftaran dan iuran bulanan mengaji?",
    answer: "Pendaftaran gratis. Biaya operasional dan pengajaran dikelola secara sukarela/infaq untuk memastikan akses pendidikan agama terbuka bagi seluruh anak di Kampung Panggang.",
  },
  {
    question: "Hari dan jam berapa saja jadwal pengajian dilaksanakan?",
    answer: "Pengajian santri anak-anak dilaksanakan setiap hari Senin hingga Jumat (Ba'da Maghrib - Isya). Sedangkan pengajian umum/dewasa dilaksanakan secara berkala.",
  },
  {
    question: "Apakah menerima santri yang belum bisa membaca Hijaiyah sama sekali?",
    answer: "Ya, kami menerima santri dari tingkat dasar (Iqra 1) hingga tingkat pembacaan Al-Qur'an dan hafalan juz amma.",
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="bg-white py-12 sm:py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-[#152e28]/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#152e28] ring-1 ring-inset ring-[#152e28]/10 mb-3 sm:mb-4">
            <HelpCircle className="h-3.5 w-3.5 text-[#e76f3c]" />
            <span>Paling Sering Ditanyakan</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Pertanyaan Umum (FAQ)
          </h2>
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Informasi ringkas seputar pendaftaran, jadwal, dan kegiatan Majelis Al-Inayah.
          </p>
        </motion.div>

        <div className="mt-10 sm:mt-14 space-y-3.5 sm:space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-[#152e28] bg-[#f8faf9] shadow-md shadow-[#152e28]/5"
                    : "border-gray-200/80 bg-white hover:border-gray-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="flex w-full items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-bold text-gray-900"
                >
                  <span className="pr-4">{faq.question}</span>
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${
                      isOpen
                        ? "rotate-180 bg-[#152e28] text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-xs sm:text-sm leading-relaxed text-gray-600 border-t border-gray-100">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
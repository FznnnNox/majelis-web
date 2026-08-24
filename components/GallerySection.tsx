// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import { Camera, ArrowUpRight, Sparkles } from "lucide-react";

// interface GalleryItem {
//   id: number;
//   title: string;
//   category: "rutin" | "event" | "santri";
//   image: string;
//   date: string;
// }

// const galleryData: GalleryItem[] = [
//   {
//     id: 1,
//     title: "Pengajian Rutin dan Tadarus Al-Qur'an Santri",
//     category: "rutin",
//     image: "",
//     date: "Setiap hari",
//   },
//   {
//     id: 2,
//     title: "Peringatan Maulid Nabi Muhammad SAW",
//     category: "event",
//     image: "",
//     date: "12 Rabiul Awal",
//   },
//   {
//     id: 3,
//     title: "Lomba Setoran Hafalan Surah Pendek",
//     category: "santri",
//     image: "",
//     date: "Bulan lalu",
//   },
//   {
//     id: 4,
//     title: "Kegiatan Belajar Adab dan Doa Harian",
//     category: "santri",
//     image: "",
//     date: "Pekan lalu",
//   },
//   {
//     id: 5,
//     title: "Buka Puasa Bersama dan Santunan Dhuafa",
//     category: "event",
//     image: "",
//     date: "Ramadhan",
//   },
// ];

// const categoryLabel: Record<GalleryItem["category"], string> = {
//   rutin: "Pengajian rutin",
//   santri: "Kegiatan santri",
//   event: "Event peringatan",
// };

// const filters = [
//   { id: "all", label: "Semua" },
//   { id: "rutin", label: "Pengajian rutin" },
//   { id: "santri", label: "Kegiatan santri" },
//   { id: "event", label: "Event / acara" },
// ];

// export default function GallerySection() {
//   const [activeFilter, setActiveFilter] = useState<string>("all");

//   const filteredData =
//     activeFilter === "all"
//       ? galleryData
//       : galleryData.filter((item) => item.category === activeFilter);

//   return (
//     <section className="bg-white py-12 sm:py-20 md:py-28 overflow-hidden">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
//         <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
//           <motion.div
//             initial={{ opacity: 0, y: 16 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, ease: "easeOut" }}
//             className="max-w-xl text-center md:text-left"
//           >
//             <div className="inline-flex items-center gap-2 rounded-full bg-[#152e28]/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#152e28] ring-1 ring-inset ring-[#152e28]/10 mb-3 sm:mb-4">
//               <Camera className="h-3.5 w-3.5 text-[#e76f3c]" />
//               <span>Dokumentasi</span>
//             </div>
//             <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
//               Galeri Kegiatan Majelis
//             </h2>
//             <p className="mt-2.5 sm:mt-3 text-xs sm:text-base text-gray-600 leading-relaxed">
//               Momen kebersamaan, belajar Al-Qur'an, dan berbagai kegiatan syiar Islam santri Majelis Al-Inayah Kampung Panggang.
//             </p>
//           </motion.div>

//           <div className="relative flex flex-wrap justify-center gap-1 rounded-full bg-gray-100 p-1">
//             {filters.map((tab) => (
//               <button
//                 key={tab.id}
//                 type="button"
//                 onClick={() => setActiveFilter(tab.id)}
//                 className="relative rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold transition-colors duration-200"
//               >
//                 {activeFilter === tab.id && (
//                   <motion.span
//                     layoutId="active-filter-pill"
//                     transition={{ type: "spring", stiffness: 400, damping: 32 }}
//                     className="absolute inset-0 rounded-full bg-[#152e28] shadow-xs"
//                   />
//                 )}
//                 <span
//                   className={`relative z-10 ${
//                     activeFilter === tab.id
//                       ? "text-white"
//                       : "text-gray-500 hover:text-gray-900"
//                   }`}
//                 >
//                   {tab.label}
//                 </span>
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="mt-10 sm:mt-12 grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[240px] sm:auto-rows-[260px]">
//           <AnimatePresence mode="popLayout">
//             {filteredData.map((item, idx) => {
//               const isFeatured = idx === 0 && activeFilter === "all";
//               const isWide = idx === 3 && activeFilter === "all";

//               return (
//                 <motion.div
//                   key={item.id}
//                   layout
//                   initial={{ opacity: 0, scale: 0.96 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.96 }}
//                   transition={{ duration: 0.35, ease: "easeOut" }}
//                   className={`group relative overflow-hidden rounded-2xl bg-gray-200 ring-1 ring-gray-900/5 transition-shadow duration-300 hover:shadow-xl ${
//                     isFeatured
//                       ? "sm:col-span-2 sm:row-span-2"
//                       : isWide
//                       ? "sm:col-span-2"
//                       : "col-span-1"
//                   }`}
//                 >
//                   {item.image ? (
//                     <Image
//                       src={item.image}
//                       alt={item.title}
//                       fill
//                       priority
//                       className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
//                     />
//                   ) : (
//                     <div className="absolute inset-0 bg-emerald-950/20" />
//                   )}

//                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

//                   <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-md px-3 py-1 sm:py-1.5 ring-1 ring-white/20 text-white text-[10px] sm:text-[11px] font-medium">
//                     <Sparkles className="h-3 w-3 text-amber-300" />
//                     <span>{item.date}</span>
//                   </div>

//                   <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-black/40 backdrop-blur-md ring-1 ring-white/20 text-white opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
//                     <ArrowUpRight className="h-4 w-4" />
//                   </div>

//                   <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
//                     <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
//                       {categoryLabel[item.category]}
//                     </span>
//                     <h3
//                       className={`mt-1 font-semibold leading-snug text-white line-clamp-2 ${
//                         isFeatured
//                           ? "text-lg sm:text-2xl md:text-3xl"
//                           : "text-sm sm:text-lg"
//                       }`}
//                     >
//                       {item.title}
//                     </h3>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </AnimatePresence>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Camera, ArrowUpRight, Sparkles, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  date: string;
}

const supabase = createClient();

const categoryLabel: Record<string, string> = {
  rutin: "Pengajian rutin",
  santri: "Kegiatan santri",
  event: "Event / acara",
};

const filters = [
  { id: "all", label: "Semua" },
  { id: "rutin", label: "Pengajian rutin" },
  { id: "santri", label: "Kegiatan santri" },
  { id: "event", label: "Event / acara" },
];

export default function GallerySection() {
  const [galleryData, setGalleryData] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const fetchGallery = useCallback(async () => {
    setIsLoading(true);
    try {
      // Fetch dari tabel galeri_kegiatan
      const { data, error } = await supabase
        .from("galeri_kegiatan")
        .select("id, judul, kategori, gambar, tanggal")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const formattedData: GalleryItem[] = (data || []).map((item) => {
        let formattedDate = item.tanggal || "";
        if (item.tanggal) {
          const parsed = new Date(item.tanggal);
          if (!isNaN(parsed.getTime())) {
            formattedDate = parsed.toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });
          }
        }

        return {
          id: item.id,
          title: item.judul || "Dokumentasi Kegiatan",
          category: item.kategori || "rutin",
          image: item.gambar || "",
          date: formattedDate,
        };
      });

      setGalleryData(formattedData);
    } catch (err) {
      console.error("Error fetching gallery:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  const filteredData =
    activeFilter === "all"
      ? galleryData
      : galleryData.filter((item) => item.category === activeFilter);

  return (
    <section className="bg-white py-12 sm:py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-xl text-center md:text-left"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-[#152e28]/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#152e28] ring-1 ring-inset ring-[#152e28]/10 mb-3 sm:mb-4">
              <Camera className="h-3.5 w-3.5 text-[#e76f3c]" />
              <span>Dokumentasi</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              Galeri Kegiatan Majelis
            </h2>
            <p className="mt-2.5 sm:mt-3 text-xs sm:text-base text-gray-600 leading-relaxed">
              Momen kebersamaan, belajar Al-Qur&apos;an, dan berbagai kegiatan syiar Islam santri Majelis Al-Inayah Kampung Panggang.
            </p>
          </motion.div>

          <div className="relative flex flex-wrap justify-center gap-1 rounded-full bg-gray-100 p-1">
            {filters.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className="relative rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold transition-colors duration-200"
              >
                {activeFilter === tab.id && (
                  <motion.span
                    layoutId="active-filter-pill"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-[#152e28] shadow-xs"
                  />
                )}
                <span
                  className={`relative z-10 ${
                    activeFilter === tab.id
                      ? "text-white"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* State Loading */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <Loader2 className="h-8 w-8 animate-spin text-[#e76f3c]" />
            <p className="mt-3 text-sm font-medium">Memuat galeri kegiatan...</p>
          </div>
        ) : filteredData.length === 0 ? (
          /* State Kosong */
          <div className="mt-10 text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <p className="text-sm font-medium text-slate-500">
              Belum ada foto galeri untuk kategori ini.
            </p>
          </div>
        ) : (
          /* Grid Bento Galeri */
          <div className="mt-10 sm:mt-12 grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[240px] sm:auto-rows-[260px]">
            <AnimatePresence mode="popLayout">
              {filteredData.map((item, idx) => {
                const isFeatured = idx === 0 && activeFilter === "all";
                const isWide = idx === 3 && activeFilter === "all";

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className={`group relative overflow-hidden rounded-2xl bg-gray-200 ring-1 ring-gray-900/5 transition-shadow duration-300 hover:shadow-xl ${
                      isFeatured
                        ? "sm:col-span-2 sm:row-span-2"
                        : isWide
                        ? "sm:col-span-2"
                        : "col-span-1"
                    }`}
                  >
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        priority
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-emerald-950/20" />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {item.date && (
                      <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-md px-3 py-1 sm:py-1.5 ring-1 ring-white/20 text-white text-[10px] sm:text-[11px] font-medium">
                        <Sparkles className="h-3 w-3 text-amber-300" />
                        <span>{item.date}</span>
                      </div>
                    )}

                    <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-black/40 backdrop-blur-md ring-1 ring-white/20 text-white opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                        {categoryLabel[item.category] || item.category}
                      </span>
                      <h3
                        className={`mt-1 font-semibold leading-snug text-white line-clamp-2 ${
                          isFeatured
                            ? "text-lg sm:text-2xl md:text-3xl"
                            : "text-sm sm:text-lg"
                        }`}
                      >
                        {item.title}
                      </h3>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
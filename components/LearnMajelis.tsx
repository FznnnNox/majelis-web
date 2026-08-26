// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Play, X, BookOpen, Sparkles } from "lucide-react";

// export default function LearnMajelis() {
//   const [isPlaying, setIsPlaying] = useState(false);

//   return (
//     <section className="bg-white py-12 sm:py-20 md:py-28 overflow-hidden">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
//         <div className="relative rounded-2xl sm:rounded-3xl bg-[#e8f5ef] px-5 py-8 sm:p-10 lg:px-14 lg:py-16">
//           <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            
//             <div className="relative lg:col-span-6 lg:-mt-24 xl:-mt-32">
//               <div className="relative h-[260px] sm:h-[360px] lg:h-[440px] w-full overflow-hidden rounded-2xl shadow-xl border-2 border-white">
//                 <Image
//                   src="/assets/watch.jpg"
//                   alt="Kegiatan Belajar Santri Majelis Al-Inayah"
//                   fill
//                   priority
//                   className="object-cover"
//                 />

//                 <div className="absolute inset-0 bg-black/20" />

//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <button
//                     type="button"
//                     onClick={() => setIsPlaying(true)}
//                     aria-label="Tonton Video Pembelajaran"
//                     className="group relative flex h-14 w-14 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-[#f5811f] text-white transition-all duration-300 hover:scale-110 hover:bg-[#e0730f] active:scale-95 shadow-lg shadow-[#f5811f]/30"
//                   >
//                     <span className="absolute -inset-2 rounded-full bg-[#f5811f]/30 animate-ping" />
//                     <Play className="h-6 w-6 fill-current ml-1 sm:h-8 sm:w-8 relative z-10" />
//                   </button>
//                 </div>

//                 <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 rounded-xl bg-black/60 backdrop-blur-md p-3 border border-white/20 text-white">
//                   <div className="flex items-center gap-2">
//                     <Sparkles className="h-4 w-4 text-amber-300 shrink-0" />
//                     <p className="text-[11px] sm:text-xs font-medium">
//                       Pembinaan Akhlak & Al-Qur'an Anak Usia Dini
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex flex-col items-start lg:col-span-6">
//               <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/80 px-3 py-1 sm:px-3.5 sm:py-1.5 text-[11px] sm:text-xs font-semibold text-emerald-900 mb-3 sm:mb-4">
//                 <BookOpen className="h-3.5 w-3.5 text-emerald-700 shrink-0" />
//                 <span>Program Pendidikan Santri</span>
//               </div>

//               <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl leading-snug">
//                 Mengenal Lebih Dalam Pembelajaran Agama di Majelis Al-Inayah
//               </h2>

//               <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base leading-relaxed text-gray-600">
//                 Di Majelis Taklim Al-Inayah Kampung Panggang, santri-santri diajarkan pemahaman dasar agama Islam secara sistematis dan menyenangkan. Pembelajaran mencakup baca-tulis Al-Qur'an, tajwid, tata cara ibadah fardhu, hafalan surah pendek, hingga penanaman akhlakul karimah sejak dini.
//               </p>

//               <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base leading-relaxed text-gray-600">
//                 Dengan pendekatan yang interaktif, hangat, dan ramah anak, kami menghadirkan lingkungan belajar yang nyaman agar setiap santri dapat tumbuh menjadi generasi muda yang taat beragama dan berkarakter mulia.
//               </p>

//               <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-4">
//                 <Link
//                   href="/fasilitas"
//                   className="inline-flex items-center justify-center rounded-xl bg-[#f5811f] px-6 py-3 text-xs sm:text-sm font-semibold text-white transition-all duration-200 hover:bg-[#e0730f] active:scale-95 shadow-md shadow-[#f5811f]/20"
//                 >
//                   Pelajari Program & Fasilitas
//                 </Link>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>

//       {isPlaying && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
//           <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-black aspect-video shadow-2xl">
//             <button
//               type="button"
//               onClick={() => setIsPlaying(false)}
//               className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all hover:bg-white/40"
//               aria-label="Tutup Video"
//             >
//               <X className="h-5 w-5" />
//             </button>
//             <iframe
//               className="h-full w-full"
//               src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
//               title="Video Pembelajaran Majelis Al-Inayah"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             />
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }   


"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, X, BookOpen, Sparkles } from "lucide-react";

export default function LearnMajelis() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="bg-white py-12 sm:py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="relative rounded-2xl sm:rounded-3xl bg-[#e8f5ef] px-5 py-8 sm:p-10 lg:px-14 lg:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            
            {/* Thumbnail Image Section */}
            <div className="relative lg:col-span-6 lg:-mt-24 xl:-mt-32">
              <div className="relative h-[260px] sm:h-[360px] lg:h-[440px] w-full overflow-hidden rounded-2xl shadow-xl border-2 border-white">
                <Image
                  src="/assets/watch.jpeg"
                  alt="Kegiatan Belajar Santri Majelis Al-Inayah"
                  fill
                  priority
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-black/20" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(true)}
                    aria-label="Tonton Video Pembelajaran"
                    className="group relative flex h-14 w-14 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-[#f5811f] text-white transition-all duration-300 hover:scale-110 hover:bg-[#e0730f] active:scale-95 shadow-lg shadow-[#f5811f]/30"
                  >
                    <span className="absolute -inset-2 rounded-full bg-[#f5811f]/30 animate-ping" />
                    <Play className="h-6 w-6 fill-current ml-1 sm:h-8 sm:w-8 relative z-10" />
                  </button>
                </div>

                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 rounded-xl bg-black/60 backdrop-blur-md p-3 border border-white/20 text-white">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-amber-300 shrink-0" />
                    <p className="text-[11px] sm:text-xs font-medium">
                      Pembinaan Akhlak & Al-Qur'an Anak Usia Dini
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Content Section */}
            <div className="flex flex-col items-start lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/80 px-3 py-1 sm:px-3.5 sm:py-1.5 text-[11px] sm:text-xs font-semibold text-emerald-900 mb-3 sm:mb-4">
                <BookOpen className="h-3.5 w-3.5 text-emerald-700 shrink-0" />
                <span>Program Pendidikan Santri</span>
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl leading-snug">
                Mengenal Lebih Dalam Pembelajaran Agama di Majelis Al-Inayah
              </h2>

              <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base leading-relaxed text-gray-600">
                Di Majelis Taklim Al-Inayah Kampung Panggang, santri-santri diajarkan pemahaman dasar agama Islam secara sistematis dan menyenangkan. Pembelajaran mencakup baca-tulis Al-Qur'an, tajwid, tata cara ibadah fardhu, hafalan surah pendek, hingga penanaman akhlakul karimah sejak dini.
              </p>

              <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base leading-relaxed text-gray-600">
                Dengan pendekatan yang interaktif, hangat, dan ramah anak, kami menghadirkan lingkungan belajar yang nyaman agar setiap santri dapat tumbuh menjadi generasi muda yang taat beragama dan berkarakter mulia.
              </p>

              <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/fasilitas"
                  className="inline-flex items-center justify-center rounded-xl bg-[#f5811f] px-6 py-3 text-xs sm:text-sm font-semibold text-white transition-all duration-200 hover:bg-[#e0730f] active:scale-95 shadow-md shadow-[#f5811f]/20"
                >
                  Pelajari Program & Fasilitas
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Video Modal Player (Perbaikan untuk MP4 Lokal) */}
      {isPlaying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-black aspect-video shadow-2xl">
            <button
              type="button"
              onClick={() => setIsPlaying(false)}
              className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all hover:bg-white/40"
              aria-label="Tutup Video"
            >
              <X className="h-5 w-5" />
            </button>
            <video
              className="h-full w-full object-contain"
              src="/welcome.mp4"
              controls
              autoPlay
            />
          </div>
        </div>
      )}
    </section>
  );
}
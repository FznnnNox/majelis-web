"use client";

import Image from "next/image";
import { Quote, HeartHandshake, Award } from "lucide-react";

export default function WelcomeSection() {
  return (
    <section className="bg-white py-12 sm:py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          <div className="relative lg:col-span-5 flex justify-center">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#152e28]/20 to-[#e76f3c]/20 blur-2xl opacity-70" />

            <div className="relative w-full max-w-md">
              <div className="relative h-[380px] sm:h-[460px] w-full overflow-hidden rounded-3xl shadow-2xl border-4 border-white">
                <Image
                  src="/assets/uzan-porto.png"
                  alt="Ustadz / Guru Ngaji Majelis Al-Inayah"
                  fill
                  priority
                  className="object-cover object-top transition-transform duration-500 hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-amber-300">
                    Pengasuh Majelis
                  </p>
                  <h3 className="text-lg sm:text-xl font-bold">
                    Ustadz Maruf Hasan
                  </h3>
                </div>
              </div>

              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 flex items-center gap-2.5 sm:gap-3 rounded-2xl bg-white/95 backdrop-blur-md p-3 sm:p-3.5 shadow-xl border border-gray-100">
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-[#e76f3c]/10 text-[#e76f3c] shrink-0">
                  <Award className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-500 font-medium">Dedikasi</p>
                  <p className="text-xs sm:text-sm font-bold text-gray-900">10+ Tahun Mengajar</p>
                </div>
              </div>

              <div className="absolute -bottom-10 -left-3 sm:-bottom-10 sm:-left-4 flex items-center gap-3 rounded-2xl bg-[#152e28] p-3.5 sm:p-4 text-white shadow-xl border border-white/10 max-w-[200px] sm:max-w-[240px]">
                <HeartHandshake className="h-6 w-6 sm:h-8 sm:w-8 text-amber-300 shrink-0" />
                <p className="text-[10px] sm:text-[11px] leading-snug text-emerald-100 font-medium">
                  Mendidik dengan hati untuk generasi Qur'ani.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start lg:col-span-7 lg:pl-6 mt-6 lg:mt-0">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#152e28]/5 px-3.5 py-1.5 border border-[#152e28]/10 text-[#152e28] text-xs font-semibold uppercase tracking-wider mb-3 sm:mb-4">
              <Quote className="h-3.5 w-3.5 text-[#e76f3c]" />
              <span>Sambutan Pengasuh</span>
            </div>

            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl leading-[1.18]">
              Membimbing Generasi Muda Kampung Panggang Mencintai Al-Qur'an
            </h2>

            <div className="mt-5 sm:mt-6 relative pl-4 sm:pl-5 border-l-4 border-[#e76f3c]">
              <p className="text-xs sm:text-base font-medium italic text-gray-800 leading-relaxed">
                &ldquo;Assalamu’alaikum Warahmatullahi Wabarakatuh. Selamat datang di Majelis Taklim Al-Inayah. Kami berkomitmen mendampingi putra-putri Bapak/Ibu dalam mempelajari Al-Qur'an, tata cara ibadah, serta membina akhlakul karimah sejak dini.&rdquo;
              </p>
            </div>

            <p className="mt-4 text-xs sm:text-sm md:text-base leading-relaxed text-gray-600">
              Belajar agama bukan sekadar menghafal bacaan, melainkan menanamkan nilai-nilai kebaikan, adab, dan rasa cinta kepada Allah SWT dalam kehidupan sehari-hari. Kami menyambut dengan hangat seluruh santri dan warga yang ingin bersama-sama memakmurkan majelis ini.
            </p>

            <div className="mt-8 pt-6 border-t border-gray-100 w-full flex items-center justify-between">
              <div>
                <h4 className="text-sm sm:text-base font-bold text-gray-900">
                  Pengasuh Majelis Taklim
                </h4>
                <p className="text-xs text-gray-500 font-medium">
                  Majelis Al-Inayah Kampung Panggang
                </p>
              </div>

              <div className="text-right">
                <span className="font-serif italic text-xl sm:text-2xl font-bold text-[#152e28]/30 select-none">
                  Al-Inayah
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
"use client";

import Image from "next/image";

export default function BannerVisual() {
  return (
    <div className="lg:col-span-5 relative flex flex-col justify-between min-h-[300px] lg:min-h-full rounded-2xl overflow-hidden group">
      <Image
        src="/assets/bg.jpg"
        alt="Infaq Donasi Majelis"
        fill
        priority
        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#152e28]/90 via-[#152e28]/30 to-transparent" />

      <div className="relative z-10 p-6 mt-auto text-white space-y-2">
        <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300">
          Majelis Al-Inayah
        </span>
        <p className="text-xs sm:text-sm font-semibold text-emerald-50 leading-relaxed">
          "Sedekah tidak akan mengurangi harta, melainkan menambah
          keberkahan."
        </p>
      </div>
    </div>
  );
}
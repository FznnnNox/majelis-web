// "use client";

// import { useEffect, useMemo, useState } from "react";
// import {
//   Sunrise,
//   Sun,
//   SunMedium,
//   Sunset,
//   Moon,
//   Clock,
//   MapPin,
//   BookOpen,
//   ChevronDown,
//   Loader2,
//   AlertCircle,
// } from "lucide-react";

// // ================================
// // Konfigurasi lokasi & API
// // ================================
// const CITY = "Serang";
// const COUNTRY = "Indonesia";
// const METHOD = 20; // Kementerian Agama Republik Indonesia
// const LOCATION_LABEL = "Kp. Panggang, Serang";

// // Selisih menit azan -> iqamah per waktu sholat (silakan sesuaikan)
// const IQAMAH_OFFSET_MIN: Record<string, number> = {
//   Subuh: 12,
//   Dzuhur: 10,
//   Ashar: 10,
//   Maghrib: 10,
//   Isya: 10,
// };

// const PRAYER_META = [
//   { key: "Fajr", name: "Subuh", icon: Sunrise },
//   { key: "Dhuhr", name: "Dzuhur", icon: Sun },
//   { key: "Asr", name: "Ashar", icon: SunMedium },
//   { key: "Maghrib", name: "Maghrib", icon: Sunset },
//   { key: "Isha", name: "Isya", icon: Moon },
// ] as const;

// interface PrayerItem {
//   name: string;
//   azan: string; // "HH:mm WIB"
//   iqamah: string; // "HH:mm WIB"
//   icon: typeof Sunrise;
//   isNext: boolean;
//   azanMinutes: number; // menit sejak 00:00, untuk hitung "next"
// }

// interface AladhanResponse {
//   code: number;
//   data: {
//     timings: Record<string, string>;
//     date: {
//       readable: string;
//       gregorian: { date: string };
//     };
//   };
// }

// // Ubah "04:38" atau "04:38 (WIB)" -> { hh, mm, minutes, label }
// function parseTime(raw: string) {
//   const clean = raw.split(" ")[0]; // buang suffix zona waktu kalau ada
//   const [hh, mm] = clean.split(":").map(Number);
//   return {
//     minutes: hh * 60 + mm,
//     label: `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")} WIB`,
//   };
// }

// function addMinutesLabel(baseMinutes: number, addMin: number) {
//   const total = (baseMinutes + addMin + 24 * 60) % (24 * 60);
//   const hh = Math.floor(total / 60);
//   const mm = total % 60;
//   return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")} WIB`;
// }

// export default function PrayerTime() {
//   const [prayerTimes, setPrayerTimes] = useState<PrayerItem[]>([]);
//   const [hijriDate, setHijriDate] = useState<string>("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     let isMounted = true;

//     async function fetchPrayerTimes() {
//       try {
//         setLoading(true);
//         setError(null);

//         const url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(
//           CITY
//         )}&country=${encodeURIComponent(COUNTRY)}&method=${METHOD}`;

//         const res = await fetch(url);
//         if (!res.ok) throw new Error("Gagal mengambil jadwal sholat");

//         const json: AladhanResponse = await res.json();
//         if (json.code !== 200) throw new Error("Data jadwal sholat tidak valid");

//         const now = new Date();
//         const nowMinutes = now.getHours() * 60 + now.getMinutes();

//         // Susun 5 waktu sholat fardhu
//         const items: PrayerItem[] = PRAYER_META.map(({ key, name, icon }) => {
//           const azanRaw = json.data.timings[key];
//           const { minutes, label } = parseTime(azanRaw);
//           const iqamahLabel = addMinutesLabel(
//             minutes,
//             IQAMAH_OFFSET_MIN[name] ?? 10
//           );

//           return {
//             name,
//             azan: label,
//             iqamah: iqamahLabel,
//             icon,
//             isNext: false,
//             azanMinutes: minutes,
//           };
//         });

//         // Tentukan waktu sholat berikutnya (yang azannya belum lewat)
//         let nextIndex = items.findIndex((i) => i.azanMinutes > nowMinutes);
//         if (nextIndex === -1) nextIndex = 0; // semua sudah lewat -> Subuh besok

//         const finalItems = items.map((item, idx) => ({
//           ...item,
//           isNext: idx === nextIndex,
//         }));

//         if (isMounted) {
//           setPrayerTimes(finalItems);
//           setHijriDate(json.data.date.readable);
//         }
//       } catch (err) {
//         console.error(err);
//         if (isMounted) {
//           setError("Gagal memuat jadwal sholat. Coba muat ulang halaman.");
//         }
//       } finally {
//         if (isMounted) setLoading(false);
//       }
//     }

//     fetchPrayerTimes();

//     // Refresh otomatis tiap hari (tengah malam) — opsional
//     const interval = setInterval(fetchPrayerTimes, 1000 * 60 * 60); // tiap 1 jam re-check "next"
//     return () => {
//       isMounted = false;
//       clearInterval(interval);
//     };
//   }, []);

//   return (
//     <section className="bg-gray-50/60 py-12 sm:py-16 md:py-24 border-t border-gray-100 overflow-hidden">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
//         <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end mb-8 sm:mb-10">
//           <div>
//             <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#e76f3c]">
//               Jadwal Sholat Fardhu
//             </span>
//             <h2 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
//               Waktu Sholat Hari Ini
//             </h2>
//             {hijriDate && (
//               <p className="mt-1 text-xs text-gray-500">{hijriDate} H</p>
//             )}
//           </div>

//           <div className="relative w-full sm:w-auto">
//             <div className="inline-flex w-full sm:w-auto items-center justify-between gap-2 rounded-xl bg-white px-3.5 py-2 sm:px-4 sm:py-2.5 shadow-xs border border-gray-200 text-xs font-medium text-gray-700">
//               <div className="flex items-center gap-2">
//                 <MapPin className="h-4 w-4 text-emerald-600 shrink-0" />
//                 <span>{LOCATION_LABEL}</span>
//               </div>
//               <ChevronDown className="h-3.5 w-3.5 text-gray-400 shrink-0" />
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-8 md:p-10 shadow-xl shadow-gray-200/50 border border-gray-100">
//           <div className="lg:col-span-5 flex flex-col justify-between">
//             <div>
//               <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 sm:px-3.5 sm:py-1.5 text-[11px] sm:text-xs font-medium text-emerald-800 mb-4 sm:mb-6">
//                 <Clock className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
//                 <span>Waktu Sholat Berjamaah</span>
//               </div>

//               <h3 className="text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl leading-snug">
//                 Mari Makmurkan Majelis & Sholat Berjamaah
//               </h3>

//               <p className="mt-2.5 sm:mt-4 text-xs sm:text-sm leading-relaxed text-gray-600">
//                 Penting bagi santri dan warga Kampung Panggang untuk membiasakan
//                 sholat tepat waktu secara berjamaah di Majelis Al-Inayah.
//               </p>

//               <div className="mt-5 sm:mt-6 relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-5 text-left border border-emerald-100 bg-emerald-50/40">
//                 <div className="flex items-center gap-2 mb-2 text-emerald-900">
//                   <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#e76f3c]/15 border border-[#e76f3c]/30 shrink-0">
//                     <BookOpen className="h-3.5 w-3.5 text-[#e76f3c]" />
//                   </div>
//                   <span className="text-[11px] sm:text-xs font-bold tracking-wide uppercase">
//                     Keutamaan Sholat
//                   </span>
//                 </div>

//                 <p className="text-xs sm:text-sm italic font-normal text-gray-800 leading-relaxed pl-1">
//                   &ldquo;Sholat berjamaah lebih utama daripada sholat sendirian
//                   sebanyak 27 derajat.&rdquo;
//                 </p>

//                 <div className="mt-3 flex items-center gap-2 pl-1 pt-2 border-t border-emerald-200/60">
//                   <span className="h-1.5 w-1.5 rounded-full bg-[#e76f3c] shrink-0" />
//                   <p className="text-[10px] sm:text-[11px] font-semibold text-gray-600">
//                     HR. Bukhari & Muslim
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] sm:text-xs text-gray-500">
//               <span>Sumber: AlAdhan API (Kemenag RI)</span>
//               <span className="font-semibold text-emerald-700">
//                 WIB (UTC+7)
//               </span>
//             </div>
//           </div>

//           <div className="lg:col-span-7 flex flex-col justify-center">
//             {loading ? (
//               <div className="flex flex-col items-center justify-center gap-3 py-12 text-gray-400">
//                 <Loader2 className="h-6 w-6 animate-spin" />
//                 <span className="text-xs font-medium">Memuat jadwal sholat...</span>
//               </div>
//             ) : error ? (
//               <div className="flex flex-col items-center justify-center gap-3 py-12 text-red-500">
//                 <AlertCircle className="h-6 w-6" />
//                 <span className="text-xs font-medium text-center">{error}</span>
//               </div>
//             ) : (
//               <div className="flex flex-col gap-2.5 sm:gap-3">
//                 <div className="grid grid-cols-12 px-3 sm:px-5 py-1.5 text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">
//                   <span className="col-span-5 sm:col-span-6">Nama Sholat</span>
//                   <span className="col-span-4 sm:col-span-3 text-center">Azan</span>
//                   <span className="col-span-3 sm:col-span-3 text-right">Iqamah</span>
//                 </div>

//                 {prayerTimes.map((item, index) => {
//                   const Icon = item.icon;
//                   return (
//                     <div
//                       key={index}
//                       className={`grid grid-cols-12 items-center rounded-xl sm:rounded-2xl px-3.5 py-3 sm:px-5 sm:py-3.5 transition-all duration-200 ${
//                         item.isNext
//                           ? "bg-[#e76f3c] text-white shadow-lg shadow-[#e76f3c]/20 ring-1 ring-[#e76f3c]"
//                           : "bg-gray-50/80 hover:bg-gray-100/80 text-gray-800"
//                       }`}
//                     >
//                       <div className="col-span-5 sm:col-span-6 flex items-center gap-2.5 sm:gap-3">
//                         <div
//                           className={`flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg sm:rounded-xl ${
//                             item.isNext
//                               ? "bg-white/20 text-white"
//                               : "bg-white text-emerald-700 shadow-xs"
//                           }`}
//                         >
//                           <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
//                         </div>
//                         <div className="min-w-0">
//                           <span className="text-xs sm:text-base font-bold sm:font-semibold truncate block">
//                             {item.name}
//                           </span>
//                           {item.isNext && (
//                             <span className="block text-[9px] sm:text-[10px] font-semibold text-amber-200 uppercase tracking-wider leading-none mt-0.5">
//                               Selanjutnya
//                             </span>
//                           )}
//                         </div>
//                       </div>

//                       <div className="col-span-4 sm:col-span-3 text-center text-xs sm:text-sm font-semibold sm:font-medium">
//                         {item.azan}
//                       </div>

//                       <div className="col-span-3 sm:col-span-3 text-right text-xs sm:text-sm font-extrabold sm:font-semibold">
//                         {item.iqamah}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Sunrise,
  Sun,
  SunMedium,
  Sunset,
  Moon,
  Clock,
  MapPin,
  BookOpen,
  ChevronDown,
  Loader2,
  AlertCircle,
  Timer,
} from "lucide-react";

// ================================
// Konfigurasi lokasi & API
// ================================
const CITY = "Serang";
const COUNTRY = "Indonesia";
const METHOD = 20; // Kementerian Agama Republik Indonesia
const LOCATION_LABEL = "Kp. Panggang, Serang";

const IQAMAH_OFFSET_MIN: Record<string, number> = {
  Subuh: 12,
  Dzuhur: 10,
  Ashar: 10,
  Maghrib: 10,
  Isya: 10,
};

const PRAYER_META = [
  { key: "Fajr", name: "Subuh", icon: Sunrise },
  { key: "Dhuhr", name: "Dzuhur", icon: Sun },
  { key: "Asr", name: "Ashar", icon: SunMedium },
  { key: "Maghrib", name: "Maghrib", icon: Sunset },
  { key: "Isha", name: "Isya", icon: Moon },
] as const;

interface PrayerItem {
  name: string;
  azanLabel: string; // "04:38"
  iqamahLabel: string; // "04:50"
  icon: typeof Sunrise;
  isNext: boolean;
  azanDate: Date;
}

interface AladhanResponse {
  code: number;
  data: {
    timings: Record<string, string>;
    date: { readable: string };
  };
}

function parseHHMM(raw: string) {
  const clean = raw.split(" ")[0];
  const [hh, mm] = clean.split(":").map(Number);
  return { hh, mm };
}

function addMinutesToDate(base: Date, minutes: number) {
  return new Date(base.getTime() + minutes * 60_000);
}

function formatHHMM(d: Date) {
  return `${String(d.getHours()).padStart(2, "0")}:${String(
    d.getMinutes()
  ).padStart(2, "0")}`;
}

// Tekstur geometris islami tipis sebagai latar dekoratif
function GeometricPattern({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="islamic-star"
          width="44"
          height="44"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(15)"
        >
          <path
            d="M22 2 L28 16 L42 22 L28 28 L22 42 L16 28 L2 22 L16 16 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.75"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#islamic-star)" />
    </svg>
  );
}

export default function PrayerTime() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerItem[]>([]);
  const [hijriDate, setHijriDate] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [now, setNow] = useState<Date>(new Date());

  // Detak jam untuk hitung mundur real-time
  useEffect(() => {
    const tick = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function fetchPrayerTimes() {
      try {
        setLoading(true);
        setError(null);

        const url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(
          CITY
        )}&country=${encodeURIComponent(COUNTRY)}&method=${METHOD}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error("Gagal mengambil jadwal sholat");

        const json: AladhanResponse = await res.json();
        if (json.code !== 200) throw new Error("Data jadwal sholat tidak valid");

        const today = new Date();

        const items: PrayerItem[] = PRAYER_META.map(({ key, name, icon }) => {
          const { hh, mm } = parseHHMM(json.data.timings[key]);
          const azanDate = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            hh,
            mm,
            0
          );
          const iqamahDate = addMinutesToDate(
            azanDate,
            IQAMAH_OFFSET_MIN[name] ?? 10
          );

          return {
            name,
            azanLabel: formatHHMM(azanDate),
            iqamahLabel: formatHHMM(iqamahDate),
            icon,
            isNext: false,
            azanDate,
          };
        });

        let nextIndex = items.findIndex((i) => i.azanDate.getTime() > Date.now());
        if (nextIndex === -1) {
          // semua waktu hari ini sudah lewat -> Subuh besok
          items[0] = {
            ...items[0],
            azanDate: new Date(items[0].azanDate.getTime() + 24 * 60 * 60_000),
          };
          nextIndex = 0;
        }

        const finalItems = items.map((item, idx) => ({
          ...item,
          isNext: idx === nextIndex,
        }));

        if (isMounted) {
          setPrayerTimes(finalItems);
          setHijriDate(json.data.date.readable);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) setError("Gagal memuat jadwal sholat. Coba muat ulang halaman.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchPrayerTimes();
    const dailyRefresh = setInterval(fetchPrayerTimes, 1000 * 60 * 60);
    return () => {
      isMounted = false;
      clearInterval(dailyRefresh);
    };
  }, []);

  const nextPrayer = useMemo(
    () => prayerTimes.find((p) => p.isNext) ?? null,
    [prayerTimes]
  );

  const countdown = useMemo(() => {
    if (!nextPrayer) return null;
    const diffMs = nextPrayer.azanDate.getTime() - now.getTime();
    const totalSec = Math.max(0, Math.floor(diffMs / 1000));
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    return {
      label: `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(
        s
      ).padStart(2, "0")}`,
      h,
      m,
    };
  }, [nextPrayer, now]);

  return (
    <section className="relative bg-gradient-to-b from-white to-gray-50/70 py-14 sm:py-20 md:py-28 border-t border-gray-100 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end mb-8 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] text-[#e76f3c]">
              <span className="h-1 w-1 rounded-full bg-[#e76f3c]" />
              Jadwal Sholat Fardhu
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
              Waktu Sholat Hari Ini
            </h2>
            {hijriDate && (
              <p className="mt-1.5 text-xs font-medium text-gray-400">{hijriDate} H</p>
            )}
          </motion.div>

          <div className="inline-flex w-full sm:w-auto items-center justify-between gap-2 rounded-full bg-white px-4 py-2.5 shadow-xs border border-gray-200 text-xs font-semibold text-gray-700">
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>{LOCATION_LABEL}</span>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-gray-400 shrink-0" />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch rounded-[2rem] bg-white p-4 sm:p-8 md:p-10 shadow-xl shadow-emerald-950/5 border border-gray-100"
        >
          {/* Kolom kiri: konteks & hadis */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1.5 text-[11px] sm:text-xs font-semibold text-emerald-800 mb-5">
                <Clock className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>Waktu Sholat Berjamaah</span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 sm:text-2xl md:text-[1.75rem] leading-snug tracking-tight">
                Mari Makmurkan Majelis & Sholat Berjamaah
              </h3>

              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-gray-500">
                Penting bagi santri dan warga Kampung Panggang untuk membiasakan
                sholat tepat waktu secara berjamaah di Majelis Al-Inayah.
              </p>

              <div className="mt-6 relative overflow-hidden rounded-2xl p-5 border border-emerald-100 bg-gradient-to-br from-emerald-50/70 to-transparent">
                <GeometricPattern className="absolute -right-4 -top-4 h-24 w-24 text-emerald-800/[0.06]" />
                <div className="relative flex items-center gap-2 mb-2.5 text-emerald-900">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#e76f3c]/15 border border-[#e76f3c]/30 shrink-0">
                    <BookOpen className="h-3.5 w-3.5 text-[#e76f3c]" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold tracking-wide uppercase">
                    Keutamaan Sholat
                  </span>
                </div>

                <p className="relative text-xs sm:text-sm italic font-normal text-gray-700 leading-relaxed">
                  &ldquo;Sholat berjamaah lebih utama daripada sholat sendirian
                  sebanyak 27 derajat.&rdquo;
                </p>

                <div className="relative mt-3 flex items-center gap-2 pt-2.5 border-t border-emerald-200/50">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#e76f3c] shrink-0" />
                  <p className="text-[10px] sm:text-[11px] font-semibold text-gray-500">
                    HR. Bukhari & Muslim
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
              <span>Sumber: AlAdhan API &middot; Kemenag RI</span>
              <span className="font-semibold text-emerald-700">WIB (UTC+7)</span>
            </div>
          </div>

          {/* Kolom kanan: jadwal */}
          <div className="lg:col-span-7 flex flex-col justify-center gap-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center gap-3 py-16 text-gray-400">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-xs font-medium">Memuat jadwal sholat...</span>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center gap-3 py-16 text-red-500">
                <AlertCircle className="h-5 w-5" />
                <span className="text-xs font-medium text-center">{error}</span>
              </div>
            ) : (
              <>
                {/* Hero: sholat berikutnya */}
                {nextPrayer && countdown && (
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#152e28] via-[#1b3a32] to-emerald-900 p-5 sm:p-6 text-white shadow-lg shadow-emerald-950/20">
                    <GeometricPattern className="absolute inset-0 h-full w-full text-white/[0.06]" />
                    <div className="relative flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-200">
                          <Timer className="h-3 w-3" />
                          Sholat Selanjutnya
                        </span>
                        <div className="mt-2.5 flex items-center gap-2.5">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 shrink-0">
                            <nextPrayer.icon className="h-5 w-5 text-amber-200" />
                          </div>
                          <div>
                            <p className="text-lg font-bold leading-none">{nextPrayer.name}</p>
                            <p className="mt-1 text-[11px] text-white/60 font-medium">
                              Azan {nextPrayer.azanLabel} &middot; Iqamah {nextPrayer.iqamahLabel}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50 mb-1">
                          Menuju azan
                        </p>
                        <p className="font-mono text-2xl sm:text-3xl font-bold tabular-nums tracking-tight">
                          {countdown.label}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Daftar 5 waktu sholat */}
                <div className="rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="grid grid-cols-12 px-4 sm:px-5 py-2.5 bg-gray-50/80 text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    <span className="col-span-6">Nama Sholat</span>
                    <span className="col-span-3 text-center">Azan</span>
                    <span className="col-span-3 text-right">Iqamah</span>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {prayerTimes.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={index}
                          className={`grid grid-cols-12 items-center px-4 sm:px-5 py-3 sm:py-3.5 transition-colors duration-200 ${
                            item.isNext ? "bg-[#e76f3c]/[0.06]" : "hover:bg-gray-50/60"
                          }`}
                        >
                          <div className="col-span-6 flex items-center gap-3">
                            <div
                              className={`flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg ${
                                item.isNext
                                  ? "bg-[#e76f3c]/15 text-[#e76f3c]"
                                  : "bg-gray-50 text-emerald-700"
                              }`}
                            >
                              <Icon className="h-4 w-4" />
                            </div>
                            <span
                              className={`text-xs sm:text-sm truncate ${
                                item.isNext
                                  ? "font-bold text-gray-900"
                                  : "font-medium text-gray-700"
                              }`}
                            >
                              {item.name}
                            </span>
                          </div>

                          <div className="col-span-3 text-center font-mono text-xs sm:text-sm font-medium text-gray-600 tabular-nums">
                            {item.azanLabel}
                          </div>

                          <div className="col-span-3 text-right font-mono text-xs sm:text-sm font-semibold text-gray-800 tabular-nums">
                            {item.iqamahLabel}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
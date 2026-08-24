"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getTodayIndex, PiketDay, defaultJadwalTemplate } from "./types";
import HeroBanner from "./_components/HeroBanner";
import DayTabs from "./_components/DayTabs";
import ActiveDayPanel from "./_components/ActiveDayPanel";
import { createClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react"; 

const todayIndex = getTodayIndex();

export default function JadwalPiketPage() {
  const supabase = createClient();
  const [activeDay, setActiveDay] = useState(todayIndex);
  
  const [jadwalData, setJadwalData] = useState<PiketDay[]>(defaultJadwalTemplate);
  const [isLoading, setIsLoading] = useState(true);

  const fetchJadwal = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("jadwal_piket")
        .select(`
          id,
          hari,
          is_libur,
          tugas,
          waktu,
          urutan,
          piket_petugas (
            murid ( id, nama )
          )
        `)
        .order("urutan", { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        const fetchedMap = new Map(
          data.map((row: any) => [
            row.hari,
            {
              id: row.id,
              day: row.hari,
              isLibur: row.is_libur,
              tugas: row.tugas,
              waktu: row.waktu,
              petugas: (row.piket_petugas || [])
                .map((pp: any) => pp.murid)
                .filter(Boolean)
                .map((m: any) => ({ id: m.id, nama: m.nama })),
            },
          ])
        );

        const mergedJadwal = defaultJadwalTemplate.map(
          (defaultDay) => fetchedMap.get(defaultDay.day) || defaultDay
        );

        setJadwalData(mergedJadwal);
      }
    } catch (error) {
      console.error("Error fetching jadwal:", error);
    } finally {
      setIsLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchJadwal();
  }, [fetchJadwal]);

  return (
    <>
      <Navbar />
      <main className="pt-[82px] bg-[#f8faf9] min-h-screen pb-16">
        <HeroBanner />

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-8 md:py-12">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <Loader2 className="h-10 w-10 animate-spin text-[#14352c] mb-4" />
              <p className="text-gray-500 font-medium">Memuat jadwal majelis...</p>
            </div>
          ) : (
            <>
              <DayTabs
                days={jadwalData}
                activeDay={activeDay}
                todayIndex={todayIndex}
                onSelect={setActiveDay}
              />

              <div className="mt-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDay}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="rounded-3xl bg-white p-5 sm:p-8 shadow-sm border border-slate-200/80"
                  >
                    <ActiveDayPanel
                      day={jadwalData[activeDay]}
                      isToday={todayIndex === activeDay}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/client";
import { MuridHafalan, HafalanItem } from "./types";
import HeroBanner from "./_components/HeroBanner";
import SearchFilterBar from "./_components/SearchFilterBar";
import MuridHafalanCard from "./_components/MuridHafalanCard";
import ModalDetailHafalan from "./_components/ModalDetailHafalan";
import { LoadingState, EmptyState } from "./_components/StateMessages";

const MURID_SELECT = `
  id,
  nama,
  gender,
  tingkat_id,
  tingkat_ngaji ( id, nama_tingkat, keterangan ),
  hafalan ( id, murid_id, surah, ayat, tanggal, catatan )
`;

export default function HafalanMuridPage() {
  const supabase = createClient();

  const [muridList, setMuridList] = useState<MuridHafalan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [kelasFilter, setKelasFilter] = useState<string>("Semua");
  const [selectedMurid, setSelectedMurid] = useState<MuridHafalan | null>(null);

  const fetchMurid = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("murid")
      .select(MURID_SELECT)
      .order("nama", { ascending: true });

    if (error) {
      console.error("Gagal mengambil data hafalan murid:", error.message);
      setIsLoading(false);
      return;
    }

    const formatted: MuridHafalan[] = (data ?? []).map((m: any) => {
      const rawHafalan: HafalanItem[] = Array.isArray(m.hafalan) ? m.hafalan : [];
      const sortedHafalan = [...rawHafalan].sort(
        (a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime() || b.id - a.id
      );
      const uniqueSurah = new Set(rawHafalan.map((h) => h.surah));

      return {
        id: m.id,
        nama: m.nama,
        gender: m.gender,
        tingkat_id: m.tingkat_id,
        tingkat_ngaji: Array.isArray(m.tingkat_ngaji) ? m.tingkat_ngaji[0] ?? null : m.tingkat_ngaji,
        riwayatHafalan: sortedHafalan,
        totalSurah: uniqueSurah.size,
        hafalanTerakhir: sortedHafalan[0],
      };
    });

    setMuridList(formatted);
    setIsLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchMurid();
  }, [fetchMurid]);

  const kelasFilters = useMemo(() => {
    const unique = Array.from(
      new Set(
        muridList
          .map((m) => m.tingkat_ngaji?.nama_tingkat)
          .filter((v): v is string => Boolean(v))
      )
    );
    return ["Semua", ...unique];
  }, [muridList]);

  const filteredData = muridList.filter((item) => {
    const matchName = item.nama.toLowerCase().includes(search.toLowerCase());
    const matchKelas =
      kelasFilter === "Semua" || item.tingkat_ngaji?.nama_tingkat === kelasFilter;
    return matchName && matchKelas;
  });

  return (
    <>
      <Navbar />
      <main className="pt-[82px] bg-[#fafaf9] min-h-screen pb-16">
        <HeroBanner />

        <section className="mx-auto max-w-7xl px-6 lg:px-12 pt-8 md:pt-10">
          <SearchFilterBar
            search={search}
            onSearchChange={setSearch}
            kelasFilters={kelasFilters}
            kelasFilter={kelasFilter}
            onKelasFilterChange={setKelasFilter}
          />

          {isLoading ? (
            <LoadingState />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence mode="popLayout">
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <MuridHafalanCard
                      key={item.id}
                      item={item}
                      onClick={() => setSelectedMurid(item)}
                    />
                  ))
                ) : (
                  <EmptyState search={search} />
                )}
              </AnimatePresence>
            </div>
          )}
        </section>
      </main>
      <Footer />

      <AnimatePresence>
        {selectedMurid && (
          <ModalDetailHafalan
            murid={selectedMurid}
            onClose={() => setSelectedMurid(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
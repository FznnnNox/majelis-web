"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Program {
  id: number;
  title: string;
  description: string;
  image: string;
  raised: string;
  goal: string;
  progressPercentage: number;
}

const supabase = createClient();

export default function ProgramsSection() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 3;

  const fetchPrograms = useCallback(async () => {
    setIsLoading(true);
    try {
      // 1. Ambil data program yang statusnya AKTIF dari Supabase
      const { data: programData, error: progErr } = await supabase
        .from("program_donasi")
        .select("id, nama, deskripsi, target, gambar")
        .eq("is_active", true) // <--- FILTER PROGRAM AKTIF SAJA
        .order("id", { ascending: true });

      if (progErr) throw progErr;

      // 2. Ambil semua donasi yang terverifikasi
      const { data: donasiData, error: donErr } = await supabase
        .from("donasi")
        .select("program_id, nominal")
        .eq("status", "Terverifikasi");

      if (donErr) throw donErr;

      // 3. Kelompokkan & hitung total terkumpul per program_id
      const totalsMap: Record<number, number> = {};
      donasiData?.forEach((item) => {
        if (item.program_id) {
          totalsMap[item.program_id] =
            (totalsMap[item.program_id] || 0) + Number(item.nominal);
        }
      });

      // 4. Format data program
      const formattedPrograms: Program[] = (programData || []).map((item) => {
        const terkumpul = totalsMap[item.id] || 0;
        const target = Number(item.target) || 0;
        const progressPercentage =
          target > 0 ? Math.min(100, Math.round((terkumpul / target) * 100)) : 0;

        return {
          id: item.id,
          title: item.nama,
          description: item.deskripsi || "Program donasi Majelis Al-Inayah.",
          image: item.gambar || "/assets/bg.jpg",
          raised: `Rp ${terkumpul.toLocaleString("id-ID")}`,
          goal: `Rp ${target.toLocaleString("id-ID")}`,
          progressPercentage,
        };
      });

      setPrograms(formattedPrograms);
    } catch (err) {
      console.error("Error loading programs:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrograms();
  }, [fetchPrograms]);

  const totalPages = Math.ceil(programs.length / itemsPerPage);
  const displayedPrograms = programs.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <section className="bg-white py-12 sm:py-20 md:py-28 overflow-hidden" id="program">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-end mb-10 sm:mb-14">
          <div className="text-center sm:text-left max-w-2xl">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#e76f3c]">
              Program Berkelanjutan
            </span>
            <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              Program & Infaq Majelis
            </h2>
            <p className="mt-3 text-xs sm:text-base text-gray-600 leading-relaxed">
              Mari bersama-sama mendukung keberlangsungan dakwah, pendidikan
              santri, dan kegiatan sosial masyarakat di Majelis Al-Inayah.
            </p>
          </div>

          {/* Controls Next/Prev */}
          {!isLoading && totalPages > 1 && (
            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                disabled={currentPage === 0}
                aria-label="Halaman Sebelumnya"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 transition hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
                }
                disabled={currentPage === totalPages - 1}
                aria-label="Halaman Selanjutnya"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 transition hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        {/* Content Section */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Loader2 className="h-8 w-8 animate-spin text-[#e76f3c]" />
            <p className="mt-3 text-sm font-medium">Memuat program donasi...</p>
          </div>
        ) : programs.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <p className="text-sm font-medium text-slate-500">
              Belum ada program donasi aktif saat ini.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 transition-all duration-500">
              {displayedPrograms.map((item) => (
                <div
                  key={item.id}
                  className="group flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-5 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5"
                >
                  <div className="relative h-44 sm:h-52 w-full overflow-hidden rounded-xl sm:rounded-2xl bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      priority
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between pt-5">
                    <div>
                      <h3 className="text-base sm:text-xl font-bold text-gray-900 line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-gray-500 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>

                      <div className="mt-7 relative">
                        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                          <div
                            className="h-full rounded-full bg-[#e76f3c] transition-all duration-500"
                            style={{ width: `${item.progressPercentage}%` }}
                          />
                        </div>

                        <div
                          className="absolute -top-7 -translate-x-1/2 rounded-full bg-[#e76f3c] px-2 py-0.5 text-[9px] sm:text-[10px] font-bold text-white shadow-xs"
                          style={{ left: `${item.progressPercentage}%` }}
                        >
                          {item.progressPercentage}%
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between text-xs sm:text-sm font-semibold">
                        <div className="text-[#e76f3c]">
                          Terkumpul:{" "}
                          <span className="font-bold">{item.raised}</span>
                        </div>
                        <div className="text-gray-400">
                          Target:{" "}
                          <span className="font-medium text-gray-600">
                            {item.goal}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-2">
                      <Link
                        href={`/donasi?program=${item.id}`}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#e76f3c] py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-[#e76f3c]/20 hover:bg-[#d55e2c] hover:shadow-lg hover:shadow-[#e76f3c]/30 active:scale-[0.98] transition-all duration-200"
                      >
                        <Heart className="h-4 w-4 fill-current" />
                        <span>Infaq Sekarang</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Dots */}
            {totalPages > 1 && (
              <div className="mt-10 sm:mt-12 flex items-center justify-center gap-2.5">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentPage(index)}
                    aria-label={`Ke halaman ${index + 1}`}
                    className={`h-2.5 sm:h-3 rounded-full transition-all duration-300 ${
                      currentPage === index
                        ? "w-8 bg-[#152e28]"
                        : "w-2.5 sm:w-3 bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
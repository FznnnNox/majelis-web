"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Filter, CheckCircle2, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/client";
import { Transaction, FilterKategoriKas } from "./types";
import UangKasBanner from "./_components/UangKasBanner";
import UangKasFilter from "./_components/UangKasFilter";
import UangKasCard from "./_components/UangKasCard";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

export default function UangKasPage() {
  const supabase = createClient();
  
  // State Data & Loading
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State Filter
  const [filter, setFilter] = useState<FilterKategoriKas>("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch data dari Supabase (Sama seperti logika di Admin)
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data, error } = await supabase
          .from("kas_transaksi")
          .select("*, murid(nama)")
          .order("tanggal", { ascending: false })
          .order("id", { ascending: false });

        if (error) throw error;

        const mappedData: Transaction[] = (data || []).map((row: any) => ({
          id: row.id,
          tanggal: row.tanggal,
          kategori: row.kategori,
          keterangan: row.keterangan,
          jumlah: Number(row.jumlah),
          murid_nama: row.murid?.nama || "Tidak diketahui",
        }));

        setTransactions(mappedData);
      } catch (err) {
        console.error("Gagal mengambil data kas public:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [supabase]);

  // Logika Filter Data
  const filteredTransactions = transactions.filter((trx) => {
    const matchesFilter = filter === "Semua" || trx.kategori === filter;
    
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      trx.keterangan.toLowerCase().includes(searchLower) ||
      (trx.murid_nama && trx.murid_nama.toLowerCase().includes(searchLower));

    return matchesFilter && matchesSearch;
  });

  return (
    <>
      <Navbar />
      <main className="pt-[82px] bg-[#f8faf9] min-h-screen">
        <UangKasBanner />

        <section className="mx-auto max-w-7xl px-6 lg:px-12 py-8 md:py-12">
          <div className="rounded-2xl bg-white p-6 sm:p-8 ring-1 ring-gray-900/5 shadow-sm">
            <UangKasFilter
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filter={filter}
              setFilter={setFilter}
            />

            {/* Menampilkan Status Loading */}
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <Loader2 className="w-10 h-10 animate-spin text-[#1a4a3e] mb-4" />
                <p className="text-sm font-medium">Memuat riwayat transaksi...</p>
              </div>
            ) : filteredTransactions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                  <Filter className="h-6 w-6" />
                </div>
                <h4 className="text-sm font-semibold text-gray-800">
                  Tidak ada transaksi ditemukan
                </h4>
                <p className="mt-1 text-xs text-gray-400">
                  Coba ubah kata kunci pencarian atau filter kategori.
                </p>
              </div>
            ) : (
              <motion.div
                key={filter + searchQuery}
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="mt-6 space-y-3"
              >
                {filteredTransactions.map((trx) => (
                  <UangKasCard key={trx.id} trx={trx} />
                ))}
              </motion.div>
            )}

            <div className="mt-8 flex items-start gap-3 rounded-2xl bg-[#152e28]/5 p-4 text-sm text-gray-700 ring-1 ring-[#152e28]/10">
              <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5 text-emerald-600" />
              <p className="leading-relaxed">
                <span className="font-semibold text-[#152e28]">
                  Catatan bendahara:
                </span>{" "}
                seluruh data uang kas direkap secara otomatis dan diverifikasi
                oleh pengurus majelis setiap akhir bulan.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
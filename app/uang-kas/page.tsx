// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import {
//   Wallet,
//   ArrowDownLeft,
//   ArrowUpRight,
//   Receipt,
//   Search,
//   Filter,
//   Calendar,
//   CheckCircle2,
// } from "lucide-react";

// interface Transaction {
//   id: string;
//   title: string;
//   category: "Pemasukan" | "Pengeluaran";
//   amount: number;
//   date: string;
//   note: string;
// }

// const transactionsData: Transaction[] = [
//   {
//     id: "TRX-001",
//     title: "Iuran mingguan santri (minggu I)",
//     category: "Pemasukan",
//     amount: 1200000,
//     date: "08 Agt 2026",
//     note: "Terkumpul dari 40 santri",
//   },
//   {
//     id: "TRX-002",
//     title: "Pembelian kitab dan alat tulis majelis",
//     category: "Pengeluaran",
//     amount: 450000,
//     date: "06 Agt 2026",
//     note: "Pembelian 15 kitab Safinah",
//   },
//   {
//     id: "TRX-003",
//     title: "Infaq hamba Allah",
//     category: "Pemasukan",
//     amount: 2000000,
//     date: "04 Agt 2026",
//     note: "Donasi renovasi area wudhu",
//   },
//   {
//     id: "TRX-004",
//     title: "Pembayaran listrik dan kebersihan",
//     category: "Pengeluaran",
//     amount: 600000,
//     date: "01 Agt 2026",
//     note: "Tagihan bulan Juli 2026",
//   },
//   {
//     id: "TRX-005",
//     title: "Konsumsi pengajian bulanan",
//     category: "Pengeluaran",
//     amount: 500000,
//     date: "28 Jul 2026",
//     note: "Snack dan minuman jamaah",
//   },
//   {
//     id: "TRX-006",
//     title: "Iuran mingguan santri (minggu IV)",
//     category: "Pemasukan",
//     amount: 2600000,
//     date: "25 Jul 2026",
//     note: "Terkumpul dari 52 santri",
//   },
// ];

// const containerVariants = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: { staggerChildren: 0.06 },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 12 },
//   show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
// };

// export default function UangKasPage() {
//   const [filter, setFilter] = useState<"Semua" | "Pemasukan" | "Pengeluaran">("Semua");
//   const [searchQuery, setSearchQuery] = useState("");

//   const filteredTransactions = transactionsData.filter((trx) => {
//     const matchesFilter = filter === "Semua" || trx.category === filter;
//     const matchesSearch =
//       trx.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       trx.note.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesFilter && matchesSearch;
//   });

//   const formatRupiah = (num: number) =>
//     new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//       maximumFractionDigits: 0,
//     }).format(num);

//   return (
//     <>
//       <Navbar />
//       <main className="pt-[82px] bg-[#f8faf9] min-h-screen">
//         {/* Banner Section */}
//         <section className="relative overflow-hidden bg-[#152e28] text-white py-12 md:py-16">
//           <div className="pointer-events-none absolute top-0 right-0 -mt-12 -mr-12 h-96 w-96 rounded-full bg-[#e76f3c]/10 blur-3xl" />

//           <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
//             <motion.div
//               initial={{ opacity: 0, y: 16 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, ease: "easeOut" }}
//               className="max-w-2xl"
//             >
//               <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-300 ring-1 ring-inset ring-white/10 mb-4 shadow-sm">
//                 <Wallet className="h-3.5 w-3.5 text-[#e76f3c]" />
//                 Transparansi keuangan
//               </div>
//               <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl leading-tight">
//                 Laporan uang kas majelis
//               </h1>
//               <p className="mt-3 text-sm text-emerald-100/70 md:text-base leading-relaxed">
//                 Pencatatan pemasukan dan pengeluaran kas Majelis Al-Inayah
//                 secara terbuka demi menjaga amanah bersama.
//               </p>
//             </motion.div>
//           </div>
//         </section>

//         {/* Transaction Table / List Section */}
//         <section className="mx-auto max-w-7xl px-6 lg:px-12 py-8 md:py-12">
//           <div className="rounded-2xl bg-white p-6 sm:p-8 ring-1 ring-gray-900/5 shadow-sm">
//             <div className="flex flex-col gap-4 border-b border-gray-100 pb-6 md:flex-row md:items-center md:justify-between">
//               <div>
//                 <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-900">
//                   <Receipt className="h-5 w-5 text-[#e76f3c]" />
//                   Riwayat transaksi
//                 </h3>
//                 <p className="mt-0.5 text-sm font-medium text-gray-500">
//                   Daftar rinci mutasi keuangan uang kas majelis
//                 </p>
//               </div>

//               <div className="flex flex-col gap-3 sm:flex-row">
//                 <div className="relative">
//                   <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Cari transaksi..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="w-full rounded-xl bg-[#f8faf9] py-2 pl-10 pr-4 text-sm font-medium text-gray-800 placeholder-gray-400 ring-1 ring-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-[#152e28]/30 sm:w-56"
//                   />
//                 </div>

//                 <div className="relative inline-flex items-center gap-1 rounded-xl bg-[#f8faf9] p-1 ring-1 ring-gray-200/80">
//                   {(["Semua", "Pemasukan", "Pengeluaran"] as const).map((type) => {
//                     const isActive = filter === type;
//                     return (
//                       <button
//                         key={type}
//                         onClick={() => setFilter(type)}
//                         className="relative rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors"
//                       >
//                         {isActive && (
//                           <motion.span
//                             layoutId="active-filter-kas"
//                             transition={{ type: "spring", stiffness: 400, damping: 32 }}
//                             className="absolute inset-0 rounded-lg bg-[#152e28] shadow-sm"
//                           />
//                         )}
//                         <span
//                           className={`relative z-10 ${
//                             isActive ? "text-white" : "text-gray-500 hover:text-gray-900"
//                           }`}
//                         >
//                           {type}
//                         </span>
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>

//             {filteredTransactions.length === 0 ? (
//               <div className="flex flex-col items-center justify-center py-12 text-center">
//                 <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
//                   <Filter className="h-6 w-6" />
//                 </div>
//                 <h4 className="text-sm font-semibold text-gray-800">
//                   Tidak ada transaksi ditemukan
//                 </h4>
//                 <p className="mt-1 text-xs text-gray-400">
//                   Coba ubah kata kunci pencarian atau filter kategori.
//                 </p>
//               </div>
//             ) : (
//               <motion.div
//                 key={filter + searchQuery}
//                 variants={containerVariants}
//                 initial="hidden"
//                 animate="show"
//                 className="mt-6 space-y-3"
//               >
//                 {filteredTransactions.map((trx) => {
//                   const isIncome = trx.category === "Pemasukan";

//                   return (
//                     <motion.div
//                       key={trx.id}
//                       variants={itemVariants}
//                       className="group flex flex-col gap-3 rounded-2xl bg-[#f8faf9] p-4 ring-1 ring-gray-900/5 transition-all duration-300 hover:bg-white hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
//                     >
//                       <div className="flex items-start gap-3.5">
//                         <div
//                           className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 ${
//                             isIncome
//                               ? "bg-emerald-50 text-emerald-600 ring-emerald-100"
//                               : "bg-rose-50 text-rose-600 ring-rose-100"
//                           }`}
//                         >
//                           {isIncome ? (
//                             <ArrowDownLeft className="h-5 w-5" />
//                           ) : (
//                             <ArrowUpRight className="h-5 w-5" />
//                           )}
//                         </div>

//                         <div>
//                           <div className="flex flex-wrap items-center gap-2">
//                             <h4 className="text-sm font-semibold text-gray-900 transition-colors group-hover:text-[#152e28]">
//                               {trx.title}
//                             </h4>
//                             <span
//                               className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ring-1 ${
//                                 isIncome
//                                   ? "bg-emerald-50 text-emerald-700 ring-emerald-200/60"
//                                   : "bg-rose-50 text-rose-700 ring-rose-200/60"
//                               }`}
//                             >
//                               {trx.category}
//                             </span>
//                           </div>
//                           <p className="mt-1 text-xs font-medium text-gray-500">
//                             {trx.note}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="flex items-center justify-between border-t border-gray-200/60 pt-2 sm:flex-col sm:items-end sm:border-t-0 sm:pt-0">
//                         <span
//                           className={`text-base font-bold ${
//                             isIncome ? "text-emerald-600" : "text-rose-600"
//                           }`}
//                         >
//                           {isIncome ? "+" : "-"}
//                           {formatRupiah(trx.amount)}
//                         </span>
//                         <div className="mt-0.5 flex items-center gap-1.5 text-[11px] font-medium text-gray-400">
//                           <Calendar className="h-3 w-3 text-gray-400" />
//                           {trx.date}
//                         </div>
//                       </div>
//                     </motion.div>
//                   );
//                 })}
//               </motion.div>
//             )}

//             <div className="mt-8 flex items-start gap-3 rounded-2xl bg-[#152e28]/5 p-4 text-sm text-gray-700 ring-1 ring-[#152e28]/10">
//               <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5 text-emerald-600" />
//               <p className="leading-relaxed">
//                 <span className="font-semibold text-[#152e28]">
//                   Catatan bendahara:
//                 </span>{" "}
//                 seluruh data uang kas direkap secara otomatis dan
//                 diverifikasi oleh pengurus majelis setiap akhir bulan.
//               </p>
//             </div>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Filter, CheckCircle2, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Supabase client (pastikan path ini sesuai dengan project Anda)
import { createClient } from "@/lib/supabase/client";

// Import tipe
import { Transaction, FilterKategoriKas } from "./types";

// Import komponen terpisah
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
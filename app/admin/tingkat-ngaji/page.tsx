// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Sparkles, Plus, Search, Loader2 } from "lucide-react";
// import TingkatCard from "./_components/TingkatCard";
// import TingkatModal from "./_components/TingkatModal";
// import Pagination from "./_components/Pagination"; // Komponen Pagination
// import { TingkatNgaji, TingkatFormData, initialTingkatNgaji } from "./types";

// export default function MasterTingkatNgajiPage() {
//   const [tingkatList, setTingkatList] =
//     useState<TingkatNgaji[]>(initialTingkatNgaji);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isLoading] = useState(false);

//   // 📄 State Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6; // Jumlah card per halaman

//   // 🛠 State Modal & Form
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingItem, setEditingItem] = useState<TingkatNgaji | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [formData, setFormData] = useState<TingkatFormData>({
//     nama_tingkat: "",
//     keterangan: "",
//   });

//   const handleOpenModal = (item?: TingkatNgaji) => {
//     if (item) {
//       setEditingItem(item);
//       setFormData({
//         nama_tingkat: item.nama_tingkat,
//         keterangan: item.keterangan || "",
//       });
//     } else {
//       setEditingItem(null);
//       setFormData({ nama_tingkat: "", keterangan: "" });
//     }
//     setIsModalOpen(true);
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.nama_tingkat.trim()) return;

//     setIsSubmitting(true);

//     if (editingItem) {
//       setTingkatList((prev) =>
//         prev.map((item) =>
//           item.id === editingItem.id
//             ? {
//                 ...item,
//                 nama_tingkat: formData.nama_tingkat,
//                 keterangan: formData.keterangan || null,
//               }
//             : item
//         )
//       );
//     } else {
//       const newItem: TingkatNgaji = {
//         id: Date.now(),
//         nama_tingkat: formData.nama_tingkat,
//         keterangan: formData.keterangan || null,
//         _count_murid: 0,
//       };
//       setTingkatList((prev) => [...prev, newItem]);
//     }

//     setIsSubmitting(false);
//     setIsModalOpen(false);
//   };

//   const handleDelete = (id: number, nama: string) => {
//     if (confirm(`Apakah Anda yakin ingin menghapus "${nama}"?`)) {
//       setTingkatList((prev) => prev.filter((item) => item.id !== id));
//     }
//   };

//   // 🔍 Filter & Search Data
//   const filteredList = tingkatList.filter(
//     (item) =>
//       item.nama_tingkat.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (item.keterangan &&
//         item.keterangan.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   // 📊 Calculations Pagination
//   const totalItems = filteredList.length;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedList = filteredList.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   // Reset ke halaman 1 jika hasil pencarian berubah
//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//     setCurrentPage(1);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 12 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.35, ease: "easeOut" }}
//       className="p-3.5 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto"
//     >
//       {/* 🚀 Header Banner */}
//       <div className="relative overflow-hidden rounded-2xl sm:rounded-[28px] bg-gradient-to-r from-[#14352c] via-[#1b4338] to-[#235346] p-5 sm:p-8 text-white shadow-xl shadow-[#14352c]/10">
//         <div className="absolute top-0 right-0 -mt-12 -mr-12 w-48 sm:w-64 h-48 sm:h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
//         <div className="absolute bottom-0 left-1/3 -mb-12 w-36 sm:w-48 h-36 sm:h-48 bg-[#c1663c]/20 rounded-full blur-2xl pointer-events-none" />

//         <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//           <div>
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-emerald-200 text-[11px] sm:text-xs font-medium mb-2.5">
//               <Sparkles className="h-3.5 w-3.5 text-[#c1663c]" />
//               <span>Manajemen Tingkat Ngaji</span>
//             </div>
//             <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
//               Master Tingkat Ngaji
//             </h1>
//             <p className="text-emerald-100/70 text-xs sm:text-sm mt-1 max-w-lg leading-relaxed">
//               Kelola jenjang bacaan pengajian (Iqra 1–6, Al-Qur'an, dan level khusus lainnya).
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={() => handleOpenModal()}
//             className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-[#c1663c] hover:bg-[#d47244] text-white text-xs font-bold shadow-lg shadow-[#c1663c]/25 transition-all duration-200 cursor-pointer active:scale-95 shrink-0 w-full sm:w-auto"
//           >
//             <Plus className="h-4 w-4" />
//             <span>Tambah Tingkat Baru</span>
//           </button>
//         </div>
//       </div>

//       {/* 🔍 Search Bar & Stats */}
//       <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3 border border-gray-100/80 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
//         <div className="relative w-full sm:w-80">
//           <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={handleSearchChange}
//             placeholder="Cari tingkat ngaji..."
//             className="w-full pl-10 pr-4 py-2 sm:py-2.5 bg-gray-50/80 border border-gray-200/80 rounded-xl text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#102d25]/15 focus:border-[#102d25] focus:bg-white transition-all"
//           />
//         </div>

//         <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end text-xs text-gray-500 font-medium px-1">
//           <span>Total Master Level:</span>
//           <span className="font-bold text-[#14352c] bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-100">
//             {totalItems} Tingkatan
//           </span>
//         </div>
//       </div>

//       {/* 🎴 Cards Grid (Tampil Sesuai Page) */}
//       {isLoading ? (
//         <div className="py-20 text-center text-gray-400 bg-white/80 rounded-3xl border border-gray-100">
//           <div className="flex items-center justify-center gap-2">
//             <Loader2 className="h-5 w-5 animate-spin text-[#102d25]" />
//             <span className="text-xs sm:text-sm font-medium">Memuat data tingkatan...</span>
//           </div>
//         </div>
//       ) : paginatedList.length > 0 ? (
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={currentPage}
//             initial={{ opacity: 0, y: 8 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -8 }}
//             transition={{ duration: 0.2 }}
//             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5"
//           >
//             {paginatedList.map((item) => (
//               <TingkatCard
//                 key={item.id}
//                 item={item}
//                 onEdit={handleOpenModal}
//                 onDelete={handleDelete}
//               />
//             ))}
//           </motion.div>
//         </AnimatePresence>
//       ) : (
//         <div className="py-16 text-center text-gray-400 bg-white/80 rounded-3xl border border-gray-100 text-xs font-semibold">
//           Tidak ada data tingkat ngaji yang ditemukan.
//         </div>
//       )}

//       {/* 📄 Komponen Pagination */}
//       {totalPages > 1 && (
//         <div className="pt-2">
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={(page) => setCurrentPage(page)}
//           />
//         </div>
//       )}

//       <TingkatModal
//         isOpen={isModalOpen}
//         editingItem={editingItem}
//         formData={formData}
//         isSubmitting={isSubmitting}
//         onClose={() => setIsModalOpen(false)}
//         onChange={setFormData}
//         onSubmit={handleSubmit}
//       />
//     </motion.div>
//   );
// }
"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Plus, Search, Loader2 } from "lucide-react";
import TingkatCard from "./_components/TingkatCard";
import TingkatModal from "./_components/TingkatModal";
import TingkatDetailModal from "./_components/TingkatDetailModal"; // 👈 Import modal detail
import Pagination from "./_components/Pagination";
import { TingkatNgaji, TingkatFormData } from "./types";
import { createClient } from "@/lib/supabase/client";

export default function MasterTingkatNgajiPage() {
  const supabase = createClient();

  const [tingkatList, setTingkatList] = useState<TingkatNgaji[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // 📄 State Modal Detail
  const [selectedDetail, setSelectedDetail] = useState<TingkatNgaji | null>(
    null,
  );

  // 📄 State Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // 🛠 State Modal & Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TingkatNgaji | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<TingkatFormData>({
    nama_tingkat: "",
    keterangan: "",
  });

  // 📥 1. FETCH DATA DARI SUPABASE
  const fetchTingkatNgaji = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("tingkat_ngaji")
        .select("*")
        .order("id", { ascending: true });

      if (error) throw error;
      if (data) setTingkatList(data);
    } catch (err) {
      console.error("Error fetching data:", err);
      alert("Gagal mengambil data tingkat ngaji.");
    } finally {
      setIsLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchTingkatNgaji();
  }, [fetchTingkatNgaji]);

  // 🚪 Handler Open Modal
  const handleOpenModal = (item?: TingkatNgaji) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        nama_tingkat: item.nama_tingkat,
        keterangan: item.keterangan || "",
      });
    } else {
      setEditingItem(null);
      setFormData({ nama_tingkat: "", keterangan: "" });
    }
    setIsModalOpen(true);
  };

  // 💾 2. INSERT & UPDATE KE SUPABASE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama_tingkat.trim()) return;

    setIsSubmitting(true);

    try {
      if (editingItem) {
        // UPDATE
        const { error } = await supabase
          .from("tingkat_ngaji")
          .update({
            nama_tingkat: formData.nama_tingkat,
            keterangan: formData.keterangan || null,
          })
          .eq("id", editingItem.id);

        if (error) throw error;
      } else {
        // INSERT
        const { error } = await supabase.from("tingkat_ngaji").insert([
          {
            nama_tingkat: formData.nama_tingkat,
            keterangan: formData.keterangan || null,
          },
        ]);

        if (error) throw error;
      }

      await fetchTingkatNgaji(); // Refresh list data
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error saving data:", err);
      alert("Gagal menyimpan data ke Supabase.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🗑 3. DELETE DARI SUPABASE
  const handleDelete = async (id: number, nama: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus "${nama}"?`)) return;

    try {
      const { error } = await supabase
        .from("tingkat_ngaji")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setTingkatList((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting data:", err);
      alert("Gagal menghapus data.");
    }
  };

  // 🔍 Filter & Search Data
  const filteredList = tingkatList.filter(
    (item) =>
      item.nama_tingkat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.keterangan &&
        item.keterangan.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  // 📊 Calculations Pagination
  const totalItems = filteredList.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedList = filteredList.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="p-3.5 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto"
    >
      <div className="relative overflow-hidden rounded-2xl sm:rounded-[28px] bg-gradient-to-r from-[#14352c] via-[#1b4338] to-[#235346] p-5 sm:p-8 text-white shadow-xl shadow-[#14352c]/10">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-48 sm:w-64 h-48 sm:h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-36 sm:w-48 h-36 sm:h-48 bg-[#c1663c]/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-emerald-200 text-[11px] sm:text-xs font-medium mb-2.5">
              <Sparkles className="h-3.5 w-3.5 text-[#c1663c]" />
              <span>Manajemen Tingkat Ngaji</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
              Master Tingkat Ngaji
            </h1>
            <p className="text-emerald-100/70 text-xs sm:text-sm mt-1 max-w-lg leading-relaxed">
              Kelola jenjang bacaan pengajian (Iqra 1–6, Al-Qur'an, dan level
              khusus lainnya).
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleOpenModal()}
            className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-[#c1663c] hover:bg-[#d47244] text-white text-xs font-bold shadow-lg shadow-[#c1663c]/25 transition-all duration-200 cursor-pointer active:scale-95 shrink-0 w-full sm:w-auto"
          >
            <Plus className="h-4 w-4" />
            <span>Tambah Tingkat Baru</span>
          </button>
        </div>
      </div>

      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3 border border-gray-100/80 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Cari tingkat ngaji..."
            className="w-full pl-10 pr-4 py-2 sm:py-2.5 bg-gray-50/80 border border-gray-200/80 rounded-xl text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#102d25]/15 focus:border-[#102d25] focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end text-xs text-gray-500 font-medium px-1">
          <span>Total Master Level:</span>
          <span className="font-bold text-[#14352c] bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-100">
            {totalItems} Tingkatan
          </span>
        </div>
      </div>

      {isLoading ? (
        <div className="py-20 text-center text-gray-400 bg-white/80 rounded-3xl border border-gray-100">
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-[#102d25]" />
            <span className="text-xs sm:text-sm font-medium">
              Memuat data tingkatan...
            </span>
          </div>
        </div>
      ) : paginatedList.length > 0 ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5"
          >
            {paginatedList.map((item) => (
              <TingkatCard
                key={item.id}
                item={item}
                onEdit={handleOpenModal}
                onDelete={handleDelete}
                onViewDetail={(item) => setSelectedDetail(item)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      ) : (
        <div className="py-16 text-center text-gray-400 bg-white/80 rounded-3xl border border-gray-100 text-xs font-semibold">
          Tidak ada data tingkat ngaji yang ditemukan.
        </div>
      )}

      {totalPages > 1 && (
        <div className="pt-2">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}

      <TingkatModal
        isOpen={isModalOpen}
        editingItem={editingItem}
        formData={formData}
        isSubmitting={isSubmitting}
        onClose={() => setIsModalOpen(false)}
        onChange={setFormData}
        onSubmit={handleSubmit}
      />

      <TingkatDetailModal
        isOpen={!!selectedDetail}
        item={selectedDetail}
        onClose={() => setSelectedDetail(null)}
      />
    </motion.div>
  );
}

// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Sparkles, Calendar, Search, Plus } from "lucide-react";
// import { ScheduleItem, JadwalFormData, initialScheduleData } from "./types";
// import JadwalCard from "./_components/JadwalCard";
// import JadwalModal from "./_components/JadwalModal";
// import Pagination from "./_components/Pagination";

// export default function JadwalPiketPage() {
//   const [schedules, setSchedules] =
//     useState<ScheduleItem[]>(initialScheduleData);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingItem, setEditingItem] = useState<ScheduleItem | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

//   const [formData, setFormData] = useState<JadwalFormData>({
//     hari: "Senin",
//     tugas: "",
//     waktu: "16:00 - 17:00 WIB",
//     isLibur: false,
//     petugasNames: "",
//   });

//   // Handler Buka Modal Tambah
//   const handleOpenAddModal = () => {
//     setEditingItem(null);
//     setFormData({
//       hari: "Senin",
//       tugas: "",
//       waktu: "16:00 - 17:00 WIB",
//       isLibur: false,
//       petugasNames: "",
//     });
//     setIsModalOpen(true);
//   };

//   // Handler Buka Modal Edit
//   const handleOpenEditModal = (item: ScheduleItem) => {
//     setEditingItem(item);
//     setFormData({
//       hari: item.hari,
//       tugas: item.tugas || "",
//       waktu: item.waktu || "16:00 - 17:00 WIB",
//       isLibur: item.isLibur || false,
//       petugasNames: item.petugas?.map((p) => p.nama).join(", ") || "",
//     });
//     setIsModalOpen(true);
//   };

//   // Handler Hapus Data
//   const handleDelete = (hari: string) => {
//     if (confirm(`Apakah Anda yakin ingin menghapus jadwal untuk Hari ${hari}?`)) {
//       setSchedules((prev) => prev.filter((item) => item.hari !== hari));
//     }
//   };

//   // Handler Simpan Data (Create & Update)
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const parsedPetugas = formData.petugasNames
//       ? formData.petugasNames
//           .split(",")
//           .map((n) => n.trim())
//           .filter((n) => n.length > 0)
//           .map((nama, idx) => ({
//             id: `STR-${Date.now()}-${idx}`,
//             nama,
//           }))
//       : [];

//     const updatedData: ScheduleItem = {
//       hari: formData.hari,
//       isLibur: formData.isLibur,
//       tugas: formData.isLibur ? undefined : formData.tugas,
//       waktu: formData.isLibur ? undefined : formData.waktu,
//       petugas: formData.isLibur ? [] : parsedPetugas,
//     };

//     setSchedules((prev) => {
//       const exists = prev.some((s) => s.hari === formData.hari);
//       if (exists) {
//         return prev.map((item) =>
//           item.hari === formData.hari ? updatedData : item
//         );
//       }
//       return [...prev, updatedData];
//     });

//     setIsSubmitting(false);
//     setIsModalOpen(false);
//   };

//   const filteredSchedules = schedules.filter(
//     (item) =>
//       item.hari.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (item.tugas && item.tugas.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   const totalItems = filteredSchedules.length;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedSchedules = filteredSchedules.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

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
//       {/* 🚀 Hero Banner Header */}
//       <div className="relative overflow-hidden rounded-2xl sm:rounded-[28px] bg-gradient-to-r from-[#14352c] via-[#1b4338] to-[#235346] p-5 sm:p-8 text-white shadow-xl shadow-[#14352c]/10">
//         <div className="absolute top-0 right-0 -mt-12 -mr-12 w-48 sm:w-64 h-48 sm:h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
//         <div className="absolute bottom-0 left-1/3 -mb-12 w-36 sm:w-48 h-36 sm:h-48 bg-[#c1663c]/20 rounded-full blur-2xl pointer-events-none" />

//         <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//           <div>
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-emerald-200 text-[11px] sm:text-xs font-medium mb-2.5">
//               <Sparkles className="h-3.5 w-3.5 text-[#c1663c]" />
//               <span>Manajemen Kebersihan Majelis</span>
//             </div>
//             <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
//               Jadwal Piket Santri
//             </h1>
//             <p className="text-emerald-100/70 text-xs sm:text-sm mt-1 max-w-lg leading-relaxed">
//               Monitoring dan atur pembagian tugas harian kebersihan serta kerapihan Majelis Al-Inayah.
//             </p>
//           </div>

//           <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto flex-wrap">
//             <button
//               type="button"
//               onClick={handleOpenAddModal}
//               className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#c1663c] hover:bg-[#a8542e] text-white text-xs font-bold shadow-md transition-all cursor-pointer active:scale-95"
//             >
//               <Plus className="h-4 w-4" />
//               <span>Tambah Jadwal Baru</span>
//             </button>

//             <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 flex items-center gap-2.5">
//               <Calendar className="h-4 w-4 text-[#c1663c]" />
//               <p className="text-xs font-bold">
//                 {schedules.filter((s) => !s.isLibur).length} Hari Aktif
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* 🔍 Search Bar & Quick Info */}
//       <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3 border border-gray-100/80 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
//         <div className="relative w-full sm:w-80">
//           <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={handleSearchChange}
//             placeholder="Cari hari atau jenis tugas..."
//             className="w-full pl-10 pr-4 py-2 sm:py-2.5 bg-gray-50/80 border border-gray-200/80 rounded-xl text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#102d25]/15 focus:border-[#102d25] focus:bg-white transition-all"
//           />
//         </div>

//         <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end text-xs text-gray-500 font-medium px-1">
//           <span>Menampilkan:</span>
//           <span className="font-bold text-[#14352c] bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-100">
//             {totalItems} Hari
//           </span>
//         </div>
//       </div>

//       {/* 🎴 Grid Cards */}
//       {paginatedSchedules.length > 0 ? (
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={currentPage}
//             initial={{ opacity: 0, y: 8 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -8 }}
//             transition={{ duration: 0.2 }}
//             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5"
//           >
//             {paginatedSchedules.map((item) => (
//               <JadwalCard
//                 key={item.hari}
//                 item={item}
//                 onEdit={handleOpenEditModal}
//                 onDelete={handleDelete}
//               />
//             ))}
//           </motion.div>
//         </AnimatePresence>
//       ) : (
//         <div className="py-16 text-center text-gray-400 bg-white/80 rounded-3xl border border-gray-100 text-xs font-semibold">
//           Jadwal piket tidak ditemukan.
//         </div>
//       )}

//       {/* 📄 Pagination */}
//       {totalPages > 1 && (
//         <div className="pt-2">
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={(page) => setCurrentPage(page)}
//           />
//         </div>
//       )}

//       {/* 🛠 Modal */}
//       <JadwalModal
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

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Calendar, Search, Plus, Loader2 } from "lucide-react";
import { ScheduleItem, JadwalFormData, MuridOption, HARI_LIST } from "./types";
import { createClient } from "@/lib/supabase/client";
import JadwalCard from "./_components/JadwalCard";
import JadwalModal from "./_components/JadwalModal";
import Pagination from "./_components/Pagination";

export default function JadwalPiketPage() {
  const supabase = createClient();

  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [muridOptions, setMuridOptions] = useState<MuridOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ScheduleItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [formData, setFormData] = useState<JadwalFormData>({
    hari: "Senin",
    tugas: "",
    waktu: "16:00 - 17:00 WIB",
    isLibur: false,
    petugasIds: [],
  });

  const assignedElsewhereMap = useMemo(() => {
    const map: Record<number, string> = {};
    schedules.forEach((s) => {
      if (s.hari === formData.hari) return; 
      s.petugas.forEach((p) => {
        map[p.id] = s.hari;
      });
    });
    return map;
  }, [schedules, formData.hari]);

  const fetchJadwalPiket = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("jadwal_piket")
        .select(
          `
          id,
          hari,
          is_libur,
          tugas,
          waktu,
          urutan,
          piket_petugas (
            murid_id,
            murid ( id, nama )
          )
        `
        )
        .order("urutan", { ascending: true });

      if (error) throw error;

      const mapped: ScheduleItem[] = (data || []).map((row: any) => ({
        id: row.id,
        hari: row.hari,
        isLibur: row.is_libur,
        tugas: row.tugas,
        waktu: row.waktu,
        petugas: (row.piket_petugas || [])
          .map((pp: any) => pp.murid)
          .filter(Boolean)
          .map((m: any) => ({ id: m.id, nama: m.nama })),
      }));

      setSchedules(mapped);
    } catch (err) {
      console.error("Error fetching jadwal piket:", err);
      alert("Gagal mengambil data jadwal piket.");
    } finally {
      setIsLoading(false);
    }
  }, [supabase]);

  const fetchMuridOptions = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("murid")
        .select("id, nama")
        .order("nama", { ascending: true });

      if (error) throw error;
      if (data) setMuridOptions(data);
    } catch (err) {
      console.error("Error fetching murid:", err);
    }
  }, [supabase]);

  useEffect(() => {
    fetchJadwalPiket();
    fetchMuridOptions();
  }, [fetchJadwalPiket, fetchMuridOptions]);

  const openModalForHari = (hari: ScheduleItem["hari"]) => {
    const existing = schedules.find((s) => s.hari === hari) || null;
    setEditingItem(existing);
    setFormData({
      hari,
      tugas: existing?.tugas || "",
      waktu: existing?.waktu || "16:00 - 17:00 WIB",
      isLibur: existing?.isLibur || false,
      petugasIds: existing?.petugas.map((p) => p.id) || [],
    });
    setIsModalOpen(true);
  };

  const handleOpenAddModal = () => {
    const emptyHari = schedules.find(
      (s) => !s.isLibur && !s.tugas && s.petugas.length === 0
    );
    openModalForHari(emptyHari?.hari || "Senin");
  };

  const handleOpenEditModal = (item: ScheduleItem) => {
    openModalForHari(item.hari);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const existing = schedules.find((s) => s.hari === formData.hari);
      const urutan = HARI_LIST.indexOf(formData.hari) + 1;

      const { data: upsertedRow, error: upsertError } = await supabase
        .from("jadwal_piket")
        .upsert(
          {
            id: existing?.id, 
            hari: formData.hari,
            is_libur: formData.isLibur,
            tugas: formData.isLibur ? null : formData.tugas,
            waktu: formData.isLibur ? null : formData.waktu,
            urutan,
          },
          { onConflict: "hari" }
        )
        .select("id")
        .single();

      if (upsertError) throw upsertError;
      const jadwalId = upsertedRow.id;

      const { error: deleteError } = await supabase
        .from("piket_petugas")
        .delete()
        .eq("jadwal_id", jadwalId);

      if (deleteError) throw deleteError;

      const petugasIds = formData.isLibur ? [] : formData.petugasIds;
      if (petugasIds.length > 0) {
        const { error: insertError } = await supabase
          .from("piket_petugas")
          .insert(
            petugasIds.map((murid_id) => ({
              jadwal_id: jadwalId,
              murid_id,
            }))
          );

        if (insertError) throw insertError;
      }

      await fetchJadwalPiket();
      setIsModalOpen(false);
    } catch (err: any) {
      console.error("Error saving jadwal:", err);
      alert(err?.message || "Gagal menyimpan jadwal ke Supabase.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (hari: string) => {
    const item = schedules.find((s) => s.hari === hari);
    if (!item) return;

    if (
      !confirm(
        `Ini akan mengosongkan WAKTU, TUGAS, dan SEMUA petugas (${item.petugas
          .map((p) => p.nama)
          .join(", ") || "tidak ada"}) untuk Hari ${hari}.\n\nLanjutkan?`
      )
    )
      return;

    try {
      const { data: updatedRows, error: updateError } = await supabase
        .from("jadwal_piket")
        .update({ is_libur: false, tugas: null, waktu: null })
        .eq("id", item.id)
        .select("id");

      if (updateError) throw updateError;
      if (!updatedRows || updatedRows.length === 0) {
        throw new Error(
          "Update tidak mengubah data apa pun. Kemungkinan diblokir oleh RLS (Row Level Security) pada tabel jadwal_piket."
        );
      }

      const { error: deleteError } = await supabase
        .from("piket_petugas")
        .delete()
        .eq("jadwal_id", item.id);

      if (deleteError) throw deleteError;

      await fetchJadwalPiket();
    } catch (err: any) {
      console.error("Error resetting jadwal:", err);
      alert(err?.message || "Gagal mengosongkan jadwal.");
    }
  };

  const handleRemovePetugas = async (item: ScheduleItem, muridId: number) => {
    const murid = item.petugas.find((p) => p.id === muridId);
    if (
      !confirm(
        `Lepas ${murid?.nama || "petugas ini"} dari piket Hari ${item.hari}? Tugas & waktu hari ini tetap tersimpan.`
      )
    )
      return;

    try {
      const { error } = await supabase
        .from("piket_petugas")
        .delete()
        .eq("jadwal_id", item.id)
        .eq("murid_id", muridId);

      if (error) throw error;

      await fetchJadwalPiket();
    } catch (err: any) {
      console.error("Error removing petugas:", err);
      alert(err?.message || "Gagal melepas petugas.");
    }
  };

  const filteredSchedules = schedules.filter(
    (item) =>
      item.hari.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.tugas && item.tugas.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalItems = filteredSchedules.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSchedules = filteredSchedules.slice(
    startIndex,
    startIndex + itemsPerPage
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
              <span>Manajemen Kebersihan Majelis</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
              Jadwal Piket Santri
            </h1>
            <p className="text-emerald-100/70 text-xs sm:text-sm mt-1 max-w-lg leading-relaxed">
              Monitoring dan atur pembagian tugas harian kebersihan serta
              kerapihan Majelis Al-Inayah.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto flex-wrap">
            <button
              type="button"
              onClick={handleOpenAddModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#c1663c] hover:bg-[#a8542e] text-white text-xs font-bold shadow-md transition-all cursor-pointer active:scale-95"
            >
              <Plus className="h-4 w-4" />
              <span>Isi / Ubah Jadwal</span>
            </button>

            <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 flex items-center gap-2.5">
              <Calendar className="h-4 w-4 text-[#c1663c]" />
              <p className="text-xs font-bold">
                {schedules.filter((s) => !s.isLibur).length} Hari Aktif
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3 border border-gray-100/80 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Cari hari atau jenis tugas..."
            className="w-full pl-10 pr-4 py-2 sm:py-2.5 bg-gray-50/80 border border-gray-200/80 rounded-xl text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#102d25]/15 focus:border-[#102d25] focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end text-xs text-gray-500 font-medium px-1">
          <span>Menampilkan:</span>
          <span className="font-bold text-[#14352c] bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-100">
            {totalItems} Hari
          </span>
        </div>
      </div>

      {isLoading ? (
        <div className="py-20 text-center text-gray-400 bg-white/80 rounded-3xl border border-gray-100">
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-[#102d25]" />
            <span className="text-xs sm:text-sm font-medium">
              Memuat jadwal piket...
            </span>
          </div>
        </div>
      ) : paginatedSchedules.length > 0 ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5"
          >
            {paginatedSchedules.map((item) => (
              <JadwalCard
                key={item.id}
                item={item}
                onEdit={handleOpenEditModal}
                onDelete={handleDelete}
                onRemovePetugas={handleRemovePetugas}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      ) : (
        <div className="py-16 text-center text-gray-400 bg-white/80 rounded-3xl border border-gray-100 text-xs font-semibold">
          Jadwal piket tidak ditemukan.
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

      <JadwalModal
        isOpen={isModalOpen}
        editingItem={editingItem}
        formData={formData}
        muridOptions={muridOptions}
        assignedElsewhereMap={assignedElsewhereMap}
        isSubmitting={isSubmitting}
        onClose={() => setIsModalOpen(false)}
        onChange={setFormData}
        onSubmit={handleSubmit}
        onHariChange={(hari) => openModalForHari(hari)}
      />
    </motion.div>
  );
}
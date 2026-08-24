"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Plus, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { ProgramInfaq, ProgramFormData } from "./types";
import ProgramCard from "./_components/ProgramCard";
import ProgramFilter, { StatusFilter } from "./_components/ProgramFilter";
import ProgramModal from "./_components/ProgramModal";
import Pagination from "./_components/Pagination";

export default function ProgramInfaqPage() {
  const supabase = createClient();

  const [programs, setPrograms] = useState<ProgramInfaq[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("Semua");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ProgramInfaq | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ProgramFormData>({
    judul: "",
    deskripsi: "",
    gambar: "",
    target: "",
    isActive: false,
  });

  // 📥 FETCH DATA: program_donasi + hitung terkumpul dari donasi terverifikasi
  const fetchPrograms = useCallback(async () => {
    setIsLoading(true);
    try {
      const [programRes, donasiRes] = await Promise.all([
        supabase.from("program_donasi").select("*").order("id", { ascending: true }),
        supabase
          .from("donasi")
          .select("program_id, nominal")
          .eq("status", "Terverifikasi"),
      ]);

      if (programRes.error) throw programRes.error;
      if (donasiRes.error) throw donasiRes.error;

      // Jumlahkan nominal donasi terverifikasi per program_id
      const terkumpulMap: Record<number, number> = {};
      (donasiRes.data || []).forEach((row: any) => {
        if (row.program_id == null) return;
        terkumpulMap[row.program_id] =
          (terkumpulMap[row.program_id] || 0) + Number(row.nominal);
      });

      const mapped: ProgramInfaq[] = (programRes.data || []).map((row: any) => ({
        id: row.id,
        judul: row.nama,
        deskripsi: row.deskripsi,
        gambar: row.gambar,
        target: row.target !== null ? Number(row.target) : null,
        terkumpul: terkumpulMap[row.id] || 0,
        isActive: row.is_active,
      }));

      setPrograms(mapped);
    } catch (err: any) {
      console.error("Error fetching program_donasi:", err);
      alert(err?.message || "Gagal mengambil data program.");
    } finally {
      setIsLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchPrograms();
  }, [fetchPrograms]);

  // 🚪 Buka modal (tambah / edit)
  const handleOpenModal = (item?: ProgramInfaq) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        judul: item.judul,
        deskripsi: item.deskripsi || "",
        gambar: item.gambar || "",
        target: item.target ? String(item.target) : "",
        isActive: item.isActive,
      });
    } else {
      setEditingItem(null);
      setFormData({
        judul: "",
        deskripsi: "",
        gambar: "",
        target: "",
        isActive: false,
      });
    }
    setIsModalOpen(true);
  };

  // 💾 INSERT & UPDATE KE SUPABASE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const targetNumber = Number(formData.target);
    if (!formData.judul.trim()) return;
    if (!targetNumber || targetNumber <= 0) {
      alert("Target dana harus lebih besar dari 0.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        nama: formData.judul.trim(),
        deskripsi: formData.deskripsi.trim() || null,
        gambar: formData.gambar.trim() || null,
        target: targetNumber,
        is_active: formData.isActive,
      };

      if (editingItem) {
        const { error } = await supabase
          .from("program_donasi")
          .update(payload)
          .eq("id", editingItem.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("program_donasi").insert([payload]);
        if (error) throw error;
      }

      await fetchPrograms();
      setIsModalOpen(false);
    } catch (err: any) {
      console.error("Error saving program_donasi:", err);
      alert(err?.message || "Gagal menyimpan program.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🗑 DELETE DARI SUPABASE
  const handleDelete = async (item: ProgramInfaq) => {
    if (
      !confirm(
        `Hapus program "${item.judul}"? Donasi yang sudah tercatat di program ini akan tetap ada, tapi tidak lagi terhubung ke program manapun.`
      )
    )
      return;

    try {
      const { error } = await supabase
        .from("program_donasi")
        .delete()
        .eq("id", item.id);

      if (error) throw error;

      setPrograms((prev) => prev.filter((p) => p.id !== item.id));
    } catch (err: any) {
      console.error("Error deleting program_donasi:", err);
      alert(err?.message || "Gagal menghapus program.");
    }
  };

  // 🔍 Filter Data
  const filteredPrograms = programs.filter((item) => {
    const matchesSearch = item.judul
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "Semua" ||
      (statusFilter === "Aktif" && item.isActive) ||
      (statusFilter === "Nonaktif" && !item.isActive);

    return matchesSearch && matchesStatus;
  });

  // 📊 Pagination
  const totalPages = Math.ceil(filteredPrograms.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPrograms = filteredPrograms.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: StatusFilter) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="p-3.5 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto"
    >
      {/* Hero Banner Header */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-[28px] bg-gradient-to-r from-[#14352c] via-[#1b4338] to-[#235346] p-5 sm:p-8 text-white shadow-xl shadow-[#14352c]/10">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-48 sm:w-64 h-48 sm:h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-36 sm:w-48 h-36 sm:h-48 bg-[#c1663c]/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-emerald-200 text-[11px] sm:text-xs font-medium mb-2.5">
              <Sparkles className="h-3.5 w-3.5 text-[#c1663c]" />
              <span>Konten Publik</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
              Program &amp; Infaq
            </h1>
            <p className="text-emerald-100/70 text-xs sm:text-sm mt-1 max-w-lg leading-relaxed">
              Kelola program penggalangan dana yang tampil di halaman publik
              website Majelis Al-Inayah.
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleOpenModal()}
            className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-[#c1663c] hover:bg-[#d47244] text-white text-xs font-bold shadow-lg shadow-[#c1663c]/25 transition-all duration-200 cursor-pointer active:scale-95 shrink-0 w-full sm:w-auto"
          >
            <Plus className="h-4 w-4" />
            <span>Tambah Program</span>
          </button>
        </div>
      </div>

      {/* Filter */}
      <ProgramFilter
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        statusFilter={statusFilter}
        onStatusChange={handleStatusChange}
      />

      {/* Grid Program */}
      {isLoading ? (
        <div className="py-20 text-center text-gray-400 bg-white/80 rounded-3xl border border-gray-100">
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-[#102d25]" />
            <span className="text-xs sm:text-sm font-medium">
              Memuat data program...
            </span>
          </div>
        </div>
      ) : paginatedPrograms.length > 0 ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5"
          >
            {paginatedPrograms.map((item) => (
              <ProgramCard
                key={item.id}
                item={item}
                onEdit={handleOpenModal}
                onDelete={handleDelete}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      ) : (
        <div className="py-16 text-center text-gray-400 bg-white/80 rounded-3xl border border-gray-100 text-xs font-semibold">
          Tidak ada program ditemukan.
        </div>
      )}

      {totalPages > 1 && (
        <div className="pt-2 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* Modal Tambah/Edit */}
      <ProgramModal
        isOpen={isModalOpen}
        editingItem={editingItem}
        formData={formData}
        isSubmitting={isSubmitting}
        onClose={() => setIsModalOpen(false)}
        onChange={setFormData}
        onSubmit={handleSubmit}
      />
    </motion.div>
  );
}
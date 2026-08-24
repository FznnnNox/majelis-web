"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Loader2, Camera } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { GaleriItem, GaleriFormData } from "./types";
import GaleriCard from "./_components/GaleriCard";
import GaleriFilter from "./_components/GaleriFilter";
import GaleriModal from "./_components/GaleriModal";
import Pagination from "./_components/Pagination";

const todayISO = () => new Date().toISOString().slice(0, 10);

export default function GaleriPage() {
  const supabase = createClient();

  const [items, setItems] = useState<GaleriItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterKategori, setFilterKategori] = useState("Semua");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GaleriItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<GaleriFormData>({
    judul: "",
    kategori: "rutin",
    gambar: "",
    tanggal: todayISO(),
  });

  // 📥 1. FETCH DATA DARI SUPABASE
  const fetchGaleri = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("galeri_kegiatan")
        .select("*")
        .order("tanggal", { ascending: false })
        .order("id", { ascending: false });

      if (error) throw error;

      const mapped: GaleriItem[] = (data || []).map((row: any) => ({
        id: row.id,
        judul: row.judul,
        kategori: row.kategori,
        gambar: row.gambar,
        tanggal: row.tanggal,
      }));

      setItems(mapped);
    } catch (err: any) {
      console.error("Error fetching galeri_kegiatan:", err);
      alert(err?.message || "Gagal mengambil data galeri.");
    } finally {
      setIsLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchGaleri();
  }, [fetchGaleri]);

  // 🚪 Buka modal (tambah / edit)
  const handleOpenModal = (item?: GaleriItem) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        judul: item.judul,
        kategori: item.kategori,
        gambar: item.gambar || "",
        tanggal: item.tanggal,
      });
    } else {
      setEditingItem(null);
      setFormData({
        judul: "",
        kategori: "rutin",
        gambar: "",
        tanggal: todayISO(),
      });
    }
    setIsModalOpen(true);
  };

  // 💾 2. INSERT & UPDATE KE SUPABASE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.judul.trim()) return;

    setIsSubmitting(true);

    try {
      const payload = {
        judul: formData.judul.trim(),
        kategori: formData.kategori,
        gambar: formData.gambar.trim() || null,
        tanggal: formData.tanggal,
      };

      if (editingItem) {
        const { error } = await supabase
          .from("galeri_kegiatan")
          .update(payload)
          .eq("id", editingItem.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("galeri_kegiatan").insert([payload]);
        if (error) throw error;
      }

      await fetchGaleri();
      setIsModalOpen(false);
    } catch (err: any) {
      console.error("Error saving galeri_kegiatan:", err);
      alert(err?.message || "Gagal menyimpan dokumentasi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🗑 3. DELETE DARI SUPABASE
  const handleDelete = async (item: GaleriItem) => {
    if (!confirm(`Hapus dokumentasi "${item.judul}"? Tindakan ini tidak bisa dibatalkan.`))
      return;

    try {
      const { error } = await supabase
        .from("galeri_kegiatan")
        .delete()
        .eq("id", item.id);

      if (error) throw error;

      setItems((prev) => prev.filter((i) => i.id !== item.id));
    } catch (err: any) {
      console.error("Error deleting galeri_kegiatan:", err);
      alert(err?.message || "Gagal menghapus dokumentasi.");
    }
  };

  // 🔍 Filter Data
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.judul
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesKategori =
      filterKategori === "Semua" || item.kategori === filterKategori;

    return matchesSearch && matchesKategori;
  });

  // 📊 Pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (value: string) => {
    setFilterKategori(value);
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
              <Camera className="h-3.5 w-3.5 text-[#c1663c]" />
              <span>Konten Publik</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
              Galeri Kegiatan
            </h1>
            <p className="text-emerald-100/70 text-xs sm:text-sm mt-1 max-w-lg leading-relaxed">
              Kelola dokumentasi kegiatan yang tampil di halaman publik
              website Majelis Al-Inayah.
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleOpenModal()}
            className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-[#c1663c] hover:bg-[#d47244] text-white text-xs font-bold shadow-lg shadow-[#c1663c]/25 transition-all duration-200 cursor-pointer active:scale-95 shrink-0 w-full sm:w-auto"
          >
            <Plus className="h-4 w-4" />
            <span>Tambah Dokumentasi</span>
          </button>
        </div>
      </div>

      {/* Filter */}
      <GaleriFilter
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        filterKategori={filterKategori}
        onFilterChange={handleFilterChange}
      />

      {/* Grid Galeri */}
      {isLoading ? (
        <div className="py-20 text-center text-gray-400 bg-white/80 rounded-3xl border border-gray-100">
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-[#102d25]" />
            <span className="text-xs sm:text-sm font-medium">
              Memuat data galeri...
            </span>
          </div>
        </div>
      ) : paginatedItems.length > 0 ? (
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5"
          >
            {paginatedItems.map((item) => (
              <GaleriCard
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
          Tidak ada dokumentasi ditemukan.
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
      <GaleriModal
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
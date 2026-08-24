"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Download, Plus, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Donasi, DonasiFormData, ProgramDonasi } from "./types";
import DonasiCampaign from "./_components/DonasiCampaign";
import DonasiRekening from "./_components/DonasiRekening";
import DonasiFilter from "./_components/DonasiFilter";
import DonasiCard from "./_components/DonasiCard";
import DonasiTable from "./_components/DonasiTable";
import DonasiModal from "./_components/DonasiModal";
import Pagination from "./_components/Pagination";

const todayISO = () => new Date().toISOString().slice(0, 10);

export default function DonasiPage() {
  const supabase = createClient();

  const [donations, setDonations] = useState<Donasi[]>([]);
  const [programs, setPrograms] = useState<ProgramDonasi[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterProgramId, setFilterProgramId] = useState("Semua");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Donasi | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<DonasiFormData>({
    donatur: "",
    tanggal: todayISO(),
    programId: "",
    nominal: "",
    metode: "Transfer Bank (BSI)",
    status: "Pending",
    pesan: "",
  });

  // 📥 1. FETCH PROGRAM DONASI
  const fetchPrograms = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("program_donasi")
        .select("*")
        .order("id", { ascending: true });

      if (error) throw error;

      const mapped: ProgramDonasi[] = (data || []).map((row: any) => ({
        id: row.id,
        nama: row.nama,
        deskripsi: row.deskripsi,
        target: row.target !== null ? Number(row.target) : null,
      }));

      setPrograms(mapped);
    } catch (err: any) {
      console.error("Error fetching program_donasi:", err);
    }
  }, [supabase]);

  // 📥 2. FETCH DATA DONASI (join ke program_donasi)
  const fetchDonasi = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("donasi")
        .select(
          `
          id,
          donatur,
          tanggal,
          program_id,
          nominal,
          metode,
          status,
          pesan,
          program_donasi ( nama )
        `
        )
        .order("tanggal", { ascending: false })
        .order("id", { ascending: false });

      if (error) throw error;

      const mapped: Donasi[] = (data || []).map((row: any) => ({
        id: row.id,
        donatur: row.donatur,
        tanggal: row.tanggal,
        programId: row.program_id,
        programNama: row.program_donasi?.nama || "Tanpa Program",
        nominal: Number(row.nominal),
        metode: row.metode,
        status: row.status,
        pesan: row.pesan,
      }));

      setDonations(mapped);
    } catch (err: any) {
      console.error("Error fetching donasi:", err);
      alert(err?.message || "Gagal mengambil data donasi.");
    } finally {
      setIsLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchPrograms();
    fetchDonasi();
  }, [fetchPrograms, fetchDonasi]);

  // 🚪 Buka modal (tambah / edit)
  const handleOpenModal = (item?: Donasi) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        donatur: item.donatur,
        tanggal: item.tanggal,
        programId: item.programId ? String(item.programId) : "",
        nominal: String(item.nominal),
        metode: item.metode,
        status: item.status,
        pesan: item.pesan || "",
      });
    } else {
      setEditingItem(null);
      setFormData({
        donatur: "",
        tanggal: todayISO(),
        programId: "",
        nominal: "",
        metode: "Transfer Bank (BSI)",
        status: "Pending",
        pesan: "",
      });
    }
    setIsModalOpen(true);
  };

  // 💾 3. INSERT & UPDATE KE SUPABASE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nominalNumber = Number(formData.nominal);
    if (!formData.donatur.trim()) return;
    if (!nominalNumber || nominalNumber <= 0) {
      alert("Nominal harus lebih besar dari 0.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        donatur: formData.donatur.trim(),
        tanggal: formData.tanggal,
        program_id: formData.programId ? Number(formData.programId) : null,
        nominal: nominalNumber,
        metode: formData.metode,
        status: formData.status,
        pesan: formData.pesan.trim() || null,
      };

      if (editingItem) {
        const { error } = await supabase
          .from("donasi")
          .update(payload)
          .eq("id", editingItem.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("donasi").insert([payload]);
        if (error) throw error;
      }

      await fetchDonasi();
      setIsModalOpen(false);
    } catch (err: any) {
      console.error("Error saving donasi:", err);
      alert(err?.message || "Gagal menyimpan catatan donasi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🗑 4. DELETE DARI SUPABASE
  const handleDelete = async (item: Donasi) => {
    if (
      !confirm(
        `Hapus catatan donasi dari "${item.donatur}" sebesar Rp ${item.nominal.toLocaleString(
          "id-ID"
        )}? Tindakan ini tidak bisa dibatalkan.`
      )
    )
      return;

    try {
      const { error } = await supabase.from("donasi").delete().eq("id", item.id);
      if (error) throw error;

      setDonations((prev) => prev.filter((d) => d.id !== item.id));
    } catch (err: any) {
      console.error("Error deleting donasi:", err);
      alert(err?.message || "Gagal menghapus catatan donasi.");
    }
  };

  // 🎯 Program unggulan (yang punya target) untuk kartu progress
  const featuredProgram = useMemo(
    () => programs.find((p) => p.target !== null && p.target > 0) || null,
    [programs]
  );

  const featuredTerkumpul = useMemo(() => {
    if (!featuredProgram) return 0;
    return donations
      .filter(
        (d) => d.programId === featuredProgram.id && d.status === "Terverifikasi"
      )
      .reduce((acc, curr) => acc + curr.nominal, 0);
  }, [donations, featuredProgram]);

  // 🔍 Filter Data
  const filteredDonations = donations.filter((item) => {
    const matchesSearch =
      item.donatur.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(item.id).includes(searchTerm.toLowerCase()) ||
      item.programNama.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesProgram =
      filterProgramId === "Semua" ||
      String(item.programId) === filterProgramId;

    return matchesSearch && matchesProgram;
  });

  // 📊 Pagination
  const totalPages = Math.ceil(filteredDonations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDonations = filteredDonations.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (value: string) => {
    setFilterProgramId(value);
    setCurrentPage(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 sm:space-y-8 pb-10"
    >
      {/* Top Banner Header */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-[28px] bg-gradient-to-r from-[#14352c] via-[#1b4338] to-[#235346] p-5 sm:p-8 text-white shadow-xl shadow-[#14352c]/10">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-48 sm:w-64 h-48 sm:h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-36 sm:w-48 h-36 sm:h-48 bg-[#c1663c]/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-emerald-200 text-[11px] sm:text-xs font-medium mb-2.5">
              <Sparkles className="h-3.5 w-3.5 text-[#c1663c]" />
              <span>Infaq &amp; Sedekah Jariyah</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
              Donasi Majelis Al-Inayah
            </h1>
            <p className="text-emerald-100/70 text-xs sm:text-sm mt-1 max-w-lg leading-relaxed">
              Pengelolaan dana infaq, wakaf, dan sedekah untuk sarana
              prasarana serta kegiatan santri Kampung Panggang.
            </p>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <button
              type="button"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl sm:rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md border border-white/15 transition-all duration-200 cursor-pointer active:scale-95"
            >
              <Download className="h-4 w-4" />
              <span>Laporan Donasi</span>
            </button>

            <button
              type="button"
              onClick={() => handleOpenModal()}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl sm:rounded-2xl bg-[#c1663c] hover:bg-[#d47244] text-white text-xs font-bold shadow-lg shadow-[#c1663c]/25 transition-all duration-200 cursor-pointer active:scale-95"
            >
              <Plus className="h-4 w-4" />
              <span>Catat Donasi</span>
            </button>
          </div>
        </div>
      </div>

      {/* Target Campaign Progress & Payment Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {featuredProgram ? (
          <DonasiCampaign
            nama={featuredProgram.nama}
            deskripsi={featuredProgram.deskripsi}
            target={featuredProgram.target as number}
            terkumpul={featuredTerkumpul}
          />
        ) : (
          <div className="lg:col-span-2 bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-5 sm:p-6 shadow-xs flex items-center justify-center text-gray-400 text-xs font-medium">
            Belum ada program dengan target donasi.
          </div>
        )}
        <DonasiRekening />
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-xs overflow-hidden">
        <DonasiFilter
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          filterProgramId={filterProgramId}
          onFilterChange={handleFilterChange}
          programs={programs}
        />

        {isLoading ? (
          <div className="py-20 text-center text-gray-400">
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-[#102d25]" />
              <span className="text-xs sm:text-sm font-medium">
                Memuat data donasi...
              </span>
            </div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <DonasiCard
                donations={paginatedDonations}
                onEdit={handleOpenModal}
                onDelete={handleDelete}
              />
              <DonasiTable
                donations={paginatedDonations}
                onEdit={handleOpenModal}
                onDelete={handleDelete}
              />
            </motion.div>
          </AnimatePresence>
        )}

        <div className="p-4 sm:p-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p className="font-medium text-center sm:text-left">
            Menampilkan{" "}
            <span className="font-bold text-gray-900">
              {filteredDonations.length === 0 ? 0 : startIndex + 1}
              {"–"}
              {Math.min(startIndex + itemsPerPage, filteredDonations.length)}
            </span>{" "}
            dari{" "}
            <span className="font-bold text-gray-900">
              {filteredDonations.length}
            </span>{" "}
            catatan donasi
          </p>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* Modal Tambah/Edit */}
      <DonasiModal
        isOpen={isModalOpen}
        editingItem={editingItem}
        formData={formData}
        programs={programs}
        isSubmitting={isSubmitting}
        onClose={() => setIsModalOpen(false)}
        onChange={setFormData}
        onSubmit={handleSubmit}
      />
    </motion.div>
  );
}
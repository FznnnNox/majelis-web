"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Sparkles, Download, Plus, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Transaksi, TransaksiFormData, FilterKategori, Murid } from "./types";
import KasSummary from "./_components/KasSummary";
import KasFilter from "./_components/KasFilter";
import KasCard from "./_components/KasCard";
import KasTable from "./_components/KasTable";
import KasModal from "./_components/KasModal";
import Pagination from "./_components/Pagination";

const todayISO = () => new Date().toISOString().slice(0, 10);

export default function UangKasPage() {
  const supabase = createClient();

  // State Data
  const [transactions, setTransactions] = useState<Transaksi[]>([]);
  const [murids, setMurids] = useState<Murid[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // State Filter & Pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [filterKategori, setFilterKategori] = useState<FilterKategori>("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // State Modal & Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Transaksi | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<TransaksiFormData>({
    tanggal: todayISO(),
    kategori: "Pemasukan",
    keterangan: "",
    jumlah: "",
    murid_id: "",
  });

  const fetchMurid = useCallback(async () => {
    const { data, error } = await supabase
      .from("murid")
      .select("id, nama")
      .order("nama", { ascending: true });
    
    if (!error && data) {
      setMurids(data);
    }
  }, [supabase]);

  const fetchTransaksi = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("kas_transaksi")
        .select("*, murid(nama)") // Melakukan JOIN ke tabel murid
        .order("tanggal", { ascending: false })
        .order("id", { ascending: false });

      if (error) throw error;

      const mapped: Transaksi[] = (data || []).map((row: any) => ({
        id: row.id,
        tanggal: row.tanggal,
        kategori: row.kategori,
        keterangan: row.keterangan,
        jumlah: Number(row.jumlah),
        murid_id: row.murid_id,
        murid_nama: row.murid?.nama || "Tidak diketahui",
      }));

      setTransactions(mapped);
    } catch (err: any) {
      console.error("Error fetching kas_transaksi:", err);
      alert(err?.message || "Gagal mengambil data kas.");
    } finally {
      setIsLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchMurid();
    fetchTransaksi();
  }, [fetchMurid, fetchTransaksi]);

  const handleOpenModal = (item?: Transaksi) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        tanggal: item.tanggal,
        kategori: item.kategori,
        keterangan: item.keterangan,
        jumlah: String(item.jumlah),
        murid_id: item.murid_id,
      });
    } else {
      setEditingItem(null);
      setFormData({
        tanggal: todayISO(),
        kategori: "Pemasukan",
        keterangan: "",
        jumlah: "",
        murid_id: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const jumlahNumber = Number(formData.jumlah.toString().replace(/\./g, ""));
    if (!formData.keterangan.trim() || formData.murid_id === "") return;
    if (!jumlahNumber || jumlahNumber <= 0) {
      alert("Jumlah harus lebih besar dari 0.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        tanggal: formData.tanggal,
        kategori: formData.kategori,
        keterangan: formData.keterangan.trim(),
        jumlah: jumlahNumber,
        murid_id: Number(formData.murid_id),
      };

      if (editingItem) {
        const { error } = await supabase
          .from("kas_transaksi")
          .update(payload)
          .eq("id", editingItem.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("kas_transaksi").insert([payload]);
        if (error) throw error;
      }

      await fetchTransaksi();
      setIsModalOpen(false);
    } catch (err: any) {
      console.error("Error saving kas_transaksi:", err);
      alert(err?.message || "Gagal menyimpan catatan kas.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (item: Transaksi) => {
    if (
      !confirm(
        `Hapus catatan "${item.keterangan}" (${item.kategori}, Rp ${item.jumlah.toLocaleString(
          "id-ID"
        )})? Tindakan ini tidak bisa dibatalkan.`
      )
    )
      return;

    try {
      const { error } = await supabase
        .from("kas_transaksi")
        .delete()
        .eq("id", item.id);

      if (error) throw error;
      setTransactions((prev) => prev.filter((t) => t.id !== item.id));
    } catch (err: any) {
      console.error("Error deleting kas_transaksi:", err);
      alert(err?.message || "Gagal menghapus catatan kas.");
    }
  };

  // ==========================================
  // 3. KALKULASI & FILTERING
  // ==========================================
  const totalPemasukan = transactions
    .filter((t) => t.kategori === "Pemasukan")
    .reduce((acc, curr) => acc + curr.jumlah, 0);

  const totalPengeluaran = transactions
    .filter((t) => t.kategori === "Pengeluaran")
    .reduce((acc, curr) => acc + curr.jumlah, 0);

  const saldoKas = totalPemasukan - totalPengeluaran;

  const filteredTransactions = transactions.filter((item) => {
    const matchesSearch =
      item.keterangan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(item.id).includes(searchTerm.toLowerCase()) ||
      item.murid_nama.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesKategori =
      filterKategori === "Semua" || item.kategori === filterKategori;

    return matchesSearch && matchesKategori;
  });

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (value: FilterKategori) => {
    setFilterKategori(value);
    setCurrentPage(1);
  };

  // ==========================================
  // 4. RENDER UI
  // ==========================================
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 sm:space-y-8 pb-10"
    >
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#14352c] to-[#1a4a3e] p-8 sm:p-10 text-white shadow-xl">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Sparkles className="w-32 h-32" />
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
              Buku Kas Majelis
            </h1>
            <p className="text-[#a4d4c5] text-sm sm:text-base font-medium max-w-md">
              Kelola dan pantau aliran dana kelas dengan lebih transparan, mudah, dan terstruktur.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-5 py-3 rounded-2xl text-sm font-semibold transition-all border border-white/10">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export Laporan</span>
              <span className="sm:hidden">Export</span>
            </button>
            <button
              onClick={() => handleOpenModal()}
              className="flex items-center gap-2 bg-white text-[#1a4a3e] hover:bg-gray-50 px-5 py-3 rounded-2xl text-sm font-bold shadow-lg transition-all"
            >
              <Plus className="w-4 h-4" />
              Tambah Data
            </button>
          </div>
        </div>
      </div>

      {/* Ringkasan Kas */}
      <KasSummary
        saldoKas={saldoKas}
        totalPemasukan={totalPemasukan}
        totalPengeluaran={totalPengeluaran}
      />

      {/* Konten Utama */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <KasFilter
            searchTerm={searchTerm}
            filterKategori={filterKategori}
            onSearchChange={handleSearchChange}
            onFilterChange={handleFilterChange}
          />
        </div>

        <div className="p-6 bg-gray-50/30">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <Loader2 className="w-10 h-10 animate-spin text-[#1a4a3e] mb-4" />
              <p className="text-sm font-medium">Memuat data kas...</p>
            </div>
          ) : filteredTransactions.length === 0 ? (
            <div className="text-center py-16 px-4 bg-white rounded-2xl border border-dashed border-gray-200">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Belum ada transaksi</h3>
              <p className="text-gray-500 text-sm max-w-sm mx-auto">
                Silakan tambah data transaksi baru atau coba sesuaikan kata kunci pencarian Anda.
              </p>
            </div>
          ) : (
            <>
              {/* Tampilan Mobile: Cards */}
              <div className="grid grid-cols-1 gap-4 sm:hidden">
                {paginatedTransactions.map((item) => (
                  <KasCard
                    key={item.id}
                    item={item}
                    onEdit={handleOpenModal}
                    onDelete={handleDelete}
                  />
                ))}
              </div>

              {/* Tampilan Desktop: Table */}
              <div className="hidden sm:block">
                <KasTable
                  transactions={paginatedTransactions}
                  onEdit={handleOpenModal}
                  onDelete={handleDelete}
                />
              </div>

              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal Tambah/Edit */}
      <KasModal
        isOpen={isModalOpen}
        editingItem={editingItem}
        formData={formData}
        murids={murids}
        isSubmitting={isSubmitting}
        onClose={() => setIsModalOpen(false)}
        onChange={setFormData}
        onSubmit={handleSubmit}
      />
    </motion.div>
  );
}
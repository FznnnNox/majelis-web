import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Calendar, 
  FileText, 
  Wallet, 
  UserRound, 
  Loader2, 
  TrendingUp, 
  TrendingDown 
} from "lucide-react";
import { Transaksi, TransaksiFormData, KategoriTransaksi, Murid } from "../types";

const formatRibuan = (value: string) => {
  const numberString = value.replace(/[^,\d]/g, "").toString();
  const split = numberString.split(",");
  const sisa = split[0].length % 3;
  let rupiah = split[0].substr(0, sisa);
  const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  if (ribuan) {
    const separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
  return rupiah;
};

interface Props {
  isOpen: boolean;
  editingItem: Transaksi | null;
  formData: TransaksiFormData;
  murids: Murid[];
  isSubmitting: boolean;
  onClose: () => void;
  onChange: React.Dispatch<React.SetStateAction<TransaksiFormData>>;
  onSubmit: (e: React.FormEvent) => void;
}

export default function KasModal({
  isOpen,
  editingItem,
  formData,
  murids,
  isSubmitting,
  onClose,
  onChange,
  onSubmit,
}: Props) {
  if (!isOpen) return null;

  const setKategori = (kategori: KategoriTransaksi) => {
    onChange((prev) => ({ ...prev, kategori }));
  };

  const handleJumlahChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\./g, ""); // Hapus titik
    if (!isNaN(Number(rawValue))) {
      onChange((prev) => ({ ...prev, jumlah: rawValue }));
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-10"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <h2 className="text-lg font-bold text-gray-800">
              {editingItem ? "Edit Transaksi" : "Tambah Transaksi"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="p-6 space-y-5">
            {/* Kategori Toggle */}
            <div className="grid grid-cols-2 gap-3 bg-gray-50 p-1.5 rounded-2xl">
              <button
                type="button"
                onClick={() => setKategori("Pemasukan")}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  formData.kategori === "Pemasukan"
                    ? "bg-white text-[#1a4a3e] shadow-sm ring-1 ring-gray-200"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100/50"
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                Pemasukan
              </button>
              <button
                type="button"
                onClick={() => setKategori("Pengeluaran")}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  formData.kategori === "Pengeluaran"
                    ? "bg-white text-rose-600 shadow-sm ring-1 ring-gray-200"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100/50"
                }`}
              >
                <TrendingDown className="w-4 h-4" />
                Pengeluaran
              </button>
            </div>

            {/* Pihak Terkait (Dropdown Murid) */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                <UserRound className="h-3.5 w-3.5 text-gray-400" />
                <span>Pihak Terkait (Murid)</span>
              </label>
              <select
              value={formData.murid_id ?? ""}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    murid_id: e.target.value === "" ? "" : Number(e.target.value),
                  }))
                }
                required
                className="w-full h-[42px] px-4 bg-white border border-gray-200 rounded-2xl text-sm font-medium text-gray-800 hover:border-gray-300 focus:outline-none focus:border-gray-900 transition-all cursor-pointer appearance-none"
              >
                <option value="" disabled>-- Pilih Nama Murid --</option>
                {murids.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.nama}
                  </option>
                ))}
              </select>
            </div>

            {/* Tanggal */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-gray-400" />
                <span>Tanggal Transaksi</span>
              </label>
              <input
                type="date"
                required
                value={formData.tanggal}
                onChange={(e) => onChange({ ...formData, tanggal: e.target.value })}
                className="w-full h-[42px] px-4 bg-white border border-gray-200 rounded-2xl text-sm font-medium text-gray-800 hover:border-gray-300 focus:outline-none focus:border-gray-900 transition-all"
              />
            </div>

            {/* Keterangan */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-gray-400" />
                <span>Keterangan</span>
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Bayar kas bulan Februari"
                value={formData.keterangan}
                onChange={(e) => onChange({ ...formData, keterangan: e.target.value })}
                className="w-full h-[42px] px-4 bg-white border border-gray-200 rounded-2xl text-sm font-medium text-gray-800 placeholder-gray-400 hover:border-gray-300 focus:outline-none focus:border-gray-900 transition-all"
              />
            </div>

            {/* Jumlah */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                <Wallet className="h-3.5 w-3.5 text-gray-400" />
                <span>Jumlah (Rp)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-500 font-medium text-sm">Rp</span>
                </div>
                <input
                  type="text"
                  required
                  placeholder="0"
                  value={formatRibuan(formData.jumlah)}
                  onChange={handleJumlahChange}
                  className="w-full h-[42px] pl-11 pr-4 bg-white border border-gray-200 rounded-2xl text-sm font-bold text-gray-800 placeholder-gray-400 hover:border-gray-300 focus:outline-none focus:border-gray-900 transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-[46px] bg-[#1a4a3e] hover:bg-[#14352c] text-white rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  "Simpan Transaksi"
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
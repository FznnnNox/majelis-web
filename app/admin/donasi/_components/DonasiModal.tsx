"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  Wallet,
  UserRound,
  Target,
  MessageSquare,
  CreditCard,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import {
  Donasi,
  DonasiFormData,
  ProgramDonasi,
  METODE_OPTIONS,
  STATUS_OPTIONS,
  formatRibuan,
} from "../types";

interface Props {
  isOpen: boolean;
  editingItem: Donasi | null;
  formData: DonasiFormData;
  programs: ProgramDonasi[];
  isSubmitting: boolean;
  onClose: () => void;
  onChange: React.Dispatch<React.SetStateAction<DonasiFormData>>;
  onSubmit: (e: React.FormEvent) => void;
}

export default function DonasiModal({
  isOpen,
  editingItem,
  formData,
  programs,
  isSubmitting,
  onClose,
  onChange,
  onSubmit,
}: Props) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-lg bg-white rounded-[28px] shadow-2xl border border-gray-100 overflow-hidden z-10 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-2 shrink-0">
            <div>
              <h3 className="text-base font-bold text-gray-900">
                {editingItem ? "Edit Catatan Donasi" : "Catat Donasi Baru"}
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Simpan data donatur, program tujuan, dan nominal
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <form
            onSubmit={onSubmit}
            className="px-6 py-4 space-y-4 overflow-y-auto"
          >
            {/* Donatur */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                <UserRound className="h-3.5 w-3.5 text-gray-400" />
                <span>Nama Donatur</span>
              </label>
              <input
                type="text"
                value={formData.donatur}
                onChange={(e) =>
                  onChange((prev) => ({ ...prev, donatur: e.target.value }))
                }
                placeholder="Contoh: H. Ahmad Fauzi / Hamba Allah"
                required
                className="w-full h-[42px] px-4 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm font-medium text-gray-800 hover:border-gray-300 focus:outline-none focus:border-gray-900 transition-all"
              />
            </div>

            {/* Tanggal */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-gray-400" />
                <span>Tanggal</span>
              </label>
              <input
                type="date"
                value={formData.tanggal}
                onChange={(e) =>
                  onChange((prev) => ({ ...prev, tanggal: e.target.value }))
                }
                required
                className="w-full h-[42px] px-4 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm font-medium text-gray-800 hover:border-gray-300 focus:outline-none focus:border-gray-900 transition-all"
              />
            </div>

            {/* Program */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                <Target className="h-3.5 w-3.5 text-gray-400" />
                <span>Program Tujuan</span>
              </label>
              <select
                value={formData.programId}
                onChange={(e) =>
                  onChange((prev) => ({ ...prev, programId: e.target.value }))
                }
                className="w-full h-[42px] px-4 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm font-medium text-gray-800 hover:border-gray-300 focus:outline-none focus:border-gray-900 transition-all cursor-pointer"
              >
                <option value="">Tanpa Program (Umum)</option>
                {programs.map((p) => (
                  <option key={p.id} value={String(p.id)}>
                    {p.nama}
                  </option>
                ))}
              </select>
            </div>

            {/* Nominal */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                <Wallet className="h-3.5 w-3.5 text-gray-400" />
                <span>Nominal (Rp)</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs sm:text-sm font-bold text-gray-400 pointer-events-none">
                  Rp
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={formatRibuan(formData.nominal)}
                  onChange={(e) => {
                    const digitsOnly = e.target.value.replace(/\D/g, "");
                    onChange((prev) => ({ ...prev, nominal: digitsOnly }));
                  }}
                  placeholder="500.000"
                  required
                  className="w-full h-[42px] pl-10 pr-4 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm font-medium text-gray-800 hover:border-gray-300 focus:outline-none focus:border-gray-900 transition-all"
                />
              </div>
            </div>

            {/* Metode */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                <CreditCard className="h-3.5 w-3.5 text-gray-400" />
                <span>Metode Pembayaran</span>
              </label>
              <div className="grid grid-cols-1 gap-2">
                {METODE_OPTIONS.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() =>
                      onChange((prev) => ({ ...prev, metode: m }))
                    }
                    className={`flex items-center justify-center h-10 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                      formData.metode === m
                        ? "bg-[#14352c] border-[#14352c] text-white shadow-md shadow-[#14352c]/15"
                        : "bg-white border-gray-200 text-gray-500 hover:border-emerald-300 hover:text-emerald-700"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600">
                Status Verifikasi
              </label>
              <div className="grid grid-cols-2 gap-2">
                {STATUS_OPTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() =>
                      onChange((prev) => ({ ...prev, status: s }))
                    }
                    className={`h-10 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                      formData.status === s
                        ? s === "Terverifikasi"
                          ? "bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-600/20"
                          : "bg-amber-500 border-amber-500 text-white shadow-md shadow-amber-500/20"
                        : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Pesan / Doa */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                <MessageSquare className="h-3.5 w-3.5 text-gray-400" />
                <span>Pesan / Doa (opsional)</span>
              </label>
              <textarea
                rows={2}
                value={formData.pesan}
                onChange={(e) =>
                  onChange((prev) => ({ ...prev, pesan: e.target.value }))
                }
                placeholder="Contoh: Semoga berkah untuk kelancaran anak-anak mengaji."
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm font-medium text-gray-800 hover:border-gray-300 focus:outline-none focus:border-gray-900 transition-all resize-none"
              />
            </div>

            {/* Tombol Aksi */}
            <div className="pt-4 pb-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-2xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-[#111827] hover:bg-black text-white text-xs font-bold shadow-md shadow-black/10 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin text-white" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                )}
                <span>{isSubmitting ? "Menyimpan..." : "Simpan"}</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
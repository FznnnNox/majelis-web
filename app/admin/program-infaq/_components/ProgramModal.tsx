"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  FileText,
  Target,
  ImageIcon,
  CheckCircle2,
  Loader2,
  Star,
} from "lucide-react";
import { ProgramInfaq, ProgramFormData, formatRibuan } from "../types";

interface Props {
  isOpen: boolean;
  editingItem: ProgramInfaq | null;
  formData: ProgramFormData;
  isSubmitting: boolean;
  onClose: () => void;
  onChange: React.Dispatch<React.SetStateAction<ProgramFormData>>;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ProgramModal({
  isOpen,
  editingItem,
  formData,
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
                {editingItem ? "Edit Program" : "Tambah Program Baru"}
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Program akan tampil di halaman publik Program &amp; Infaq
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
            {/* Judul */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-gray-400" />
                <span>Judul Program</span>
              </label>
              <input
                type="text"
                value={formData.judul}
                onChange={(e) =>
                  onChange((prev) => ({ ...prev, judul: e.target.value }))
                }
                placeholder="Contoh: Renovasi Saung Mengaji"
                required
                className="w-full h-[42px] px-4 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm font-medium text-gray-800 hover:border-gray-300 focus:outline-none focus:border-gray-900 transition-all"
              />
            </div>

            {/* Deskripsi */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-gray-400" />
                <span>Deskripsi</span>
              </label>
              <textarea
                rows={3}
                value={formData.deskripsi}
                onChange={(e) =>
                  onChange((prev) => ({ ...prev, deskripsi: e.target.value }))
                }
                placeholder="Jelaskan tujuan penggalangan dana program ini..."
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm font-medium text-gray-800 hover:border-gray-300 focus:outline-none focus:border-gray-900 transition-all resize-none"
              />
            </div>

            {/* Gambar */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                <ImageIcon className="h-3.5 w-3.5 text-gray-400" />
                <span>URL Gambar</span>
              </label>
              <input
                type="text"
                value={formData.gambar}
                onChange={(e) =>
                  onChange((prev) => ({ ...prev, gambar: e.target.value }))
                }
                placeholder="/assets/nama-file.jpg"
                className="w-full h-[42px] px-4 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm font-medium text-gray-800 hover:border-gray-300 focus:outline-none focus:border-gray-900 transition-all"
              />
              <p className="text-[10.5px] text-gray-400">
                Path file di folder <code>public/</code>, atau URL gambar lengkap.
              </p>
            </div>

            {/* Target */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                <Target className="h-3.5 w-3.5 text-gray-400" />
                <span>Target Dana (Rp)</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs sm:text-sm font-bold text-gray-400 pointer-events-none">
                  Rp
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={formatRibuan(formData.target)}
                  onChange={(e) => {
                    const digitsOnly = e.target.value.replace(/\D/g, "");
                    onChange((prev) => ({ ...prev, target: digitsOnly }));
                  }}
                  placeholder="10.000.000"
                  required
                  className="w-full h-[42px] pl-10 pr-4 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm font-medium text-gray-800 hover:border-gray-300 focus:outline-none focus:border-gray-900 transition-all"
                />
              </div>
            </div>

            {/* Status Aktif */}
            <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/60 flex items-center justify-between gap-3">
              <div className="flex items-start gap-2">
                <Star className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-amber-950">
                    Jadikan Program Aktif?
                  </p>
                  <p className="text-[11px] text-amber-800/80 mt-0.5">
                    Program aktif ditandai khusus &amp; jadi CTA utama di
                    halaman publik.
                  </p>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      isActive: e.target.checked,
                    }))
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e76f3c]"></div>
              </label>
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
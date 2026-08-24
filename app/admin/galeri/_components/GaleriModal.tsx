"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  X,
  FileText,
  ImageIcon,
  Calendar,
  CheckCircle2,
  Loader2,
  Tags,
  Upload,
  Trash2,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { GaleriItem, GaleriFormData, KATEGORI_OPTIONS } from "../types";

interface Props {
  isOpen: boolean;
  editingItem: GaleriItem | null;
  formData: GaleriFormData;
  isSubmitting: boolean;
  onClose: () => void;
  onChange: React.Dispatch<React.SetStateAction<GaleriFormData>>;
  onSubmit: (e: React.FormEvent) => void;
}

export default function GaleriModal({
  isOpen,
  editingItem,
  formData,
  isSubmitting,
  onClose,
  onChange,
  onSubmit,
}: Props) {
  const [isUploading, setIsUploading] = useState(false);
  const supabase = createClient();

  if (!isOpen) return null;

  // Function Upload File ke Supabase Storage
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
      const filePath = `${fileName}`;

      // 1. Upload ke Storage Bucket 'galeri'
      const { error: uploadError } = await supabase.storage
        .from("galeri")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // 2. Ambil Public URL
      const { data } = supabase.storage.from("galeri").getPublicUrl(filePath);

      // 3. Simpan URL publik ke formData
      onChange((prev) => ({ ...prev, gambar: data.publicUrl }));
    } catch (err: any) {
      console.error("Error uploading image:", err);
      alert(
        `Gagal mengunggah gambar: ${
          err.message ||
          "Pastikan bucket 'galeri' sudah dibuat di Supabase Storage & di-set PUBLIC."
        }`,
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    onChange((prev) => ({ ...prev, gambar: "" }));
  };

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
                {editingItem ? "Edit Dokumentasi" : "Tambah Dokumentasi Baru"}
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Tampil di halaman publik Galeri Kegiatan
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
                <span>Judul Kegiatan</span>
              </label>
              <input
                type="text"
                value={formData.judul}
                onChange={(e) =>
                  onChange((prev) => ({ ...prev, judul: e.target.value }))
                }
                placeholder="Contoh: Peringatan Maulid Nabi Muhammad SAW"
                required
                className="w-full h-[42px] px-4 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm font-medium text-gray-800 hover:border-gray-300 focus:outline-none focus:border-gray-900 transition-all"
              />
            </div>

            {/* Kategori */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                <Tags className="h-3.5 w-3.5 text-gray-400" />
                <span>Kategori</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {KATEGORI_OPTIONS.map((k) => (
                  <button
                    key={k.value}
                    type="button"
                    onClick={() =>
                      onChange((prev) => ({ ...prev, kategori: k.value }))
                    }
                    className={`flex items-center justify-center h-10 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                      formData.kategori === k.value
                        ? "bg-[#14352c] border-[#14352c] text-white shadow-md shadow-[#14352c]/15"
                        : "bg-white border-gray-200 text-gray-500 hover:border-emerald-300 hover:text-emerald-700"
                    }`}
                  >
                    {k.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Gambar (Upload Local File) */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                <ImageIcon className="h-3.5 w-3.5 text-gray-400" />
                <span>Foto Kegiatan</span>
              </label>

              {formData.gambar ? (
                /* Preview Foto */
                <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-gray-200 group bg-gray-50">
                  <Image
                    src={formData.gambar}
                    alt="Preview"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="px-3 py-1.5 rounded-xl bg-red-600 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-red-700 transition-colors shadow-md cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Hapus Foto</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Dropzone Input Upload */
                <label className="relative flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50 hover:bg-gray-50 hover:border-emerald-500/50 transition-all cursor-pointer group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                    className="hidden"
                  />
                  {isUploading ? (
                    <div className="flex flex-col items-center gap-2 text-emerald-700">
                      <Loader2 className="h-6 w-6 animate-spin" />
                      <span className="text-xs font-semibold">
                        Mengunggah foto...
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1.5 text-center px-4">
                      <div className="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-500 group-hover:border-emerald-300 group-hover:text-emerald-700 transition-colors shadow-xs">
                        <Upload className="h-5 w-5" />
                      </div>
                      <p className="text-xs font-bold text-gray-700 group-hover:text-emerald-800">
                        Klik untuk unggah foto
                      </p>
                      <p className="text-[10.5px] text-gray-400">
                        PNG, JPG, WEBP hingga 5MB
                      </p>
                    </div>
                  )}
                </label>
              )}
            </div>

            {/* Tanggal */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-gray-400" />
                <span>Tanggal Kegiatan</span>
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

            {/* Tombol Aksi */}
            <div className="pt-4 pb-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting || isUploading}
                className="px-5 py-2.5 rounded-2xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isSubmitting || isUploading}
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

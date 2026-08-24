"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Save } from "lucide-react";
import { Murid, TingkatNgaji } from "../types";

interface ModalMuridProps {
  editingMurid: Murid | null;
  tingkatOptions: TingkatNgaji[];
  onClose: () => void;
  onSubmit: (formData: {
    nama: string;
    gender: "Laki-laki" | "Perempuan";
    tingkat_id: number;
  }) => void;
}

export default function ModalMurid({
  editingMurid,
  tingkatOptions,
  onClose,
  onSubmit,
}: ModalMuridProps) {
  const [formData, setFormData] = useState({
    nama: "",
    gender: "Laki-laki" as "Laki-laki" | "Perempuan",
    tingkat_id: tingkatOptions[0]?.id || 1,
  });

  useEffect(() => {
    if (editingMurid) {
      setFormData({
        nama: editingMurid.nama,
        gender: editingMurid.gender,
        tingkat_id: editingMurid.tingkat_id || tingkatOptions[0]?.id || 1,
      });
    }
  }, [editingMurid, tingkatOptions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-gray-100"
      >
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <h3 className="text-base font-bold text-gray-900">
            {editingMurid ? "Edit Data Murid" : "Tambah Murid Baru"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-xl text-gray-400 hover:bg-gray-100 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Nama Lengkap Anak
            </label>
            <input
              type="text"
              required
              value={formData.nama}
              onChange={(e) =>
                setFormData({ ...formData, nama: e.target.value })
              }
              className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14352c]"
              placeholder="Contoh: Ahmad Fauzi"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Jenis Kelamin
              </label>
              <select
                value={formData.gender}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    gender: e.target.value as "Laki-laki" | "Perempuan",
                  })
                }
                className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14352c]"
              >
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Tingkat Bacaan
              </label>
              <select
                value={formData.tingkat_id}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    tingkat_id: Number(e.target.value),
                  })
                }
                className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14352c]"
              >
                {tingkatOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.nama_tingkat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-[#14352c] px-4 py-2 text-xs font-bold text-white hover:bg-[#1b4338] cursor-pointer"
            >
              <Save className="h-4 w-4" />
              <span>Simpan</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
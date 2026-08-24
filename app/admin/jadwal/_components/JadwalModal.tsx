// "use client";

// import { motion, AnimatePresence } from "framer-motion";
// import { X, Calendar, Clock, FileText, CheckCircle2, Users, Loader2 } from "lucide-react";
// import { ScheduleItem, JadwalFormData } from "../types";

// interface Props {
//   isOpen: boolean;
//   editingItem: ScheduleItem | null;
//   formData: JadwalFormData;
//   isSubmitting: boolean;
//   onClose: () => void;
//   onChange: React.Dispatch<React.SetStateAction<JadwalFormData>>;
//   onSubmit: (e: React.FormEvent) => void;
// }

// export default function JadwalModal({
//   isOpen,
//   editingItem,
//   formData,
//   isSubmitting,
//   onClose,
//   onChange,
//   onSubmit,
// }: Props) {
//   if (!isOpen) return null;

//   return (
//     <AnimatePresence>
//       <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           onClick={onClose}
//           className="fixed inset-0 bg-black/40 backdrop-blur-xs"
//         />

//         <motion.div
//           initial={{ opacity: 0, scale: 0.96, y: 8 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           exit={{ opacity: 0, scale: 0.96, y: 8 }}
//           transition={{ duration: 0.2, ease: "easeOut" }}
//           className="relative w-full max-w-lg bg-white rounded-[28px] shadow-2xl border border-gray-100 overflow-hidden z-10"
//         >
//           {/* Header Minimalis Putih Bersih */}
//           <div className="flex items-center justify-between px-6 pt-6 pb-2">
//             <div>
//               <h3 className="text-base font-bold text-gray-900">
//                 {editingItem ? `Edit Jadwal - Hari ${formData.hari}` : "Tambah Jadwal Piket Baru"}
//               </h3>
//               <p className="text-xs text-gray-400 mt-0.5">
//                 Atur waktu, tugas, dan petugas piket harian
//               </p>
//             </div>
//             <button
//               type="button"
//               onClick={onClose}
//               className="p-1.5 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
//             >
//               <X className="h-4 w-4" />
//             </button>
//           </div>

//           <form onSubmit={onSubmit} className="px-6 py-4 space-y-4">
//             {/* Input Hari */}
//             <div className="space-y-1.5">
//               <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
//                 <Calendar className="h-3.5 w-3.5 text-gray-400" />
//                 <span>Pilih Hari</span>
//               </label>
//               <select
//                 value={formData.hari}
//                 onChange={(e) =>
//                   onChange((prev) => ({
//                     ...prev,
//                     hari: e.target.value as JadwalFormData["hari"],
//                   }))
//                 }
//                 disabled={!!editingItem}
//                 className="w-full h-[42px] px-4 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm font-medium text-gray-800 hover:border-gray-300 focus:outline-none focus:border-gray-900 transition-all disabled:opacity-60 cursor-pointer"
//               >
//                 {["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"].map((h) => (
//                   <option key={h} value={h}>
//                     Hari {h}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Toggle Status Libur */}
//             <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/60 flex items-center justify-between gap-3">
//               <div>
//                 <p className="text-xs font-bold text-amber-950">Tandai Hari Libur?</p>
//                 <p className="text-[11px] text-amber-800/80 mt-0.5">
//                   Jika aktif, jadwal piket di hari ini akan diliburkan.
//                 </p>
//               </div>

//               <label className="relative inline-flex items-center cursor-pointer shrink-0">
//                 <input
//                   type="checkbox"
//                   checked={formData.isLibur}
//                   onChange={(e) =>
//                     onChange((prev) => ({
//                       ...prev,
//                       isLibur: e.target.checked,
//                     }))
//                   }
//                   className="sr-only peer"
//                 />
//                 <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
//               </label>
//             </div>

//             {!formData.isLibur && (
//               <>
//                 {/* Input Waktu */}
//                 <div className="space-y-1.5">
//                   <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
//                     <Clock className="h-3.5 w-3.5 text-gray-400" />
//                     <span>Waktu Pelaksanaan</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.waktu}
//                     onChange={(e) =>
//                       onChange((prev) => ({ ...prev, waktu: e.target.value }))
//                     }
//                     placeholder="Contoh: 16:00 - 17:00 WIB"
//                     required={!formData.isLibur}
//                     className="w-full h-[42px] px-4 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm font-medium text-gray-800 hover:border-gray-300 focus:outline-none focus:border-gray-900 transition-all"
//                   />
//                 </div>

//                 {/* Input Deskripsi Tugas */}
//                 <div className="space-y-1.5">
//                   <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
//                     <FileText className="h-3.5 w-3.5 text-gray-400" />
//                     <span>Deskripsi Tugas Utama</span>
//                   </label>
//                   <textarea
//                     rows={2}
//                     value={formData.tugas}
//                     onChange={(e) =>
//                       onChange((prev) => ({ ...prev, tugas: e.target.value }))
//                     }
//                     placeholder="Tuliskan detail tugas kebersihan..."
//                     required={!formData.isLibur}
//                     className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm font-medium text-gray-800 hover:border-gray-300 focus:outline-none focus:border-gray-900 transition-all resize-none"
//                   />
//                 </div>

//                 {/* Input Daftar Petugas */}
//                 <div className="space-y-1.5">
//                   <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
//                     <Users className="h-3.5 w-3.5 text-gray-400" />
//                     <span>Daftar Nama Petugas (Pisahkan dengan koma)</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.petugasNames || ""}
//                     onChange={(e) =>
//                       onChange((prev) => ({
//                         ...prev,
//                         petugasNames: e.target.value,
//                       }))
//                     }
//                     placeholder="Contoh: Ahmad Fauzi, Farhan Mahesa, Rayhan"
//                     className="w-full h-[42px] px-4 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm font-medium text-gray-800 hover:border-gray-300 focus:outline-none focus:border-gray-900 transition-all"
//                   />
//                 </div>
//               </>
//             )}

//             {/* Tombol Aksi */}
//             <div className="pt-4 pb-2 flex items-center justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 disabled={isSubmitting}
//                 className="px-5 py-2.5 rounded-2xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
//               >
//                 Batal
//               </button>
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-[#111827] hover:bg-black text-white text-xs font-bold shadow-md shadow-black/10 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
//               >
//                 {isSubmitting ? (
//                   <Loader2 className="h-4 w-4 animate-spin text-white" />
//                 ) : (
//                   <CheckCircle2 className="h-4 w-4 text-emerald-400" />
//                 )}
//                 <span>{isSubmitting ? "Menyimpan..." : "Simpan"}</span>
//               </button>
//             </div>
//           </form>
//         </motion.div>
//       </div>
//     </AnimatePresence>
//   );
// }
"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  Clock,
  FileText,
  CheckCircle2,
  Users,
  Loader2,
  Search,
  Lock,
} from "lucide-react";
import { ScheduleItem, JadwalFormData, MuridOption, HARI_LIST } from "../types";

interface Props {
  isOpen: boolean;
  editingItem: ScheduleItem | null;
  formData: JadwalFormData;
  muridOptions: MuridOption[];
  /** Peta { muridId: namaHari } untuk murid yang sudah bertugas di hari LAIN */
  assignedElsewhereMap: Record<number, string>;
  isSubmitting: boolean;
  onClose: () => void;
  onChange: React.Dispatch<React.SetStateAction<JadwalFormData>>;
  onSubmit: (e: React.FormEvent) => void;
  onHariChange: (hari: JadwalFormData["hari"]) => void;
}

export default function JadwalModal({
  isOpen,
  editingItem,
  formData,
  muridOptions,
  assignedElsewhereMap,
  isSubmitting,
  onClose,
  onChange,
  onSubmit,
  onHariChange,
}: Props) {
  const [petugasSearch, setPetugasSearch] = useState("");

  // ⚠️ Semua hook (useState, useMemo, dst) HARUS dipanggil sebelum
  // early return apa pun, agar urutan hook konsisten di setiap render.
  const filteredMurid = useMemo(() => {
    const q = petugasSearch.trim().toLowerCase();
    if (!q) return muridOptions;
    return muridOptions.filter((m) => m.nama.toLowerCase().includes(q));
  }, [muridOptions, petugasSearch]);

  if (!isOpen) return null;

  const togglePetugas = (id: number) => {
    const disabled = !!assignedElsewhereMap[id];
    if (disabled) return; // tidak bisa dipilih, sudah dipakai hari lain

    onChange((prev) => {
      const exists = prev.petugasIds.includes(id);
      return {
        ...prev,
        petugasIds: exists
          ? prev.petugasIds.filter((pid) => pid !== id)
          : [...prev.petugasIds, id],
      };
    });
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
                Atur Jadwal - Hari {formData.hari}
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Atur waktu, tugas, dan petugas piket harian
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
            {/* Input Hari */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-gray-400" />
                <span>Pilih Hari</span>
              </label>
              <select
                value={formData.hari}
                onChange={(e) =>
                  onHariChange(e.target.value as JadwalFormData["hari"])
                }
                className="w-full h-[42px] px-4 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm font-medium text-gray-800 hover:border-gray-300 focus:outline-none focus:border-gray-900 transition-all cursor-pointer"
              >
                {HARI_LIST.map((h) => (
                  <option key={h} value={h}>
                    Hari {h}
                  </option>
                ))}
              </select>
            </div>

            {/* Toggle Status Libur */}
            <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/60 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-amber-950">
                  Tandai Hari Libur?
                </p>
                <p className="text-[11px] text-amber-800/80 mt-0.5">
                  Jika aktif, jadwal piket di hari ini akan diliburkan.
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={formData.isLibur}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      isLibur: e.target.checked,
                    }))
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
              </label>
            </div>

            {!formData.isLibur && (
              <>
                {/* Input Waktu */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-gray-400" />
                    <span>Waktu Pelaksanaan</span>
                  </label>
                  <input
                    type="text"
                    value={formData.waktu}
                    onChange={(e) =>
                      onChange((prev) => ({ ...prev, waktu: e.target.value }))
                    }
                    placeholder="Contoh: 16:00 - 17:00 WIB"
                    required={!formData.isLibur}
                    className="w-full h-[42px] px-4 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm font-medium text-gray-800 hover:border-gray-300 focus:outline-none focus:border-gray-900 transition-all"
                  />
                </div>

                {/* Input Deskripsi Tugas */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5 text-gray-400" />
                    <span>Deskripsi Tugas Utama</span>
                  </label>
                  <textarea
                    rows={2}
                    value={formData.tugas}
                    onChange={(e) =>
                      onChange((prev) => ({ ...prev, tugas: e.target.value }))
                    }
                    placeholder="Tuliskan detail tugas kebersihan..."
                    required={!formData.isLibur}
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm font-medium text-gray-800 hover:border-gray-300 focus:outline-none focus:border-gray-900 transition-all resize-none"
                  />
                </div>

                {/* Pilih Petugas dari tabel murid — grid card modern */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-gray-400" />
                      <span>Petugas Piket</span>
                    </label>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                      {formData.petugasIds.length} dipilih
                    </span>
                  </div>

                  {muridOptions.length === 0 ? (
                    <p className="text-[11px] text-gray-400 italic">
                      Belum ada data santri di tabel murid.
                    </p>
                  ) : (
                    <>
                      {/* Search box */}
                      <div className="relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                        <input
                          type="text"
                          value={petugasSearch}
                          onChange={(e) => setPetugasSearch(e.target.value)}
                          placeholder="Cari nama santri..."
                          className="w-full pl-9 pr-3 h-9 bg-gray-50/80 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#102d25]/15 focus:border-[#102d25] focus:bg-white transition-all"
                        />
                      </div>

                      {/* Grid pilihan santri */}
                      <div className="max-h-52 overflow-y-auto pr-0.5 -mr-0.5">
                        {filteredMurid.length === 0 ? (
                          <p className="text-[11px] text-gray-400 italic py-3 text-center">
                            Tidak ada santri yang cocok.
                          </p>
                        ) : (
                          <div className="grid grid-cols-2 gap-2">
                            {filteredMurid.map((m) => {
                              const checked = formData.petugasIds.includes(
                                m.id
                              );
                              const assignedHari = assignedElsewhereMap[m.id];
                              const disabled = !!assignedHari;

                              return (
                                <button
                                  key={m.id}
                                  type="button"
                                  onClick={() => togglePetugas(m.id)}
                                  disabled={disabled}
                                  title={
                                    disabled
                                      ? `${m.nama} sudah bertugas di Hari ${assignedHari}`
                                      : undefined
                                  }
                                  className={`relative flex items-center gap-2.5 px-3 py-2.5 rounded-2xl border text-left transition-all ${
                                    disabled
                                      ? "bg-gray-50 border-gray-100 opacity-60 cursor-not-allowed"
                                      : checked
                                      ? "bg-[#14352c] border-[#14352c] shadow-md shadow-[#14352c]/15 cursor-pointer"
                                      : "bg-white border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/40 cursor-pointer active:scale-[0.98]"
                                  }`}
                                >
                                  <div
                                    className={`h-8 w-8 rounded-xl flex items-center justify-center text-[11px] font-extrabold shrink-0 ${
                                      disabled
                                        ? "bg-gray-200 text-gray-400"
                                        : checked
                                        ? "bg-white/15 text-white"
                                        : "bg-gradient-to-br from-[#14352c] to-[#204e41] text-white"
                                    }`}
                                  >
                                    {m.nama.charAt(0).toUpperCase()}
                                  </div>

                                  <div className="min-w-0 flex-1">
                                    <p
                                      className={`text-xs font-bold truncate ${
                                        disabled
                                          ? "text-gray-400"
                                          : checked
                                          ? "text-white"
                                          : "text-gray-800"
                                      }`}
                                    >
                                      {m.nama}
                                    </p>
                                    {disabled ? (
                                      <p className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5">
                                        <Lock className="h-2.5 w-2.5" />
                                        <span>Piket: {assignedHari}</span>
                                      </p>
                                    ) : checked ? (
                                      <p className="text-[10px] text-emerald-200 mt-0.5">
                                        Terpilih
                                      </p>
                                    ) : null}
                                  </div>

                                  {checked && !disabled && (
                                    <CheckCircle2 className="h-4 w-4 text-emerald-300 shrink-0" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      <p className="text-[10.5px] text-gray-400 leading-relaxed">
                        Santri dengan label <span className="font-semibold text-gray-500">"Piket: [hari]"</span> sudah
                        ditugaskan di hari lain dan tidak bisa dipilih ganda.
                      </p>
                    </>
                  )}
                </div>
              </>
            )}

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
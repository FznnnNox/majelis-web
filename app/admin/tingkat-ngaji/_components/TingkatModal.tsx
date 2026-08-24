// "use client";

// import { motion, AnimatePresence } from "framer-motion";
// import { X, Save, Loader2, Layers, FileText } from "lucide-react";
// import { TingkatNgaji } from "../types";

// export interface TingkatFormData {
//   nama_tingkat: string;
//   keterangan: string;
// }

// interface Props {
//   isOpen: boolean;
//   editingItem: TingkatNgaji | null;
//   formData: TingkatFormData;
//   isSubmitting: boolean;
//   onClose: () => void;
//   onChange: (formData: TingkatFormData) => void;
//   onSubmit: (e: React.FormEvent) => void;
// }

// export default function TingkatModal({
//   isOpen,
//   editingItem,
//   formData,
//   isSubmitting,
//   onClose,
//   onChange,
//   onSubmit,
// }: Props) {
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0c1f19]/60 backdrop-blur-sm">
//           {/* Overlay untuk dismiss saat klik luar */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//             className="absolute inset-0"
//           />

//           <motion.div
//             initial={{ opacity: 0, scale: 0.96, y: 8 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.96, y: 8 }}
//             transition={{ duration: 0.2, ease: "easeOut" }}
//             className="relative z-10 w-full max-w-md rounded-[28px] bg-white shadow-2xl border border-gray-100 overflow-hidden"
//           >
//             {/* Header */}
//             <div className="flex items-center justify-between gap-3 px-5 sm:px-6 py-4 sm:py-5 bg-gradient-to-br from-[#14352c] to-[#1e4438]">
//               <div className="flex items-center gap-3 min-w-0">
//                 <div className="h-10 w-10 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
//                   <Layers className="h-5 w-5 text-emerald-300" />
//                 </div>
//                 <div className="min-w-0">
//                   <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
//                     {editingItem ? "Edit Tingkat Ngaji" : "Tambah Tingkat Ngaji"}
//                   </h3>
//                   <p className="text-[11px] sm:text-xs text-emerald-100/70 mt-0.5">
//                     {editingItem ? "Perbarui level bacaan" : "Buat level bacaan baru"}
//                   </p>
//                 </div>
//               </div>
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="p-2 rounded-xl text-emerald-100/70 hover:text-white hover:bg-white/10 cursor-pointer transition-colors shrink-0"
//               >
//                 <X className="h-4 w-4 sm:h-5 sm:w-5" />
//               </button>
//             </div>

//             <form onSubmit={onSubmit} className="px-5 sm:px-6 py-5 space-y-3.5">
//               <div>
//                 <label className="block text-[11px] font-semibold text-gray-500 mb-1.5">
//                   Nama Tingkat / Level
//                 </label>
//                 <div className="relative">
//                   <Layers className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
//                   <input
//                     type="text"
//                     required
//                     value={formData.nama_tingkat}
//                     onChange={(e) =>
//                       onChange({ ...formData, nama_tingkat: e.target.value })
//                     }
//                     className="w-full h-[42px] bg-gray-50 rounded-2xl border border-gray-200 pl-9 pr-3.5 text-xs sm:text-sm font-semibold text-gray-800 hover:border-gray-300 focus:outline-none focus:border-[#14352c] focus:bg-white transition-colors"
//                     placeholder="Contoh: Iqra 1 / Al-Qur'an / Tajwid"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-[11px] font-semibold text-gray-500 mb-1.5">
//                   Keterangan / Deskripsi
//                   <span className="text-gray-300 font-medium normal-case ml-1">(opsional)</span>
//                 </label>
//                 <div className="relative">
//                   <FileText className="absolute left-3.5 top-3 h-3.5 w-3.5 text-gray-400" />
//                   <textarea
//                     rows={3}
//                     value={formData.keterangan}
//                     onChange={(e) =>
//                       onChange({ ...formData, keterangan: e.target.value })
//                     }
//                     className="w-full bg-gray-50 rounded-2xl border border-gray-200 pl-9 pr-3.5 py-2.5 text-xs font-medium text-gray-800 hover:border-gray-300 focus:outline-none focus:border-[#14352c] focus:bg-white transition-colors resize-none"
//                     placeholder="Deskripsi materi atau fokus pembelajaran pada tingkat ini..."
//                   />
//                 </div>
//               </div>

//               <div className="flex items-center justify-end gap-2.5 border-t border-gray-100 pt-4 mt-1">
//                 <button
//                   type="button"
//                   onClick={onClose}
//                   className="rounded-2xl px-4 py-2.5 text-xs font-bold text-gray-500 hover:bg-gray-100 cursor-pointer transition-colors"
//                 >
//                   Batal
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="inline-flex items-center gap-2 rounded-2xl bg-[#14352c] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#1b4338] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-60 shadow-md shadow-[#14352c]/15"
//                 >
//                   {isSubmitting ? (
//                     <Loader2 className="h-4 w-4 text-emerald-300 animate-spin" />
//                   ) : (
//                     <Save className="h-4 w-4 text-emerald-300" />
//                   )}
//                   <span>{isSubmitting ? "Menyimpan..." : "Simpan Data"}</span>
//                 </button>
//               </div>
//             </form>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// }
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { TingkatNgaji } from "../types";

export interface TingkatFormData {
  nama_tingkat: string;
  keterangan: string;
}

interface Props {
  isOpen: boolean;
  editingItem: TingkatNgaji | null;
  formData: TingkatFormData;
  isSubmitting: boolean;
  onClose: () => void;
  onChange: (formData: TingkatFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function TingkatModal({
  isOpen,
  editingItem,
  formData,
  isSubmitting,
  onClose,
  onChange,
  onSubmit,
}: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative z-10 w-full max-w-lg rounded-[28px] bg-white shadow-2xl border border-gray-100 overflow-hidden"
          >
            {/* Header Bersih Tanpa Background Warna */}
            <div className="flex items-center justify-between px-6 pt-6 pb-2">
              <h3 className="text-base font-bold text-gray-900">
                {editingItem ? "Edit Tingkat Ngaji" : "Tambah Tingkat Baru"}
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={onSubmit} className="px-6 py-4 space-y-4">
              {/* Nama Tingkat Field */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Nama Tingkat / Level
                </label>
                <input
                  type="text"
                  required
                  value={formData.nama_tingkat}
                  onChange={(e) =>
                    onChange({ ...formData, nama_tingkat: e.target.value })
                  }
                  className="w-full h-[42px] bg-white rounded-2xl border border-gray-200 px-4 text-xs sm:text-sm font-medium text-gray-800 hover:border-gray-300 focus:outline-none focus:border-gray-900 transition-colors"
                  placeholder="Contoh: Iqra 1 / Al-Qur'an / Tajwid"
                />
              </div>

              {/* Keterangan Field */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Keterangan <span className="text-gray-400 font-normal">(opsional)</span>
                </label>
                <textarea
                  rows={3}
                  value={formData.keterangan}
                  onChange={(e) =>
                    onChange({ ...formData, keterangan: e.target.value })
                  }
                  className="w-full bg-white rounded-2xl border border-gray-200 px-4 py-3 text-xs font-medium text-gray-800 hover:border-gray-300 focus:outline-none focus:border-gray-900 transition-colors resize-none"
                  placeholder="Deskripsi materi atau fokus pembelajaran..."
                />
              </div>

              {/* Actions / Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 pb-2">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="rounded-2xl px-5 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#111827] px-6 py-2.5 text-xs font-bold text-white hover:bg-black active:scale-[0.99] transition-all cursor-pointer disabled:opacity-60 shadow-md shadow-black/10"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : null}
                  <span>{isSubmitting ? "Menyimpan..." : "Simpan"}</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
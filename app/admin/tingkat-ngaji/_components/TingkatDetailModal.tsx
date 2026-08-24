// "use client";

// import { motion, AnimatePresence } from "framer-motion";
// import { X, BookOpen, Users, FileText } from "lucide-react";
// import { TingkatNgaji } from "../types";

// interface Props {
//   isOpen: boolean;
//   item: TingkatNgaji | null;
//   onClose: () => void;
// }

// export default function TingkatDetailModal({ isOpen, item, onClose }: Props) {
//   if (!item) return null;

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
//           {/* Overlay click to close */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//             className="absolute inset-0"
//           />

//           <motion.div
//             initial={{ opacity: 0, scale: 0.95, y: 10 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.95, y: 10 }}
//             transition={{ duration: 0.2, ease: "easeOut" }}
//             className="relative z-10 w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-gray-100 space-y-5 overflow-hidden"
//           >
//             {/* Background Glow Effect */}
//             <div className="absolute top-0 right-0 -mr-10 -mt-10 h-32 w-32 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />

//             {/* Header Modal */}
//             <div className="flex items-center justify-between border-b border-gray-100 pb-3.5 relative z-10">
//               <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
//                 <BookOpen className="h-4 w-4 text-[#14352c]" />
//                 <span>Detail Tingkat Ngaji</span>
//               </div>
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="p-1.5 rounded-xl text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors cursor-pointer"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             </div>

//             {/* Body / Content */}
//             <div className="space-y-4 relative z-10">
//               <div className="flex items-start justify-between gap-3 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100/60">
//                 <div className="flex items-center gap-3">
//                   <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#14352c] to-[#204e41] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#14352c]/20">
//                     <BookOpen className="h-6 w-6 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-bold text-gray-900">
//                       {item.nama_tingkat}
//                     </h3>
//                     <p className="text-xs text-gray-500">Master Level Ngaji</p>
//                   </div>
//                 </div>

//                 <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-amber-50 text-amber-900 text-xs font-bold border border-amber-100/80 shrink-0">
//                   <Users className="h-3.5 w-3.5 text-[#c1663c]" />
//                   <span>{item._count_murid ?? 0} Murid</span>
//                 </span>
//               </div>

//               {/* Deskripsi Lengkap */}
//               <div className="space-y-1.5">
//                 <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-600">
//                   <FileText className="h-3.5 w-3.5 text-emerald-700" />
//                   <span>Keterangan / Deskripsi</span>
//                 </div>
//                 <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 text-xs sm:text-sm text-gray-700 leading-relaxed max-h-48 overflow-y-auto">
//                   {item.keterangan ? (
//                     <p className="whitespace-pre-line">{item.keterangan}</p>
//                   ) : (
//                     <span className="text-gray-400 italic">
//                       Tidak ada deskripsi/keterangan khusus untuk tingkatan ini.
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Footer Modal */}
//             <div className="pt-2 flex justify-end relative z-10">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#102d25] hover:bg-[#163a30] text-white text-xs font-bold transition-all cursor-pointer shadow-md"
//               >
//                 Tutup
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// }
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Users, FileText } from "lucide-react";
import { TingkatNgaji } from "../types";

interface Props {
  isOpen: boolean;
  item: TingkatNgaji | null;
  onClose: () => void;
}

export default function TingkatDetailModal({ isOpen, item, onClose }: Props) {
  if (!item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0c1f19]/60 backdrop-blur-sm">
          {/* Overlay click to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative z-10 w-full max-w-md rounded-[28px] bg-white shadow-2xl border border-gray-100 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 px-5 sm:px-6 py-4 sm:py-5 bg-gradient-to-br from-[#14352c] to-[#1e4438]">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-10 w-10 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                  <BookOpen className="h-5 w-5 text-emerald-300" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                    Detail Tingkat Ngaji
                  </h3>
                  <p className="text-[11px] sm:text-xs text-emerald-100/70 mt-0.5">
                    Informasi lengkap level bacaan
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl text-emerald-100/70 hover:text-white hover:bg-white/10 cursor-pointer transition-colors shrink-0"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>

            {/* Body / Content */}
            <div className="px-5 sm:px-6 py-5 space-y-4">
              <div className="flex items-center justify-between gap-3 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100/60">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-[#14352c] to-[#204e41] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#14352c]/20">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-base font-bold text-gray-900 truncate">
                      {item.nama_tingkat}
                    </h4>
                    <p className="text-[11px] text-gray-500 font-medium">Master Level Ngaji</p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-amber-50 text-amber-900 text-xs font-bold border border-amber-100/80 shrink-0">
                  <Users className="h-3.5 w-3.5 text-[#c1663c]" />
                  <span>{item._count_murid ?? 0} Murid</span>
                </span>
              </div>

              {/* Deskripsi Lengkap */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-500 uppercase tracking-widest">
                  <FileText className="h-3.5 w-3.5 text-gray-400" />
                  <span>Keterangan / Deskripsi</span>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 text-xs sm:text-sm text-gray-700 leading-relaxed max-h-48 overflow-y-auto">
                  {item.keterangan ? (
                    <p className="whitespace-pre-line">{item.keterangan}</p>
                  ) : (
                    <span className="text-gray-400 italic">
                      Tidak ada deskripsi/keterangan khusus untuk tingkatan ini.
                    </span>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="pt-1 flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-[#14352c] hover:bg-[#1b4338] active:scale-[0.99] text-white text-xs font-bold transition-all cursor-pointer shadow-md shadow-[#14352c]/15"
                >
                  Tutup
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
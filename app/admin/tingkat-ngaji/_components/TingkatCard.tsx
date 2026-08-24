// "use client";

// import { motion } from "framer-motion";
// import { BookOpen, Users, Edit3, Trash2, ChevronRight } from "lucide-react";
// import { TingkatNgaji } from "../types";

// interface Props {
//   item: TingkatNgaji;
//   onEdit: (item: TingkatNgaji) => void;
//   onDelete: (id: number, nama: string) => void;
// }

// export default function TingkatCard({ item, onEdit, onDelete }: Props) {
//   return (
//     <motion.div
//       layout
//       initial={{ opacity: 0, y: 12 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, scale: 0.95 }}
//       transition={{ duration: 0.25, ease: "easeOut" }}
//       className="group relative bg-white/90 backdrop-blur-md rounded-3xl p-5 border border-gray-100/90 shadow-xs hover:shadow-xl hover:border-emerald-300/60 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
//     >
//       {/* Glow Accent Background */}
//       <div className="absolute top-0 right-0 -mr-10 -mt-10 h-28 w-28 rounded-full bg-emerald-500/5 blur-2xl group-hover:bg-emerald-500/12 transition-all pointer-events-none" />

//       <div className="space-y-4 relative z-10">
//         {/* Top Section: Icon, Name & Pupil Count */}
//         <div className="flex items-start justify-between gap-3">
//           <div className="flex items-center gap-3.5">
//             <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-[#14352c] to-[#204e41] text-white font-extrabold flex items-center justify-center shrink-0 shadow-md shadow-[#14352c]/15 group-hover:scale-105 transition-transform duration-300">
//               <BookOpen className="h-5 w-5 text-white" />
//             </div>
//             <div>
//               <h3 className="font-normal text-gray-900 group-hover:text-[#14352c] transition-colors text-base sm:text-lg leading-snug">
//                 {item.nama_tingkat}
//               </h3>
//             </div>
//           </div>

//           {/* Badge Jumlah Murid */}
//           <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-amber-50/90 text-amber-900 text-xs font-bold border border-amber-100/80 shrink-0 shadow-2xs">
//             <Users className="h-3.5 w-3.5 text-[#c1663c]" />
//             <span>{item._count_murid ?? 0} Murid</span>
//           </span>
//         </div>

//         {/* Description Box */}
//         <div className="bg-gray-50/70 rounded-2xl p-3.5 border border-gray-100 text-xs text-gray-600 leading-relaxed min-h-[58px] flex items-center">
//           <p className="line-clamp-2">
//             {item.keterangan || (
//               <span className="text-gray-400 italic">
//                 Tidak ada deskripsi/keterangan khusus.
//               </span>
//             )}
//           </p>
//         </div>
//       </div>

//       {/* Bottom Section: Actions */}
//       <div className="mt-5 pt-3.5 border-t border-gray-100/80 flex items-center justify-between gap-2 relative z-10">
//         <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
//           <span>Detail Level</span>
//           <ChevronRight className="h-3.5 w-3.5" />
//         </span>

//         <div className="flex items-center gap-1 ml-auto">
//           <button
//             type="button"
//             onClick={() => onEdit(item)}
//             className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-gray-600 hover:text-[#14352c] hover:bg-emerald-50 active:scale-95 transition-all cursor-pointer"
//             title="Edit Tingkat"
//           >
//             <Edit3 className="h-3.5 w-3.5" />
//             <span>Edit</span>
//           </button>

//           <button
//             type="button"
//             onClick={() => onDelete(item.id, item.nama_tingkat)}
//             className="p-2 rounded-xl text-gray-400 hover:text-rose-600 hover:bg-rose-50 active:scale-95 transition-all cursor-pointer"
//             title="Hapus Tingkat"
//           >
//             <Trash2 className="h-4 w-4" />
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// }
"use client";

import { motion } from "framer-motion";
import { BookOpen, Users, Edit3, Trash2, ChevronRight } from "lucide-react";
import { TingkatNgaji } from "../types";

interface Props {
  item: TingkatNgaji;
  onEdit: (item: TingkatNgaji) => void;
  onDelete: (id: number, nama: string) => void;
  onViewDetail: (item: TingkatNgaji) => void;
}

export default function TingkatCard({ item, onEdit, onDelete, onViewDetail }: Props) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group relative bg-white/90 backdrop-blur-md rounded-3xl p-5 border border-gray-100/90 shadow-2xs hover:shadow-xl hover:border-emerald-300/60 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      {/* Glow Accent Background */}
      <div className="absolute top-0 right-0 -mr-10 -mt-10 h-28 w-28 rounded-full bg-emerald-500/5 blur-2xl group-hover:bg-emerald-500/12 transition-all pointer-events-none" />

      <div className="space-y-4 relative z-10">
        {/* Top Section: Icon, Name & Pupil Count */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-[#14352c] to-[#204e41] text-white font-extrabold flex items-center justify-center shrink-0 shadow-md shadow-[#14352c]/15 group-hover:scale-105 transition-transform duration-300">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-gray-900 group-hover:text-[#14352c] transition-colors text-base sm:text-lg leading-snug truncate">
                {item.nama_tingkat}
              </h3>
            </div>
          </div>

          {/* Badge Jumlah Murid */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-amber-50/90 text-amber-900 text-xs font-bold border border-amber-100/80 shrink-0 shadow-2xs">
            <Users className="h-3.5 w-3.5 text-[#c1663c]" />
            <span>{item._count_murid ?? 0} Murid</span>
          </span>
        </div>

        {/* Description Box */}
        <div className="bg-gray-50/70 rounded-2xl p-3.5 border border-gray-100 text-xs text-gray-600 leading-relaxed min-h-[58px] flex items-center">
          <p className="line-clamp-2">
            {item.keterangan || (
              <span className="text-gray-400 italic">
                Tidak ada deskripsi/keterangan khusus.
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Bottom Section: Actions */}
      <div className="mt-5 pt-3.5 border-t border-gray-100/80 flex items-center justify-between gap-2 relative z-10">
       <button
          type="button"
          onClick={() => onViewDetail(item)} 
          className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-800 transition-all duration-300 cursor-pointer group-hover:translate-x-0"
        >
          <span>Detail Level</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>

        <div className="flex items-center gap-1 ml-auto">
          <button
            type="button"
            onClick={() => onEdit(item)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-gray-600 hover:text-[#14352c] hover:bg-emerald-50 active:scale-95 transition-all cursor-pointer"
            title="Edit Tingkat"
          >
            <Edit3 className="h-3.5 w-3.5" />
            <span>Edit</span>
          </button>

          <button
            type="button"
            onClick={() => onDelete(item.id, item.nama_tingkat)}
            className="p-2 rounded-xl text-gray-400 hover:text-rose-600 hover:bg-rose-50 active:scale-95 transition-all cursor-pointer"
            title="Hapus Tingkat"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
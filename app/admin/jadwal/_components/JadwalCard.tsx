// "use client";

// import { motion } from "framer-motion";
// import { Clock, Users, Edit3, Trash2, Coffee, UserCheck, Sparkles, User, Calendar } from "lucide-react";
// import { ScheduleItem } from "../types";

// interface Props {
//   item: ScheduleItem;
//   onEdit: (item: ScheduleItem) => void;
//   onDelete: (hari: string) => void;
// }

// export default function JadwalCard({ item, onEdit, onDelete }: Props) {
//   const isFriday = item.isLibur;

//   return (
//     <motion.div
//       layout
//       initial={{ opacity: 0, y: 12 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, scale: 0.95 }}
//       transition={{ duration: 0.25, ease: "easeOut" }}
//       className={`group relative rounded-3xl p-6 border shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden backdrop-blur-xl ${
//         isFriday
//           ? "bg-gradient-to-br from-amber-50/70 via-white/80 to-amber-100/40 border-amber-200/80 hover:border-amber-400/80 hover:-translate-y-1"
//           : "bg-gradient-to-br from-white/90 via-emerald-50/20 to-white/90 border-gray-100/90 hover:border-emerald-300/80 hover:-translate-y-1"
//       }`}
//     >
//       {/* Background Glow Effect Modern */}
//       <div
//         className={`absolute -top-12 -right-12 h-36 w-36 rounded-full blur-3xl transition-all pointer-events-none opacity-60 ${
//           isFriday
//             ? "bg-amber-400/20 group-hover:bg-amber-400/30"
//             : "bg-emerald-500/10 group-hover:bg-emerald-500/20"
//         }`}
//       />

//       <div className="space-y-5 relative z-10">
//         {/* Header Card dengan Badge Hari & Action Buttons */}
//         <div className="flex items-center justify-between gap-3">
//           <div className="flex items-center gap-3.5">
//             <div
//               className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 shadow-md transition-transform duration-300 group-hover:scale-105 ${
//                 isFriday
//                   ? "bg-gradient-to-br from-amber-500 to-amber-700 text-amber-50 shadow-amber-900/20"
//                   : "bg-gradient-to-br from-[#14352c] to-[#204e41] text-white shadow-[#14352c]/20"
//               }`}
//             >
//               {isFriday ? (
//                 <Coffee className="h-6 w-6 text-amber-100" />
//               ) : (
//                 <Calendar className="h-6 w-6 text-white" />
//               )}
//             </div>

//             <div>
//               <div className="flex items-center gap-2">
//                 <h3 className="font-extrabold text-gray-900 text-lg tracking-tight group-hover:text-[#14352c] transition-colors">
//                   Hari {item.hari}
//                 </h3>
//                 {isFriday && (
//                   <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold border border-amber-200">
//                     <Sparkles className="h-3 w-3" /> Libur
//                   </span>
//                 )}
//               </div>
//               <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mt-0.5">
//                 {isFriday ? "Agenda Majelis Libur" : "Piket Kebersihan Rutin"}
//               </p>
//             </div>
//           </div>

//           {/* Action Buttons: Edit & Delete */}
//           <div className="flex items-center gap-1.5 bg-gray-50/80 p-1 rounded-2xl border border-gray-100 shadow-2xs">
//             <button
//               type="button"
//               onClick={() => onEdit(item)}
//               className="p-2 rounded-xl text-gray-400 hover:text-[#14352c] hover:bg-emerald-100/50 active:scale-95 transition-all cursor-pointer"
//               title="Edit Jadwal"
//             >
//               <Edit3 className="h-4 w-4" />
//             </button>
//             <button
//               type="button"
//               onClick={() => onDelete(item.hari)}
//               className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 active:scale-95 transition-all cursor-pointer"
//               title="Kosongkan Jadwal"
//             >
//               <Trash2 className="h-4 w-4" />
//             </button>
//           </div>
//         </div>

//         {/* Info Detail / Content */}
//         {isFriday ? (
//           <div className="bg-amber-100/40 rounded-2xl p-4 border border-amber-200/60 text-xs text-amber-900 leading-relaxed shadow-2xs">
//             <p className="font-medium flex items-center gap-2">
//               <span className="text-base">🎉</span> 
//               <span>Kegiatan pengajian dan jadwal piket rutin ditiadakan pada hari ini.</span>
//             </p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {/* Box Waktu & Tugas */}
//             <div className="bg-white/80 rounded-2xl p-4 border border-gray-100 shadow-2xs space-y-2">
//               <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-[#c1663c] uppercase tracking-wider">
//                 <Clock className="h-3.5 w-3.5" />
//                 <span>{item.waktu || "Waktu Belum Diatur"}</span>
//               </div>
//               <p className="text-xs font-bold text-gray-800 line-clamp-2 leading-relaxed">
//                 {item.tugas || "Belum ada tugas spesifik yang ditentukan."}
//               </p>
//             </div>

//             {/* List Petugas */}
//             <div>
//               <div className="flex items-center justify-between text-[11px] font-bold text-gray-400 mb-2.5 px-0.5">
//                 <span className="flex items-center gap-1.5">
//                   <Users className="h-3.5 w-3.5 text-emerald-600" />
//                   <span>Petugas Bertugas</span>
//                 </span>
//                 <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-mono text-[10px] border border-emerald-100">
//                   {item.petugas?.length || 0} Orang
//                 </span>
//               </div>

//               {item.petugas && item.petugas.length > 0 ? (
//                 <div className="flex flex-wrap gap-1.5">
//                   {item.petugas.map((p) => (
//                     <div
//                       key={p.id}
//                       className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50/70 border border-emerald-100/80 text-emerald-950 text-xs font-semibold shadow-2xs hover:bg-emerald-100/50 transition-colors"
//                     >
//                       <div className="h-5 w-5 rounded-lg bg-[#14352c] text-emerald-300 flex items-center justify-center shrink-0 shadow-2xs">
//                         {p.avatar ? (
//                           <img src={p.avatar} alt={p.nama} className="h-full w-full object-cover rounded-lg" />
//                         ) : (
//                           <User className="h-3 w-3" />
//                         )}
//                       </div>
//                       <span className="truncate max-w-[130px]">{p.nama}</span>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="p-3 rounded-xl bg-gray-50/50 border border-dashed border-gray-200 text-center">
//                   <p className="text-[11px] text-gray-400 italic">
//                     Belum ada petugas ditugaskan untuk hari ini.
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Footer Card */}
//       <div className="mt-5 pt-3.5 border-t border-gray-100/80 flex items-center justify-between text-[11px] font-medium text-gray-400 relative z-10">
//         <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
//           <UserCheck className="h-3.5 w-3.5" />
//           <span>Sistem Piket Aktif</span>
//         </span>
//         <span className="font-mono text-[10px] bg-gray-100/80 px-2 py-0.5 rounded-md text-gray-500">
//           Majelis Al-Inayah
//         </span>
//       </div>
//     </motion.div>
//   );
// }
"use client";

import { motion } from "framer-motion";
import { Clock, Users, Edit3, Trash2, Coffee, UserCheck, Sparkles, User, Calendar } from "lucide-react";
import { ScheduleItem } from "../types";

// Definisikan tipe tambahan untuk PetugasPiket jika belum ada di ../types
export interface PetugasPiket {
  id: number | string;
  nama: string;
  avatar?: string | null; // <-- Properti avatar ditambahkan di sini agar tidak error TS2339
}

interface Props {
  item: ScheduleItem;
  onEdit: (item: ScheduleItem) => void;
  onDelete: (hari: string) => void;
}

export default function JadwalCard({ item, onEdit, onDelete }: Props) {
  const isFriday = item.isLibur;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`group relative rounded-3xl p-6 border shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden backdrop-blur-xl ${
        isFriday
          ? "bg-gradient-to-br from-amber-50/70 via-white/80 to-amber-100/40 border-amber-200/80 hover:border-amber-400/80 hover:-translate-y-1"
          : "bg-gradient-to-br from-white/90 via-emerald-50/20 to-white/90 border-gray-100/90 hover:border-emerald-300/80 hover:-translate-y-1"
      }`}
    >
      {/* Background Glow Effect Modern */}
      <div
        className={`absolute -top-12 -right-12 h-36 w-36 rounded-full blur-3xl transition-all pointer-events-none opacity-60 ${
          isFriday
            ? "bg-amber-400/20 group-hover:bg-amber-400/30"
            : "bg-emerald-500/10 group-hover:bg-emerald-500/20"
        }`}
      />

      <div className="space-y-5 relative z-10">
        {/* Header Card dengan Badge Hari & Action Buttons */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div
              className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 shadow-md transition-transform duration-300 group-hover:scale-105 ${
                isFriday
                  ? "bg-gradient-to-br from-amber-500 to-amber-700 text-amber-50 shadow-amber-900/20"
                  : "bg-gradient-to-br from-[#14352c] to-[#204e41] text-white shadow-[#14352c]/20"
              }`}
            >
              {isFriday ? (
                <Coffee className="h-6 w-6 text-amber-100" />
              ) : (
                <Calendar className="h-6 w-6 text-white" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-gray-900 text-lg tracking-tight group-hover:text-[#14352c] transition-colors">
                  Hari {item.hari}
                </h3>
                {isFriday && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold border border-amber-200">
                    <Sparkles className="h-3 w-3" /> Libur
                  </span>
                )}
              </div>
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mt-0.5">
                {isFriday ? "Agenda Majelis Libur" : "Piket Kebersihan Rutin"}
              </p>
            </div>
          </div>

          {/* Action Buttons: Edit & Delete */}
          <div className="flex items-center gap-1.5 bg-gray-50/80 p-1 rounded-2xl border border-gray-100 shadow-2xs">
            <button
              type="button"
              onClick={() => onEdit(item)}
              className="p-2 rounded-xl text-gray-400 hover:text-[#14352c] hover:bg-emerald-100/50 active:scale-95 transition-all cursor-pointer"
              title="Edit Jadwal"
            >
              <Edit3 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onDelete(item.hari)}
              className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 active:scale-95 transition-all cursor-pointer"
              title="Kosongkan Jadwal"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Info Detail / Content */}
        {isFriday ? (
          <div className="bg-amber-100/40 rounded-2xl p-4 border border-amber-200/60 text-xs text-amber-900 leading-relaxed shadow-2xs">
            <p className="font-medium flex items-center gap-2">
              <span className="text-base">🎉</span> 
              <span>Kegiatan pengajian dan jadwal piket rutin ditiadakan pada hari ini.</span>
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Box Waktu & Tugas */}
            <div className="bg-white/80 rounded-2xl p-4 border border-gray-100 shadow-2xs space-y-2">
              <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-[#c1663c] uppercase tracking-wider">
                <Clock className="h-3.5 w-3.5" />
                <span>{item.waktu || "Waktu Belum Diatur"}</span>
              </div>
              <p className="text-xs font-bold text-gray-800 line-clamp-2 leading-relaxed">
                {item.tugas || "Belum ada tugas spesifik yang ditentukan."}
              </p>
            </div>

            {/* List Petugas */}
            <div>
              <div className="flex items-center justify-between text-[11px] font-bold text-gray-400 mb-2.5 px-0.5">
                <span className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Petugas Bertugas</span>
                </span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-mono text-[10px] border border-emerald-100">
                  {item.petugas?.length || 0} Orang
                </span>
              </div>

              {item.petugas && item.petugas.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {item.petugas.map((p: any) => (
                    <div
                      key={p.id}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50/70 border border-emerald-100/80 text-emerald-950 text-xs font-semibold shadow-2xs hover:bg-emerald-100/50 transition-colors"
                    >
                      <div className="h-5 w-5 rounded-lg bg-[#14352c] text-emerald-300 flex items-center justify-center shrink-0 shadow-2xs overflow-hidden">
                        {p.avatar ? (
                          <img src={p.avatar} alt={p.nama} className="h-full w-full object-cover rounded-lg" />
                        ) : (
                          <User className="h-3 w-3" />
                        )}
                      </div>
                      <span className="truncate max-w-[130px]">{p.nama}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-gray-50/50 border border-dashed border-gray-200 text-center">
                  <p className="text-[11px] text-gray-400 italic">
                    Belum ada petugas ditugaskan untuk hari ini.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer Card */}
      <div className="mt-5 pt-3.5 border-t border-gray-100/80 flex items-center justify-between text-[11px] font-medium text-gray-400 relative z-10">
        <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
          <UserCheck className="h-3.5 w-3.5" />
          <span>Sistem Piket Aktif</span>
        </span>
        <span className="font-mono text-[10px] bg-gray-100/80 px-2 py-0.5 rounded-md text-gray-500">
          Majelis Al-Inayah
        </span>
      </div>
    </motion.div>
  );
}
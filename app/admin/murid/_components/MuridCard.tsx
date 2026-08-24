// "use client";

// import { BookOpen, Edit3, Trash2, Award } from "lucide-react";
// import { Murid } from "../types";

// interface MuridCardProps {
//   item: Murid;
//   onOpenHafalanModal: (murid: Murid) => void;
//   onEditMurid: (murid: Murid) => void;
//   onDeleteMurid: (id: number, nama: string) => void;
// }

// export default function MuridCard({
//   item,
//   onOpenHafalanModal,
//   onEditMurid,
//   onDeleteMurid,
// }: MuridCardProps) {
//   return (
//     <div className="group relative flex flex-col justify-between rounded-3xl bg-white p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
//       <div>
//         <div className="flex items-start justify-between gap-2">
//           <div>
//             <span className="inline-block rounded-lg bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-[#14352c] border border-emerald-100 mb-2">
//               {item.tingkat_ngaji?.nama_tingkat || "Iqra 1"}
//             </span>
//             <h3 className="text-base font-bold text-gray-900 group-hover:text-[#14352c] transition-colors">
//               {item.nama}
//             </h3>
//           </div>

//           <div className="flex items-center gap-1">
//             <button
//               onClick={() => onEditMurid(item)}
//               className="p-1.5 rounded-xl text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer"
//               title="Edit Murid"
//             >
//               <Edit3 className="h-4 w-4" />
//             </button>
//             <button
//               onClick={() => onDeleteMurid(item.id, item.nama)}
//               className="p-1.5 rounded-xl text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
//               title="Hapus Murid"
//             >
//               <Trash2 className="h-4 w-4" />
//             </button>
//           </div>
//         </div>

//         <div className="mt-3 space-y-1.5 text-xs text-gray-500">
//           <div className="flex items-center gap-2">
//             <span className="font-medium text-gray-400">Gender:</span>
//             <span className="font-semibold text-gray-700">{item.gender}</span>
//           </div>
//         </div>

//         <div className="mt-4 rounded-2xl bg-gray-50 p-3 border border-gray-100">
//           <div className="flex items-center justify-between text-[11px] font-semibold text-gray-500 mb-1">
//             <span className="flex items-center gap-1">
//               <Award className="h-3.5 w-3.5 text-[#14352c]" /> Hafalan Terakhir
//             </span>
//             <span>{item.riwayatHafalan?.length || 0} Surah</span>
//           </div>
//           {item.hafalanTerakhir ? (
//             <p className="text-xs font-bold text-gray-800">
//               Surah {item.hafalanTerakhir.surah} : {item.hafalanTerakhir.ayat}
//             </p>
//           ) : (
//             <p className="text-xs italic text-gray-400">Belum ada catatan hafalan</p>
//           )}
//         </div>
//       </div>

//       <button
//         onClick={() => onOpenHafalanModal(item)}
//         className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#14352c]/5 py-2.5 text-xs font-bold text-[#14352c] hover:bg-[#14352c] hover:text-white transition-all cursor-pointer"
//       >
//         <BookOpen className="h-4 w-4" />
//         <span>Kelola Hafalan</span>
//       </button>
//     </div>
//   );
// }

"use client";

import { Edit3, Trash2, BookOpen, User } from "lucide-react";
import { Murid } from "../types";

interface MuridCardProps {
  item: Murid;
  onOpenHafalanModal: (murid: Murid) => void;
  onEditMurid: (murid: Murid) => void;
  onDeleteMurid: (id: number, nama: string) => void;
}

const getInitials = (name: string) => {
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export default function MuridCard({
  item,
  onOpenHafalanModal,
  onEditMurid,
  onDeleteMurid,
}: MuridCardProps) {
  // PERBAIKAN: Kalkulasi progress diubah berdasarkan jumlah Surah (karena input database adalah Surah)
  // Menghitung berapa banyak riwayat hafalan yang dimiliki murid ini
  const totalSurahDihafal = item.riwayatHafalan?.length || 0; 
  
  // Kalkulasi persentase dari total 114 Surah dalam Al-Qur'an
  const progressPercentage = Math.min(100, Math.round((totalSurahDihafal / 114) * 100));

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl bg-white p-5 border border-gray-200 hover:shadow-xl hover:border-emerald-200 transition-all duration-300">
      
      {/* Action Buttons dengan efek Glassmorphism */}
      <div className="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/70 backdrop-blur-md p-1 rounded-lg border border-white/50 shadow-sm z-10">
        <button
          onClick={() => onEditMurid(item)}
          className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors cursor-pointer"
          title="Edit Data"
        >
          <Edit3 className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={() => onDeleteMurid(item.id, item.nama)}
          className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
          title="Hapus Data"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="relative">
        {/* Avatar Inisial */}
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 text-sm font-bold text-slate-600 shadow-sm">
            {getInitials(item.nama)}
          </div>
        </div>

        {/* Nama & Gender */}
        <div className="mt-4 mb-5">
          <h3 className="text-[15px] font-bold text-gray-900 line-clamp-1">
            {item.nama}
          </h3>
          
          <div className="flex items-center gap-1.5 mt-1 text-[11px] font-medium text-gray-500">
            <User className="h-3.5 w-3.5" />
            <span>{item.gender || "-"}</span>
          </div>
        </div>

        {/* Info Tingkat, Hafalan, & Progress Bar */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500 font-medium">Tingkat</span>
            <span className="font-semibold text-gray-900 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
              {item.tingkat_ngaji?.nama_tingkat || "Iqra 1"}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500 font-medium">Hafalan Terakhir</span>
            <span className="font-semibold text-emerald-700">
              {item.hafalanTerakhir ? item.hafalanTerakhir.surah : "-"}
            </span>
          </div>

          {/* Progress Bar 114 Surah */}
          <div className="pt-2">
            <div className="flex justify-between items-end mb-1.5">
              {/* PERBAIKAN UI: Mengubah label menjadi Target 114 Surah agar relevan dengan persentase */}
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Target 114 Surah</span>
              <span className="text-[11px] font-bold text-emerald-600">{progressPercentage}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-[#14352c] rounded-full transition-all duration-700 ease-out relative" 
                style={{ width: `${progressPercentage}%` }} 
              >
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-white/20 w-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tombol Kelola Hafalan */}
      <button
        onClick={() => onOpenHafalanModal(item)}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 text-xs font-semibold text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-all duration-300 shadow-sm cursor-pointer"
      >
        <BookOpen className="h-3.5 w-3.5" />
        Kelola Hafalan
      </button>

    </div>
  );
}
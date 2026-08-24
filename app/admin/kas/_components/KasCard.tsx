// "use client";

// import {
//   ArrowUpRight,
//   ArrowDownRight,
//   Inbox,
//   Edit3,
//   Trash2,
// } from "lucide-react";
// import { Transaksi, formatRupiah, formatKode, formatTanggal } from "../types";

// interface Props {
//   transactions: Transaksi[];
//   onEdit: (item: Transaksi) => void;
//   onDelete: (item: Transaksi) => void;
// }

// export default function KasCard({ transactions, onEdit, onDelete }: Props) {
//   if (transactions.length === 0) {
//     return (
//       <div className="block sm:hidden p-10 flex flex-col items-center gap-2.5 text-center">
//         <div className="h-12 w-12 rounded-2xl bg-gray-50 flex items-center justify-center">
//           <Inbox className="h-5 w-5 text-gray-300" />
//         </div>
//         <p className="text-gray-400 text-xs font-medium">
//           Tidak ada riwayat kas ditemukan.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="block sm:hidden divide-y divide-gray-100">
//       {transactions.map((item) => (
//         <div
//           key={item.id}
//           className="p-4 space-y-2.5 bg-white hover:bg-gray-50/50 transition-colors"
//         >
//           <div className="flex items-start justify-between gap-2">
//             <div className="flex items-center gap-2.5 min-w-0">
//               <div
//                 className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${
//                   item.kategori === "Pemasukan"
//                     ? "bg-emerald-50 text-emerald-600"
//                     : "bg-rose-50 text-rose-600"
//                 }`}
//               >
//                 {item.kategori === "Pemasukan" ? (
//                   <ArrowUpRight className="h-4 w-4" />
//                 ) : (
//                   <ArrowDownRight className="h-4 w-4" />
//                 )}
//               </div>
//               <div className="min-w-0">
//                 <span className="text-[10px] font-mono bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-md">
//                   {formatKode(item.id)}
//                 </span>
//                 <span className="text-[11px] text-gray-400 ml-2 font-normal">
//                   {formatTanggal(item.tanggal)}
//                 </span>
//               </div>
//             </div>

//             <span
//               className={`font-black text-sm shrink-0 ${
//                 item.kategori === "Pemasukan"
//                   ? "text-emerald-600"
//                   : "text-rose-600"
//               }`}
//             >
//               {item.kategori === "Pemasukan" ? "+ " : "- "}
//               {formatRupiah(item.jumlah)}
//             </span>
//           </div>

//           <div>
//             <p className="font-bold text-gray-900 text-xs sm:text-sm">
//               {item.keterangan}
//             </p>
//             <p className="text-[11px] text-gray-400 mt-1">
//               PJ:{" "}
//               <span className="font-medium text-gray-600">
//                 {item.penanggungJawab}
//               </span>
//             </p>
//           </div>

//           <div className="flex items-center justify-end gap-1 pt-1">
//             <button
//               type="button"
//               onClick={() => onEdit(item)}
//               className="p-1.5 rounded-lg text-gray-400 hover:text-[#14352c] hover:bg-emerald-50 active:scale-95 transition-all cursor-pointer"
//               title="Edit catatan"
//             >
//               <Edit3 className="h-3.5 w-3.5" />
//             </button>
//             <button
//               type="button"
//               onClick={() => onDelete(item)}
//               className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 active:scale-95 transition-all cursor-pointer"
//               title="Hapus catatan"
//             >
//               <Trash2 className="h-3.5 w-3.5" />
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
import React from "react";
import { motion } from "framer-motion";
import { Calendar, Edit2, Trash2, TrendingUp, TrendingDown, UserRound } from "lucide-react";
import { Transaksi, formatTanggal, formatRupiah, formatKode } from "../types";

interface Props {
  item: Transaksi;
  onEdit: (item: Transaksi) => void;
  onDelete: (item: Transaksi) => void;
}

export default function KasCard({ item, onEdit, onDelete }: Props) {
  const isPemasukan = item.kategori === "Pemasukan";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      layout
      className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
    >
      {/* Dekorasi Garis Kiri Sesuai Kategori */}
      <div 
        className={`absolute left-0 top-0 bottom-0 w-1 ${
          isPemasukan ? "bg-[#1a4a3e]" : "bg-rose-500"
        }`} 
      />

      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`h-10 w-10 rounded-xl flex items-center justify-center ${
              isPemasukan
                ? "bg-[#1a4a3e]/10 text-[#1a4a3e]"
                : "bg-rose-100 text-rose-600"
            }`}
          >
            {isPemasukan ? (
              <TrendingUp className="w-5 h-5" />
            ) : (
              <TrendingDown className="w-5 h-5" />
            )}
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 tracking-wider">
              {formatKode(item.id)}
            </span>
            <h3 className="font-bold text-gray-800 text-sm mt-0.5 line-clamp-1">
              {item.keterangan}
            </h3>
          </div>
        </div>
        <div className="text-right">
          <span
            className={`inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold ${
              isPemasukan
                ? "bg-[#1a4a3e]/10 text-[#1a4a3e]"
                : "bg-rose-100 text-rose-600"
            }`}
          >
            {item.kategori}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <span
          className={`text-lg font-black ${
            isPemasukan ? "text-[#1a4a3e]" : "text-rose-600"
          }`}
        >
          {isPemasukan ? "+" : "-"} {formatRupiah(item.jumlah)}
        </span>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="space-y-1.5">
          {/* Tanggal */}
          <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatTanggal(item.tanggal)}</span>
          </div>
          {/* Pihak Terkait (Murid Nama) */}
          <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
            <UserRound className="w-3.5 h-3.5" />
            <span className="font-semibold text-gray-700">{item.murid_nama}</span>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(item)}
            className="h-8 w-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors"
            title="Edit"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDelete(item)}
            className="h-8 w-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center hover:bg-rose-100 transition-colors"
            title="Hapus"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
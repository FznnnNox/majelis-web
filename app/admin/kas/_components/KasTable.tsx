// "use client";

// import {
//   ArrowUpRight,
//   ArrowDownRight,
//   Plus,
//   Minus,
//   Calendar,
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

// export default function KasTable({ transactions, onEdit, onDelete }: Props) {
//   return (
//     <div className="hidden sm:block overflow-x-auto">
//       <table className="w-full text-left border-collapse">
//         <thead>
//           <tr className="bg-gray-50/60 border-b border-gray-100 text-[11px] uppercase tracking-wider font-extrabold text-gray-400">
//             <th className="py-4 px-6">ID &amp; Tanggal</th>
//             <th className="py-4 px-6">Keterangan Transaksi</th>
//             <th className="py-4 px-6">Kategori</th>
//             <th className="py-4 px-6">Penanggung Jawab</th>
//             <th className="py-4 px-6 text-right">Nominal</th>
//             <th className="py-4 px-6 text-right">Aksi</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-100/80 text-xs sm:text-sm text-gray-700 font-medium">
//           {transactions.length > 0 ? (
//             transactions.map((item) => (
//               <tr
//                 key={item.id}
//                 className="hover:bg-gray-50/70 transition-colors group"
//               >
//                 <td className="py-4 px-6">
//                   <div className="flex items-center gap-2.5">
//                     <span className="text-xs font-mono bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-semibold">
//                       {formatKode(item.id)}
//                     </span>
//                     <span className="text-xs text-gray-400 font-normal flex items-center gap-1">
//                       <Calendar className="h-3 w-3" />
//                       {formatTanggal(item.tanggal)}
//                     </span>
//                   </div>
//                 </td>

//                 <td className="py-4 px-6">
//                   <p className="font-bold text-gray-900 group-hover:text-[#14352c] transition-colors">
//                     {item.keterangan}
//                   </p>
//                 </td>

//                 <td className="py-4 px-6">
//                   <span
//                     className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${
//                       item.kategori === "Pemasukan"
//                         ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
//                         : "bg-rose-50 text-rose-700 border border-rose-200/60"
//                     }`}
//                   >
//                     {item.kategori === "Pemasukan" ? (
//                       <Plus className="h-3 w-3" />
//                     ) : (
//                       <Minus className="h-3 w-3" />
//                     )}
//                     {item.kategori}
//                   </span>
//                 </td>

//                 <td className="py-4 px-6">
//                   <div className="flex items-center gap-2">
//                     <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[#14352c] to-[#204e41] text-white text-[10px] font-extrabold flex items-center justify-center shrink-0">
//                       {item.penanggungJawab.charAt(0)}
//                     </div>
//                     <span className="font-semibold text-gray-700">
//                       {item.penanggungJawab}
//                     </span>
//                   </div>
//                 </td>

//                 <td className="py-4 px-6 text-right font-extrabold text-sm">
//                   <span
//                     className={
//                       item.kategori === "Pemasukan"
//                         ? "text-emerald-600"
//                         : "text-rose-600"
//                     }
//                   >
//                     {item.kategori === "Pemasukan" ? "+ " : "- "}
//                     {formatRupiah(item.jumlah)}
//                   </span>
//                 </td>

//                 <td className="py-4 px-6">
//                   <div className="flex items-center justify-end gap-1">
//                     <button
//                       type="button"
//                       onClick={() => onEdit(item)}
//                       className="p-2 rounded-xl text-gray-400 hover:text-[#14352c] hover:bg-emerald-50 active:scale-95 transition-all cursor-pointer"
//                       title="Edit catatan"
//                     >
//                       <Edit3 className="h-4 w-4" />
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => onDelete(item)}
//                       className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 active:scale-95 transition-all cursor-pointer"
//                       title="Hapus catatan"
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={6} className="py-14">
//                 <div className="flex flex-col items-center gap-2.5 text-center">
//                   <div className="h-12 w-12 rounded-2xl bg-gray-50 flex items-center justify-center">
//                     <Inbox className="h-5 w-5 text-gray-300" />
//                   </div>
//                   <p className="text-gray-400 text-xs font-medium">
//                     Tidak ada catatan transaksi kas ditemukan.
//                   </p>
//                 </div>
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }
"use client";

import {
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Minus,
  Calendar,
  Inbox,
  Edit3,
  Trash2,
} from "lucide-react";
import { Transaksi, formatRupiah, formatTanggal } from "../types"; // formatKode dihapus karena tidak dipakai lagi

interface Props {
  transactions: Transaksi[];
  onEdit: (item: Transaksi) => void;
  onDelete: (item: Transaksi) => void;
}

export default function KasTable({ transactions, onEdit, onDelete }: Props) {
  return (
    <div className="hidden sm:block overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50/60 border-b border-gray-100 text-[11px] font-normal tracking-wider text-gray-400">
            <th className="py-4 px-6">Tanggal</th>
            <th className="py-4 px-6">Keterangan Transaksi</th>
            <th className="py-4 px-6">Kategori</th>
            <th className="py-4 px-6">Pihak Terkait</th>
            <th className="py-4 px-6 text-right">Nominal</th>
            <th className="py-4 px-6 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100/80 text-xs sm:text-sm text-gray-700 font-medium">
          {transactions.length > 0 ? (
            transactions.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50/70 transition-colors group"
              >
                <td className="py-4 px-6">
                  <span className="text-xs text-gray-500 font-medium flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-gray-400" />
                    {formatTanggal(item.tanggal)}
                  </span>
                </td>

                <td className="py-4 px-6">
                  <p className="font-normal text-gray-900 group-hover:text-[#14352c] transition-colors">
                    {item.keterangan}
                  </p>
                </td>

                <td className="py-4 px-6">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${
                      item.kategori === "Pemasukan"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                        : "bg-rose-50 text-rose-700 border border-rose-200/60"
                    }`}
                  >
                    {item.kategori === "Pemasukan" ? (
                      <Plus className="h-3 w-3" />
                    ) : (
                      <Minus className="h-3 w-3" />
                    )}
                    {item.kategori}
                  </span>
                </td>

                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[#14352c] to-[#204e41] text-white text-[10px] font-extrabold flex items-center justify-center shrink-0">
                      {item.murid_nama.charAt(0)}
                    </div>
                    <span className="font-semibold text-gray-700">
                      {item.murid_nama}
                    </span>
                  </div>
                </td>

                <td className="py-4 px-6 text-right font-extrabold text-sm">
                  <span
                    className={
                      item.kategori === "Pemasukan"
                        ? "text-emerald-600"
                        : "text-rose-600"
                    }
                  >
                    {item.kategori === "Pemasukan" ? "+ " : "- "}
                    {formatRupiah(item.jumlah)}
                  </span>
                </td>

                <td className="py-4 px-6">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => onEdit(item)}
                      className="p-2 rounded-xl text-gray-400 hover:text-[#14352c] hover:bg-emerald-50 active:scale-95 transition-all cursor-pointer"
                      title="Edit catatan"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(item)}
                      className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 active:scale-95 transition-all cursor-pointer"
                      title="Hapus catatan"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="py-14">
                <div className="flex flex-col items-center gap-2.5 text-center">
                  <div className="h-12 w-12 rounded-2xl bg-gray-50 flex items-center justify-center">
                    <Inbox className="h-5 w-5 text-gray-300" />
                  </div>
                  <p className="text-gray-400 text-xs font-medium">
                    Tidak ada catatan transaksi kas ditemukan.
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
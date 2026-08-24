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
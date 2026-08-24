"use client";

import { Heart, Inbox, Edit3, Trash2 } from "lucide-react";
import { Donasi, formatRupiah, formatKode, formatTanggal } from "../types";

interface Props {
  donations: Donasi[];
  onEdit: (item: Donasi) => void;
  onDelete: (item: Donasi) => void;
}

export default function DonasiCard({ donations, onEdit, onDelete }: Props) {
  if (donations.length === 0) {
    return (
      <div className="block sm:hidden p-10 flex flex-col items-center gap-2.5 text-center">
        <div className="h-12 w-12 rounded-2xl bg-gray-50 flex items-center justify-center">
          <Inbox className="h-5 w-5 text-gray-300" />
        </div>
        <p className="text-gray-400 text-xs font-medium">
          Tidak ada catatan donasi ditemukan.
        </p>
      </div>
    );
  }

  return (
    <div className="block sm:hidden divide-y divide-gray-100">
      {donations.map((item) => (
        <div
          key={item.id}
          className="p-4 space-y-2.5 bg-white hover:bg-gray-50/50 transition-colors"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="h-9 w-9 rounded-xl bg-emerald-50 text-[#14352c] font-bold flex items-center justify-center shrink-0 text-xs">
                <Heart className="h-4 w-4 text-[#c1663c] fill-[#c1663c]" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-gray-900 text-xs sm:text-sm truncate">
                  {item.donatur}
                </h4>
                <span className="text-[10px] font-mono text-gray-400 block">
                  {formatKode(item.id)} &bull; {formatTanggal(item.tanggal)}
                </span>
              </div>
            </div>

            <span className="font-black text-sm text-[#14352c] shrink-0">
              {formatRupiah(item.nominal)}
            </span>
          </div>

          <div className="text-xs pt-1 border-t border-gray-50 space-y-1">
            <div className="flex justify-between text-gray-500 gap-2">
              <span className="shrink-0">Program:</span>
              <span className="font-semibold text-gray-800 text-right">
                {item.programNama}
              </span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Metode:</span>
              <span className="font-medium text-gray-600">{item.metode}</span>
            </div>
            <div className="flex justify-between text-gray-500 items-center">
              <span>Status:</span>
              <span
                className={`font-bold px-2 py-0.5 rounded-full text-[10px] ${
                  item.status === "Terverifikasi"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {item.status}
              </span>
            </div>
            {item.pesan && (
              <p className="text-[11px] text-gray-400 italic pt-1">
                "{item.pesan}"
              </p>
            )}
          </div>

          <div className="flex items-center justify-end gap-1 pt-1">
            <button
              type="button"
              onClick={() => onEdit(item)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-[#14352c] hover:bg-emerald-50 active:scale-95 transition-all cursor-pointer"
              title="Edit donasi"
            >
              <Edit3 className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onDelete(item)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 active:scale-95 transition-all cursor-pointer"
              title="Hapus donasi"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
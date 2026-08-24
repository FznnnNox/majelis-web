"use client";

import { Heart, Calendar, Inbox, Edit3, Trash2 } from "lucide-react";
import { Donasi, formatRupiah, formatKode, formatTanggal } from "../types";

interface Props {
  donations: Donasi[];
  onEdit: (item: Donasi) => void;
  onDelete: (item: Donasi) => void;
}

export default function DonasiTable({ donations, onEdit, onDelete }: Props) {
  return (
    <div className="hidden sm:block overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50/50 border-b border-gray-100 text-[11px] uppercase tracking-wider font-extrabold text-gray-400">
            <th className="py-4 px-6">Donatur &amp; ID</th>
            <th className="py-4 px-6">Program Tujuan</th>
            <th className="py-4 px-6">Metode &amp; Tanggal</th>
            <th className="py-4 px-6">Status</th>
            <th className="py-4 px-6 text-right">Nominal</th>
            <th className="py-4 px-6 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100/80 text-xs sm:text-sm text-gray-700 font-medium">
          {donations.length > 0 ? (
            donations.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50/70 transition-colors group"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-emerald-50 text-[#14352c] font-bold flex items-center justify-center shrink-0 text-xs">
                      <Heart className="h-4 w-4 text-[#c1663c] fill-[#c1663c]" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 group-hover:text-[#14352c] transition-colors">
                        {item.donatur}
                      </p>
                      <span className="text-[10px] font-mono bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-md">
                        {formatKode(item.id)}
                      </span>
                    </div>
                  </div>
                </td>

                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50/80 text-[#14352c] text-xs font-semibold border border-emerald-100">
                    {item.programNama}
                  </span>
                </td>

                <td className="py-4 px-6">
                  <div>
                    <p className="font-semibold text-gray-800">{item.metode}</p>
                    <p className="text-xs text-gray-400 font-normal flex items-center gap-1 mt-0.5">
                      <Calendar className="h-3 w-3" />
                      {formatTanggal(item.tanggal)}
                    </p>
                  </div>
                </td>

                <td className="py-4 px-6">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold ${
                      item.status === "Terverifikasi"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                        : "bg-amber-50 text-amber-700 border border-amber-200/60"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="py-4 px-6 text-right font-black text-sm text-[#14352c]">
                  {formatRupiah(item.nominal)}
                </td>

                <td className="py-4 px-6">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => onEdit(item)}
                      className="p-2 rounded-xl text-gray-400 hover:text-[#14352c] hover:bg-emerald-50 active:scale-95 transition-all cursor-pointer"
                      title="Edit donasi"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(item)}
                      className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 active:scale-95 transition-all cursor-pointer"
                      title="Hapus donasi"
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
                    Tidak ada catatan donasi ditemukan.
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
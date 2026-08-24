"use client";

import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Receipt,
  PiggyBank,
} from "lucide-react";
import { formatRupiah } from "../types";

interface Props {
  saldoKas: number;
  totalPemasukan: number;
  totalPengeluaran: number;
}

export default function KasSummary({
  saldoKas,
  totalPemasukan,
  totalPengeluaran,
}: Props) {
  const totalArus = totalPemasukan + totalPengeluaran;
  const pemasukanRatio = totalArus > 0 ? (totalPemasukan / totalArus) * 100 : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
      {/* Total Saldo */}
      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#14352c] to-[#1f4a3c] p-4 sm:p-5 border border-[#14352c] shadow-md hover:shadow-xl hover:shadow-[#14352c]/20 transition-all">
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/5 blur-2xl" />
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-[11px] sm:text-xs font-medium text-emerald-200/70 uppercase tracking-wider">
              Total Saldo Kas
            </p>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1 tracking-tight">
              {formatRupiah(saldoKas)}
            </h3>
          </div>
          <div className="h-10 sm:h-12 w-10 sm:w-12 rounded-2xl bg-white/10 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Wallet className="h-5 sm:h-6 w-5 sm:w-6" />
          </div>
        </div>
        <div className="relative mt-3.5 sm:mt-4 flex items-center gap-1.5 text-[11px] text-emerald-200/80 font-medium">
          <PiggyBank className="h-3.5 w-3.5 text-[#e08a5f]" />
          <span>Kas siap dipergunakan</span>
        </div>
      </div>

      {/* Pemasukan */}
      <div className="group relative overflow-hidden rounded-2xl bg-white p-4 sm:p-5 border border-gray-100 shadow-xs hover:shadow-md hover:border-emerald-200 transition-all">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] sm:text-xs font-medium text-gray-400 uppercase tracking-wider">
              Total Pemasukan
            </p>
            <h3 className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1 tracking-tight">
              {formatRupiah(totalPemasukan)}
            </h3>
          </div>
          <div className="h-10 sm:h-12 w-10 sm:w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <ArrowUpRight className="h-5 sm:h-6 w-5 sm:w-6" />
          </div>
        </div>
        <div className="mt-3.5 sm:mt-4 space-y-1.5">
          <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${pemasukanRatio}%` }}
            />
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-medium">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Iuran santri &amp; infaq</span>
          </div>
        </div>
      </div>

      {/* Pengeluaran */}
      <div className="group relative overflow-hidden rounded-2xl bg-white p-4 sm:p-5 border border-gray-100 shadow-xs hover:shadow-md hover:border-rose-200 transition-all">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] sm:text-xs font-medium text-gray-400 uppercase tracking-wider">
              Total Pengeluaran
            </p>
            <h3 className="text-2xl sm:text-3xl font-black text-rose-600 mt-1 tracking-tight">
              {formatRupiah(totalPengeluaran)}
            </h3>
          </div>
          <div className="h-10 sm:h-12 w-10 sm:w-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <ArrowDownRight className="h-5 sm:h-6 w-5 sm:w-6" />
          </div>
        </div>
        <div className="mt-3.5 sm:mt-4 space-y-1.5">
          <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-rose-500 transition-all duration-500"
              style={{ width: `${100 - pemasukanRatio}%` }}
            />
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-medium">
            <Receipt className="h-3.5 w-3.5" />
            <span>Kebutuhan operasional</span>
          </div>
        </div>
      </div>
    </div>
  );
}
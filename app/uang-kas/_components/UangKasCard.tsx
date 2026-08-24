"use client";

import { motion, Variants } from "framer-motion";
import { ArrowDownLeft, ArrowUpRight, Calendar, User } from "lucide-react";
import { Transaction, formatRupiah, formatTanggal } from "../types";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function UangKasCard({ trx }: { trx: Transaction }) {
  const isIncome = trx.kategori === "Pemasukan";

  return (
    <motion.div
      variants={itemVariants}
      className="group flex flex-col gap-3 rounded-2xl bg-[#f8faf9] p-4 ring-1 ring-gray-900/5 transition-all duration-300 hover:bg-white hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-start gap-3.5">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 ${
            isIncome
              ? "bg-emerald-50 text-emerald-600 ring-emerald-100"
              : "bg-rose-50 text-rose-600 ring-rose-100"
          }`}
        >
          {isIncome ? (
            <ArrowDownLeft className="h-5 w-5" />
          ) : (
            <ArrowUpRight className="h-5 w-5" />
          )}
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-sm font-semibold text-gray-900 transition-colors group-hover:text-[#152e28]">
              {trx.keterangan}
            </h4>
            <span
              className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ring-1 ${
                isIncome
                  ? "bg-emerald-50 text-emerald-700 ring-emerald-200/60"
                  : "bg-rose-50 text-rose-700 ring-rose-200/60"
              }`}
            >
              {trx.kategori}
            </span>
          </div>
          {/* Tampilkan Nama Murid jika ada data relasinya */}
          {trx.murid_nama && trx.murid_nama !== "Tidak diketahui" && (
            <p className="mt-1 text-[11px] font-medium text-emerald-600/80 flex items-center gap-1">
              <User className="h-3 w-3" />
              Dari: {trx.murid_nama}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-gray-200/60 pt-2 sm:flex-col sm:items-end sm:border-t-0 sm:pt-0">
        <span
          className={`text-base font-bold ${
            isIncome ? "text-emerald-600" : "text-rose-600"
          }`}
        >
          {isIncome ? "+" : "-"}
          {formatRupiah(trx.jumlah)}
        </span>
        <div className="mt-0.5 flex items-center gap-1.5 text-[11px] font-medium text-gray-400">
          <Calendar className="h-3 w-3 text-gray-400" />
          {formatTanggal(trx.tanggal)}
        </div>
      </div>
    </motion.div>
  );
}
"use client";

import { Search, Receipt } from "lucide-react";
import { motion } from "framer-motion";
import { FilterKategoriKas } from "../types";

interface UangKasFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filter: FilterKategoriKas;
  setFilter: (filter: FilterKategoriKas) => void;
}

export default function UangKasFilter({
  searchQuery,
  setSearchQuery,
  filter,
  setFilter,
}: UangKasFilterProps) {
  const filterOptions: FilterKategoriKas[] = ["Semua", "Pemasukan", "Pengeluaran"];

  return (
    <div className="flex flex-col gap-4 border-b border-gray-100 pb-6 md:flex-row md:items-center md:justify-between">
      <div>
        <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-900">
          <Receipt className="h-5 w-5 text-[#e76f3c]" />
          Riwayat transaksi
        </h3>
        <p className="mt-0.5 text-sm font-medium text-gray-500">
          Daftar rinci mutasi keuangan uang kas majelis
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari transaksi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl bg-[#f8faf9] py-2 pl-10 pr-4 text-sm font-medium text-gray-800 placeholder-gray-400 ring-1 ring-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-[#152e28]/30 sm:w-56"
          />
        </div>

        <div className="relative inline-flex items-center gap-1 rounded-xl bg-[#f8faf9] p-1 ring-1 ring-gray-200/80">
          {filterOptions.map((type) => {
            const isActive = filter === type;
            return (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className="relative rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors"
              >
                {isActive && (
                  <motion.span
                    layoutId="active-filter-kas"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    className="absolute inset-0 rounded-lg bg-[#152e28] shadow-sm"
                  />
                )}
                <span
                  className={`relative z-10 ${
                    isActive ? "text-white" : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {type}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
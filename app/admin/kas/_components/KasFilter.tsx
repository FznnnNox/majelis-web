"use client";

import { Search } from "lucide-react";
import { FILTER_OPTIONS, FilterKategori } from "../types";

interface Props {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterKategori: FilterKategori;
  onFilterChange: (value: FilterKategori) => void;
}

export default function KasFilter({
  searchTerm,
  onSearchChange,
  filterKategori,
  onFilterChange,
}: Props) {
  return (
    <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5">
      <div className="relative w-full sm:w-80">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari transaksi, ID, atau nama..."
          className="w-full pl-10 pr-4 py-2.5 bg-gray-50/80 border border-gray-200/80 rounded-xl sm:rounded-2xl text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14352c]/15 focus:border-[#14352c] focus:bg-white transition-all"
        />
      </div>

      {/* Segmented pill filter */}
      <div className="inline-flex items-center gap-1 bg-gray-50 border border-gray-200/80 rounded-xl sm:rounded-2xl p-1 w-full sm:w-auto">
        {FILTER_OPTIONS.map((f) => {
          const active = filterKategori === f.value;
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => onFilterChange(f.value)}
              className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                active
                  ? "bg-[#14352c] text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-800 hover:bg-white"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
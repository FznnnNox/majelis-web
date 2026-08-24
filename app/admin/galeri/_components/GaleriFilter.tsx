"use client";

import { Search } from "lucide-react";
import { KATEGORI_OPTIONS } from "../types";

interface Props {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterKategori: string; // "Semua" atau value kategori
  onFilterChange: (value: string) => void;
}

export default function GaleriFilter({
  searchTerm,
  onSearchChange,
  filterKategori,
  onFilterChange,
}: Props) {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3 border border-gray-100/80 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
      <div className="relative w-full sm:w-80">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari judul dokumentasi..."
          className="w-full pl-10 pr-4 py-2 sm:py-2.5 bg-gray-50/80 border border-gray-200/80 rounded-xl text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#102d25]/15 focus:border-[#102d25] focus:bg-white transition-all"
        />
      </div>

      <div className="inline-flex flex-wrap items-center gap-1 bg-gray-50 border border-gray-200/80 rounded-xl p-1 w-full sm:w-auto">
        <button
          type="button"
          onClick={() => onFilterChange("Semua")}
          className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            filterKategori === "Semua"
              ? "bg-[#14352c] text-white shadow-sm"
              : "text-gray-500 hover:text-gray-800 hover:bg-white"
          }`}
        >
          Semua
        </button>
        {KATEGORI_OPTIONS.map((k) => (
          <button
            key={k.value}
            type="button"
            onClick={() => onFilterChange(k.value)}
            className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              filterKategori === k.value
                ? "bg-[#14352c] text-white shadow-sm"
                : "text-gray-500 hover:text-gray-800 hover:bg-white"
            }`}
          >
            {k.label}
          </button>
        ))}
      </div>
    </div>
  );
}
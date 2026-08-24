"use client";

import { Search } from "lucide-react";

interface Props {
  search: string;
  onSearchChange: (val: string) => void;
  kelasFilters: string[];
  kelasFilter: string;
  onKelasFilterChange: (val: string) => void;
}

export default function SearchFilterBar({
  search,
  onSearchChange,
  kelasFilters,
  kelasFilter,
  onKelasFilterChange,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between mb-8">
      <div className="relative w-full sm:max-w-sm">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Cari nama santri..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#152e28] focus:ring-2 focus:ring-[#152e28]/10 bg-white shadow-sm transition-all"
        />
      </div>

      {/* Pill Filters */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
        {kelasFilters.map((k) => {
          const active = kelasFilter === k;
          return (
            <button
              key={k}
              onClick={() => onKelasFilterChange(k)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                active
                  ? "bg-[#152e28] text-white border-[#152e28] shadow-sm"
                  : "bg-white text-slate-600 border-slate-200 hover:border-[#152e28]/30 hover:bg-slate-50"
              }`}
            >
              {k}
            </button>
          );
        })}
      </div>
    </div>
  );
}
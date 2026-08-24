"use client";

import { Search } from "lucide-react";

interface FilterBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  count: number;
}

export default function FilterBar({
  searchTerm,
  setSearchTerm,
  count,
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
      <div className="relative w-full sm:w-96">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari nama murid..."
          className="w-full pl-10 pr-4 py-2.5 bg-gray-50/80 border border-gray-200/80 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#14352c]/15"
        />
      </div>

      <div className="text-xs font-semibold text-gray-400 self-end sm:self-center">
        Menampilkan <span className="text-gray-800 font-bold">{count}</span>{" "}
        Murid
      </div>
    </div>
  );
}
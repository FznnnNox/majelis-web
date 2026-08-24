"use client";

import { Search, Filter } from "lucide-react";
import { ProgramDonasi } from "../types";

interface Props {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterProgramId: string; // "Semua" atau String(programId)
  onFilterChange: (value: string) => void;
  programs: ProgramDonasi[];
}

export default function DonasiFilter({
  searchTerm,
  onSearchChange,
  filterProgramId,
  onFilterChange,
  programs,
}: Props) {
  return (
    <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3.5">
      <div className="relative w-full sm:w-80">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari donatur, program, atau ID..."
          className="w-full pl-10 pr-4 py-2.5 bg-gray-50/80 border border-gray-200/80 rounded-xl sm:rounded-2xl text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14352c]/15 focus:border-[#14352c] focus:bg-white transition-all"
        />
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
        <div className="flex items-center gap-2 bg-gray-50 px-3.5 py-2 rounded-xl sm:rounded-2xl border border-gray-200/80 text-xs text-gray-600 w-full sm:w-auto">
          <Filter className="h-3.5 w-3.5 text-gray-400 shrink-0" />
          <span className="font-medium text-gray-400 shrink-0">Filter:</span>
          <select
            value={filterProgramId}
            onChange={(e) => onFilterChange(e.target.value)}
            className="bg-transparent font-bold text-gray-800 focus:outline-none cursor-pointer w-full"
          >
            <option value="Semua">Semua Program</option>
            {programs.map((p) => (
              <option key={p.id} value={String(p.id)}>
                {p.nama}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
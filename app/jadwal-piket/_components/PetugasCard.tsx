"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Petugas, itemVariants } from "../types";

interface Props {
  person: Petugas;
  index: number;
  tugas?: string | null;
}

export default function PetugasCard({ person, index, tugas }: Props) {
  const initials = (person.nama || "P")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.div
      variants={itemVariants}
      className="group relative flex items-center justify-between rounded-2xl bg-[#f8faf9] p-4 transition-all duration-300 hover:bg-white hover:shadow-md border border-slate-200/70"
    >
      <div className="flex items-center gap-3.5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#152e28] text-sm font-bold text-amber-300 shadow-xs">
          {initials}
        </div>

        <div>
          <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#152e28] transition-colors">
            {person.nama}
          </h4>
          <p className="mt-0.5 text-xs text-slate-500 font-medium flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3 text-emerald-600" />
            <span>{tugas || "Petugas Piket"}</span>
          </p>
        </div>
      </div>

      <span className="text-[11px] font-semibold text-slate-400 bg-white px-2.5 py-1 rounded-lg border border-slate-200/80 shadow-2xs">
        Petugas {index + 1}
      </span>
    </motion.div>
  );
}
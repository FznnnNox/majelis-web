"use client";

import { motion } from "framer-motion";
import { Clock, Users, Sparkles } from "lucide-react";
import { PiketDay, containerVariants } from "../types";
import PetugasCard from "./PetugasCard";
import LiburState from "./LiburState";
import CatatanBox from "./CatatanBox";

interface Props {
  day: PiketDay;
  isToday: boolean;
}

export default function ActiveDayPanel({ day, isToday }: Props) {
  if (day.isLibur) {
    return <LiburState day={day.day} />;
  }

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              Petugas Piket Hari {day.day}
            </h3>
            {isToday && (
              <span className="rounded-md bg-sky-50 px-2.5 py-0.5 text-[10px] font-bold text-sky-600 border border-sky-200/60">
                Hari Ini
              </span>
            )}
            
            {day.tugas && (
              <span className="rounded-md bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 border border-amber-200/60 flex items-center gap-1.5 whitespace-normal max-w-full">
                <Sparkles className="h-3.5 w-3.5 text-[#e76f3c] shrink-0" />
                <span className="leading-relaxed">{day.tugas}</span>
              </span>
            )}
          </div>
          
          <p className="mt-1 flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 font-medium">
            <Clock className="h-4 w-4 text-[#e76f3c]" />
            <span>Waktu Pelaksanaan: {day.waktu || "Ba'da Maghrib - Isya"}</span>
          </p>
        </div>

        <div className="inline-flex items-center gap-2 self-start sm:self-center rounded-full bg-[#152e28]/5 px-4 py-2 text-xs font-bold text-[#152e28] border border-[#152e28]/10">
          <Users className="h-4 w-4 text-[#e76f3c]" />
          <span>{day.petugas?.length || 0} Santri Bertugas</span>
        </div>
      </div>

      {day.petugas && day.petugas.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {day.petugas.map((person, i) => (
            <PetugasCard
              key={person.id || person.nama || i}
              person={person}
              index={i}
              tugas={person.tugas || day.tugas}
            />
          ))}
        </motion.div>
      ) : (
        <div className="mt-6 p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-xs text-slate-400 font-medium">
          Belum ada petugas piket yang dijadwalkan untuk hari ini.
        </div>
      )}

      <CatatanBox />
    </>
  );
}
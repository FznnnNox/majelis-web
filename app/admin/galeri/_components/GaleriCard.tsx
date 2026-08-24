"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Edit3, Trash2, Sparkles, ImageOff } from "lucide-react";
import { GaleriItem, KATEGORI_LABEL, formatTanggal } from "../types";

interface Props {
  item: GaleriItem;
  onEdit: (item: GaleriItem) => void;
  onDelete: (item: GaleriItem) => void;
}

export default function GaleriCard({ item, onEdit, onDelete }: Props) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-2xl bg-gray-200 ring-1 ring-gray-900/5 hover:shadow-xl transition-shadow duration-300 h-56 sm:h-64"
    >
      {item.gambar ? (
        <Image
          src={item.gambar}
          alt={item.judul}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-emerald-950/20 flex items-center justify-center">
          <ImageOff className="h-6 w-6 text-white/50" />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Badge Tanggal */}
      <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-md px-3 py-1 ring-1 ring-white/20 text-white text-[10px] font-medium">
        <Sparkles className="h-3 w-3 text-amber-300" />
        <span>{formatTanggal(item.tanggal)}</span>
      </div>

      {/* Action Buttons */}
      <div className="absolute top-3.5 right-3.5 flex items-center gap-1 opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
        <button
          type="button"
          onClick={() => onEdit(item)}
          className="p-1.5 rounded-lg bg-black/40 backdrop-blur-md ring-1 ring-white/20 text-white hover:bg-black/60 active:scale-90 transition-all cursor-pointer"
          title="Edit dokumentasi"
        >
          <Edit3 className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(item)}
          className="p-1.5 rounded-lg bg-black/40 backdrop-blur-md ring-1 ring-white/20 text-white hover:bg-red-500/80 active:scale-90 transition-all cursor-pointer"
          title="Hapus dokumentasi"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
          {KATEGORI_LABEL[item.kategori]}
        </span>
        <h3 className="mt-1 font-semibold leading-snug text-white line-clamp-2 text-sm sm:text-base">
          {item.judul}
        </h3>
      </div>
    </motion.div>
  );
}
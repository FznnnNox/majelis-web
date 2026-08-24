"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Edit3, Trash2, Star, ImageOff } from "lucide-react";
import { ProgramInfaq, formatRupiah, calcProgress } from "../types";

interface Props {
  item: ProgramInfaq;
  onEdit: (item: ProgramInfaq) => void;
  onDelete: (item: ProgramInfaq) => void;
}

export default function ProgramCard({ item, onEdit, onDelete }: Props) {
  const progress = calcProgress(item.terkumpul, item.target);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`group relative flex flex-col overflow-hidden rounded-3xl bg-white p-4 sm:p-5 border shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
        item.isActive
          ? "border-2 border-[#e76f3c]/40 shadow-[#e76f3c]/10"
          : "border-gray-100"
      }`}
    >
      {/* Thumbnail */}
      <div className="relative h-36 sm:h-40 w-full overflow-hidden rounded-xl sm:rounded-2xl bg-gray-100">
        {item.gambar ? (
          <Image
            src={item.gambar}
            alt={item.judul}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-gray-300">
            <ImageOff className="h-6 w-6" />
          </div>
        )}

        {item.isActive && (
          <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#e76f3c] text-white text-[10px] font-bold shadow-md">
            <Star className="h-3 w-3 fill-white" />
            Program Aktif
          </span>
        )}

        {/* Action Buttons */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
          <button
            type="button"
            onClick={() => onEdit(item)}
            className="p-1.5 rounded-lg bg-white/90 backdrop-blur-sm text-gray-500 hover:text-[#14352c] hover:bg-white active:scale-90 transition-all cursor-pointer shadow-sm"
            title="Edit program"
          >
            <Edit3 className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(item)}
            className="p-1.5 rounded-lg bg-white/90 backdrop-blur-sm text-gray-500 hover:text-red-600 hover:bg-white active:scale-90 transition-all cursor-pointer shadow-sm"
            title="Hapus program"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between pt-4">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-1">
            {item.judul}
          </h3>
          <p className="mt-1.5 text-xs text-gray-500 leading-relaxed line-clamp-2">
            {item.deskripsi || "Belum ada deskripsi."}
          </p>

          <div className="mt-5 relative">
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-[#e76f3c] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="absolute -top-5 right-0 text-[10px] font-bold text-[#e76f3c]">
              {progress}%
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs font-semibold">
            <div className="text-[#e76f3c]">
              Terkumpul:{" "}
              <span className="font-bold">{formatRupiah(item.terkumpul)}</span>
            </div>
            <div className="text-gray-400 text-right">
              Target:{" "}
              <span className="font-medium text-gray-600">
                {item.target ? formatRupiah(item.target) : "Belum diatur"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
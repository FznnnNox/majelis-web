// "use client";

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { X, Plus, Trash2, Calendar, BookOpen, Loader2, CheckCircle2 } from "lucide-react";
// import { Murid } from "../types";

// interface SurahItem {
//   nomor: number;
//   namaLatin: string;
//   jumlahAyat: number;
// }

// interface ModalHafalanProps {
//   selectedMurid: Murid;
//   onClose: () => void;
//   onSaveHafalan: (
//     muridId: number,
//     newItem: { surah: string; ayat: string; catatan?: string }
//   ) => Promise<void> | void;
//   onDeleteHafalan?: (hafalanId: number, muridId: number) => Promise<void> | void;
//   onUpdateStatusHafalan?: (
//     hafalanId: number,
//     muridId: number,
//     newStatus: string
//   ) => Promise<void> | void;
// }

// export default function ModalHafalan({
//   selectedMurid,
//   onClose,
//   onSaveHafalan,
//   onDeleteHafalan,
//   onUpdateStatusHafalan,
// }: ModalHafalanProps) {
//   const [surahList, setSurahList] = useState<SurahItem[]>([]);
//   const [loadingSurah, setLoadingSurah] = useState(true);

//   const [selectedSurahName, setSelectedSurahName] = useState("");
//   const [totalAyatSurah, setTotalAyatSurah] = useState<number | null>(null);
//   const [ayat, setAyat] = useState("");
//   const [catatan, setCatatan] = useState<"Hafal" | "Belum Hafal">("Hafal");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     const fetchSurah = async () => {
//       try {
//         const res = await fetch("https://equran.id/api/v2/surat");
//         const json = await res.json();
//         if (json && json.data) {
//           setSurahList(json.data);
//           const defaultSurah = json.data[0];
//           if (defaultSurah) {
//             setSelectedSurahName(defaultSurah.namaLatin);
//             setTotalAyatSurah(defaultSurah.jumlahAyat);
//             setAyat(`1-${defaultSurah.jumlahAyat}`);
//           }
//         }
//       } catch (err) {
//         console.error("Gagal mengambil daftar surah:", err);
//       } finally {
//         setLoadingSurah(false);
//       }
//     };

//     fetchSurah();
//   }, []);

//   const handleSurahChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const name = e.target.value;
//     setSelectedSurahName(name);

//     const targetSurah = surahList.find((s) => s.namaLatin === name);
//     if (targetSurah) {
//       setTotalAyatSurah(targetSurah.jumlahAyat);
//       setAyat(`1-${targetSurah.jumlahAyat}`);
//     } else {
//       setTotalAyatSurah(null);
//       setAyat("");
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!selectedSurahName || !ayat) return;

//     setIsSubmitting(true);
//     await onSaveHafalan(selectedMurid.id, {
//       surah: selectedSurahName,
//       ayat,
//       catatan,
//     });
//     setIsSubmitting(false);

//     if (surahList.length > 0) {
//       setSelectedSurahName(surahList[0].namaLatin);
//       setTotalAyatSurah(surahList[0].jumlahAyat);
//       setAyat(`1-${surahList[0].jumlahAyat}`);
//     }
//     setCatatan("Hafal");
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.95 }}
//         className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl border border-gray-100 flex flex-col max-h-[90vh]"
//       >
//         {/* Header Modal */}
//         <div className="flex items-center justify-between border-b border-gray-100 pb-4">
//           <div>
//             <h3 className="text-base font-bold text-gray-900">
//               Riwayat Hafalan
//             </h3>
//             <p className="text-xs text-gray-500 font-medium">
//               Santri: <span className="text-[#14352c] font-bold">{selectedMurid.nama}</span>
//             </p>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-1.5 rounded-xl text-gray-400 hover:bg-gray-100 transition-colors cursor-pointer"
//           >
//             <X className="h-5 w-5" />
//           </button>
//         </div>

//         {/* Form Input Hafalan */}
//         <form onSubmit={handleSubmit} className="mt-4 bg-gray-50 p-4 rounded-2xl border border-gray-100 space-y-3">
//           <p className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
//             <Plus className="h-4 w-4 text-[#14352c]" /> Tambah / Update Hafalan
//           </p>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//             <div>
//               <label className="block text-[11px] font-semibold text-gray-600 mb-1">
//                 Pilih Surah
//               </label>
//               {loadingSurah ? (
//                 <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs text-gray-400">
//                   <Loader2 className="h-3.5 w-3.5 animate-spin text-[#14352c]" />
//                   <span>Memuat surah...</span>
//                 </div>
//               ) : (
//                 <select
//                   required
//                   value={selectedSurahName}
//                   onChange={handleSurahChange}
//                   className="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs bg-white focus:outline-none focus:border-[#14352c]"
//                 >
//                   {surahList.map((s) => (
//                     <option key={s.nomor} value={s.namaLatin}>
//                       {s.nomor}. {s.namaLatin} ({s.jumlahAyat} Ayat)
//                     </option>
//                   ))}
//                 </select>
//               )}
//             </div>

//             <div>
//               <div className="flex justify-between items-center mb-1">
//                 <label className="block text-[11px] font-semibold text-gray-600">
//                   Ayat
//                 </label>
//                 {totalAyatSurah && (
//                   <span className="text-[10px] font-medium text-emerald-700">
//                     Max: {totalAyatSurah} Ayat
//                   </span>
//                 )}
//               </div>
//               <input
//                 type="text"
//                 required
//                 placeholder="Contoh: 1-7"
//                 value={ayat}
//                 onChange={(e) => setAyat(e.target.value)}
//                 className="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs bg-white focus:outline-none focus:border-[#14352c]"
//               />
//             </div>
//           </div>

//           <div className="flex gap-2 items-end">
//             <div className="flex-1">
//               <label className="block text-[11px] font-semibold text-gray-600 mb-1">
//                 Status Hafalan
//               </label>
//               <select
//                 value={catatan}
//                 onChange={(e) => setCatatan(e.target.value as "Hafal" | "Belum Hafal")}
//                 className="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs bg-white focus:outline-none focus:border-[#14352c]"
//               >
//                 <option value="Hafal">Hafal</option>
//                 <option value="Belum Hafal">Belum Hafal</option>
//               </select>
//             </div>

//             <button
//               type="submit"
//               disabled={isSubmitting || loadingSurah}
//               className="rounded-xl bg-[#14352c] px-5 py-2 text-xs font-bold text-white hover:bg-[#1b4338] transition-colors cursor-pointer shrink-0 disabled:opacity-50 h-[34px]"
//             >
//               {isSubmitting ? "Simpan..." : "Simpan"}
//             </button>
//           </div>
//         </form>

//         {/* List Riwayat Hafalan */}
//         <div className="mt-4 flex-1 overflow-y-auto space-y-2 pr-1">
//           {selectedMurid.riwayatHafalan && selectedMurid.riwayatHafalan.length > 0 ? (
//             selectedMurid.riwayatHafalan.map((item) => (
//               <div
//                 key={item.id}
//                 className="flex items-center justify-between p-3 rounded-2xl border border-gray-100 bg-white hover:bg-emerald-50/30 transition-colors"
//               >
//                 <div className="flex items-start gap-3">
//                   <div className="p-2 rounded-xl bg-emerald-50 text-[#14352c] mt-0.5 shrink-0">
//                     <BookOpen className="h-4 w-4" />
//                   </div>
//                   <div>
//                     <h4 className="text-xs font-bold text-gray-800">
//                       Surah {item.surah} <span className="text-emerald-700">Ayat {item.ayat}</span>
//                     </h4>
//                     <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-400">
//                       <span className="flex items-center gap-1">
//                         <Calendar className="h-3 w-3" /> {item.tanggal}
//                       </span>
                      
//                       {/* Klik Badge Status untuk Ubah Status Langsung */}
//                       <button
//                         type="button"
//                         onClick={() => {
//                           if (onUpdateStatusHafalan) {
//                             const nextStatus = item.catatan === "Hafal" ? "Belum Hafal" : "Hafal";
//                             onUpdateStatusHafalan(item.id, selectedMurid.id, nextStatus);
//                           }
//                         }}
//                         className={`rounded-md px-2 py-0.5 font-bold transition-all cursor-pointer hover:opacity-80 flex items-center gap-1 ${
//                           item.catatan === "Hafal"
//                             ? "bg-emerald-100 text-emerald-800"
//                             : "bg-rose-100 text-rose-800"
//                         }`}
//                         title="Klik untuk mengubah status hafalan"
//                       >
//                         {item.catatan === "Hafal" && <CheckCircle2 className="h-3 w-3" />}
//                         <span>{item.catatan || "Belum Hafal"}</span>
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 {onDeleteHafalan && (
//                   <button
//                     onClick={() => onDeleteHafalan(item.id, selectedMurid.id)}
//                     className="p-1.5 rounded-lg text-gray-300 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer shrink-0"
//                     title="Hapus item hafalan"
//                   >
//                     <Trash2 className="h-4 w-4" />
//                   </button>
//                 )}
//               </div>
//             ))
//           ) : (
//             <div className="text-center py-8">
//               <p className="text-xs text-gray-400 font-medium">
//                 Belum ada catatan hafalan untuk santri ini.
//               </p>
//             </div>
//           )}
//         </div>
//       </motion.div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Plus, 
  Trash2, 
  Calendar, 
  BookOpen, 
  Loader2, 
  CheckCircle2, 
  Search, 
  ChevronDown 
} from "lucide-react";
import { Murid } from "../types";

interface SurahItem {
  nomor: number;
  namaLatin: string;
  jumlahAyat: number;
}

interface ModalHafalanProps {
  selectedMurid: Murid;
  onClose: () => void;
  onSaveHafalan: (
    muridId: number,
    newItem: { surah: string; ayat: string; catatan?: string }
  ) => Promise<void> | void;
  onDeleteHafalan?: (hafalanId: number, muridId: number) => Promise<void> | void;
  onUpdateStatusHafalan?: (
    hafalanId: number,
    muridId: number,
    newStatus: string
  ) => Promise<void> | void;
}

export default function ModalHafalan({
  selectedMurid,
  onClose,
  onSaveHafalan,
  onDeleteHafalan,
  onUpdateStatusHafalan,
}: ModalHafalanProps) {
  const [surahList, setSurahList] = useState<SurahItem[]>([]);
  const [loadingSurah, setLoadingSurah] = useState(true);

  const [selectedSurahName, setSelectedSurahName] = useState("");
  const [totalAyatSurah, setTotalAyatSurah] = useState<number | null>(null);
  const [ayat, setAyat] = useState("");
  const [catatan, setCatatan] = useState<"Hafal" | "Belum Hafal">("Hafal");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State untuk custom searchable dropdown surah
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSurah = async () => {
      try {
        const res = await fetch("https://equran.id/api/v2/surat");
        const json = await res.json();
        if (json && json.data) {
          setSurahList(json.data);
          const defaultSurah = json.data[0];
          if (defaultSurah) {
            setSelectedSurahName(defaultSurah.namaLatin);
            setTotalAyatSurah(defaultSurah.jumlahAyat);
            setAyat(`1-${defaultSurah.jumlahAyat}`);
          }
        }
      } catch (err) {
        console.error("Gagal mengambil daftar surah:", err);
      } finally {
        setLoadingSurah(false);
      }
    };

    fetchSurah();

    // Event listener untuk menutup dropdown saat klik di luar
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectSurah = (surah: SurahItem) => {
    setSelectedSurahName(surah.namaLatin);
    setTotalAyatSurah(surah.jumlahAyat);
    setAyat(`1-${surah.jumlahAyat}`);
    setIsDropdownOpen(false);
    setSearchQuery("");
  };

  const filteredSurahList = surahList.filter(
    (s) =>
      s.namaLatin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nomor.toString().includes(searchQuery)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSurahName || !ayat) return;

    setIsSubmitting(true);
    await onSaveHafalan(selectedMurid.id, {
      surah: selectedSurahName,
      ayat,
      catatan,
    });
    setIsSubmitting(false);

    if (surahList.length > 0) {
      setSelectedSurahName(surahList[0].namaLatin);
      setTotalAyatSurah(surahList[0].jumlahAyat);
      setAyat(`1-${surahList[0].jumlahAyat}`);
    }
    setCatatan("Hafal");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl border border-gray-100 flex flex-col max-h-[90vh] overflow-hidden"
      >
        {/* Header Modal */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-50 text-[#14352c]">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 tracking-tight">
                Riwayat Hafalan Santri
              </h3>
              <p className="text-xs text-gray-500 font-medium mt-2">
                Nama Murid: <span className="text-[#14352c] font-bold">{selectedMurid.nama}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Input Hafalan */}
        <form onSubmit={handleSubmit} className="mt-4 bg-gradient-to-br from-gray-50 to-emerald-50/20 p-4 rounded-2xl border border-gray-100 space-y-3.5 shrink-0">
          <p className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
            <Plus className="h-4 w-4 text-[#14352c]" /> Input / Update Hafalan Baru
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Custom Searchable Surah Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                Pilih Surah
              </label>
              {loadingSurah ? (
                <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-xs text-gray-400">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-[#14352c]" />
                  <span>Memuat daftar surah...</span>
                </div>
              ) : (
                <div>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full flex items-center justify-between rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-xs text-gray-800 hover:border-[#14352c] focus:outline-none focus:ring-2 focus:ring-[#14352c]/20 transition-all cursor-pointer shadow-xs"
                  >
                    <span className="font-medium truncate">
                      {selectedSurahName || "Pilih Surah..."}
                    </span>
                    <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="absolute left-0 right-0 z-50 mt-1.5 max-h-60 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl flex flex-col"
                      >
                        {/* Search Input inside Dropdown */}
                        <div className="p-2 border-b border-gray-100 bg-gray-50/70">
                          <div className="relative flex items-center">
                            <Search className="absolute left-2.5 h-3.5 w-3.5 text-gray-400" />
                            <input
                              type="text"
                              placeholder="Cari surah (nama / nomor)..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full rounded-xl border border-gray-200 bg-white pl-8 pr-3 py-1.5 text-xs text-gray-800 focus:outline-none focus:border-[#14352c]"
                              autoFocus
                            />
                          </div>
                        </div>

                        {/* List of Surahs */}
                        <div className="overflow-y-auto max-h-44 p-1 space-y-0.5">
                          {filteredSurahList.length > 0 ? (
                            filteredSurahList.map((s) => (
                              <button
                                key={s.nomor}
                                type="button"
                                onClick={() => handleSelectSurah(s)}
                                className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors flex items-center justify-between cursor-pointer ${
                                  selectedSurahName === s.namaLatin
                                    ? "bg-emerald-50 text-[#14352c] font-bold"
                                    : "text-gray-700 hover:bg-gray-50"
                                }`}
                              >
                                <span>{s.nomor}. {s.namaLatin}</span>
                                <span className="text-[10px] text-gray-400 font-normal">{s.jumlahAyat} Ayat</span>
                              </button>
                            ))
                          ) : (
                            <div className="py-6 text-center text-xs text-gray-400">
                              Surah tidak ditemukan
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Input Ayat */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-[11px] font-semibold text-gray-600">
                  Ayat
                </label>
                {totalAyatSurah && (
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                    Maks: {totalAyatSurah} Ayat
                  </span>
                )}
              </div>
              <input
                type="text"
                required
                placeholder="Contoh: 1-7 atau 1-10"
                value={ayat}
                onChange={(e) => setAyat(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs bg-white focus:outline-none focus:border-[#14352c] focus:ring-2 focus:ring-[#14352c]/20 transition-all shadow-xs"
              />
            </div>
          </div>

          <div className="flex gap-3 items-end pt-1">
            <div className="flex-1">
              <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                Status Hafalan
              </label>
              <select
                value={catatan}
                onChange={(e) => setCatatan(e.target.value as "Hafal" | "Belum Hafal")}
                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs bg-white focus:outline-none focus:border-[#14352c] focus:ring-2 focus:ring-[#14352c]/20 transition-all shadow-xs cursor-pointer"
              >
                <option value="Hafal">Hafal</option>
                <option value="Belum Hafal">Belum Hafal</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || loadingSurah}
              className="rounded-xl bg-[#14352c] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#1b4338] transition-all shadow-sm hover:shadow cursor-pointer shrink-0 disabled:opacity-50 flex items-center justify-center gap-1.5 min-h-[38px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  <span>Simpan Hafalan</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* List Riwayat Hafalan */}
        <div className="mt-4 flex-1 overflow-y-auto space-y-2.5 pr-1">
          <div className="flex items-center justify-between px-1">
            <h4 className="text-xs font-bold text-gray-700 tracking-tight">
              Daftar Riwayat Hafalan
            </h4>
            <span className="text-[10px] font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
              {selectedMurid.riwayatHafalan?.length || 0} Catatan
            </span>
          </div>

          {selectedMurid.riwayatHafalan && selectedMurid.riwayatHafalan.length > 0 ? (
            selectedMurid.riwayatHafalan.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3.5 rounded-2xl border border-gray-100 bg-white hover:border-emerald-200 hover:shadow-sm transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-[#14352c] mt-0.5 shrink-0 group-hover:bg-[#14352c] group-hover:text-white transition-colors">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-gray-900">
                      Surah {item.surah} <span className="text-emerald-700 font-semibold">Ayat {item.ayat}</span>
                    </h5>
                    <div className="flex items-center gap-2.5 mt-1.5 text-[11px] text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {item.tanggal}
                      </span>
                      
                      {/* Klik Badge Status untuk Ubah Status Langsung */}
                      <button
                        type="button"
                        onClick={() => {
                          if (onUpdateStatusHafalan) {
                            const nextStatus = item.catatan === "Hafal" ? "Belum Hafal" : "Hafal";
                            onUpdateStatusHafalan(item.id, selectedMurid.id, nextStatus);
                          }
                        }}
                        className={`rounded-lg px-2.5 py-0.5 font-bold transition-all cursor-pointer hover:opacity-80 flex items-center gap-1 shadow-xs ${
                          item.catatan === "Hafal"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200/60"
                            : "bg-rose-100 text-rose-800 border border-rose-200/60"
                        }`}
                        title="Klik untuk mengubah status hafalan"
                      >
                        {item.catatan === "Hafal" && <CheckCircle2 className="h-3 w-3" />}
                        <span>{item.catatan || "Belum Hafal"}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {onDeleteHafalan && (
                  <button
                    onClick={() => onDeleteHafalan(item.id, selectedMurid.id)}
                    className="p-2 rounded-xl text-gray-300 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer shrink-0"
                    title="Hapus item hafalan"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-10 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
              <BookOpen className="h-8 w-8 text-gray-300 mx-auto mb-2" />
              <p className="text-xs text-gray-500 font-medium">
                Belum ada catatan hafalan untuk santri ini.
              </p>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Gunakan form di atas untuk menambahkan hafalan baru.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
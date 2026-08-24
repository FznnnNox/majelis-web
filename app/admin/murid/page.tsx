"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Murid, HafalanItem, TingkatNgaji } from "./types";
import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import BannerHeader from "./_components/BannerHeader";
import FilterBar from "./_components/FilterBar";
import MuridCard from "./_components/MuridCard";
import ModalHafalan from "./_components/ModalHafalan";
import ModalMurid from "./_components/ModalMurid";
import Pagination from "./_components/Pagination";

const MURID_SELECT = `
  id,
  nama,
  gender,
  tingkat_id,
  tingkat_ngaji ( id, nama_tingkat, keterangan ),
  hafalan ( id, murid_id, surah, ayat, tanggal, catatan )
`;

export default function DataMuridNgajiPage() {
  const supabase = createClient();

  const [muridList, setMuridList] = useState<Murid[]>([]);
  const [tingkatOptions, setTingkatOptions] = useState<TingkatNgaji[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMurid, setEditingMurid] = useState<Murid | null>(null);

  const [isHafalanModalOpen, setIsHafalanModalOpen] = useState(false);
  const [selectedMuridHafalan, setSelectedMuridHafalan] = useState<Murid | null>(null);

  const fetchTingkatNgaji = useCallback(async () => {
    const { data, error } = await supabase
      .from("tingkat_ngaji")
      .select("id, nama_tingkat, keterangan")
      .order("id", { ascending: true });

    if (error) {
      console.error("Gagal mengambil tingkat ngaji:", error);
      return;
    }
    setTingkatOptions((data ?? []) as TingkatNgaji[]);
  }, [supabase]);

  const fetchMurid = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("murid")
      .select(MURID_SELECT)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Gagal mengambil data murid:", error);
      setIsLoading(false);
      return;
    }

    const formattedData: Murid[] = (data ?? []).map((m: any) => {
      const rawHafalan: HafalanItem[] = Array.isArray(m.hafalan) ? m.hafalan : [];
      const sortedHafalan = [...rawHafalan].sort(
        (a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime() || b.id - a.id
      );

      return {
        ...m,
        tingkat_ngaji: Array.isArray(m.tingkat_ngaji)
          ? m.tingkat_ngaji[0] ?? null
          : m.tingkat_ngaji,
        riwayatHafalan: sortedHafalan,
        hafalanTerakhir:
          sortedHafalan.length > 0
            ? { surah: sortedHafalan[0].surah, ayat: sortedHafalan[0].ayat }
            : undefined,
      };
    });

    setMuridList(formattedData);
    setIsLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchTingkatNgaji();
    fetchMurid();
  }, [fetchTingkatNgaji, fetchMurid]);

  const handleOpenModal = (murid?: Murid) => {
    setEditingMurid(murid || null);
    setIsModalOpen(true);
  };

  const handleSubmitMurid = async (
    formData: Omit<Murid, "id" | "riwayatHafalan" | "tingkat_ngaji">
  ) => {
    const payload = {
      nama: formData.nama,
      gender: formData.gender,
      tingkat_id: formData.tingkat_id,
    };

    if (editingMurid) {
      const { error } = await supabase
        .from("murid")
        .update(payload)
        .eq("id", editingMurid.id);

      if (error) {
        console.error("Gagal update murid:", error.message);
        return;
      }
    } else {
      const { error } = await supabase
        .from("murid")
        .insert(payload);

      if (error) {
        console.error("Gagal menambah murid:", error.message);
        return;
      }
    }

    await fetchMurid();
    setIsModalOpen(false);
  };

  // ✅ SIMPAN / UPDATE HAFALAN (Mencegah Duplikasi)
  const handleSaveHafalan = async (
    muridId: number,
    newItem: { surah: string; ayat: string; catatan?: string }
  ) => {
    try {
      // Check apakah data surah & ayat sudah ada untuk murid ini
      const { data: existing } = await supabase
        .from("hafalan")
        .select("id")
        .eq("murid_id", muridId)
        .eq("surah", newItem.surah)
        .eq("ayat", newItem.ayat)
        .maybeSingle();

      if (existing) {
        // Update data jika sudah ada
        const { error } = await supabase
          .from("hafalan")
          .update({
            catatan: newItem.catatan || null,
            tanggal: new Date().toISOString().split("T")[0],
          })
          .eq("id", existing.id);

        if (error) console.error("Gagal update hafalan:", error.message);
      } else {
        // Insert data baru jika belum ada
        const { error } = await supabase.from("hafalan").insert([
          {
            murid_id: muridId,
            surah: newItem.surah,
            ayat: newItem.ayat,
            catatan: newItem.catatan || null,
            tanggal: new Date().toISOString().split("T")[0],
          },
        ]);

        if (error) console.error("Gagal menyimpan hafalan ke Supabase:", error.message);
      }

      await fetchMurid();

      setMuridList((prevList) => {
        const target = prevList.find((m) => m.id === muridId);
        if (target) setSelectedMuridHafalan(target);
        return prevList;
      });
    } catch (err: any) {
      console.error("Error handleSaveHafalan:", err);
    }
  };

  // ✅ HANDLER UBAH STATUS HAFALAN LANGSUNG DARI HISTORY
  const handleUpdateStatusHafalan = async (
    hafalanId: number,
    muridId: number,
    newStatus: string
  ) => {
    try {
      const { error } = await supabase
        .from("hafalan")
        .update({ catatan: newStatus })
        .eq("id", hafalanId);

      if (error) {
        console.error("Gagal mengupdate status hafalan:", error.message);
        return;
      }

      await fetchMurid();

      setMuridList((prevList) => {
        const target = prevList.find((m) => m.id === muridId);
        if (target) setSelectedMuridHafalan(target);
        return prevList;
      });
    } catch (err: any) {
      console.error("Error handleUpdateStatusHafalan:", err);
    }
  };

  const handleDeleteHafalan = async (hafalanId: number, muridId: number) => {
    try {
      const { error } = await supabase.from("hafalan").delete().eq("id", hafalanId);
      if (error) {
        console.error("Gagal menghapus hafalan:", error.message);
        return;
      }

      await fetchMurid();

      setMuridList((prevList) => {
        const target = prevList.find((m) => m.id === muridId);
        if (target) setSelectedMuridHafalan(target);
        return prevList;
      });
    } catch (err: any) {
      console.error("Error handleDeleteHafalan:", err);
    }
  };

  const handleDelete = async (id: number, nama: string) => {
    if (!confirm(`Hapus data pengajian "${nama}"?`)) return;

    const { error } = await supabase.from("murid").delete().eq("id", id);
    if (error) {
      console.error("Gagal menghapus murid:", error);
      return;
    }
    setMuridList((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredMurid = muridList.filter((item) =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMurid.length / ITEMS_PER_PAGE);
  const paginatedMurid = filteredMurid.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="p-3 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto"
    >
      <BannerHeader onOpenAddModal={() => handleOpenModal()} />

      <FilterBar
        searchTerm={searchTerm}
        setSearchTerm={(val) => {
          setSearchTerm(val);
          setCurrentPage(1);
        }}
        count={filteredMurid.length}
      />

      {isLoading ? (
  <div className="py-20 text-center text-gray-400 bg-white/80 rounded-3xl border border-gray-100">
    <div className="flex items-center justify-center gap-2">
      <Loader2 className="h-5 w-5 animate-spin text-[#102d25]" />
      <span className="text-xs sm:text-sm font-medium">
        Memuat data murid...
      </span>
    </div>
  </div>
) : paginatedMurid.length > 0 ? (
  <AnimatePresence mode="wait">
    <motion.div
      key="murid-grid"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
    >
      {paginatedMurid.map((item) => (
        <MuridCard
          key={item.id}
          item={item}
          onOpenHafalanModal={(m) => {
            setSelectedMuridHafalan(m);
            setIsHafalanModalOpen(true);
          }}
          onEditMurid={(m) => {
            setEditingMurid(m);
            setIsModalOpen(true);
          }}
          onDeleteMurid={handleDelete}
        />
      ))}
    </motion.div>
  </AnimatePresence>
) : (
  <div className="py-16 text-center text-gray-400 bg-white/80 rounded-3xl border border-gray-100 text-xs font-semibold">
    Tidak ada data murid yang ditemukan.
  </div>
)}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
        totalItems={filteredMurid.length}
        itemsPerPage={ITEMS_PER_PAGE}
      />

      <AnimatePresence>
        {isHafalanModalOpen && selectedMuridHafalan && (
          <ModalHafalan
            selectedMurid={selectedMuridHafalan}
            onClose={() => setIsHafalanModalOpen(false)}
            onSaveHafalan={handleSaveHafalan}
            onDeleteHafalan={handleDeleteHafalan}
            onUpdateStatusHafalan={handleUpdateStatusHafalan}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isModalOpen && (
          <ModalMurid
            editingMurid={editingMurid}
            tingkatOptions={tingkatOptions}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleSubmitMurid}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
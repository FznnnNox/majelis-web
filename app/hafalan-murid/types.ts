export interface TingkatNgaji {
  id: number;
  nama_tingkat: string;
  keterangan?: string | null;
}

export interface HafalanItem {
  id: number;
  murid_id: number;
  surah: string;
  ayat: string;
  catatan?: string | null;
  tanggal: string;
}

export interface MuridHafalan {
  id: number;
  nama: string;
  gender: string;
  tingkat_id: number | null;
  tingkat_ngaji: TingkatNgaji | null;
  riwayatHafalan: HafalanItem[];
  totalSurah: number;
  hafalanTerakhir?: HafalanItem;
}

export const TOTAL_SURAH = 114;

export function isLancar(catatan?: string | null): boolean | null {
  if (!catatan) return null;
  return catatan.toLowerCase().includes("lancar");
}

export function formatTanggal(dateStr?: string) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
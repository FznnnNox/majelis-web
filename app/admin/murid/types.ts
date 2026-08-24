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

export interface Murid {
  id: number;
  nama: string;
  gender: "Laki-laki" | "Perempuan";
  tingkat_id: number | null;
  tingkat_ngaji?: TingkatNgaji | null;
  hafalanTerakhir?: { surah: string; ayat: string };
  riwayatHafalan: HafalanItem[];
}
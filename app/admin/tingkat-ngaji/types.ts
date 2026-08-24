export interface TingkatNgaji {
  id: number;
  nama_tingkat: string;
  keterangan?: string | null;
  gambar?: string | null;
  tanggal?: string | null;
  created_at?: string;
  _count_murid?: number;
}

export interface TingkatFormData {
  nama_tingkat: string;
  keterangan: string;
  gambar?: string | null;
}

export interface SantriTingkat {
  id: number;
  nama: string;
  avatar?: string | null;
  nis?: string | null;
}
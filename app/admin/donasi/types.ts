export type MetodeDonasi = "Transfer Bank (BSI)" | "QRIS / E-Wallet" | "Tunai";
export type StatusDonasi = "Pending" | "Terverifikasi";

export interface ProgramDonasi {
  id: number;
  nama: string;
  deskripsi: string | null;
  target: number | null; 
}

export interface Donasi {
  id: number;
  donatur: string;
  tanggal: string;
  programId: number | null;
  programNama: string; 
  nominal: number;
  metode: MetodeDonasi;
  status: StatusDonasi;
  pesan: string | null;
}

export interface DonasiFormData {
  donatur: string;
  tanggal: string;
  programId: string;
  nominal: string; 
  metode: MetodeDonasi;
  status: StatusDonasi;
  pesan: string;
}

export const METODE_OPTIONS: MetodeDonasi[] = [
  "Transfer Bank (BSI)",
  "QRIS / E-Wallet",
  "Tunai",
];

export const STATUS_OPTIONS: StatusDonasi[] = ["Pending", "Terverifikasi"];

/** Helper format Rupiah */
export const formatRupiah = (val: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(val);
};

/** Helper format angka mentah -> berpemisah ribuan, mis. "2000" -> "2.000" */
export const formatRibuan = (value: string) => {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  return new Intl.NumberFormat("id-ID").format(Number(digits));
};

/** Helper format kode tampilan, mis. id=3 -> "DON-003" */
export const formatKode = (id: number) => `DON-${String(id).padStart(3, "0")}`;

/** Helper format tanggal ISO -> "11 Ags 2026" */
export const formatTanggal = (isoDate: string) => {
  const d = new Date(isoDate + "T00:00:00");
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
// export type KategoriTransaksi = "Pemasukan" | "Pengeluaran";

// export interface Transaksi {
//   id: number; 
//   tanggal: string; 
//   kategori: KategoriTransaksi;
//   keterangan: string;
//   jumlah: number;
//   penanggungJawab: string;
// }

// export interface TransaksiFormData {
//   tanggal: string; 
//   kategori: KategoriTransaksi;
//   keterangan: string;
//   jumlah: string; 
//   penanggungJawab: string;
// }

// export const FILTER_OPTIONS = [
//   { value: "Semua", label: "Semua" },
//   { value: "Pemasukan", label: "Pemasukan" },
//   { value: "Pengeluaran", label: "Pengeluaran" },
// ] as const;

// export type FilterKategori = (typeof FILTER_OPTIONS)[number]["value"];

// export const formatRupiah = (val: number) => {
//   return new Intl.NumberFormat("id-ID", {
//     style: "currency",
//     currency: "IDR",
//     maximumFractionDigits: 0,
//   }).format(val);
// };

// export const formatKode = (id: number) => `KAS-${id}`;

// export const formatTanggal = (isoDate: string) => {
//   const d = new Date(isoDate + "T00:00:00");
//   return d.toLocaleDateString("id-ID", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// };
export type KategoriTransaksi = "Pemasukan" | "Pengeluaran";

export interface Murid {
  id: number;
  nama: string;
}

export interface Transaksi {
  id: number;
  tanggal: string;
  kategori: KategoriTransaksi;
  keterangan: string;
  jumlah: number;
  murid_id: number;
  murid_nama: string; // Didapat dari join relasi Supabase
}

export interface TransaksiFormData {
  tanggal: string;
  kategori: KategoriTransaksi;
  keterangan: string;
  jumlah: string;
  murid_id: number | "";
}

export const FILTER_OPTIONS = [
  { value: "Semua", label: "Semua" },
  { value: "Pemasukan", label: "Pemasukan" },
  { value: "Pengeluaran", label: "Pengeluaran" },
] as const;

export type FilterKategori = (typeof FILTER_OPTIONS)[number]["value"];

export const formatRupiah = (val: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(val);
};

export const formatKode = (id: number) => `KAS-${id}`;

export const formatTanggal = (isoDate: string) => {
  const d = new Date(isoDate + "T00:00:00");
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
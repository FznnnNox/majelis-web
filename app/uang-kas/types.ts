export type KategoriTransaksi = "Pemasukan" | "Pengeluaran";

export interface Transaction {
  id: number;
  tanggal: string;
  kategori: KategoriTransaksi;
  keterangan: string;
  jumlah: number;
  murid_nama?: string; 
}

export type FilterKategoriKas = "Semua" | KategoriTransaksi;

export const formatRupiah = (num: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(num);

export const formatTanggal = (isoDate: string) => {
  const d = new Date(isoDate + "T00:00:00");
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
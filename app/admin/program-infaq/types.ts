export interface ProgramInfaq {
  id: number;
  judul: string; // kolom `nama` di tabel program_donasi
  deskripsi: string | null;
  gambar: string | null;
  target: number | null;
  terkumpul: number; // dihitung dari SUM(donasi.nominal) yang status='Terverifikasi'
  isActive: boolean;
}

export interface ProgramFormData {
  judul: string;
  deskripsi: string;
  gambar: string;
  target: string; // string dulu, diformat & di-parse saat submit
  isActive: boolean;
}

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

/** Hitung persentase progress, dibatasi maksimal 100% */
export const calcProgress = (terkumpul: number, target: number | null) => {
  if (!target || target <= 0) return 0;
  return Math.min(Math.round((terkumpul / target) * 100), 100);
};
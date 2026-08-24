export type Frekuensi = "Sekali" | "Harian" | "Bulanan";

export interface FeaturedCampaign {
  id: number;
  nama: string;
  deskripsi: string | null;
  target: number;
  terkumpul: number;
}

export interface DonorFormState {
  nama: string;
  email: string;
  pesan: string;
}

export const PRESET_AMOUNTS = [
  { label: "Rp 50rb", value: 50000 },
  { label: "Rp 100rb", value: 100000 },
  { label: "Rp 250rb", value: 250000 },
  { label: "Rp 500rb", value: 500000 },
  { label: "Rp 1 Jt", value: 1000000 },
];

export const FREQUENCY_OPTIONS: Frekuensi[] = ["Sekali", "Harian", "Bulanan"];

/** Helper format Rupiah */
export const formatRupiah = (val: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(val);
};

/** Hitung persentase progress, dibatasi maksimal 100% */
export const calcProgress = (terkumpul: number, target: number) => {
  if (!target || target <= 0) return 0;
  return Math.min(Math.round((terkumpul / target) * 100), 100);
};
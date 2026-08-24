export type KategoriGaleri = "rutin" | "santri" | "event";

export interface GaleriItem {
  id: number;
  judul: string;
  kategori: KategoriGaleri;
  gambar: string | null;
  tanggal: string; // ISO yyyy-mm-dd
}

export interface GaleriFormData {
  judul: string;
  kategori: KategoriGaleri;
  gambar: string;
  tanggal: string;
}

export const KATEGORI_OPTIONS: { value: KategoriGaleri; label: string }[] = [
  { value: "rutin", label: "Pengajian Rutin" },
  { value: "santri", label: "Kegiatan Santri" },
  { value: "event", label: "Event / Acara" },
];

export const KATEGORI_LABEL: Record<KategoriGaleri, string> = {
  rutin: "Pengajian rutin",
  santri: "Kegiatan santri",
  event: "Event peringatan",
};

/** Helper format tanggal ISO -> "15 Mar 2026" */
export const formatTanggal = (isoDate: string) => {
  const d = new Date(isoDate + "T00:00:00");
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
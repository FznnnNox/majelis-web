export interface Petugas {
  id: number;
  nama: string; 
}

export interface PiketDay {
  id?: string;
  day: string;
  isLibur: boolean;
  tugas: string | null; 
  waktu: string | null; 
  petugas: Petugas[];
}

export const defaultJadwalTemplate: PiketDay[] = [
  { day: "Senin", isLibur: false, tugas: null, waktu: null, petugas: [] },
  { day: "Selasa", isLibur: false, tugas: null, waktu: null, petugas: [] },
  { day: "Rabu", isLibur: false, tugas: null, waktu: null, petugas: [] },
  { day: "Kamis", isLibur: false, tugas: null, waktu: null, petugas: [] },
  { day: "Jumat", isLibur: true, tugas: null, waktu: null, petugas: [] },
  { day: "Sabtu", isLibur: false, tugas: null, waktu: null, petugas: [] },
  { day: "Minggu", isLibur: false, tugas: null, waktu: null, petugas: [] },
];

export const getTodayIndex = () => (new Date().getDay() + 6) % 7;

export const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
} as const;

export const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};
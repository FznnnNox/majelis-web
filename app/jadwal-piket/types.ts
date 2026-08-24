// export interface Petugas {
//   name: string;
//   role: string;
// }

// export interface PiketDay {
//   day: string;
//   petugas: Petugas[];
//   isLibur?: boolean;
// }

// export const jadwalPiket: PiketDay[] = [
//   {
//     day: "Senin",
//     petugas: [
//       { name: "Ahmad Fauzi", role: "Kebersihan Area Sholat" },
//       { name: "Siti Aisyah", role: "Penataan Kitab & Al-Qur'an" },
//     ],
//   },
//   {
//     day: "Selasa",
//     petugas: [
//       { name: "Budi Santoso", role: "Kebersihan Teras & Parkir" },
//       { name: "Nur Hidayah", role: "Merapikan Perlengkapan Santri" },
//     ],
//   },
//   {
//     day: "Rabu",
//     petugas: [
//       { name: "Rizky Ramadhan", role: "Penyediaan Wudhu & Toilet" },
//       { name: "Dewi Lestari", role: "Pengecekan Sound System" },
//     ],
//   },
//   {
//     day: "Kamis",
//     petugas: [
//       { name: "Fajar Nugraha", role: "Kebersihan Utama & Karpet" },
//       { name: "Putri Amelia", role: "Penataan Meja Belajar" },
//     ],
//   },
//   { day: "Jumat", petugas: [], isLibur: true },
//   {
//     day: "Sabtu",
//     petugas: [
//       { name: "Hendra Wijaya", role: "Persiapan Lampu & Kipas" },
//       { name: "Ratna Sari", role: "Pembersihan Area Dalam" },
//     ],
//   },
//   {
//     day: "Minggu",
//     petugas: [
//       { name: "Yusuf Ibrahim", role: "Pemeriksaan Kebersihan Umum" },
//       { name: "Aulia Rahma", role: "Penataan Rak & Sajadah" },
//     ],
//   },
// ];

// export const getTodayIndex = () => (new Date().getDay() + 6) % 7;

// export const containerVariants = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: { staggerChildren: 0.08 },
//   },
// };

// export const itemVariants = {
//   hidden: { opacity: 0, y: 15 },
//   show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
// };
export interface Petugas {
  id: number;
  nama: string; // Diubah dari 'name' menjadi 'nama' agar sesuai DB
}

export interface PiketDay {
  id?: string;
  day: string;
  isLibur: boolean;
  tugas: string | null; // Tambahkan tugas di tingkat Hari
  waktu: string | null; // Tambahkan waktu
  petugas: Petugas[];
}

// Template statis untuk berjaga-jaga jika database masih kosong, 
// urutan harinya tetap berurutan dari Senin s/d Minggu
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
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};
export interface PetugasPiket {
  id: number; 
  nama: string;
}

export interface ScheduleItem {
  id: string;
  hari: "Senin" | "Selasa" | "Rabu" | "Kamis" | "Jumat" | "Sabtu" | "Minggu";
  isLibur: boolean;
  tugas?: string | null;
  waktu?: string | null;
  petugas: PetugasPiket[];
}

export interface JadwalFormData {
  hari: ScheduleItem["hari"];
  tugas: string;
  waktu: string;
  isLibur: boolean;
  petugasIds: number[]; 
}

export interface MuridOption {
  id: number;
  nama: string;
}

export const HARI_LIST: ScheduleItem["hari"][] = [
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
  "Minggu",
];
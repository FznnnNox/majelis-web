import { LucideIcon } from "lucide-react";

export interface StatItem {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: LucideIcon;
  color: string;
}

export interface ActivityItem {
  id: string;
  user: string;
  action: string;
  time: string;
  status: "success" | "warning";
}

export interface PiketItem {
  name: string;
  role: string;
}

export interface JadwalHariIni {
  hari: string;
  isLibur: boolean;
  tugas: string | null;
  waktu: string | null;
}
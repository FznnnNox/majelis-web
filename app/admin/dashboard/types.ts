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
  id: number;
  user: string;
  action: string;
  time: string;
  status: "success" | "warning";
}

export interface PiketItem {
  name: string;
  role: string;
  done: boolean;
}
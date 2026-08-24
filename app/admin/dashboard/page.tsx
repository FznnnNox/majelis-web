"use client";

import { motion } from "framer-motion";
import { Users, CalendarCheck, Wallet, HeartHandshake } from "lucide-react";
import DashboardHeader from "./_components/DashboardHeader";
import StatsGrid from "./_components/StatsGrid";
import PiketTodayCard from "./_components/PiketTodayCard";
import RecentActivityCard from "./_components/RecentActivityCard";
import { StatItem, ActivityItem, PiketItem } from "./types";

const statsData: StatItem[] = [
  {
    title: "Total Santri",
    value: "128 Santri",
    change: "+12 bulan ini",
    isPositive: true,
    icon: Users,
    color: "bg-emerald-500/10 text-emerald-700 border-emerald-200/50",
  },
  {
    title: "Petugas Piket Hari Ini",
    value: "4 Santri",
    change: "2 selesai",
    isPositive: true,
    icon: CalendarCheck,
    color: "bg-blue-500/10 text-blue-700 border-blue-200/50",
  },
  {
    title: "Total Kas Majelis",
    value: "Rp 3.850.000",
    change: "+Rp 450.000 minggu ini",
    isPositive: true,
    icon: Wallet,
    color: "bg-[#c1663c]/10 text-[#c1663c] border-[#c1663c]/20",
  },
  {
    title: "Donasi Masuk",
    value: "Rp 1.200.000",
    change: "-5% dari bulan lalu",
    isPositive: false,
    icon: HeartHandshake,
    color: "bg-purple-500/10 text-purple-700 border-purple-200/50",
  },
];

const recentActivitiesData: ActivityItem[] = [
  {
    id: 1,
    user: "Ahmad Fauzi",
    action: "Menyelesaikan piket Kebersihan Area Sholat",
    time: "10 menit yang lalu",
    status: "success",
  },
  {
    id: 2,
    user: "Siti Aisyah",
    action: "Membayar uang kas bulanan (Agustus)",
    time: "45 menit yang lalu",
    status: "success",
  },
  {
    id: 3,
    user: "Budi Santoso",
    action: "Izin tidak hadir pengajian (Sakit)",
    time: "2 jam yang lalu",
    status: "warning",
  },
  {
    id: 4,
    user: "Hamba Allah",
    action: "Mengirim donasi melalui QRIS Rp 100.000",
    time: "3 jam yang lalu",
    status: "success",
  },
];

const piketListData: PiketItem[] = [
  { name: "Ahmad Fauzi", role: "Kebersihan Area Sholat", done: true },
  { name: "Siti Aisyah", role: "Penataan Kitab & Al-Qur'an", done: true },
  { name: "Budi Santoso", role: "Kebersihan Teras & Parkir", done: false },
  { name: "Nur Hidayah", role: "Merapikan Perlengkapan", done: false },
];

export default function DashboardPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="p-3.5 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto"
    >
      <DashboardHeader />
      <StatsGrid stats={statsData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <PiketTodayCard piketList={piketListData} />
        <RecentActivityCard activities={recentActivitiesData} />
      </div>
    </motion.div>
  );
}
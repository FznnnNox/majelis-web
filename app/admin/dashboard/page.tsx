"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Users, CalendarCheck, Wallet, HeartHandshake } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import DashboardHeader from "./_components/DashboardHeader";
import StatsGrid from "./_components/StatsGrid";
import PiketTodayCard from "./_components/PiketTodayCard";
import RecentActivityCard from "./_components/RecentActivityCard";
import { StatItem, ActivityItem, PiketItem, JadwalHariIni } from "./types";

const HARI_INDONESIA = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

function formatRupiah(n: number) {
  return `Rp ${n.toLocaleString("id-ID")}`;
}

function formatRelativeTime(dateStr: string) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "Baru saja";
  if (diffMin < 60) return `${diffMin} menit yang lalu`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour} jam yang lalu`;
  const diffDay = Math.floor(diffHour / 24);
  return `${diffDay} hari yang lalu`;
}

function startOfMonth(offset = 0) {
  const d = new Date();
  d.setMonth(d.getMonth() + offset, 1);
  d.setHours(0, 0, 0, 0);
  return d;
}

export default function DashboardPage() {
  const supabase = createClient();

  const [isLoading, setIsLoading] = useState(true);
  const [statsData, setStatsData] = useState<StatItem[]>([]);
  const [jadwalHariIni, setJadwalHariIni] = useState<JadwalHariIni | null>(null);
  const [piketListData, setPiketListData] = useState<PiketItem[]>([]);
  const [recentActivitiesData, setRecentActivitiesData] = useState<ActivityItem[]>([]);

  const loadDashboard = useCallback(async () => {
    setIsLoading(true);

    const namaHariIni = HARI_INDONESIA[new Date().getDay()];
    const thisMonthStart = startOfMonth(0).toISOString();
    const lastMonthStart = startOfMonth(-1).toISOString();

    const [
      { count: totalMurid },
      { count: muridBulanIni },
      { data: jadwalRow },
      { data: kasRows },
      { data: donasiRows },
      { data: hafalanRecent },
      { data: kasRecent },
      { data: donasiRecent },
      { data: muridRecent },
    ] = await Promise.all([
      supabase.from("murid").select("id", { count: "exact", head: true }),
      supabase
        .from("murid")
        .select("id", { count: "exact", head: true })
        .gte("created_at", thisMonthStart),
      supabase
        .from("jadwal_piket")
        .select("id, hari, is_libur, tugas, waktu")
        .eq("hari", namaHariIni)
        .maybeSingle(),
      supabase.from("kas_transaksi").select("kategori, jumlah, tanggal"),
      supabase.from("donasi").select("nominal, status, tanggal"),
      supabase
        .from("hafalan")
        .select("id, surah, ayat, tanggal, murid_id, murid(nama)")
        .order("tanggal", { ascending: false })
        .limit(3),
      supabase
        .from("kas_transaksi")
        .select("id, kategori, jumlah, created_at")
        .order("created_at", { ascending: false })
        .limit(3),
      supabase
        .from("donasi")
        .select("id, donatur, nominal, status, created_at")
        .order("created_at", { ascending: false })
        .limit(3),
      supabase
        .from("murid")
        .select("id, nama, created_at")
        .order("created_at", { ascending: false })
        .limit(2),
    ]);

    // ==== Petugas piket hari ini ====
    let piketList: PiketItem[] = [];
    let jadwal: JadwalHariIni | null = null;

    if (jadwalRow) {
      jadwal = {
        hari: (jadwalRow as any).hari,
        isLibur: (jadwalRow as any).is_libur,
        tugas: (jadwalRow as any).tugas,
        waktu: (jadwalRow as any).waktu,
      };

      if (!jadwal.isLibur) {
        const { data: petugasRows } = await supabase
          .from("piket_petugas")
          .select("id, murid_id, murid(nama)")
          .eq("jadwal_id", (jadwalRow as any).id);

        piketList = (petugasRows ?? []).map((p: any) => ({
          name: p.murid?.nama ?? "Murid tidak ditemukan",
          role: jadwal!.tugas || "Piket Kebersihan",
        }));
      }
    }

    // ==== Total kas (pemasukan - pengeluaran) ====
    let totalKas = 0;
    let kasMingguIni = 0;
    const startWeek = new Date();
    startWeek.setDate(startWeek.getDate() - 7);

    (kasRows ?? []).forEach((row: any) => {
      const kategori = (row.kategori || "").toLowerCase();
      const nominal = Number(row.jumlah) || 0;
      const signed = kategori.includes("keluar") ? -nominal : nominal;
      totalKas += signed;
      if (new Date(row.tanggal) >= startWeek) kasMingguIni += signed;
    });

    // ==== Donasi bulan ini vs bulan lalu ====
    let donasiBulanIni = 0;
    let donasiBulanLalu = 0;
    (donasiRows ?? []).forEach((row: any) => {
      const status = (row.status || "").toLowerCase();
      if (!status.includes("lunas")) return;
      const nominal = Number(row.nominal) || 0;
      const tgl = new Date(row.tanggal);
      if (tgl >= startOfMonth(0)) donasiBulanIni += nominal;
      else if (tgl >= startOfMonth(-1) && tgl < startOfMonth(0)) donasiBulanLalu += nominal;
    });

    const donasiChangePct =
      donasiBulanLalu > 0
        ? Math.round(((donasiBulanIni - donasiBulanLalu) / donasiBulanLalu) * 100)
        : donasiBulanIni > 0
        ? 100
        : 0;

    setStatsData([
      {
        title: "Total Santri",
        value: `${totalMurid ?? 0} Santri`,
        change: `+${muridBulanIni ?? 0} bulan ini`,
        isPositive: true,
        icon: Users,
        color: "bg-emerald-500/10 text-emerald-700 border-emerald-200/50",
      },
      {
        title: "Petugas Piket Hari Ini",
        value: jadwal?.isLibur ? "Libur" : `${piketList.length} Santri`,
        change: jadwal?.isLibur ? "Tidak ada jadwal" : jadwal?.waktu || "Waktu belum diatur",
        isPositive: true,
        icon: CalendarCheck,
        color: "bg-blue-500/10 text-blue-700 border-blue-200/50",
      },
      {
        title: "Total Kas Majelis",
        value: formatRupiah(totalKas),
        change: `${kasMingguIni >= 0 ? "+" : "-"}${formatRupiah(Math.abs(kasMingguIni))} minggu ini`,
        isPositive: kasMingguIni >= 0,
        icon: Wallet,
        color: "bg-[#c1663c]/10 text-[#c1663c] border-[#c1663c]/20",
      },
      {
        title: "Donasi Masuk",
        value: formatRupiah(donasiBulanIni),
        change: `${donasiChangePct >= 0 ? "+" : ""}${donasiChangePct}% dari bulan lalu`,
        isPositive: donasiChangePct >= 0,
        icon: HeartHandshake,
        color: "bg-purple-500/10 text-purple-700 border-purple-200/50",
      },
    ]);

    setJadwalHariIni(jadwal);
    setPiketListData(piketList);

    // ==== Gabungkan aktivitas terbaru dari beberapa tabel ====
    const activities: (ActivityItem & { rawTime: string })[] = [];

    (hafalanRecent ?? []).forEach((h: any) => {
      activities.push({
        id: `hafalan-${h.id}`,
        user: h.murid?.nama ?? "Murid",
        action: `Setor hafalan Surah ${h.surah} (Ayat ${h.ayat})`,
        time: formatRelativeTime(h.tanggal),
        rawTime: h.tanggal,
        status: "success",
      });
    });

    (kasRecent ?? []).forEach((k: any) => {
      const kategori = (k.kategori || "").toLowerCase();
      activities.push({
        id: `kas-${k.id}`,
        user: "Bendahara",
        action: `Transaksi kas ${k.kategori || "-"}: ${formatRupiah(Number(k.jumlah) || 0)}`,
        time: formatRelativeTime(k.created_at),
        rawTime: k.created_at,
        status: kategori.includes("keluar") ? "warning" : "success",
      });
    });

    (donasiRecent ?? []).forEach((d: any) => {
      const status = (d.status || "").toLowerCase();
      activities.push({
        id: `donasi-${d.id}`,
        user: d.donatur || "Hamba Allah",
        action: `Mengirim donasi ${formatRupiah(Number(d.nominal) || 0)}`,
        time: formatRelativeTime(d.created_at),
        rawTime: d.created_at,
        status: status.includes("lunas") ? "success" : "warning",
      });
    });

    (muridRecent ?? []).forEach((m: any) => {
      activities.push({
        id: `murid-${m.id}`,
        user: m.nama,
        action: "Terdaftar sebagai santri baru",
        time: formatRelativeTime(m.created_at),
        rawTime: m.created_at,
        status: "success",
      });
    });

    activities.sort((a, b) => new Date(b.rawTime).getTime() - new Date(a.rawTime).getTime());
    setRecentActivitiesData(activities.slice(0, 5));

    setIsLoading(false);
  }, [supabase]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="p-3.5 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto"
    >
      <DashboardHeader />

      {isLoading ? (
        <div className="py-16 text-center text-gray-400 bg-white/80 rounded-3xl border border-gray-100 text-xs font-semibold">
          Memuat data dashboard...
        </div>
      ) : (
        <>
          <StatsGrid stats={statsData} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <PiketTodayCard piketList={piketListData} jadwal={jadwalHariIni} />
            <RecentActivityCard activities={recentActivitiesData} />
          </div>
        </>
      )}
    </motion.div>
  );
}
"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  User,
  Mail,
  ShieldCheck,
  KeyRound,
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface ProfileData {
  id: string;
  email: string;
  nama: string;
  role: "admin" | "petugas";
}

export default function SettingsPage() {
  const supabase = createClient();

  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileData | null>(null);

  const [namaInput, setNamaInput] = useState("");
  const [isSavingNama, setIsSavingNama] = useState(false);
  const [namaMessage, setNamaMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [passwordBaru, setPasswordBaru] = useState("");
  const [konfirmasiPassword, setKonfirmasiPassword] = useState("");
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const loadProfile = useCallback(async () => {
    setIsLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setIsLoading(false);
      return;
    }

    const { data: profileRow, error } = await supabase
      .from("profiles")
      .select("id, nama, role")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("Gagal mengambil profil:", error);
      setIsLoading(false);
      return;
    }

    const merged: ProfileData = {
      id: user.id,
      email: user.email ?? "-",
      nama: (profileRow as any)?.nama ?? "",
      role: (profileRow as any)?.role ?? "petugas",
    };

    setProfile(merged);
    setNamaInput(merged.nama);
    setIsLoading(false);
  }, [supabase]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleSaveNama = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setIsSavingNama(true);
    setNamaMessage(null);

    const { error } = await supabase
      .from("profiles")
      .update({ nama: namaInput.trim() })
      .eq("id", profile.id);

    if (error) {
      console.error("Gagal menyimpan nama:", error);
      setNamaMessage({ type: "error", text: "Gagal menyimpan perubahan. Coba lagi." });
    } else {
      setProfile((prev) => (prev ? { ...prev, nama: namaInput.trim() } : prev));
      setNamaMessage({ type: "success", text: "Nama berhasil diperbarui." });
    }

    setIsSavingNama(false);
    setTimeout(() => setNamaMessage(null), 3000);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage(null);

    if (passwordBaru.length < 6) {
      setPasswordMessage({ type: "error", text: "Password minimal 6 karakter." });
      return;
    }

    if (passwordBaru !== konfirmasiPassword) {
      setPasswordMessage({ type: "error", text: "Konfirmasi password tidak cocok." });
      return;
    }

    setIsSavingPassword(true);

    const { error } = await supabase.auth.updateUser({ password: passwordBaru });

    if (error) {
      console.error("Gagal mengubah password:", error);
      setPasswordMessage({ type: "error", text: error.message || "Gagal mengubah password." });
    } else {
      setPasswordMessage({ type: "success", text: "Password berhasil diubah." });
      setPasswordBaru("");
      setKonfirmasiPassword("");
    }

    setIsSavingPassword(false);
    setTimeout(() => setPasswordMessage(null), 4000);
  };

  const initials = (profile?.nama || profile?.email || "A").charAt(0).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="p-3.5 sm:p-6 space-y-4 sm:space-y-6 max-w-3xl mx-auto"
    >
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-[28px] bg-gradient-to-r from-[#14352c] via-[#1b4338] to-[#235346] p-5 sm:p-8 text-white shadow-xl shadow-[#14352c]/10">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-48 sm:w-64 h-48 sm:h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-36 sm:w-48 h-36 sm:h-48 bg-[#c1663c]/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-emerald-200 text-[11px] sm:text-xs font-medium mb-2.5">
            <Settings className="h-3.5 w-3.5 text-[#c1663c]" />
            <span>Sistem</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
            Pengaturan Akun
          </h1>
          <p className="text-emerald-100/70 text-xs sm:text-sm mt-1 max-w-lg leading-relaxed">
            Kelola informasi profil dan keamanan akun Anda di Sistem Informasi Majelis Al-Inayah.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="py-16 text-center text-gray-400 bg-white/80 rounded-3xl border border-gray-100 text-xs font-semibold">
          Memuat data akun...
        </div>
      ) : !profile ? (
        <div className="py-16 text-center text-gray-400 bg-white/80 rounded-3xl border border-gray-100 text-xs font-semibold">
          Gagal memuat data akun. Coba muat ulang halaman.
        </div>
      ) : (
        <>
          {/* Kartu Ringkasan Profil */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-2xs flex items-center gap-4">
            <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-gradient-to-br from-[#14352c] to-[#204e41] text-white flex items-center justify-center text-xl font-black shrink-0 shadow-md shadow-[#14352c]/20">
              {initials}
            </div>
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 truncate">
                {profile.nama || "Belum ada nama"}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 truncate">{profile.email}</p>
              <span
                className={`inline-flex items-center gap-1 mt-1.5 text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${
                  profile.role === "admin"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                    : "bg-blue-50 text-blue-700 border-blue-100"
                }`}
              >
                <ShieldCheck className="h-3 w-3" />
                {profile.role === "admin" ? "Administrator" : "Petugas"}
              </span>
            </div>
          </div>

          {/* Form Ubah Nama */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-gray-100 shadow-2xs overflow-hidden">
            <div className="px-5 sm:px-6 py-4 border-b border-gray-100 flex items-center gap-2">
              <User className="h-4 w-4 text-[#c1663c]" />
              <h3 className="text-sm font-extrabold text-gray-900">Informasi Profil</h3>
            </div>

            <form onSubmit={handleSaveNama} className="p-5 sm:p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-gray-500">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                  <input
                    type="text"
                    value={namaInput}
                    onChange={(e) => setNamaInput(e.target.value)}
                    placeholder="Nama Anda"
                    className="w-full h-[42px] bg-gray-50 rounded-2xl border border-gray-200 pl-9 pr-3.5 text-sm font-semibold text-gray-800 hover:border-gray-300 focus:outline-none focus:border-[#14352c] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-gray-500">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                  <input
                    type="email"
                    value={profile.email}
                    disabled
                    className="w-full h-[42px] bg-gray-100 rounded-2xl border border-gray-200 pl-9 pr-3.5 text-sm font-medium text-gray-500 cursor-not-allowed"
                  />
                </div>
                <p className="text-[11px] text-gray-400">Email tidak dapat diubah dari halaman ini.</p>
              </div>

              {namaMessage && (
                <div
                  className={`flex items-center gap-2 text-xs font-semibold px-3.5 py-2.5 rounded-2xl ${
                    namaMessage.type === "success"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                      : "bg-rose-50 text-rose-700 border border-rose-100"
                  }`}
                >
                  {namaMessage.type === "success" ? (
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                  ) : (
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  )}
                  {namaMessage.text}
                </div>
              )}

              <div className="pt-1 flex justify-end">
                <button
                  type="submit"
                  disabled={isSavingNama}
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#14352c] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#1b4338] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-60 shadow-md shadow-[#14352c]/15"
                >
                  {isSavingNama ? (
                    <Loader2 className="h-4 w-4 text-emerald-300 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 text-emerald-300" />
                  )}
                  <span>{isSavingNama ? "Menyimpan..." : "Simpan Perubahan"}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Form Ganti Password */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-gray-100 shadow-2xs overflow-hidden">
            <div className="px-5 sm:px-6 py-4 border-b border-gray-100 flex items-center gap-2">
              <KeyRound className="h-4 w-4 text-[#c1663c]" />
              <h3 className="text-sm font-extrabold text-gray-900">Keamanan Akun</h3>
            </div>

            <form onSubmit={handleChangePassword} className="p-5 sm:p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-gray-500">
                  Password Baru
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                  <input
                    type="password"
                    value={passwordBaru}
                    onChange={(e) => setPasswordBaru(e.target.value)}
                    placeholder="Minimal 6 karakter"
                    className="w-full h-[42px] bg-gray-50 rounded-2xl border border-gray-200 pl-9 pr-3.5 text-sm font-semibold text-gray-800 hover:border-gray-300 focus:outline-none focus:border-[#14352c] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-gray-500">
                  Konfirmasi Password Baru
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                  <input
                    type="password"
                    value={konfirmasiPassword}
                    onChange={(e) => setKonfirmasiPassword(e.target.value)}
                    placeholder="Ulangi password baru"
                    className="w-full h-[42px] bg-gray-50 rounded-2xl border border-gray-200 pl-9 pr-3.5 text-sm font-semibold text-gray-800 hover:border-gray-300 focus:outline-none focus:border-[#14352c] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {passwordMessage && (
                <div
                  className={`flex items-center gap-2 text-xs font-semibold px-3.5 py-2.5 rounded-2xl ${
                    passwordMessage.type === "success"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                      : "bg-rose-50 text-rose-700 border border-rose-100"
                  }`}
                >
                  {passwordMessage.type === "success" ? (
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                  ) : (
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  )}
                  {passwordMessage.text}
                </div>
              )}

              <div className="pt-1 flex justify-end">
                <button
                  type="submit"
                  disabled={isSavingPassword}
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#c1663c] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#a8542e] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-60 shadow-md shadow-[#c1663c]/20"
                >
                  {isSavingPassword ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                  <span>{isSavingPassword ? "Menyimpan..." : "Ubah Password"}</span>
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </motion.div>
  );
}
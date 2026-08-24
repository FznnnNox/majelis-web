"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Bell, User, LogOut, ChevronDown, Menu } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface AdminNavbarProps {
  onMenuClick?: () => void;
}

export default function AdminNavbar({ onMenuClick }: AdminNavbarProps) {
  const router = useRouter();
  const supabase = createClient();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? null);
    });
  }, [supabase]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await supabase.auth.signOut();

    // Pastikan Server Component (middleware) tidak lagi membaca session lama
    router.refresh();
    router.push("/login");
  };

  // Inisial dari email, fallback "A" kalau belum termuat
  const initial = userEmail ? userEmail.charAt(0).toUpperCase() : "A";

  return (
    <header
      className="sticky top-0 z-30 bg-white/85 backdrop-blur-md px-3 sm:px-6"
      style={{ borderBottom: "1px solid #ece7d9" }}
    >
      <div className="h-16 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors focus:outline-none shrink-0"
            aria-label="Buka menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="relative hidden sm:block w-56 md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              placeholder="Cari data santri, jadwal..."
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200"
              style={{ background: "#f6f4ee", border: "1px solid #ece7d9" }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#14352c";
                e.currentTarget.style.background = "#fff";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#ece7d9";
                e.currentTarget.style.background = "#f6f4ee";
              }}
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <button
            onClick={() => setShowMobileSearch((v) => !v)}
            className="sm:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors focus:outline-none"
            aria-label="Cari"
          >
            <Search className="h-5 w-5" />
          </button>

          <button className="relative p-2 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors focus:outline-none">
            <Bell className="h-5 w-5" />
            <span
              className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full ring-2 ring-white"
              style={{ background: "#c1663c" }}
            />
          </button>

          <div className="h-6 w-px bg-gray-200 hidden sm:block" />

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowProfileMenu((v) => !v)}
              className="flex items-center gap-2.5 p-1 sm:p-1.5 rounded-xl hover:bg-gray-50 transition-colors focus:outline-none"
            >
              <div
                className="h-9 w-9 rounded-xl text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0"
                style={{ background: "#14352c" }}
              >
                {initial}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold text-gray-800 leading-none">
                  Admin Al-Inayah
                </p>
                <p className="text-[10px] font-medium text-gray-500 mt-1 leading-none truncate max-w-[140px]">
                  {userEmail ?? "Pengurus Utama"}
                </p>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400 hidden sm:block" />
            </button>

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white shadow-xl border border-gray-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-2.5 border-b border-gray-100 md:hidden">
                  <p className="text-xs font-bold text-gray-800">Admin Al-Inayah</p>
                  <p className="text-[10px] text-gray-500 truncate">
                    {userEmail ?? "Pengurus Utama"}
                  </p>
                </div>

                <a
                  href="#profile"
                  className="flex items-center gap-2 px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                >
                  <User className="h-4 w-4 text-gray-400" />
                  <span>Profil Pengurus</span>
                </a>

                <div className="my-1 border-t border-gray-100" />

                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoggingOut ? (
                    <span className="h-4 w-4 rounded-full border-2 border-red-300 border-t-red-600 animate-spin" />
                  ) : (
                    <LogOut className="h-4 w-4 text-red-500" />
                  )}
                  <span>{isLoggingOut ? "Keluar..." : "Keluar Akun"}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile search row */}
      {showMobileSearch && (
        <div className="sm:hidden pb-3 -mt-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              autoFocus
              placeholder="Cari data santri, jadwal..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs text-gray-900 placeholder:text-gray-400 outline-none"
              style={{ background: "#f6f4ee", border: "1px solid #ece7d9" }}
            />
          </div>
        </div>
      )}
    </header>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Amiri, Plus_Jakarta_Sans } from "next/font/google";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const display = Amiri({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-display",
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
});

const STAR_PATTERN =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Cg fill='none' stroke='%23b8923f' stroke-width='0.6'%3E%3Cpath d='M28 4l5.5 11L46 12l-6 12 12 5.5-12 5.5 6 12-12.5-3L28 56l-5.5-11L10 48l6-12L4 30.5 16 25l-6-12 12.5 3z'/%3E%3C/g%3E%3C/svg%3E";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setIsLoading(false);
      setError(
        error.message === "Invalid login credentials"
          ? "Email atau kata sandi salah."
          : error.message,
      );
      return;
    }

    router.refresh();
    router.push("/admin/dashboard");
  };

  return (
    <div
      className={`${display.variable} ${body.variable} min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-10`}
      style={{
        fontFamily: "var(--font-body)",
        background:
          "radial-gradient(1200px 600px at 15% -10%, #fbf6ea 0%, #f4eddd 55%, #efe6d0 100%)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 min-h-[660px] rounded-[28px] overflow-hidden"
        style={{
          background: "#fffdf8",
          border: "1px solid #e7ddc9",
          boxShadow: "0 30px 60px -25px rgba(20, 53, 44, 0.35)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `url("${STAR_PATTERN}")`,
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(500px 380px at 0% 0%, black, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(500px 380px at 0% 0%, black, transparent 70%)",
          }}
        />

        <div className="relative lg:col-span-6 p-8 sm:p-12 lg:p-16 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-12">
              <img
                src="/assets/logo.png"
                alt="Logo Al-Inayah"
                className="h-[50px] w-[50px] object-contain"
              />
              <span
                className="text-[13px] font-semibold tracking-[0.2em] uppercase"
                style={{ color: "#14352c" }}
              >
                Majelis Al&nbsp;&middot;&nbsp;Inayah
              </span>
            </div>

            <div className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="h-px w-8" style={{ background: "#b8923f" }} />
                <span
                  className="text-[11px] font-semibold tracking-[0.18em] uppercase"
                  style={{ color: "#8a6a2c" }}
                >
                  Kampung Panggang
                </span>
              </div>
              <h1
                className="text-4xl sm:text-[2.75rem] leading-[1.1] tracking-tight"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "#14352c",
                }}
              >
                Selamat datang di
                <br />
                <span style={{ color: "#c1663c" }}>Majelis Al-Inayah</span>
              </h1>
              <p
                className="mt-4 text-sm max-w-sm leading-relaxed"
                style={{ color: "#6b6255" }}
              >
                Masuk ke sistem informasi untuk memantau jadwal pengajian,
                pendaftaran santri, dan kegiatan keagamaan.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-[11px] font-semibold tracking-wide"
                  style={{ color: "#8a8272" }}
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors duration-200"
                  style={{
                    background: "#faf6ec",
                    border: "1px solid #e7ddc9",
                    color: "#1c231f",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#14352c";
                    e.currentTarget.style.background = "#fffdf8";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#e7ddc9";
                    e.currentTarget.style.background = "#faf6ec";
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-[11px] font-semibold tracking-wide"
                  style={{ color: "#8a8272" }}
                >
                  Kata sandi
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-4 pr-11 py-3 rounded-xl text-sm outline-none transition-colors duration-200"
                    style={{
                      background: "#faf6ec",
                      border: "1px solid #e7ddc9",
                      color: "#1c231f",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#14352c";
                      e.currentTarget.style.background = "#fffdf8";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "#e7ddc9";
                      e.currentTarget.style.background = "#faf6ec";
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword
                        ? "Sembunyikan kata sandi"
                        : "Tampilkan kata sandi"
                    }
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center focus:outline-none"
                    style={{ color: "#a89f8e" }}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <p
                  className="text-[12px] font-medium -mt-1"
                  style={{ color: "#b8402c" }}
                >
                  {error}
                </p>
              )}

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 accent-[#14352c]"
                  />
                  <span
                    className="text-[12px] font-medium"
                    style={{ color: "#8a8272" }}
                  >
                    Ingat saya
                  </span>
                </label>
                <a
                  href="#"
                  className="text-[12px] font-medium hover:underline"
                  style={{ color: "#8a8272" }}
                >
                  Lupa kata sandi?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-36 mt-5 py-3 px-4 rounded-xl text-[13px] font-bold text-white active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                style={{
                  background: "#14352c",
                  boxShadow: "0 12px 24px -10px rgba(20, 53, 44, 0.55)",
                }}
              >
                {isLoading ? (
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <span>Masuk</span>
                )}
              </button>
            </form>
          </div>

          <div
            className="mt-10 pt-5 flex items-center justify-between text-xs max-w-sm"
            style={{ borderTop: "1px solid #efe8d8" }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-medium transition-colors text-[11px] hover:opacity-70"
              style={{ color: "#8a8272" }}
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Beranda</span>
            </Link>
          </div>
        </div>

        <div
          className="relative lg:col-span-6 hidden lg:flex items-center justify-center p-10"
          style={{
            background:
              "linear-gradient(165deg, #14352c 0%, #1c4438 55%, #14352c 100%)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.16]"
            style={{
              backgroundImage: `url("${STAR_PATTERN.replace(/%23b8923f/g, "%23f6f1e7")}")`,
              backgroundSize: "56px 56px",
            }}
          />

          <div className="relative w-full max-w-sm">
            <div
              className="relative p-[10px]"
              style={{
                borderRadius: "220px 220px 18px 18px",
                border: "1px solid rgba(184,146,63,0.55)",
              }}
            >
              <div
                className="relative w-full aspect-[3/4] overflow-hidden"
                style={{
                  borderRadius: "200px 200px 10px 10px",
                  border: "1px solid rgba(184,146,63,0.85)",
                }}
              >
                <Image
                  src="/assets/login.jpg"
                  alt="Majelis Al-Inayah Kampung Panggang"
                  fill
                  priority
                  className="object-cover object-center"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(0deg, rgba(20,53,44,0.55) 0%, rgba(20,53,44,0) 45%)",
                  }}
                />
              </div>
            </div>

            <div className="mt-7 text-center">
              <p
                className="text-lg italic"
                style={{ fontFamily: "var(--font-display)", color: "#f6f1e7" }}
              >
                &ldquo;Majelis ilmu adalah taman surga.&rdquo;
              </p>
              <p
                className="mt-2 text-[11px] font-semibold tracking-[0.2em] uppercase"
                style={{ color: "#b8923f" }}
              >
                Al-Inayah &middot; Kampung Panggang
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Jadwal piket", href: "/jadwal-piket" },
  { label: "Uang kas", href: "/uang-kas" },
  { label: "Hafalan", href: "/hafalan-murid" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full text-white transition-all duration-300 ease-in-out ${
        isScrolled
          ? "bg-[#013e37]/90 shadow-lg backdrop-blur-md border-b border-white/10 py-1"
          : "bg-[#152e28] py-2"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
        <Link href="/" className="flex items-center gap-2.5 group">
          <img
            src="/assets/logo.png"
            alt="Logo Al-Inayah"
            className="h-[50px] w-[50px] object-contain"
          />
          <span className="text-lg font-bold tracking-wide text-white">
            Al Inayah
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm transition-colors duration-200 py-1 ${
                  isActive
                    ? "font-medium text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="active-nav-underline"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-[#e76f3c]"
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex">
          <Link
            href="/login"
            className="rounded-lg border border-gray-400/40 px-5 py-2 text-xs font-medium text-white transition-all duration-200 hover:bg-white/10 hover:border-white"
          >
            Login
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-9 w-9 items-center justify-center rounded-md text-gray-200 transition-colors hover:bg-white/10 md:hidden"
          aria-label="Buka navigasi"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden bg-[#152e28]/95 backdrop-blur-md border-b border-white/10 shadow-xl md:hidden"
          >
            <div className="flex flex-col gap-3 px-6 pb-6 pt-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`py-1 text-sm ${
                    pathname === link.href
                      ? "font-semibold text-[#e76f3c]"
                      : "text-gray-200 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="mt-2 flex items-center gap-3">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="inline-block w-fit rounded-lg border border-gray-400/40 px-5 py-2 text-xs font-medium text-white hover:bg-white/10"
                >
                  Login
                </Link>
                <Link
                  href="/galeri"
                  onClick={() => setIsOpen(false)}
                  className="inline-block w-fit rounded-lg border border-gray-400/40 px-5 py-2 text-xs font-medium text-white hover:bg-white/10"
                >
                  Lihat galeri
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
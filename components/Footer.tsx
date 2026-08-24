"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Heart, ArrowUpRight } from "lucide-react";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/jadwal-piket", label: "Jadwal piket" },
  { href: "/uang-kas", label: "Uang kas dan infaq" },
  { href: "/fasilitas", label: "Fasilitas majelis" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Footer() {
  return (
    <footer className="bg-[#013e37] text-white pt-16 pb-8 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-4"
          >
            <h3 className="flex items-center gap-2 text-xl font-semibold tracking-tight text-white">
              <img
            src="/assets/logo.png"
            alt="Logo Bulan"
            className="h-[50px] w-[50px] object-contain"
          />
              Al-Inayah
            </h3>
            <p className="mt-4 text-sm text-emerald-100/70 leading-relaxed">
              Majelis Taklim Al-Inayah Kampung Panggang, tempat membina
              karakter, adab, dan pemahaman Al-Qur'an bagi generasi muda dan
              warga sekitar.
            </p>
            <div className="mt-6 flex items-center gap-3 rounded-2xl bg-white/5 p-3 ring-1 ring-white/10">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-amber-300">
                <Clock className="h-4 w-4" />
              </div>
              <p className="text-xs text-emerald-100/70">
                Kegiatan rutin{" "}
                <span className="block font-medium text-white">
                  Senin – Jumat, ba'da Maghrib
                </span>
              </p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="lg:col-span-3 lg:pl-8"
          >
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Navigasi halaman
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-emerald-100/70">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-5"
          >
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Lokasi dan kontak
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-emerald-100/70">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-[#e76f3c]" />
                <span>Kampung Panggang, Kota Serang, Banten</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-[#e76f3c]" />
                <span>+62 8xx-xxxx-xxxx (Pengurus majelis)</span>
              </li>
            </ul>

            <div className="group relative mt-5 h-28 w-full overflow-hidden rounded-2xl ring-1 ring-white/10">
  <iframe
    title="Lokasi Majelis Al-Inayah"
    src="https://maps.google.com/maps?q=Majelis+Al-Inayah,-6.1054722,106.2068525&z=17&ie=UTF8&iwloc=&output=embed"
    width="100%"
    height="100%"
    className="border-0 opacity-70 transition-opacity duration-300 group-hover:opacity-100"
    loading="lazy"
  />
  <a
    href="https://www.google.com/maps/place/Majelis+Al-Inayah/@-6.1054722,106.2068525,17z"
    target="_blank"
    rel="noopener noreferrer"
    className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100"
    aria-label="Buka lokasi di Google Maps"
  >
    <ArrowUpRight className="h-3.5 w-3.5" />
  </a>
</div>
          </motion.div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-emerald-100/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Majelis Al-Inayah Kampung Panggang.
            Hak cipta dilindungi.
          </p>
          <p className="flex items-center gap-1.5">
            Dibuat dengan
            <Heart className="h-3 w-3 fill-current text-[#e76f3c]" />
            untuk kebermanfaatan ummat
          </p>
        </div>
      </div>
    </footer>
  );
}
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import MainLayoutWrapper from "@/components/MainLayoutWrapper";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Pengajian Al Inayah",
  description:
    "Website profil Pengajian Al Inayah — jadwal piket, uang kas, fasilitas, dan galeri kegiatan.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${jakarta.variable} h-full antialiased`}>
      <body
        className={`${jakarta.className} min-h-full flex flex-col font-sans`}
      >
        <MainLayoutWrapper>{children}</MainLayoutWrapper>
      </body>
    </html>
  );
}

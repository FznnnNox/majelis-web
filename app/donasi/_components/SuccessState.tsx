"use client";

import { useState } from "react";
import { Check, Copy, QrCode } from "lucide-react";
import { formatRupiah } from "../types";

interface Props {
  nominal: number;
  onDonateAgain: () => void;
}

export default function SuccessState({ nominal, onDonateAgain }: Props) {
  const [copied, setCopied] = useState(false);
  const noRekening = "7123456789"; // Sesuaikan no rekening BSI Majelis

  const handleCopy = () => {
    navigator.clipboard.writeText(noRekening);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center py-6 space-y-6">
      <div className="relative">
        <div className="h-16 w-16 rounded-t-full rounded-b-2xl bg-gradient-to-b from-[#152e28] to-[#1f453c] flex items-center justify-center shadow-lg shadow-[#152e28]/20">
          <Check className="h-7 w-7 text-white stroke-[3]" />
        </div>
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1.5 w-8 rounded-full bg-[#b8905a]" />
      </div>

      <div>
        <h3 className="text-xl font-serif font-semibold text-gray-900">
          Niat Donasi Diterima
        </h3>
        <p className="text-sm text-gray-500 mt-1.5">
          Silakan selesaikan pembayaran sebesar{" "}
          <strong className="text-gray-900">{formatRupiah(nominal)}</strong>
        </p>
      </div>

      <div className="w-full max-w-md rounded-2xl bg-[#f8faf9] p-5 border border-gray-200/80 text-left space-y-4">
        <div>
          <span className="text-[11px] font-bold text-[#152e28] uppercase tracking-[0.15em]">
            Bank Syariah Indonesia (BSI)
          </span>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-lg font-extrabold text-gray-900 tracking-wide tabular-nums">
              {noRekening}
            </span>
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${
                copied
                  ? "bg-[#152e28] text-white"
                  : "bg-[#b8905a]/10 text-[#8a6a3f] hover:bg-[#b8905a]/20"
              }`}
            >
              {copied ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              {copied ? "Tersalin" : "Salin"}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            a.n. Majelis Ta'lim Al-Inayah
          </p>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-700 mb-2.5">
            <QrCode className="h-4 w-4 text-[#152e28]" />
            <span>Atau Scan QRIS Statik Majelis</span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-gray-200 flex justify-center">
            <img
              src="/assets/scan.png"
              alt="QRIS Majelis Al-Inayah"
              className="w-48 h-auto rounded-lg object-contain"
            />
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-400 max-w-xs">
        Setelah mentransfer, donasi akan diverifikasi oleh pengurus majelis dan
        progress akan diperbarui otomatis.
      </p>

      <button
        onClick={onDonateAgain}
        className="w-full py-3.5 rounded-xl bg-[#152e28] hover:bg-[#1f453c] text-white font-semibold text-sm transition-colors shadow-sm"
      >
        Kirim Donasi Lain
      </button>
    </div>
  );
}

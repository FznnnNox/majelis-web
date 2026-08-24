"use client";

import { useState } from "react";
import { QrCode, Copy, Check } from "lucide-react";

export default function DonasiRekening() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("7123456789");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-[#14352c] to-[#1b4338] text-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-md flex flex-col justify-between space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-emerald-200 font-medium">
            Rekening Resmi Majelis
          </p>
          <h4 className="font-black text-base mt-0.5">
            Bank Syariah Indonesia (BSI)
          </h4>
        </div>
        <div className="h-10 w-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
          <QrCode className="h-5 w-5 text-[#c1663c]" />
        </div>
      </div>

      <div>
        <p className="text-[10px] text-emerald-200 uppercase font-mono tracking-wider">
          No. Rekening
        </p>
        <div className="flex items-center justify-between bg-white/10 backdrop-blur-md border border-white/15 px-3 py-2 rounded-xl mt-1">
          <span className="font-mono font-bold text-sm tracking-wider">
            7123 4567 89
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="p-1 rounded-lg hover:bg-white/10 text-emerald-200 hover:text-white transition-colors cursor-pointer"
            title="Salin Nomor Rekening"
          >
            {copied ? (
              <Check className="h-4 w-4 text-emerald-400" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <p className="text-[11px] text-emerald-100/70 font-medium">
        a.n. <span className="font-bold text-white">Majelis Ta'lim Al-Inayah</span>
      </p>
    </div>
  );
}
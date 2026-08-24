"use client";

import { PRESET_AMOUNTS } from "../types";

interface Props {
  selectedAmount: number;
  customAmount: string;
  onSelectPreset: (amount: number) => void;
  onCustomChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AmountSelector({
  selectedAmount,
  customAmount,
  onSelectPreset,
  onCustomChange,
}: Props) {
  const isCustomActive = !PRESET_AMOUNTS.some((p) => p.value === selectedAmount);

  return (
    <div>
      <div className="flex items-baseline gap-2 mb-3">
        <span className="h-1.5 w-1.5 rounded-full bg-[#b8905a]" />
        <label className="text-xs font-bold text-gray-900 uppercase tracking-[0.15em]">
          Pilih Nominal Donasi
        </label>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5 mb-4">
        {PRESET_AMOUNTS.map((preset) => {
          const isSelected = selectedAmount === preset.value;
          return (
            <button
              key={preset.value}
              type="button"
              onClick={() => onSelectPreset(preset.value)}
              className={`relative py-3 px-2 rounded-xl text-xs font-bold transition-all duration-200 border ${
                isSelected
                  ? "bg-[#152e28] text-white border-[#152e28] shadow-md shadow-[#152e28]/20"
                  : "bg-[#f8faf9] text-gray-700 border-gray-200/80 hover:border-[#152e28]/30 hover:bg-white"
              }`}
            >
              {preset.label}
              {isSelected && (
                <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-[#b8905a] ring-2 ring-white" />
              )}
            </button>
          );
        })}
      </div>

      <div
        className={`group relative flex items-center rounded-xl bg-[#f8faf9] px-4 py-3 border transition-all ${
          isCustomActive
            ? "border-[#152e28] ring-2 ring-[#b8905a]/20 bg-white"
            : "border-gray-200/80 focus-within:border-[#152e28] focus-within:ring-2 focus-within:ring-[#b8905a]/20 focus-within:bg-white"
        }`}
      >
        <span className="text-xs font-bold text-gray-400 mr-3 shrink-0">Custom</span>
        <span className="text-xs font-black text-gray-800 mr-1.5">Rp</span>
        <input
          type="text"
          inputMode="numeric"
          value={customAmount ? Number(customAmount).toLocaleString("id-ID") : ""}
          onChange={onCustomChange}
          placeholder="0"
          className="w-full bg-transparent text-sm font-bold text-gray-900 outline-none placeholder-gray-400"
        />
        <span className="text-[11px] font-bold text-gray-500 bg-white px-2.5 py-1 rounded-lg border border-gray-200 shadow-2xs shrink-0">
          IDR
        </span>
      </div>
    </div>
  );
}
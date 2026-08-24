"use client";

import { Heart, Loader2 } from "lucide-react";

interface Props {
  isSubmitting: boolean;
}

export default function SubmitButton({ isSubmitting }: Props) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full py-3.5 rounded-xl bg-[#e76f3c] text-white font-bold text-xs shadow-md shadow-[#e76f3c]/20 hover:bg-[#d65f2c] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {isSubmitting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Heart className="h-4 w-4 fill-current text-white" />
      )}
      <span>{isSubmitting ? "Memproses..." : "Donasi Sekarang"}</span>
    </button>
  );
}
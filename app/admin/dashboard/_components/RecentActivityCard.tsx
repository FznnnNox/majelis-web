"use client";

import { Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { ActivityItem } from "../types";

interface Props {
  activities: ActivityItem[];
}

export default function RecentActivityCard({ activities }: Props) {
  return (
    <div className="bg-white/90 backdrop-blur-md p-5 sm:p-6 rounded-3xl border border-gray-100 shadow-2xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <h2 className="text-sm sm:text-base font-extrabold text-gray-900 flex items-center gap-2">
          <Clock className="h-4 w-4 text-[#c1663c]" />
          <span>Aktivitas Terbaru</span>
        </h2>
        <span className="text-[10px] font-bold text-gray-400 uppercase">Realtime</span>
      </div>

      <div className="space-y-3.5">
        {activities.map((act) => (
          <div
            key={act.id}
            className="flex gap-3 text-xs p-2.5 rounded-2xl hover:bg-gray-50/80 transition-colors border border-transparent hover:border-gray-100"
          >
            <div className="mt-0.5 shrink-0">
              {act.status === "success" ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-amber-500" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="font-bold text-gray-900 truncate">{act.user}</p>
                <span className="text-[10px] font-medium text-gray-400 shrink-0">
                  {act.time}
                </span>
              </div>
              <p className="text-gray-500 text-[11px] mt-0.5 leading-relaxed">
                {act.action}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
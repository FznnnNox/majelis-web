"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { StatItem } from "../types";

interface Props {
  stats: StatItem[];
}

export default function StatsGrid({ stats }: Props) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-white/90 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className={`p-2.5 sm:p-3 rounded-2xl border ${stat.color}`}>
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <span
                className={`inline-flex items-center gap-0.5 text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  stat.isPositive
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                    : "bg-rose-50 text-rose-700 border border-rose-100"
                }`}
              >
                {stat.isPositive ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                {stat.isPositive ? "Naik" : "Turun"}
              </span>
            </div>

            <div className="mt-3 sm:mt-4">
              <p className="text-[11px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {stat.title}
              </p>
              <h3 className="text-lg sm:text-2xl font-black text-gray-900 mt-1 tracking-tight">
                {stat.value}
              </h3>
              <p
                className={`mt-1 text-[10px] sm:text-[11px] font-bold ${
                  stat.isPositive ? "text-emerald-600" : "text-rose-500"
                }`}
              >
                {stat.change}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
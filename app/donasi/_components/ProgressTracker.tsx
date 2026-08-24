// // "use client";

// // import { Loader2 } from "lucide-react";
// // import { FeaturedCampaign, formatRupiah, calcProgress } from "../types";

// // interface Props {
// //   campaign: FeaturedCampaign | null;
// //   isLoading: boolean;
// // }

// // export default function ProgressTracker({ campaign, isLoading }: Props) {
// //   if (isLoading) {
// //     return (
// //       <div className="pt-2 border-t border-gray-100 flex items-center justify-center gap-2 py-3 text-gray-400">
// //         <Loader2 className="h-4 w-4 animate-spin" />
// //         <span className="text-xs font-medium">Memuat progress donasi...</span>
// //       </div>
// //     );
// //   }

// //   if (!campaign) {
// //     return (
// //       <div className="pt-2 border-t border-gray-100 text-xs text-gray-400 font-medium py-2">
// //         Belum ada program donasi dengan target yang sedang berjalan.
// //       </div>
// //     );
// //   }

// //   const percentage = calcProgress(campaign.terkumpul, campaign.target);

// //   return (
// //     <div className="pt-2 border-t border-gray-100">
// //       <div className="flex items-center justify-between text-xs font-bold text-gray-900 mb-2">
// //         <span>{campaign.nama}</span>
// //         <span className="text-[#e76f3c] font-extrabold">{percentage}%</span>
// //       </div>

// //       <div className="relative h-2.5 w-full rounded-full bg-gray-100 overflow-hidden">
// //         <div
// //           className="h-full rounded-full bg-[#e76f3c] transition-all duration-500"
// //           style={{ width: `${percentage}%` }}
// //         />
// //       </div>

// //       <div className="mt-2 flex items-center justify-between text-[11px] font-semibold text-gray-500">
// //         <span>
// //           Terkumpul:{" "}
// //           <strong className="text-gray-900">
// //             {formatRupiah(campaign.terkumpul)}
// //           </strong>
// //         </span>
// //         <span>
// //           Target:{" "}
// //           <strong className="text-gray-900">
// //             {formatRupiah(campaign.target)}
// //           </strong>
// //         </span>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";

// import { FeaturedCampaign, formatRupiah, calcProgress } from "../types";

// interface Props {
//   campaign: FeaturedCampaign | null;
//   isLoading: boolean;
// }

// export default function ProgressTracker({ campaign, isLoading }: Props) {
//   if (isLoading) {
//     return (
//       <div className="pt-4 border-t border-gray-100 space-y-2.5 animate-pulse">
//         <div className="flex items-center justify-between">
//           <div className="h-3 w-32 rounded bg-gray-100" />
//           <div className="h-3 w-8 rounded bg-gray-100" />
//         </div>
//         <div className="h-2.5 w-full rounded-full bg-gray-100" />
//         <div className="flex items-center justify-between">
//           <div className="h-2.5 w-24 rounded bg-gray-100" />
//           <div className="h-2.5 w-24 rounded bg-gray-100" />
//         </div>
//       </div>
//     );
//   }

//   if (!campaign) {
//     return (
//       <div className="pt-4 border-t border-gray-100 text-xs text-gray-400 font-medium py-2">
//         Belum ada program donasi dengan target yang sedang berjalan.
//       </div>
//     );
//   }

//   const percentage = calcProgress(campaign.terkumpul, campaign.target);

//   return (
//     <div className="pt-4 border-t border-gray-100">
//       <div className="flex items-center justify-between text-xs font-bold text-gray-900 mb-2">
//         <span className="font-serif italic text-[13px] text-[#152e28]">
//           {campaign.nama}
//         </span>
//         <span className="text-[#b8905a] font-extrabold tabular-nums">
//           {percentage}%
//         </span>
//       </div>

//       <div className="relative h-2.5 w-full rounded-full bg-gray-100 overflow-hidden">
//         <div
//           className="h-full rounded-full bg-gradient-to-r from-[#152e28] to-[#b8905a] transition-all duration-700 ease-out"
//           style={{ width: `${percentage}%` }}
//         />
//       </div>

//       <div className="mt-2 flex items-center justify-between text-[11px] font-semibold text-gray-500">
//         <span>
//           Terkumpul:{" "}
//           <strong className="text-gray-900">
//             {formatRupiah(campaign.terkumpul)}
//           </strong>
//         </span>
//         <span>
//           Target:{" "}
//           <strong className="text-gray-900">
//             {formatRupiah(campaign.target)}
//           </strong>
//         </span>
//       </div>
//     </div>
//   );
// }
"use client";

import { FeaturedCampaign, formatRupiah, calcProgress } from "../types";

interface Props {
  campaign: FeaturedCampaign | null;
  isLoading: boolean;
}

export default function ProgressTracker({ campaign, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="pt-4 border-t border-gray-100 space-y-2.5 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="h-3 w-32 rounded bg-gray-100" />
          <div className="h-3 w-8 rounded bg-gray-100" />
        </div>
        <div className="h-2.5 w-full rounded-full bg-gray-100" />
        <div className="flex items-center justify-between">
          <div className="h-2.5 w-24 rounded bg-gray-100" />
          <div className="h-2.5 w-24 rounded bg-gray-100" />
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="pt-4 border-t border-gray-100 text-xs text-gray-400 font-medium py-2">
        Belum ada program donasi dengan target yang sedang berjalan.
      </div>
    );
  }

  const percentage = calcProgress(campaign.terkumpul, campaign.target);

  return (
    <div className="pt-4 border-t border-gray-100">
      <div className="flex items-center justify-between text-xs font-bold text-gray-900 mb-2">
        <span className="font-serif italic text-[13px] text-[#152e28]">
          {campaign.nama}
        </span>
        <span className="text-[#b8905a] font-extrabold tabular-nums">
          {percentage}%
        </span>
      </div>

      <div className="relative h-2.5 w-full rounded-full bg-gray-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#152e28] to-[#b8905a] transition-all duration-700 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="mt-2 flex items-center justify-between text-[11px] font-semibold text-gray-500">
        <span>
          Terkumpul:{" "}
          <strong className="text-gray-900">
            {formatRupiah(campaign.terkumpul)}
          </strong>
        </span>
        <span>
          Target:{" "}
          <strong className="text-gray-900">
            {formatRupiah(campaign.target)}
          </strong>
        </span>
      </div>
    </div>
  );
}
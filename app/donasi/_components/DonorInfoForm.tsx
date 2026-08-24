// "use client";

// import { DonorFormState } from "../types";

// interface Props {
//   formData: DonorFormState;
//   onChange: React.Dispatch<React.SetStateAction<DonorFormState>>;
// }

// export default function DonorInfoForm({ formData, onChange }: Props) {
//   return (
//     <div className="space-y-3">
//       <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider">
//         Informasi Donatur
//       </label>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//         <input
//           type="text"
//           placeholder="Nama Lengkap"
//           value={formData.nama}
//           onChange={(e) =>
//             onChange((prev) => ({ ...prev, nama: e.target.value }))
//           }
//           required
//           className="w-full rounded-xl bg-[#f8faf9] px-4 py-3 text-xs font-medium text-gray-800 border border-gray-200/80 outline-none focus:border-[#152e28] focus:bg-white focus:ring-2 focus:ring-[#152e28]/10 transition-all placeholder-gray-400"
//         />
//         <input
//           type="email"
//           placeholder="Alamat Email (opsional)"
//           value={formData.email}
//           onChange={(e) =>
//             onChange((prev) => ({ ...prev, email: e.target.value }))
//           }
//           className="w-full rounded-xl bg-[#f8faf9] px-4 py-3 text-xs font-medium text-gray-800 border border-gray-200/80 outline-none focus:border-[#152e28] focus:bg-white focus:ring-2 focus:ring-[#152e28]/10 transition-all placeholder-gray-400"
//         />
//       </div>

//       <textarea
//         rows={2}
//         placeholder="Pesan / Doa Harapan (Opsional)"
//         value={formData.pesan}
//         onChange={(e) =>
//           onChange((prev) => ({ ...prev, pesan: e.target.value }))
//         }
//         className="w-full rounded-xl bg-[#f8faf9] p-3.5 text-xs font-medium text-gray-800 border border-gray-200/80 outline-none focus:border-[#152e28] focus:bg-white focus:ring-2 focus:ring-[#152e28]/10 transition-all placeholder-gray-400 resize-none"
//       />
//     </div>
//   );
// }
"use client";

import { User, Mail, MessageCircle } from "lucide-react";
import { DonorFormState } from "../types";

interface Props {
  formData: DonorFormState;
  onChange: React.Dispatch<React.SetStateAction<DonorFormState>>;
}

export default function DonorInfoForm({ formData, onChange }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex items-baseline gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#b8905a]" />
        <label className="text-xs font-bold text-gray-900 uppercase tracking-[0.15em]">
          Informasi Donatur
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="relative">
          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Nama Lengkap"
            value={formData.nama}
            onChange={(e) =>
              onChange((prev) => ({ ...prev, nama: e.target.value }))
            }
            required
            className="w-full rounded-xl bg-[#f8faf9] pl-9 pr-4 py-3 text-xs font-medium text-gray-800 border border-gray-200/80 outline-none focus:border-[#152e28] focus:bg-white focus:ring-2 focus:ring-[#b8905a]/20 transition-all placeholder-gray-400"
          />
        </div>

        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
          <input
            type="email"
            placeholder="Alamat Email (opsional)"
            value={formData.email}
            onChange={(e) =>
              onChange((prev) => ({ ...prev, email: e.target.value }))
            }
            className="w-full rounded-xl bg-[#f8faf9] pl-9 pr-4 py-3 text-xs font-medium text-gray-800 border border-gray-200/80 outline-none focus:border-[#152e28] focus:bg-white focus:ring-2 focus:ring-[#b8905a]/20 transition-all placeholder-gray-400"
          />
        </div>
      </div>

      <div className="relative">
        <MessageCircle className="absolute left-3.5 top-3.5 h-3.5 w-3.5 text-gray-400" />
        <textarea
          rows={2}
          placeholder="Pesan / Doa Harapan (Opsional)"
          value={formData.pesan}
          onChange={(e) =>
            onChange((prev) => ({ ...prev, pesan: e.target.value }))
          }
          className="w-full rounded-xl bg-[#f8faf9] pl-9 pr-3.5 py-3.5 text-xs font-medium text-gray-800 border border-gray-200/80 outline-none focus:border-[#152e28] focus:bg-white focus:ring-2 focus:ring-[#b8905a]/20 transition-all placeholder-gray-400 resize-none"
        />
      </div>
    </div>
  );
}
// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   LayoutDashboard,
//   Users,
//   Calendar,
//   Wallet,
//   Settings,
//   BookOpen,
//   X,
//   HandCoins,
//   Images,
//   ChevronDown,
// } from "lucide-react";

// const menuGroups = [
//   {
//     label: "Data & Kegiatan",
//     items: [
//       { name: "Data Murid", href: "/admin/murid", icon: Users },
//       { name: "Tingkat Ngaji", href: "/admin/tingkat-ngaji", icon: BookOpen },
//       { name: "Jadwal Piket", href: "/admin/jadwal", icon: Calendar },
//     ],
//   },
//   {
//     label: "Keuangan",
//     items: [
//       { name: "Uang Kas", href: "/admin/kas", icon: Wallet },
//       { name: "Donasi", href: "/admin/donasi", icon: Wallet },
//     ],
//   },
//   {
//     label: "Konten Publik",
//     items: [
//       { name: "Program & Infaq", href: "/admin/program-infaq", icon: HandCoins },
//       { name: "Galeri Kegiatan", href: "/admin/galeri", icon: Images },
//     ],
//   },
//   {
//     label: "Sistem",
//     items: [
//       { name: "Pengaturan", href: "/admin/settings", icon: Settings },
//     ],
//   },
// ];

// interface SidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export default function Sidebar({ isOpen, onClose }: SidebarProps) {
//   const pathname = usePathname();

//   // Semua grup default terbuka
//   const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(
//     () => Object.fromEntries(menuGroups.map((g) => [g.label, true]))
//   );

//   const toggleGroup = (label: string) => {
//     setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));
//   };

//   const isDashboardActive = pathname === "/admin/dashboard";

//   return (
//     <>
//       {/* Mobile overlay */}
//       <div
//         onClick={onClose}
//         aria-hidden
//         className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px] lg:hidden transition-opacity duration-200 ${
//           isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
//         }`}
//       />

//       <aside
//         className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 lg:w-64 shrink-0 flex flex-col
//         text-white transition-transform duration-300 ease-out select-none
//         ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
//         style={{ background: "#14352c" }}
//       >
//         {/* Brand Header */}
//         <div
//           className="p-5 flex items-center justify-between shrink-0"
//           style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
//         >
//           <div className="flex items-center gap-3 min-w-0">
//             <img
//             src="/assets/logo.png"
//             alt="Logo Al-Inayah"
//             className="h-[40px] w-[40px] object-contain"
//           />
//             <div className="min-w-0">
//               <span className="font-bold text-base leading-tight tracking-tight block truncate">
//                 Admin Al-Inayah
//               </span>
//               <span className="text-[10px] text-emerald-100/60 truncate block">
//                 Kampung Panggang
//               </span>
//             </div>
//           </div>

//           <button
//             onClick={onClose}
//             className="lg:hidden p-1.5 rounded-lg text-emerald-100/70 hover:bg-white/10 hover:text-white transition-colors"
//             aria-label="Tutup menu"
//           >
//             <X className="h-5 w-5" />
//           </button>
//         </div>

//         {/* Standalone Dashboard Item (Di Luar Group) */}
//         <div className="px-3 pt-3 pb-1 shrink-0">
//           <Link
//             href="/admin/dashboard"
//             onClick={onClose}
//             className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200"
//             style={
//               isDashboardActive
//                 ? {
//                     background: "#c1663c",
//                     color: "#fff",
//                     boxShadow: "0 8px 18px -6px rgba(193,102,60,0.5)",
//                   }
//                 : { color: "rgba(209,231,222,0.85)" }
//             }
//             onMouseEnter={(e) => {
//               if (!isDashboardActive) {
//                 e.currentTarget.style.background = "rgba(255,255,255,0.08)";
//                 e.currentTarget.style.color = "#fff";
//               }
//             }}
//             onMouseLeave={(e) => {
//               if (!isDashboardActive) {
//                 e.currentTarget.style.background = "transparent";
//                 e.currentTarget.style.color = "rgba(209,231,222,0.85)";
//               }
//             }}
//           >
//             <LayoutDashboard className="h-4 w-4 shrink-0" />
//             <span>Dashboard</span>
//           </Link>
//         </div>

//         {/* Separator Line */}
//         <div className="mx-3 my-1 border-t border-white/[0.08]" />

//         {/* Grouped Navigation Links */}
//         <nav className="flex-1 p-3 pt-1 space-y-1 overflow-y-auto custom-sidebar-scrollbar">
//           {menuGroups.map((group) => {
//             const isGroupOpen = openGroups[group.label];

//             return (
//               <div key={group.label} className="pb-1">
//                 <button
//                   type="button"
//                   onClick={() => toggleGroup(group.label)}
//                   className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
//                   style={{ color: "rgba(209,231,222,0.4)" }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.color = "rgba(209,231,222,0.8)";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.color = "rgba(209,231,222,0.4)";
//                   }}
//                 >
//                   <span>{group.label}</span>
//                   <ChevronDown
//                     className={`h-3.5 w-3.5 transition-transform duration-200 ${
//                       isGroupOpen ? "rotate-0" : "-rotate-90"
//                     }`}
//                   />
//                 </button>

//                 <div
//                   className={`overflow-hidden transition-all duration-200 ease-out ${
//                     isGroupOpen ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"
//                   }`}
//                 >
//                   <div className="space-y-1">
//                     {group.items.map((item) => {
//                       const Icon = item.icon;
//                       const isActive =
//                         pathname === item.href || pathname.startsWith(item.href + "/");

//                       return (
//                         <Link
//                           key={item.href}
//                           href={item.href}
//                           onClick={onClose}
//                           className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200"
//                           style={
//                             isActive
//                               ? {
//                                   background: "#c1663c",
//                                   color: "#fff",
//                                   boxShadow: "0 8px 18px -6px rgba(193,102,60,0.5)",
//                                 }
//                               : { color: "rgba(209,231,222,0.7)" }
//                           }
//                           onMouseEnter={(e) => {
//                             if (!isActive) {
//                               e.currentTarget.style.background = "rgba(255,255,255,0.08)";
//                               e.currentTarget.style.color = "#fff";
//                             }
//                           }}
//                           onMouseLeave={(e) => {
//                             if (!isActive) {
//                               e.currentTarget.style.background = "transparent";
//                               e.currentTarget.style.color = "rgba(209,231,222,0.7)";
//                             }
//                           }}
//                         >
//                           <Icon className="h-4 w-4 shrink-0" />
//                           <span>{item.name}</span>
//                         </Link>
//                       );
//                     })}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </nav>

//         {/* Footer info */}
//         <div
//           className="p-4 text-[10px] shrink-0 text-center font-medium"
//           style={{
//             color: "rgba(209,231,222,0.4)",
//             borderTop: "1px solid rgba(255,255,255,0.08)",
//           }}
//         >
//           Majelis Al-Inayah &middot; Sistem Informasi
//         </div>
//       </aside>

//       {/* Style kustom untuk merampingkan Scrollbar */}
//       <style jsx global>{`
//         .custom-sidebar-scrollbar::-webkit-scrollbar {
//           width: 5px;
//         }
//         .custom-sidebar-scrollbar::-webkit-scrollbar-track {
//           background: transparent;
//         }
//         .custom-sidebar-scrollbar::-webkit-scrollbar-thumb {
//           background: rgba(255, 255, 255, 0.15);
//           border-radius: 10px;
//         }
//         .custom-sidebar-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: rgba(255, 255, 255, 0.3);
//         }
//         .custom-sidebar-scrollbar {
//           scrollbar-width: thin;
//           scrollbar-color: rgba(255, 255, 255, 0.15) transparent;
//         }
//       `}</style>
//     </>
//   );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Wallet,
  Settings,
  BookOpen,
  X,
  HandCoins,
  Images,
  ChevronDown,
} from "lucide-react";
import { AppRole, isPathAllowed } from "@/lib/access-control";

const menuGroups = [
  {
    label: "Data & Kegiatan",
    items: [
      { name: "Data Murid", href: "/admin/murid", icon: Users },
      { name: "Tingkat Ngaji", href: "/admin/tingkat-ngaji", icon: BookOpen },
      { name: "Jadwal Piket", href: "/admin/jadwal", icon: Calendar },
    ],
  },
  {
    label: "Keuangan",
    items: [
      { name: "Uang Kas", href: "/admin/kas", icon: Wallet },
      { name: "Donasi", href: "/admin/donasi", icon: Wallet },
    ],
  },
  {
    label: "Konten Publik",
    items: [
      { name: "Program & Infaq", href: "/admin/program-infaq", icon: HandCoins },
      { name: "Galeri Kegiatan", href: "/admin/galeri", icon: Images },
    ],
  },
  {
    label: "Sistem",
    items: [
      { name: "Pengaturan", href: "/admin/settings", icon: Settings },
    ],
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  role: AppRole;
}

export default function Sidebar({ isOpen, onClose, role }: SidebarProps) {
  const pathname = usePathname();

  // Saring menu: hanya tampilkan item & grup yang diizinkan untuk role ini
  const visibleGroups = menuGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => isPathAllowed(role, item.href)),
    }))
    .filter((group) => group.items.length > 0);

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(
    () => Object.fromEntries(visibleGroups.map((g) => [g.label, true]))
  );

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const isDashboardActive = pathname === "/admin/dashboard";

  return (
    <>
      {/* Mobile overlay */}
      <div
        onClick={onClose}
        aria-hidden
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px] lg:hidden transition-opacity duration-200 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 lg:w-64 shrink-0 flex flex-col
        text-white transition-transform duration-300 ease-out select-none
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        style={{ background: "#14352c" }}
      >
        {/* Brand Header */}
        <div
          className="p-5 flex items-center justify-between shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <img
              src="/assets/logo.png"
              alt="Logo Al-Inayah"
              className="h-[40px] w-[40px] object-contain"
            />
            <div className="min-w-0">
              <span className="font-bold text-base leading-tight tracking-tight block truncate">
                {role === "admin" ? "Admin Al-Inayah" : "Petugas Al-Inayah"}
              </span>
              <span className="text-[10px] text-emerald-100/60 truncate block">
                Kampung Panggang
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-emerald-100/70 hover:bg-white/10 hover:text-white transition-colors"
            aria-label="Tutup menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Standalone Dashboard Item (di luar group, selalu boleh diakses semua role) */}
        <div className="px-3 pt-3 pb-1 shrink-0">
          <Link
            href="/admin/dashboard"
            onClick={onClose}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200"
            style={
              isDashboardActive
                ? {
                    background: "#c1663c",
                    color: "#fff",
                    boxShadow: "0 8px 18px -6px rgba(193,102,60,0.5)",
                  }
                : { color: "rgba(209,231,222,0.85)" }
            }
            onMouseEnter={(e) => {
              if (!isDashboardActive) {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                e.currentTarget.style.color = "#fff";
              }
            }}
            onMouseLeave={(e) => {
              if (!isDashboardActive) {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "rgba(209,231,222,0.85)";
              }
            }}
          >
            <LayoutDashboard className="h-4 w-4 shrink-0" />
            <span>Dashboard</span>
          </Link>
        </div>

        {/* Separator Line */}
        <div className="mx-3 my-1 border-t border-white/[0.08]" />

        {/* Grouped Navigation Links (sudah difilter sesuai role) */}
        <nav className="flex-1 p-3 pt-1 space-y-1 overflow-y-auto custom-sidebar-scrollbar">
          {visibleGroups.map((group) => {
            const isGroupOpen = openGroups[group.label];

            return (
              <div key={group.label} className="pb-1">
                <button
                  type="button"
                  onClick={() => toggleGroup(group.label)}
                  className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  style={{ color: "rgba(209,231,222,0.4)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "rgba(209,231,222,0.8)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(209,231,222,0.4)";
                  }}
                >
                  <span>{group.label}</span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      isGroupOpen ? "rotate-0" : "-rotate-90"
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-200 ease-out ${
                    isGroupOpen ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const isActive =
                        pathname === item.href || pathname.startsWith(item.href + "/");

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={onClose}
                          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200"
                          style={
                            isActive
                              ? {
                                  background: "#c1663c",
                                  color: "#fff",
                                  boxShadow: "0 8px 18px -6px rgba(193,102,60,0.5)",
                                }
                              : { color: "rgba(209,231,222,0.7)" }
                          }
                          onMouseEnter={(e) => {
                            if (!isActive) {
                              e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                              e.currentTarget.style.color = "#fff";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isActive) {
                              e.currentTarget.style.background = "transparent";
                              e.currentTarget.style.color = "rgba(209,231,222,0.7)";
                            }
                          }}
                        >
                          <Icon className="h-4 w-4 shrink-0" />
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        {/* Footer info */}
        <div
          className="p-4 text-[10px] shrink-0 text-center font-medium"
          style={{
            color: "rgba(209,231,222,0.4)",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          Majelis Al-Inayah &middot; Sistem Informasi
        </div>
      </aside>

      <style jsx global>{`
        .custom-sidebar-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-sidebar-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-sidebar-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 10px;
        }
        .custom-sidebar-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        .custom-sidebar-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.15) transparent;
        }
      `}</style>
    </>
  );
}
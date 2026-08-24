"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function MainLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isHideNavbar = pathname === "/login" || pathname.startsWith("/admin");

  return (
    <>
      {!isHideNavbar && <Navbar />}
      {children}
    </>
  );
}
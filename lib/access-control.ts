export type AppRole = "admin" | "petugas";

export const ROLE_ALLOWED_PREFIXES: Record<AppRole, string[]> = {
  admin: ["/admin"],
  petugas: ["/admin/dashboard", "/admin/murid", "/admin/kas", "/admin/jadwal", "/admin/settings"],
};

export function isPathAllowed(role: AppRole, pathname: string): boolean {
  const allowed = ROLE_ALLOWED_PREFIXES[role] ?? [];
  return allowed.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + "/"),
  );
}

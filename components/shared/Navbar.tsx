"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  icon: string;
};

const navItems: NavItem[] = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/feed", label: "Feed", icon: "🌀" },
  { href: "/demo", label: "Profil", icon: "👤" },
  { href: "/blog", label: "Blog", icon: "📝" },
  { href: "/media", label: "Media", icon: "🎬" },
  { href: "/salons", label: "Salons", icon: "🎙️" },
  { href: "/news", label: "News", icon: "🗞️" },
];

function NavLink({ item, pathname, compact }: { item: NavItem; pathname: string; compact?: boolean }) {
  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

  return (
    <Link
      href={item.href}
      className={cn(
        "group relative flex min-h-11 min-w-11 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-ui text-sm uppercase tracking-[0.02em] text-text-primary outline-none transition-transform duration-200 ease-manga transition-opacity",
        "hover:scale-[1.02] hover:opacity-100 hover:shadow-manga-hover",
        "focus-visible:ring-2 focus-visible:ring-blood focus-visible:ring-offset-2 focus-visible:ring-offset-base",
        "active:scale-[0.97] active:opacity-90",
        isActive ? "border-blood/60 bg-blood/20 shadow-manga" : "opacity-90",
        compact ? "justify-center px-3" : "justify-start",
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <span className="text-xl leading-none">{item.icon}</span>
      {!compact && <span>{item.label}</span>}
      {isActive && <span className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-blood" />}
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-[84px] flex-col border-r border-white/10 bg-surface p-3 md:w-64 md:p-4">
      <div className="mb-8 px-2">
        <p className="hidden font-display text-4xl tracking-[-0.03em] text-text-primary md:block">MANGA</p>
        <p className="font-ui text-[10px] uppercase tracking-[0.08em] text-text-secondary md:text-xs">Super-App</p>
      </div>
      <nav className="flex flex-col gap-3">
        {navItems.map((item) => (
          <NavLink key={item.href} item={item} pathname={pathname} compact />
        ))}
      </nav>
    </aside>
  );
}

"use client";

import Link from "next/link";
import { useThemeMode } from "@/components/shared/ThemeProvider";

export function Topbar() {
  const { mode, toggleMode } = useThemeMode();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[rgba(8,8,14,0.82)] px-4 py-3 backdrop-blur-nav md:px-8">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <p className="font-ui text-xs uppercase tracking-[0.08em] text-text-secondary">Manga Super-App</p>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-ui text-[10px] uppercase tracking-[0.08em] text-gold">
            {mode === "night" ? "Mode Nuit" : "Mode Jour"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleMode}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 font-ui text-xs uppercase tracking-[0.08em] text-text-primary outline-none transition-transform duration-200 ease-manga transition-opacity hover:scale-[1.02] hover:opacity-100 focus-visible:ring-2 focus-visible:ring-blood focus-visible:ring-offset-2 focus-visible:ring-offset-base active:scale-[0.97] active:opacity-90"
          >
            {mode === "night" ? "Jour" : "Nuit"}
          </button>
          <Link
            href="/demo"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-blood px-4 py-2 font-ui text-xs uppercase tracking-[0.08em] text-white outline-none transition-transform duration-200 ease-manga transition-opacity hover:scale-[1.02] hover:opacity-100 focus-visible:ring-2 focus-visible:ring-blood focus-visible:ring-offset-2 focus-visible:ring-offset-base active:scale-[0.97] active:opacity-90"
          >
            Mon profil
          </Link>
        </div>
      </div>
    </header>
  );
}

import "./globals.css";
import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans, Noto_Serif_JP, Outfit, Plus_Jakarta_Sans } from "next/font/google";
import { Navbar } from "@/components/shared/Navbar";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { Topbar } from "@/components/shared/Topbar";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

const notoSerifJp = Noto_Serif_JP({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-noto-serif-jp",
});

const dmSans = DM_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

const outfit = Outfit({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Manga Super-App",
  description: "Super-app manga immersive Apple x Manga",
};

function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <body
        className={`${bebasNeue.variable} ${notoSerifJp.variable} ${dmSans.variable} ${plusJakartaSans.variable} ${outfit.variable} min-h-screen bg-base font-body text-text-primary antialiased`}
        style={{ backgroundColor: "#08080E" }}
      >
        <Providers>
          <div className="mx-auto flex min-h-screen w-full max-w-[1700px]">
            <Navbar />
            <main className="w-full pl-[84px] md:pl-64">
              <Topbar />
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./types/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#08080E",
        surface: "#111118",
        elevated: "#1A1A24",
        floating: "#22222E",
        overlay: "rgba(8, 8, 14, 0.8)",
        blood: "#E8002D",
        "blood-hover": "#FF1F47",
        ink: "#7C3AED",
        gold: "#F5A623",
        text: {
          primary: "#F0F0F5",
          secondary: "#8888A0",
        },
      },
      fontFamily: {
        display: ["var(--font-bebas-neue)", "var(--font-noto-serif-jp)", "serif"],
        body: ["var(--font-dm-sans)", "var(--font-plus-jakarta-sans)", "sans-serif"],
        ui: ["var(--font-outfit)", "sans-serif"],
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
        "3xl": "64px",
        "card-pad": "16px",
        section: "32px",
        "card-gap": "12px",
      },
      boxShadow: {
        manga:
          "0 1px 2px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.3), 0 20px 40px rgba(0,0,0,0.2), inset 0 0 0 0.5px rgba(255,255,255,0.06)",
        "manga-hover":
          "0 2px 4px rgba(0,0,0,0.45), 0 8px 18px rgba(0,0,0,0.35), 0 28px 56px rgba(0,0,0,0.28), inset 0 0 0 0.5px rgba(255,255,255,0.08)",
      },
      borderRadius: {
        card: "16px",
      },
      backdropBlur: {
        nav: "20px",
      },
      transitionTimingFunction: {
        manga: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;

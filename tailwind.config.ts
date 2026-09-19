import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#F2F8F4",
          secondary: "#E6F2EA",
          card: "rgba(255,255,255,0.95)",
        },
        cyan: {
          glow: "#059669",
          500: "#059669",
          400: "#10B981",
        },
        violet: {
          glow: "#10B981",
          500: "#059669",
          600: "#047857",
        },
        gold: {
          glow: "#10B981",
          500: "#059669",
          400: "#34D399",
        },
        champagne: {
          DEFAULT: "#10B981",
          light: "#F2F8F4",
          dark: "#047857",
        },
        royal: {
          light: "#F2F8F4",
          cream: "#E6F2EA",
          sand: "#D8ECE0",
          gold: "#059669",
          orange: "#10B981",
          dark: "#0D2016",
          charcoal: "#162B20",
          muted: "#2D4F3C",
        },
        obsidian: "#0D2016",
        charcoal: "#162B20",
        graphite: "#2D4F3C",
        ivory: "#F2F8F4",
        platinum: "#FFFFFF",
        resort: {
          teal: "#059669",
          gold: "#10B981",
          cream: "#F2F8F4",
          navy: "#0D2016",
          deep: "#162B20",
          stone: "#E6F2EA",
          amber: "#34D399",
          muted: "#2D4F3C",
        },
        cappa: {
          taupe: "#F2F8F4",
          deep: "#E6F2EA",
          stone: "#D8ECE0",
          gold: "#059669",
          amber: "#10B981",
          cream: "#F2F8F4",
          muted: "#2D4F3C",
        },
        skyx: {
          cyan: "#059669",
          violet: "#10B981",
          gold: "#047857",
          dark: "#0D2016",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "sans-serif"],
        serif: ["'Cormorant Garamond'", "Cinzel", "Georgia", "serif"],
        cinzel: ["Cinzel", "'Cormorant Garamond'", "serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 10s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
        "spin-slow": "spin 20s linear infinite",
        "glow": "glow 3s ease-in-out infinite alternate",
        "gradient": "gradient 8s ease infinite",
        "slide-up": "slideUp 0.8s ease forwards",
        "fade-in": "fadeIn 0.6s ease forwards",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { opacity: "0.4" },
          "100%": { opacity: "0.9" },
        },
        gradient: {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

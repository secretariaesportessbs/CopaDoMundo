import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pitch: {
          950: "#0c0a07",
          900: "#14100b",
          800: "#1d1810",
        },
        gold: {
          300: "#f3d489",
          400: "#e8b64c",
          500: "#c99a35",
          700: "#8a7a5c",
        },
        loser: "#4a4238",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      boxShadow: {
        node: "0 0 0 2px rgba(232,182,76,0.35), 0 4px 14px rgba(0,0,0,0.6)",
        tooltip: "0 12px 40px rgba(0,0,0,0.7)",
      },
    },
  },
  plugins: [],
};

export default config;

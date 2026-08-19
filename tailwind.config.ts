import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          950: "#022c1e",
        },
        earth: {
          50: "#faf7f2",
          100: "#f3ece1",
          200: "#e6d7c3",
          300: "#d3b98f",
          400: "#bd9862",
          500: "#a67c47",
          600: "#8a6338",
          700: "#6f4e2e",
          800: "#5a4028",
          900: "#4a3522",
        },
        cream: "#fdfbf7",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 8px rgba(20, 40, 30, 0.06), 0 1px 2px rgba(20, 40, 30, 0.08)",
        "card-hover": "0 12px 24px rgba(20, 40, 30, 0.12), 0 4px 8px rgba(20, 40, 30, 0.08)",
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

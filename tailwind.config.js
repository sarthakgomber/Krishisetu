/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        soil: {
          50:  "#fdf8f0",
          100: "#f9eedb",
          200: "#f2d9b1",
          300: "#e8be7e",
          400: "#dc9f4a",
          500: "#d08a2e",
          600: "#b87025",
          700: "#9a5620",
          800: "#7d4520",
          900: "#673a1e",
        },
        leaf: {
          50:  "#f2f9f2",
          100: "#e0f2e0",
          200: "#bfe4be",
          300: "#91cf8f",
          400: "#5bb558",
          500: "#389836",
          600: "#2a7b28",
          700: "#246122",
          800: "#214e20",
          900: "#1d411c",
        },
        cream: "#fdf6ec",
        earth: "#2c1810",
      },
      fontFamily: {
        display: ["'Playfair Display'", "Georgia", "serif"],
        body:    ["'DM Sans'", "sans-serif"],
      },
      boxShadow: {
        "warm-sm": "0 1px 3px 0 rgba(44,24,16,0.12)",
        "warm":    "0 4px 12px 0 rgba(44,24,16,0.10)",
        "warm-lg": "0 10px 30px 0 rgba(44,24,16,0.12)",
      },
    },
  },
  plugins: [],
};
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fdf6ec", 100: "#f9e9cd", 200: "#f2d295",
          300: "#e8b45c", 400: "#df9a34", 500: "#c9a24b",
          600: "#a67f2e", 700: "#856327", 800: "#6e5025",
          900: "#5e4223", 950: "#332110"
        },
        ink: "#1a1a2e"
      },
      fontFamily: {
        serif: ["Georgia", "'Times New Roman'", "serif"],
        sans: ["system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
export default config;

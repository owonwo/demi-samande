import defaultTheme from "tailwindcss/defaultTheme";
import { getColors } from "theme-colors";

const redPalette = getColors("#E54244");
const blueColors = getColors("#002480");
const secondaryColors = getColors("#afd8ff");
const accentColors = getColors("#ffd160");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,astro}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)", ...defaultTheme.fontFamily.serif],
        body: ["var(--font-body)", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        base: redPalette,
        dm: {
          border: "#E6E6E6",
          background: "#FAFAFA",
        },
        base_2: blueColors,
        // base_2: {
        //   50: "#f1f6ff",
        //   100: "#e6efff",
        //   200: "#d1e2ff",
        //   300: "#abc5ff",
        //   400: "#7c9fff",
        //   500: "#476eff",
        //   600: "#2245ff",
        //   700: "#1032f1",
        //   800: "#0d29ca",
        //   900: "#0d24a5",
        //   950: "#041664",
        // },
        secondary: secondaryColors,
        //     {
        //   50: "#fffbeb",
        //   100: "#fdf1c8",
        //   200: "#fbe28c",
        //   300: "#f9cd50",
        //   400: "#f8bf3c",
        //   500: "#f1980f",
        //   600: "#d5720a",
        //   700: "#b14f0c",
        //   800: "#903e10",
        //   900: "#763411",
        //   950: "#441804",
        // },
        secondary_2: secondaryColors,
        accent: accentColors,
        warning: {
          secondary: "#F79009",
        },
        neutral: {
          700: "#414651",
        },
      },
    },
  },
  plugins: [],
};

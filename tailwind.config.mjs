import defaultTheme from "tailwindcss/defaultTheme";
import { getColors } from "theme-colors";

const values = getColors("#5942ED");

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
        base: values,
      },
    },
  },
  plugins: [],
};

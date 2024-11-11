import { getColors } from "theme-colors";

const values = getColors("#5942ED");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,.astro}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Figtree", "sans-serif"],
        heading: ["Libre Caslon Text", "sans-serif"],
      },
      colors: {
        base: values,
      },
    },
  },
  plugins: [],
};

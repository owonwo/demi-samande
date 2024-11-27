import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
// @ts-check
import { defineConfig } from "astro/config";
import svgr from "vite-plugin-svgr";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react({
      include: ["./src/components/**/*.tsx"],
    }),
    tailwind({
      nesting: true,
    }),
  ],
  output: "server",
  adapter: vercel(),
  vite: {
    plugins: [
      svgr({
        include: "**/*.svg?react",
      }),
    ],
  },
});

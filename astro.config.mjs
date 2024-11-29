import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import { imageService } from "@unpic/astro/service";
// @ts-check
import { defineConfig } from "astro/config";
import svgr from "vite-plugin-svgr";

// https://astro.build/config
export default defineConfig({
  site: "https://demisamande.com",
  integrations: [
    react({
      include: ["./src/components/**/*.tsx"],
    }),
    tailwind({
      nesting: true,
    }),
    sitemap(),
  ],
  image: {
    service: imageService(),
  },
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

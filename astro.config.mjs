import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://longkh.dev",
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
});

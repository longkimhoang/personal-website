import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://longkh.dev",
  integrations: [tailwind(), preact()],
  output: "hybrid",
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
});

import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Provisional URL until the Vercel project name is confirmed.
  // It is the single source of truth for canonical URLs and the sitemap.
  site: 'https://marisapena.vercel.app',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
});

import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Vercel project name: marisa-portfolio. This is the single source of truth
  // for canonical URLs and the sitemap, and must match public/robots.txt.
  site: 'https://marisa-portfolio.vercel.app',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
});

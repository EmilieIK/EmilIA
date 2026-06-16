// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Site de projet GitHub Pages : servi sur https://emilieik.github.io/EmilIA/
export default defineConfig({
  site: 'https://emilieik.github.io',
  base: '/EmilIA',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
});

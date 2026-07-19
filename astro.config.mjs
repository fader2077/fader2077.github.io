import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://fader2077.github.io',
  integrations: [sitemap()],
  output: 'static',
  build: { format: 'preserve' },
});

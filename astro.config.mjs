// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  // Use server mode for API routes with Netlify adapter
  output: 'server',
  adapter: netlify(),
  build: {
    format: 'directory'
  }
});

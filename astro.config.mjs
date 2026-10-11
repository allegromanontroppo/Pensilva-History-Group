import { defineConfig } from 'astro/config';

export default defineConfig({
  srcDir: './astro-src',
  publicDir: './static',
  output: 'static',
  site: 'https://pensilva-history-group.netlify.app',
  trailingSlash: 'always',
});

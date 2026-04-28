import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://ram-cheatsheet.dev',
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    ssr: {
      noExternal: [],
    },
  },
});

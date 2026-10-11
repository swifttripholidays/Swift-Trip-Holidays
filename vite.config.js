import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  appType: 'spa',
  // This project uses plain CSS (no Tailwind directives). Define PostCSS
  // inline so Vite does not inherit an unrelated D:\\postcss.config.mjs
  // from a parent directory that requires @tailwindcss/postcss.
  css: {
    postcss: {
      plugins: [],
    },
  },
});

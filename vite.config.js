import { defineConfig } from 'vite';
import { resolve } from 'path';

/**
 * Vite Configuration — RDP-UI Design System
 *
 * Digunakan sebagai CSS/JS bundler untuk menghasilkan
 * file distribusi yang siap di-deploy ke CDN.
 *
 * Output:
 *   dist/
 *     assets/
 *       rdp.css            — Full CSS bundle
 *       rdp.js             — Minimal JS interactions
 *       themes/
 *         green.css        — Green color theme
 *         amber.css        — Amber color theme
 *       fonts/             — RDP Font files (woff2)
 */
export default defineConfig({
  root: '.',
  publicDir: 'public',

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,

    rollupOptions: {
      input: {
        rdp: resolve(__dirname, 'index.html'),
        'examples/layouts-blank': resolve(__dirname, 'examples/layouts-blank.html'),
        'examples/layouts-homepage': resolve(__dirname, 'examples/layouts-homepage.html'),
        'examples/layouts-dashboard': resolve(__dirname, 'examples/layouts-dashboard.html'),
        'themes/green': resolve(__dirname, 'src/themes/colors/green.css'),
        'themes/amber': resolve(__dirname, 'src/themes/colors/amber.css'),
      },

      output: {
        /* ─── CSS ─────────────────────────────────────────── */
        // Nama CSS diperlakukan via assetFileNames
        assetFileNames: (assetInfo) => {
          // Font files → subfolder fonts/
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return 'assets/fonts/[name][extname]';
          }
          // Theme files sudah dihandle via chunkFileNames/entryFileNames
          // CSS utama → rdp.css (tanpa hash)
          if (assetInfo.name === 'rdp.css' || assetInfo.name?.endsWith('.css')) {
            // Theme variants
            return 'assets/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },

        /* ─── JS ──────────────────────────────────────────── */
        // Entry point JS → rdp.js (tanpa hash, untuk CDN stabil)
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'rdp') {
            return 'assets/rdp.js';
          }
          return 'assets/[name]-[hash].js';
        },

        chunkFileNames: 'assets/[name]-[hash].js',
      },
    },

    /* Peringatan jika chunk JS > 50KB (sesuai PRD target) */
    chunkSizeWarningLimit: 50,
  },

  css: {
    devSourcemap: true,
  },

  server: {
    port: 3000,
    open: true,
  },
});

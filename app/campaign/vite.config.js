import { defineConfig } from 'vite';
import postcss from './postcss.config.js';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// import { viteMockServe } from 'vite-plugin-mock';
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5185,
  },
  define: {
    'process.env': process.env,
  },
  css: {
    postcss,
  },
  plugins: [svgr(), react()],
  optimizeDeps: {
    exclude: [
      '@tbook/hooks',
      '@tbook/share',
      '@tbook/store',
      '@tbook/ui',
      '@tbook/utils',
    ],
  },
  resolve: {
    alias: [
      {
        find: /^~.+/,
        replacement: (val) => {
          return val.replace(/^~/, '');
        },
      },
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      manualChunks: {
        verdor: ['lodash', 'antd', '@twa-dev/sdk'],
        lib: ['react', 'react-dom', 'react-router-dom'],
      },
    },
  },
});

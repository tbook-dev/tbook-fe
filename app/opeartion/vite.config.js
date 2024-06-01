import { defineConfig } from 'vite';
import postcss from './postcss.config.js';
import react from '@vitejs/plugin-react';
import markdownRawPlugin from 'vite-raw-plugin';
// const markdownRawPlugin = require('vite-raw-plugin')
// import { viteMockServe } from 'vite-plugin-mock';
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5195,
  },
  define: {
    'process.env': process.env,
  },
  css: {
    postcss,
  },
  plugins: [
    react(),
    markdownRawPlugin({
      fileRegex: /\.md$/,
    }),
  ],
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
  },
});

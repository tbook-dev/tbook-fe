import { defineConfig } from 'vite';
import postcss from './postcss.config.js';
import react from '@vitejs/plugin-react';

const path = require('path');
// https://vitejs.dev/config/
const isLocalDev = process.env.NODE_ENV === 'development';

export default defineConfig(() => {
  const conf = {
    server: {
      port: 5185,
    },
    define: {
      'process.env': process.env,
    },
    css: {
      postcss,
    },
    plugins: [react()],
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
  };
  if (!isLocalDev) {
    conf.build.rollupOptions = {
      manualChunks: {
        verdor: ['lodash', 'antd'],
        lib: ['react', 'react-dom', 'react-router-dom'],
      },
    };
  }

  return conf;
});

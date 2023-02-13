import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
const defaultConfig = {
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.js',
  },
};

export default defineConfig(({ command, mode }) => {
  if (command === 'serve') {
    const isDev = mode === 'development';
    return {
      ...defaultConfig,
      server: {
        proxy: {
          '/api': {
            target: isDev
              ? 'http://localhost:3001'
              : 'https://watchlist-6wzf.onrender.com',
          },
        },
      },
    };
  } else {
    return defaultConfig;
  }
});

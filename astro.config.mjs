import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import compression from 'astro-compression';

export default defineConfig({
  // Integrations
  integrations: [
    react({
      experimentalReactChildren: true,
    }),
    compression({
      gzip: true,
      brotli: true,
    }),
  ],

  // Output configuration
  output: 'server',

  // Server rendering configuration
  ssr: {
    noExternal: [],
  },

  // Image optimization
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: 16000 * 16000,
      },
    },
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.example.com',
      },
    ],
  },

  // Vite configuration
  vite: {
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: false,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
          },
        },
      },
    },
    ssr: {
      noExternal: ['react', 'react-dom'],
    },
  },

  // Markdown configuration
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'github-dark',
      langs: [],
      wrap: true,
    },
  },

  // Prefetch configuration
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'tap',
  },

  // Security headers
  security: {
    checkOrigin: true,
  },

  // Build configuration
  build: {
    assets: '_astro',
    format: 'directory',
  },

  // Development server
  server: {
    port: 3000,
    host: true,
  },

  // Redirect configuration
  redirects: {
    '/old-page': '/new-page',
  },

  // Experimental features
  experimental: {
    clientPrerender: true,
    globalRoutePriority: true,
  },
});

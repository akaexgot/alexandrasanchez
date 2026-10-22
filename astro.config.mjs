import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV || 'production', process.cwd(), 'PUBLIC_');
const site = process.env.PUBLIC_SITE_URL || env.PUBLIC_SITE_URL;
const allowedOrigins = site ? [new URL(site)] : [new URL('http://localhost:4321'), new URL('http://127.0.0.1:4321')];

export default defineConfig({
  output: 'server',
  devToolbar: { enabled: false },
  adapter: node({ mode: 'standalone' }),
  vite: { plugins: [tailwindcss()] },
  security: { checkOrigin: true, allowedDomains: allowedOrigins.map(url => ({ hostname: url.hostname, protocol: url.protocol.slice(0, -1), port: url.port })) },
});

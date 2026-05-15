// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import react from '@astrojs/react'

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://prats.blog',
  output: 'static',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react()],
  adapter: cloudflare(),
})
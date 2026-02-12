// @ts-check
// Force restart
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
    site: 'https://arielassaf.github.io',
    base: '/hadash/',
    trailingSlash: 'ignore',
    integrations: [tailwind()],
});

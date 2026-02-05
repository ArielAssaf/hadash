import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                hadashRed: '#E2343A',
                hadashGreen: '#072213',
                hadashBg: '#F4F0EE',
            },
            fontFamily: {
                sans: ['Assistant', 'Inter', 'sans-serif'],
                heading: ['IBM Plex Sans Arabic', 'Outfit', 'sans-serif'],
            },
        },
    },
    plugins: [
        typography,
    ],
}

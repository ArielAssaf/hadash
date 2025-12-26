/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				"primary": "#E31B23",
				"primary-dark": "#bf151c",
				"background-light": "#ffffff",
				"background-dark": "#1a1a1a",
				"text-main": "#111111",
				"text-muted": "#555555",
			},
			fontFamily: {
				"display": ["Rubik", "sans-serif"],
				"sans": ["Rubik", "sans-serif"]
			},
			borderRadius: {
				"DEFAULT": "0.5rem",
				"lg": "0.75rem",
				"xl": "1rem",
				"full": "9999px"
			},
			backgroundImage: {
				'hero-pattern': "linear-gradient(to right bottom, rgba(0, 0, 0, 0.8), rgba(227, 27, 35, 0.4))",
			}
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
	],
}


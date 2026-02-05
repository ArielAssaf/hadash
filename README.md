# Hadash Website - Simplified Static Site

This is a simplified, pure static Astro site for the **Democratic Front for Peace and Equality (Hadash)**. 

It replaces the previous complex setup (Payload CMS, Next.js, Postgres) with a maintainable, AI-friendly, and secure static architecture.

## 🚀 Key Features

- **Pure Static**: No database or server-side CMS required.
- **Multilingual Support**: Content served in Hebrew, Arabic, Russian, and English.
- **RTL Integrity**: Automatic RTL mirroring for Hebrew and Arabic using CSS logical properties and dynamic `dir` attributes.
- **Content Collections**: Type-safe content management using Markdown files in `src/content/`.
- **Modern Tech Stack**: Astro 5, Tailwind CSS, Google Fonts (Inter, Outfit), Material Symbols.

## 📁 Content Management

All content is managed directly in the `src/content/` directory:

- **Pages**: `src/content/pages/[lang]/[slug].md`
- **News**: `src/content/news/[lang]/[slug].md`

To add a new page or article, simply create a new Markdown file in the appropriate locale folder.

### Configuration

- **Navigation**: Managed in `src/data/navigation.json`.
- **Site Settings**: Managed in `src/data/site-settings.json`.

## 🛠️ Development

### Setup

```bash
npm install
```

### Dev Server

```bash
npm run dev
```

### Build

```bash
npm run build
```

The output will be in the `dist/` folder, ready for deployment to GitHub Pages or any static hosting.

## 🏗️ Architecture

- **`src/layouts/BaseLayout.astro`**: Main layout handling HTML structure, fonts, and RTL support.
- **`src/pages/[...slug].astro`**: Dynamic route handler that maps content files to URLs.
- **`src/components/`**: Reusable UI components (Navigation, Footer, PlatformAccordion, etc.).

## 🧹 Maintenance

This project follows a "Clean Slate" approach. Avoid adding server-side dependencies or complex build scripts. Keep the content organization flat and simple for easy editing by humans and AI agents.

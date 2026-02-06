# Hadash Website - Modern Static Platform

This is the official static website for the **Democratic Front for Peace and Equality (Hadash)**, built with Astro.

It replaces previous complex architectures with a high-performance, accessible, and easily maintainable static site that strictly adheres to Hadash's brand identity.

## 🚀 Key Features

- **Pure Static Architecture**: Zero server-side dependencies. Fast, secure, and hosting-agnostic.
- **Unified Routing**: A single dynamic handler (`[...slug].astro`) manages *all* pages, news, and localized routes, greatly simplifying the codebase.
- **Multilingual & RTL**: Native support for Hebrew (RTL), Arabic (RTL), English (LTR), and Russian (LTR) with automatic layout flipping.
- **Type-Safe Content**: Built on Astro Content Collections for robust data validation.

## 🎨 Design System

The site implements the official **Hadash Branding 2.0**:

- **Primary Colors**:
  - 🔴 **Hadash Red**: `#E2343A` (Navigation, Buttons, Highlights)
  - 🟢 **Hadash Green**: `#072213` (Footer, Hero Backgrounds)
  - ⚪ **Background**: `#F4F0EE` (Warm Light Gray)
- **Typography**:
  - **Headings**: `IBM Plex Sans Arabic` (Bold, Modern)
  - **Body**: `Assistant` (Clean, Readable)
- **UI Components**:
  - **Glassmorphic Navigation**: Solid branded header with white text.
  - **Pill Buttons**: Rounded interactive elements using the primary red.
  - **Card System**: Consistent rounded (`rounded-[2rem]`) cards with soft shadows.

## 📁 Content Structure

All content is managed via Markdown in `src/content/`:

- **Pages**: `src/content/pages/[lang]/[slug].md` (e.g., `vision`, `about`)
- **News**: `src/content/news/[lang]/[slug].md` (News articles)
- **Navigation**: `src/data/navigation.json` (Menu structures per language)

### adding Content
To add a new article, simply place a new `.md` file in the appropriate language folder. The Unified Router will automatically generate the page at `/hadash/[lang]/news/[slug]`.

## 🛠️ Development

### Prerequisites
- Node.js v18+

### Quick Start
```bash
# Install dependencies
npm install

# Start local dev server
npm run dev
```

### Build for Production
```bash
npm run build
```
The output will be generated in `dist/`.

## 🏗️ Architecture Overview

| File/Directory | Purpose |
| :--- | :--- |
| `src/pages/[...slug].astro` | **The Core Engine**. Handles routing for *every* page type (Home, News, Content). |
| `src/layouts/BaseLayout.astro` | Global shell, `<head>` management, fonts, and RTL/LTR logic. |
| `src/components/Navigation.astro` | Responsive, localized navigation bar with brand styling. |
| `src/content/` | The "Database". All text and metadata lives here. |

## 🧹 Maintenance Rules

1. **Keep it Static**: Do not introduce server-side logic (Node.js/PHP) unless strictly necessary for a build step.
2. **Use the Router**: Do not create manual `.astro` files for new pages. Use the Content Collections and `[...slug].astro`.
3. **Respect the Brand**: Always use the defined Hex codes for Red and Green. Do not use generic Tailwind colors (e.g., `bg-red-500`).

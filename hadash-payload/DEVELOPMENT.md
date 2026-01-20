# Hadash Platform Development Guide

This document provides a comprehensive overview of the Hadash website architecture, technology stack, and development workflows.

## 🏗 Project Structure

This project is a monorepo managed with **NPM Workspaces**.

- `apps/cms`: The backend powered by **Payload CMS 3.0** (built on Next.js 15).
- `apps/web`: The frontend powered by **Astro**.
- `scripts/`: Maintenance and data seeding scripts.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v20 or higher)
- Personal Vercel account with Postgres (Neon) and Blob storage enabled (for local env vars).

### Installation
```bash
npm install
```

### Running Locally
To run both the CMS and the Frontend simultaneously:
```bash
npm run dev
```

- **Frontend:** [http://localhost:4321](http://localhost:4321)
- **CMS Admin:** [http://localhost:3000/admin](http://localhost:3000/admin)
- **CMS API:** [http://localhost:3000/api](http://localhost:3000/api)

---

## 🛠 Technology Stack

### Backend (apps/cms)
- **Framework:** Payload CMS 3.0 (Next.js)
- **Database:** Vercel Postgres / Neon (Drizzle adapter)
- **Storage:** Vercel Blob (for media)
- **Editor:** Lexical Editor
- **Features:** 
  - Multi-locale support (en, he, ru).
  - Dynamic page building using "Blocks".
  - Automatic TypeScript type generation.

### Frontend (apps/web)
- **Framework:** Astro
- **Styling:** Tailwind CSS / Vanilla CSS
- **Data Fetching:** Native fetch to Payload API (SSR).
- **Features:**
  - Content-driven architecture.
  - Automatic language routing (`/[lang]/...`).
  - Shared society design aesthetics.

---

## 🌍 Localization (i18n)

The site supports **English (default)**, **Hebrew (RTL)**, and **Russian**.

- **CMS Side:** All fields marked with `localized: true` can be edited per locale.
- **Frontend Side:** Routing is handled via `[lang]` folders. English is served from the root (e.g., `/platform`) while others use prefixes (e.g., `/ru/platform`).
- **Translation Config:** See `apps/web/src/utils/i18n.ts` for static UI strings.

---

## 🧪 Maintenance & Seeding

Legacy and utility scripts are stored in `scripts/archive/`.

### Seeding Data
If the database needs to be reset or populated from scratch, use the seeding script:
```bash
# Temporarily set 'update: () => true' in apps/cms/src/collections/Pages.ts
node scripts/archive/seed-i18n.js
# REVERT the access change after seeding!
```

**Available Archive Scripts:**
- `seed-i18n.js`: The most up-to-date script for localized content and fixed routing.
- `seed-content.js`: Original Hebrew content seed.
- `fix-social-links.js`: Utility to fix global site settings.

---

## 📦 Deployment

The project is designed to be deployed on **Vercel**.

1. Connect the repository to Vercel.
2. Vercel will automatically detect the monorepo and run the builds.
3. Ensure the `PAYLOAD_SECRET`, `POSTGRES_URL`, and `BLOB_READ_WRITE_TOKEN` environment variables are configured.

---

## 💡 Key Workflows for Developers

### Creating a New Block
1. Define the block schema in `apps/cms/src/blocks/`.
2. Register the block in `apps/cms/src/collections/Pages.ts`.
3. Generate new types: `npm run generate:types --workspace=apps/cms`.
4. Create the corresponding Astro component in `apps/web/src/components/payload/`.
5. Add the component to `apps/web/src/components/payload/BlockRenderer.astro`.

### Updating Navigation
Navigation is a **Global** in Payload. Edit it via the Admin Panel under "Globals" -> "Navigation". This will update the header and footer links across all locales.

---

## ✨ Live Preview

The site supports real-time editing previews for **Pages** and **Posts**.

- **CMS Configuration:** Located in `apps/cms/src/payload.config.ts` under `admin.livePreview`.
- **Frontend Implementation:** Managed in `apps/web/src/layouts/BaseLayout.astro` using a client-side subscription to Payload's update messages.
- **Workflow:** When editing a page in the Payload Admin Panel, click the "Live Preview" tab (top right) to see changes instantly applied to the Astro frontend without a manual refresh.

---

*Last Updated: December 2025*

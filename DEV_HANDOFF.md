# Developer Handoff: Platform Page & Multilingual Support

This document summarizes the changes made to the Hadash project to implement the Platform (Constitution) page and full Arabic language support.

## 🚀 Current Project State

1.  **Content**: The "Platform/Constitution" page is fully populated in the Payload CMS for both **Hebrew (`he`)** and **Arabic (`ar`)**.
2.  **Multilingual Support**: The website now supports the Arabic locale. The language switcher in the header includes **AR**, **HE**, **RU**, and **EN**.
3.  **Deployment**: The static site has been built and pushed to the `gh-pages` branch. Base path issues for GitHub Pages have been resolved.

---

## 🛠 Key Components & Files

### 1. New Content Extraction
*   **Source**: CLEAN text was extracted from the provided DOCX files using a custom Python script.
*   **File**: `extract_docx_simple.py`
*   **Output**: `extracted_docx_content.txt` (used to build the seed script).

### 2. Maintenance Scripts (Payload CMS)
These scripts are located in `hadash-payload/apps/cms/scripts/maintenance/`:
*   `seed-platform-page.ts`: Programmatically creates/updates the Platform page with all accordion sections.
*   `verify-platform-page.ts`: Checks the database to ensure both locales have the correct number of sections and valid content.
*   `update-index-hero.ts`: (In progress) Utility to update the homepage Hero buttons to link to the new Platform pages.

**To run any script:**
```powershell
cd hadash-payload
npx tsx apps/cms/scripts/maintenance/<script-name>.ts
```

### 3. Code Changes (Astro Web App)
*   **`astro.config.mjs`**: Added `base: '/hadash/'` to ensure assets (CSS/JS) load correctly on GitHub Pages.
*   **`src/utils/i18n.ts`**: Included `ar` in the locales list and added translations for all UI labels.
*   **`src/layouts/BaseLayout.astro`**: Added the **AR** button to the language switcher.
*   **`src/pages/[...slug].astro`**: Updated the static path generator to include the `ar` locale.
*   **`Hero.ts` (CMS Block)**: Updated the schema to allow adding `link` targets to Hero buttons.

---

## 📝 CMS Instructions

### Editing the Platform Page
1.  Navigate to the [Payload Admin](http://localhost:3000/admin).
2.  Go to `Collections > Pages` and find the page with the slug `platform`.
3.  Use the **Language Toggle** in the sidebar to switch between Hebrew and Arabic.
4.  The content is contained within **Platform Accordion** blocks. Each section has a title, icon, and main content area.

---

## 🚢 Deployment (GitHub Pages)

The repository is currently set up with a GitHub Action that builds from `main`. However, because the Action does not have access to your local Payload database, it may produce empty pages.

**Recommended Setup for Current Workflow:**
1.  Go to **GitHub Repository Settings > Pages**.
2.  Under **Build and deployment > Source**, change from "GitHub Actions" to **"Deploy from a branch"**.
3.  Select the **`gh-pages`** branch and the `/` (root) folder.
4.  Click **Save**.

This will make the site live instantly at:
*   Hebrew: `https://arielassaf.github.io/hadash/he/platform/`
*   Arabic: `https://arielassaf.github.io/hadash/ar/platform/`

---

## 🧹 Cleanup
You can safely delete the following temporary extraction files if no longer needed:
*   `extract_pdf_pypdf.py`
*   `extract_pdf_miner.py`
*   `extracted_content.txt`
*   `extracted_content_reversed.txt`
*   `reverse_text.py`

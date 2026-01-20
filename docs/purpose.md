# Purpose and Functionality

## What this app does
Hadash is a multi-locale content site powered by Payload CMS and rendered by an Astro frontend.

## Who it serves
- Public visitors reading news and pages in multiple languages.
- Editors managing content through the CMS admin.

## Core features
- Payload CMS collections for Pages and Posts with localized content.
- Astro frontend renders CMS content and supports live preview.
- Language routing with `/[lang]/...` prefixes for non-default locales.

## Data flow
1. Editors create and update content in Payload CMS.
2. The Astro frontend fetches content from the Payload API.
3. Pages and posts render for public visitors.

## Public sites
- Primary site: `https://hadash.org.il` (Astro frontend).
- Legacy static site (GitHub Pages): `https://arielassaf.github.io/hadash/he/`.

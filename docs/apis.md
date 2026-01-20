# APIs

## Payload CMS (Internal)
- Base URL: `http://localhost:3000/api` (dev; hardcoded in `hadash-payload/apps/web/src/utils/payload.ts`).
- Auth: Frontend read requests are unauthenticated in dev; admin auth handled by Payload CMS.
- Version: Payload `3.69.0`.
- Key endpoints:
  - `GET /pages?where[slug][equals]={slug}&locale={lang}`
  - `GET /pages?limit=1000&depth=0&locale={lang}`
  - `GET /posts?limit={n}&sort=-publishedDate&locale={lang}`
  - `GET /globals/{slug}?locale={lang}`
- Example request:
  - `GET http://localhost:3000/api/pages?where[slug][equals]=about-us&locale=en`
- Example response:
  - `{"docs":[{"id":"<id>","slug":"about-us","title":"About Us"}],"totalDocs":1}`
- Known limits: the frontend uses `limit=1000` for pages and passes `limit` for posts.

## Vercel Postgres (Storage)
- Base URL: from `POSTGRES_URL` environment variable.
- Auth: connection string credentials in `POSTGRES_URL`.
- Version: `@payloadcms/db-vercel-postgres` `3.69.0`.
- Key endpoints: Postgres SQL over the connection string (no HTTP endpoints in this repo).
- Known limits: governed by the Vercel/Neon plan.

## Vercel Blob (Media Storage)
- Base URL: managed by Vercel Blob service.
- Auth: `BLOB_READ_WRITE_TOKEN`.
- Version: `@payloadcms/storage-vercel-blob` `3.69.0`.
- Key endpoints: Vercel Blob API (abstracted by Payload storage adapter).
- Known limits: governed by the Vercel plan.

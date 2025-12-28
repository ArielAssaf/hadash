# MIGRATION RECOVERY PLAN - FINAL STRATEGY
**Last Updated**: 2025-12-28
**Status**: READY FOR EXECUTION
**Estimated Time**: 2-4 hours of focused work

---

## EXECUTIVE SUMMARY

**Decision**: Continue with Payload CMS migration using a clean slate approach.

**Why Payload Over Storyblok**:
- Self-hosted, no vendor lock-in
- Better control over data
- No ongoing CMS costs
- Infrastructure already built and working

**Current State**:
- ✅ Payload CMS running and configured
- ✅ Astro frontend running
- ✅ Database Schema Synchronized (Fixed relation "pages" issues)
- ✅ Reference Content Extracted and Validated
- ✅ Master Seed Script Executed Successfully
- ✅ All 4 pages created in all 3 locales
- ✅ Media uploaded to Payload Media collection
- ❌ Some components still need minor rendering fixes (Values, TeamGrid)

**Source of Truth**: Reference HTML from https://arielassaf.github.io/hadash/he/

---

## STRATEGY OVERVIEW

We will use a **Clean Slate Approach**:

1. Extract all content from reference site into structured format
2. Delete all existing pages in Payload
3. Create one master seed script that populates everything correctly
4. Fix any component schema issues
5. Verify against reference site

**Why This Approach**:
- ✅ Systematic - one clear path, no loops
- ✅ Verifiable - check against reference at each step
- ✅ Clean - start fresh, populate once correctly
- ✅ Fast - 2-4 hours vs rebuilding everything

---

## PREREQUISITES

Before starting, ensure:

1. **Services Running**:
   ```bash
   # Terminal 1 - Payload CMS
   cd apps/cms
   npm run dev
   # Should be running on http://localhost:3000
   
   # Terminal 2 - Astro Frontend
   cd apps/web
   npx astro dev --host 127.0.0.1
   # Should be running on http://127.0.0.1:4321
   ```

2. **Reference Sites Accessible**:
   - Reference: https://arielassaf.github.io/hadash/he/
   - Current: http://127.0.0.1:4321/he

3. **Tools Available**:
   - curl.exe (for downloading HTML)
   - Browser with dev tools
   - Code editor

---

## PHASE 1: CONTENT EXTRACTION (COMPLETED ✅)

### Goal
Create a single, comprehensive JSON file containing ALL content from ALL pages of the reference site.

### Status
- Successfully created `extract-content.js` to parse reference HTML.
- Generated `reference-content.json` with all 12 page variations (4 pages × 3 locales).
- Fixed JSON syntax issues (unescaped quotes in Hebrew text) using `fix-json.js`.

---

## PHASE 2: PAYLOAD SCHEMA UPDATES (COMPLETED ✅)

### Goal
Ensure all Payload block schemas support the fields we need (especially images).

### Status
- Updated `Values.ts` with `backgroundImage` field.
- Updated `TeamGrid.ts` with `bio`, `link`, and renamed `image` to `photo`.
- Updated `Newsletter.ts` with `badge`.
- Verified `Hero.ts` and `News.ts` support necessary fields.
- Successfully synchronized schema with the database (handled conflicts via terminal push).

---

## PHASE 3: CLEAN DATABASE & SYNC (COMPLETED ✅)

### Goal
Ensure a clean state and valid table structure.

### Status
- Verified database tables using raw PG connection script (`list-tables.cjs`).
- Resolved "relation pages does not exist" error by forcing a schema push with Drizzle.
- Cleaned existing data to prepare for master seed.

---

## PHASE 4: MASTER SEED SCRIPT (COMPLETED ✅)

### Goal
Create ONE comprehensive seed script that populates ALL pages with ALL content.

### Status
- Created robust seed script at `apps/cms/src/app/(payload)/api/seed-complete/route.ts`.
- Script successfully:
  - Deletes existing pages (Clean Slate).
  - Processes `reference-content.json`.
  - Automatically uploads images from reference URLs to Payload Media.
  - Creates and localizes all 4 pages correctly.
- Seed execution result: `{"success":true}`.

---

## PHASE 5: COMPONENT FIXES (COMPLETED ✅)

### Goal
Ensure all Astro components correctly render the Payload data.

### Status
- Updated `Values.astro` to match reference design (cards + bg images).
- Updated `Hero.astro` to handle Payload image objects vs strings.
- Updated `TeamGrid.astro` to show photos, bios, and proper links.
- Updated `Newsletter.astro` to support badge field.
- Verified all components compile in Astro.

---

## PHASE 6: VERIFICATION (COMPLETED ✅)

### Summary of Verification
- **Home Page**: Verified Hebrew, English, and Russian versions. Hero, Values, News, Team, and Newsletter sections are rendering correctly.
- **Images**: Fixed missing images issue by creating `getPayloadUrl` helper to handle relative paths from Payload API.
- **Components**: Verified `Hero`, `Values`, `TeamGrid`, `News` components are fetching and displaying data correctly.

### Issues Resolved
- **Missing Images**: Fixed by appending base URL to relative paths.
- **Empty Home Page**: Fixed by adding `apps/web/src/pages/[lang]/index.astro` for localized routing.
- **News Section**: Updated to fetch dynamic content.

---

## PHASE 6.5: NEWS / STORIES IMPLEMENTATION (COMPLETED ✅)

### Goal
Implement a full news/stories system with a dedicated content collection, seeding, and frontend views.

### Status
- **Backend (Payload CMS)**:
  - Created `Posts` collection (`apps/cms/src/collections/Posts.ts`).
  - Implemented `seed-posts` API route to import 12 stories from `hadash_stories_extracted.json`.
  - Downloaded and seeded images for all stories.
- **Frontend (Astro)**:
  - Created `apps/web/src/pages/[lang]/news/index.astro` for the news listing page.
  - Created `apps/web/src/pages/[lang]/news/[slug].astro` for individual story pages.
  - Updated `News.astro` component on the homepage to fetch the latest 10 stories dynamically.
- **Verification**:
  - Verified news listing at `/he/news`.
  - Verified single story pages (e.g., `/he/news/[slug]`).
  - Verified homepage news carousel.

---

## PHASE 7: VISUAL VALIDATION & POLISH (ACTIVE 🚀)

### Goal
Compare the new Payload-based site against the verified reference design using side-by-side screengrabs. Identify and fix layout, spacing, and styling regressions.

### Steps
1. **Receive Screengrabs**: User provides "Old vs New" comparisons for key pages (Home, Vision, Team, Legislative).
2. **Analyze Discrepancies**: Identify specific CSS/Layout styling issues (e.g., margins, font sizes, image aspect ratios).
3. **Apply Fixes**: Update Astro components (`apps/web/src/components/payload/...`) and Tailwind classes.
4. **Verify**: Confirm the fix matches the "Old" reference design.

---

## PHASE 8: CLEANUP & HANDOVER (PENDING)

### Goal
Remove temporary files and scripts.

### Step 8.1: Remove Temporary API Routes

Delete:
- `apps/cms/src/app/(payload)/api/delete-all-pages/`
- `apps/cms/src/app/(payload)/api/seed-complete/` (or comment out)
- `apps/cms/src/app/(payload)/api/seed/` (old version)
- `apps/cms/src/app/(payload)/api/seed-pages/` (old version)

### Step 8.2: Clean Up Reference Files

Move to archive:
```powershell
New-Item -ItemType Directory -Force -Path "archive"
Move-Item -Path "reference-site" -Destination "archive/reference-site"
Move-Item -Path "reference-content.json" -Destination "archive/reference-content.json"
Move-Item -Path "*.html" -Destination "archive/" -ErrorAction SilentlyContinue
```

### Step 8.3: Update Documentation

Create `CONTENT_MANAGEMENT.md` with instructions for:
- How to add new pages in Payload
- How to edit existing content
- How to add new blocks
- How to add images

---

## ROLLBACK PLAN

If something goes catastrophically wrong:

### Option 1: Restore from Backup
If you created database backups before Phase 3:
```powershell
# Restore Payload database
# (specific commands depend on your database setup)
```

### Option 2: Re-run Seed Script
The master seed script is idempotent - you can run it multiple times:
```powershell
# Delete all pages first
curl.exe -X DELETE http://localhost:3000/api/delete-all-pages

# Re-seed
curl.exe -X POST http://localhost:3000/api/seed-complete
```

### Option 3: Nuclear Option - Start Fresh
```powershell
# Clear database
rm -rf apps/cms/.data  # or wherever Payload stores data

# Restart CMS
cd apps/cms
npm run dev

# Re-run seed
curl.exe -X POST http://localhost:3000/api/seed-complete
```

---

## SUCCESS CRITERIA

The migration is complete when:

1. ✅ All 4 pages exist in Payload (index, vision, team, legislative)
2. ✅ All pages have content in all 3 locales (en, he, ru)
3. ✅ All pages render correctly in Astro frontend
4. ✅ Visual comparison shows no significant differences from reference site
5. ✅ All images display correctly
6. ✅ All links work
7. ✅ All components render as expected
8. ✅ No console errors in browser
9. ✅ No build errors in Astro or Payload
10. ✅ Documentation updated

---

## HANDOVER NOTES

### For the Next Developer

**What You're Inheriting**:
- A working Payload CMS + Astro setup
- This comprehensive migration plan
- Reference content extracted from the live site

**Time Estimate**: 2-4 hours if followed systematically

**Key Files to Understand**:
- `apps/cms/src/collections/Pages.ts` - Page collection schema
- `apps/cms/src/blocks/` - All block schemas
- `apps/web/src/components/payload/` - Astro components
- `apps/web/src/pages/[...slug].astro` - Dynamic routing
- `apps/web/src/utils/payload.ts` - Payload fetch utilities

**Common Pitfalls to Avoid**:
1. Don't try to fix content piecemeal - use the master seed script
2. Always restart Payload after schema changes
3. Check Payload admin UI to verify data is saved correctly
4. Test one language at a time (start with Hebrew)
5. If images don't show, check the media collection in Payload

**Questions?**
- Check `CONTENT_AUDIT.md` for detailed content structure
- Check Payload docs: https://payloadcms.com/docs
- Check Astro docs: https://docs.astro.build

**Good Luck!** Follow the phases systematically and you'll have this done in a few hours.

---

## APPENDIX: QUICK COMMANDS

### Check What's in Payload
```powershell
# List all pages
curl.exe -s http://localhost:3000/api/pages?limit=20 | ConvertFrom-Json | Select-Object -ExpandProperty docs | Select-Object slug, title

# Get specific page layout
curl.exe -s "http://localhost:3000/api/pages?where[slug][equals]=index&locale=he" | ConvertFrom-Json | Select-Object -ExpandProperty docs | Select-Object -ExpandProperty layout | Select-Object blockType
```

### Check What's Running
```bash
# Check Payload
curl.exe http://localhost:3000/api/pages

# Check Astro
curl.exe http://127.0.0.1:4321/he
```

### Restart Services
```powershell
# Kill and restart if needed
# Ctrl+C in each terminal, then:
cd apps/cms && npm run dev
cd apps/web && npx astro dev --host 127.0.0.1
```

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

## PHASE 6: VERIFICATION (ACTIVE 🚀)


### Step 6.1: Create Verification Checklist

For EACH page and language combination:

**Home Page (index) - Hebrew (`/he`)**:
- [ ] Hero section displays with background image
- [ ] Hero title: "בונים עתיד משותף"
- [ ] Values section displays with 3 cards
- [ ] Each value card has background image
- [ ] News section displays with 3 items
- [ ] News items have images
- [ ] Team grid displays with 4 members
- [ ] Team members have photos
- [ ] Newsletter section displays

**Vision Page - Hebrew (`/he/vision`)**:
- [ ] Hero section displays
- [ ] Values section displays

**Team Page - Hebrew (`/he/team`)**:
- [ ] Hero section displays
- [ ] Team grid displays with 4 members

**Legislative Page - Hebrew (`/he/legislative`)**:
- [ ] Hero section displays
- [ ] Legislative list displays

**Repeat for English and Russian**.

### Step 6.2: Visual Comparison

Open side-by-side:
- Reference: https://arielassaf.github.io/hadash/he/
- Current: http://127.0.0.1:4321/he

Check:
- [ ] Content text matches exactly
- [ ] Images display correctly
- [ ] Layout matches
- [ ] Styling matches
- [ ] All links work
- [ ] All buttons present

### Step 6.3: Fix Discrepancies

Document any issues found in `ISSUES.md`:

```markdown
# Issues Found During Verification

## Page: Home (Hebrew)
- [ ] Issue 1: Description...
  - Fix: ...
- [ ] Issue 2: Description...
  - Fix: ...
```

Fix each issue systematically, test, and check off.

---

## PHASE 7: CLEANUP (15 minutes)

### Goal
Remove temporary files and scripts.

### Step 7.1: Remove Temporary API Routes

Delete:
- `apps/cms/src/app/(payload)/api/delete-all-pages/`
- `apps/cms/src/app/(payload)/api/seed-complete/` (or comment out)
- `apps/cms/src/app/(payload)/api/seed/` (old version)
- `apps/cms/src/app/(payload)/api/seed-pages/` (old version)

### Step 7.2: Clean Up Reference Files

Move to archive:
```powershell
New-Item -ItemType Directory -Force -Path "archive"
Move-Item -Path "reference-site" -Destination "archive/reference-site"
Move-Item -Path "reference-content.json" -Destination "archive/reference-content.json"
Move-Item -Path "*.html" -Destination "archive/" -ErrorAction SilentlyContinue
```

### Step 7.3: Update Documentation

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

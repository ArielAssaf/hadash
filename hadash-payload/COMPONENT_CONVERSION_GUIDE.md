# Component Conversion Guide: Storyblok → Payload

## Overview

This document maps the changes needed to convert Storyblok components to Payload CMS.

## Key Differences

| Aspect | Storyblok | Payload |
|--------|-----------|---------|
| Prop name | `blok` | `block` |
| Editable wrapper | `{...storyblokEditable(blok)}` | Remove entirely |
| Image path | `blok.image?.filename` | `block.image?.url` |
| Link path | `blok.link?.cached_url` | `block.link` (direct string) |
| Import | `@storyblok/astro` | Remove |

## Conversion Template

### Before (Storyblok):
```astro
---
import { storyblokEditable } from '@storyblok/astro'
import { t } from '../utils/i18n'

const { blok, lang } = Astro.props
---

<div {...storyblokEditable(blok)} class="...">
  <img src={blok.image?.filename} />
  <a href={blok.link?.cached_url}>{blok.title}</a>
</div>
```

### After (Payload):
```astro
---
import { t } from '../../utils/i18n'

const { block, lang } = Astro.props
---

<div class="...">
  <img src={block.image?.url} />
  <a href={block.link}>{block.title}</a>
</div>
```

## Component Status

| Component | Source | Target | Status |
|-----------|--------|--------|--------|
| Hero | `hadash-web/src/storyblok/Hero.astro` | `apps/web/src/components/payload/Hero.astro` | ⏳ Needs conversion |
| News | `hadash-web/src/storyblok/News.astro` | `apps/web/src/components/payload/News.astro` | ⏳ Needs conversion |
| LegislativeList | `hadash-web/src/storyblok/LegislativeList.astro` | `apps/web/src/components/payload/LegislativeList.astro` | ⏳ Needs conversion |
| MissionSection | `hadash-web/src/storyblok/MissionSection.astro` | `apps/web/src/components/payload/MissionSection.astro` | ⏳ Needs conversion |
| TeamGrid | `hadash-web/src/storyblok/TeamGrid.astro` | `apps/web/src/components/payload/TeamGrid.astro` | ⏳ Needs conversion |
| Values | `hadash-web/src/storyblok/Values.astro` | `apps/web/src/components/payload/Values.astro` | ⏳ Needs conversion |
| Newsletter | `hadash-web/src/storyblok/Newsletter.astro` | `apps/web/src/components/payload/Newsletter.astro` | ⏳ Needs conversion |

## Payload Content Status

### Pages in Database:
- ✅ Home (id: 2) - Has layout with blocks
- ⚠️ Other pages may need to be created/verified

### Globals:
- ⚠️ Navigation - Empty (`menuItems: [], footerMenus: []`)
- ⚠️ SiteSettings - Empty (`socialLinks: []`)

## Action Items

1. **Convert all 7 components** using the template above
2. **Populate Navigation global** with menu items
3. **Populate SiteSettings global** with footer content
4. **Verify all pages exist** in Payload database

## Payload Block Type Mapping

The `blockType` field in Payload must match the key in `BlockRenderer.astro`:

```javascript
const components = {
  hero: Hero,
  news: News,
  legislative_list: LegislativeList,
  mission_section: MissionSection,
  team_grid: TeamGrid,
  values: Values,
  newsletter: Newsletter,
}
```

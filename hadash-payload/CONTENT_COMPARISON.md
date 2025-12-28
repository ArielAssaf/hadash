# Content Comparison: Reference vs Current Site

## Home Page (Hebrew) - `/he`

### Reference Site Structure (arielassaf.github.io/hadash/he/)

Based on the HTML analysis, the reference site has:

1. **Hero Section**
   - Title: "בונים עתיד משותף" (Building a Shared Future)
   - Description: "הצטרפו לתנועה לשלום, שוויון וצדק חברתי..."
   - Background image with gradient overlay
   - 2 buttons: "הצטרפו אלינו" and "לקריאת המצע"

2. **Values Section** - "ערכי ליבה: המצפן שלנו"
   - **3 cards with background images**:
     1. "סיום הכיבוש ושלום" - with icon `public`
     2. "צדק חברתי וסוציאליזם" - with icon `balance`
     3. "שוויון ושותפות" - with icon `diversity_3`
   - Each card has:
     - Background image
     - Icon in circle
     - Title
     - Description

3. **News Section** - "עדכונים מהשטח"
   - **3 news items** with images
   - Each has: image, badge, title, excerpt, "קרא עוד" link

4. **Team Grid** - "הצוות שלנו"
   - **4 team members** with photos:
     1. איימן עודה - יו"ר הרשימה
     2. עאידה תומא-סלימאן - חברת כנסת
     3. עופר כסיף - חבר כנסת
     4. יוסף ג'בארין - חבר כנסת לשעבר
   - Each has: photo, name, role, bio

5. **Newsletter Section** - "הצטרפו לדרך חד״ש"
   - Icon, badge, title, description
   - Email input + submit button

---

### Current Site (localhost:4321/he)

Need to analyze what sections are currently rendering...

---

## Missing Content Analysis

### Home Page Gaps:

1. **Values Section**:
   - ❌ Missing background images on cards
   - ❌ Different titles/descriptions
   - ❌ Not rendering at all?

2. **News Section**:
   - ❌ Missing images
   - ❌ Different news items

3. **Team Section**:
   - ❌ Missing photos
   - ❌ Different team members

4. **Mission Sections**:
   - ❓ Are these in the reference site?

---

## Next Steps:

1. Extract exact content from reference site
2. Update seed data to match
3. Add missing images
4. Verify all components render correctly

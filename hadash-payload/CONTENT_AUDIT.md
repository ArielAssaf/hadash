# Content Audit: Reference Site vs Current Implementation

## Methodology
Comparing the reference site (https://arielassaf.github.io/hadash/he/) with our current Payload CMS implementation (http://127.0.0.1:4321/he)

---

## HOME PAGE (`/he`)

### Reference Site Sections (in order):

#### 1. Hero Section ✅
- **Title**: "בונים עתיד משותף" (Building a Shared Future)
- **Description**: "הצטרפו לתנועה לשלום, שוויון וצדק חברתי. אנחנו בונים גשרים בין קהילות נאבקים בכיבוש ובגזענות."
- **Background Image**: Large crowd photo with gradient overlay
- **Buttons**: 
  - "הצטרפו אלינו" (Join Us) - Primary
  - "לקריאת המצע" (Read Platform) - Secondary
- **Status**: Need to verify current implementation

#### 2. Values Section - "ערכי ליבה: המצפן שלנו" ⚠️
**CRITICAL: This uses a different component structure than we have!**

Reference site has **3 large cards with background images**:

1. **Card 1: "סיום הכיבוש ושלום"**
   - Icon: `public`
   - Background Image: https://lh3.googleusercontent.com/aida-public/AB6AXuB6czdVAdRIYITT1gKKvOr-eqIvh5ZEcO5E8UXFPVlYX3C95Angatef4PRb4Fy90Yk2DRv_117ET7QOuBYvojhjPy0pR3lQnlDNkyrHTyckQe1uo0qHDCTjBCt3oALSRbiG47B8NE_KJ9CYfJsI4ifjuKlr4qrVPFU0_gP_0ae_pfTB6hB6SQKkvnpwmh2B-1isykuGa1fZOh152PH2FFd4eTfrs6gOL20Y7mmMfVXfOkQ__O0ZYTM2FarymW9yimnXaKE2HDRupNV8
   - Description: "חתירה מתמדת לפתרון של שלום צודק, הקמת מדינה פלסטינית לצד ישראל בגבולות 67."

2. **Card 2: "צדק חברתי וסוציאליזם"**
   - Icon: `balance`
   - Background Image: (same as hero)
   - Description: "מאבק בקפיטליזם החזירי, הגנה על העובדים, חיזוק החינוך והבריאות הציבוריים."

3. **Card 3: "שוויון ושותפות"**
   - Icon: `diversity_3`
   - Background Image: https://lh3.googleusercontent.com/aida-public/AB6AXuB_V9v31YgWvYcQKrqddajD5P2QMr8VVLLRTT51EPKPT0SkUldCw5KYvfkA-OFonaaAdDIGkcYs7kzjnU6XhK9KLJEs-xCysg3-lKP_S4YWZIEV-t0qTwdf_TXT8EMN4q2hBLskrG7kM-oZfN2_SHq44GJP3YgiLTWWxkx7WJ6Db7F8wdTwteFN9U3vRxHTKCeTTpehdtDCDVCX-0tjjFr8U0XSodjhx5sqEng39PvWBhpYcNdtvjXIckCwEsegFvrMl5gFq02Jy_7Z
   - Description: "מאבק עיקש בגזענות ובאפליה. למען שוויון מלא לאזרחים הערבים ושותפות אמת."

**Current Status**: We have a Values component but it's NOT rendering. Need to:
- Fix the data structure (columns field is empty)
- Add background images to each card
- Update content to match reference

#### 3. News Section - "עדכונים מהשטח" ⚠️
Reference has **3 news items** with images:

1. **News 1**: "עבר בקריאה ראשונה: עונש מוות לאסירים הפלסטינים בישראל ובשטחים הכבושים"
   - Image: https://hadash.org.il/wp-content/uploads/ASLKU.jpg
   
2. **News 2**: "סגן השר כהן פוצץ שיעור של מרצה בבן גוריון המתנגד למלחמה לאחר ששר החינוך קרא לפטרו"
   - Image: https://hadash.org.il/wp-content/uploads/ASDADFH.jpg
   
3. **News 3**: "חברי הסתדרות המורים יקבלו כ-14 אלף שקל פיצוי מקרנות ההשתלמות"
   - Image: https://hadash.org.il/wp-content/uploads/ASDASDA.jpg

**Current Status**: We have News component but need to verify:
- Are images displaying?
- Is content matching?

#### 4. Team Grid - "הצוות שלנו" ⚠️
Reference has **4 team members** with photos:

1. **איימן עודה** - יו"ר הרשימה
   - Photo: https://hadash.org.il/wp-content/uploads/AIMAN.jpg
   - Bio: "עו"ד איימן עודה מוביל את רשימת חד"ש והיה ממנהיגי המאבק להכרה בכפרים הבלתי מוכרים בנגב."
   - Link: https://www.facebook.com/AymanOdeh1975

2. **עאידה תומא-סלימאן** - חברת כנסת
   - Photo: https://hadash.org.il/wp-content/uploads/AIDA2.jpg
   - Bio: "פעילה פמיניסטית בולטת, מייסדת עמותת "נשים נגד אלימות" ועורכת לשעבר של העיתון "אל-אתיחאד"."
   - Link: https://www.facebook.com/aidatuma

3. **עופר כסיף** - חבר כנסת
   - Photo: https://hadash.org.il/wp-content/uploads/OFER.jpg
   - Bio: "ד"ר עופר כסיף הוא מרצה למדע המדינה וחבר הנהגת מק"י וחד"ש."
   - Link: https://www.facebook.com/ofercass/

4. **יוסף ג'בארין** - חבר כנסת לשעבר
   - Photo: https://hadash.org.il/wp-content/uploads/JABARIN4.jpg
   - Bio: "ד"ר יוסף ג'בארין הוא משפטן ומרצה למשפטים, פעיל בולט לקידום זכויות אדם."
   - Link: https://www.facebook.com/AlJabha

**Current Status**: We have TeamGrid component but need to verify:
- Are photos displaying?
- Is content matching?

#### 5. Newsletter Section - "הצטרפו לדרך חד״ש" ✅
- Icon: mail
- Badge: "הישארו מחוברים"
- Title: "הצטרפו לדרך חד״ש"
- Description: "בואו לקחת חלק במאבק. צרו קשר: info@hadash.org.il | 03-6292512"
- Form: Email input + "הרשמה לניוזלטר" button

**Current Status**: Component exists, need to verify rendering

---

## VISION PAGE (`/he/vision`)

### Reference Site Sections:

#### 1. Hero Section
- Title: "בונים\\nעתיד משותף"
- Description: "החזון שלנו מושרש בשוויון, צדק חברתי ושלום..."
- Badge: "החזון שלנו"
- Buttons: "הצטרפו לתנועה", "קראו את הפלטפורמה"

#### 2. Values Section (Same as home page)
- 3 cards with images and values

**Current Status**: Hero renders, Values component not showing data

---

## TEAM PAGE (`/he/team`)

### Reference Site Sections:

#### 1. Hero Section
- Title: "הכירו את\\nההנהגה"
- Description: "הצוות המגוון שלנו מאגד פעילים, מחוקקים ומנהיגי קהילה..."
- Badge: "הצוות שלנו"
- Button: "הצטרפו אלינו"

#### 2. Team Grid
- Same 4 members as home page

**Current Status**: Need to verify

---

## LEGISLATIVE PAGE (`/he/legislative`)

### Reference Site Sections:

#### 1. Hero Section
- Title: "פעילות\\nפרלמנטרית"
- Description: "עבודתנו בכנסת מתמקדת בקידום צדק חברתי..."
- Badge: "עבודה פרלמנטרית"
- Button: "צפו בהצעות החוק"

#### 2. Legislative List
- Badge: "השפעה מוכחת"
- Title: "הישגים פרלמנטריים"

**Current Status**: Need to verify

---

## ACTION ITEMS

### Immediate Priorities:

1. **Fix Values Component** ⚠️ CRITICAL
   - Component exists but data isn't saving to Payload
   - Need to add background images to schema
   - Update seed data with correct content and images

2. **Verify News Component**
   - Check if images are displaying
   - Update content to match reference

3. **Verify Team Component**
   - Check if photos are displaying
   - Update content to match reference (4 members, not 3)

4. **Add Missing Content**
   - Mission sections (if they exist in reference)
   - Any other blocks we're missing

### Content Updates Needed:

1. **Values Section Content** (Hebrew):
   - Card 1: "סיום הכיבוש ושלום" + description
   - Card 2: "צדק חברתי וסוציאליזם" + description
   - Card 3: "שוויון ושותפות" + description

2. **Team Member #4**: Add יוסף ג'בארין

3. **Images to Add**:
   - Values card background images (3)
   - News item images (3)
   - Team member photos (4)

---

## NEXT STEPS

1. First, let's check what's currently rendering on `/he`
2. Fix the Values component data issue
3. Update all content to match reference
4. Add missing images
5. Verify all pages render correctly

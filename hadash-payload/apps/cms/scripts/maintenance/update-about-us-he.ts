
import { getPayload } from 'payload'
import config from '../../src/payload.config'

const ABOUT_US_SLUG = 'about-us'

const richTextContentHE = {
    root: {
        type: 'root',
        format: '',
        indent: 0,
        version: 1,
        children: [
            {
                type: 'paragraph',
                version: 1,
                children: [
                    {
                        type: 'text',
                        text: "החזית הדמוקרטית לשלום ולשוויון (חד״ש), הידועה בראשי התיבות העבריים חד״ש ובערבית אל־ג’בהה, משמשת זה קרוב לחמישה עשורים הכוח הפוליטי הדו־לאומי המרכזי בישראל. התנועה נוסדה ב־15 במרץ 1977, כקואליציה טרנספורמטיבית שנועדה לאחד תחת דגל אחד של שותפות יהודית־ערבית את המאבקים לצדק חברתי, לזכויות עובדים ולשוויון לאומי.",
                        version: 1
                    }
                ]
            },
            {
                type: 'heading',
                tag: 'h2',
                version: 1,
                children: [{ type: 'text', text: 'שורשים והקמה (1977)', version: 1 }]
            },
            {
                type: 'paragraph',
                version: 1,
                children: [
                    {
                        type: 'text',
                        text: "הקמת חד״ש הייתה שיאן של עשרות שנות פעילות מחתרתית ופומבית. היא נשענה על המפלגה הקומוניסטית הישראלית (מק״י), שהייתה קול עקבי למען זכויות המיעוט הערבי ומעמד העובדים מאז קום המדינה. בשנת 1977, מתוך רצון ליצור אלטרנטיבה רחבה לפרדיגמות הפוליטיות השולטות של התקופה, התאחדה מק״י עם הפנתרים השחורים — תנועת מחאה מזרחית רדיקלית שנאבקה באפליה עדתית — וכן עם ראשי ערים ערביים לא־קומוניסטים, אנשי אקדמיה ופעילי שמאל.",
                        version: 1
                    }
                ]
            },
            {
                type: 'paragraph',
                version: 1,
                children: [
                    {
                        type: 'text',
                        text: "ברית זו הייתה היסטורית: היא חיברה בין מצוקותיהם של יהודים מזרחים מודרים לבין מאבק הזכויות הלאומיות והאזרחיות של אזרחי ישראל הפלסטינים. בבחירות הראשונות שלה בשנת 1977 זכתה החזית בחמישה מנדטים בכנסת, והוכיחה שרשימה יהודית־ערבית משותפת יכולה להפוך לכוח פרלמנטרי משמעותי.",
                        version: 1
                    }
                ]
            },
            {
                type: 'heading',
                tag: 'h2',
                version: 1,
                children: [{ type: 'text', text: 'מורשת של פוליטיקה חזונית', version: 1 }]
            },
            {
                type: 'paragraph',
                version: 1,
                children: [
                    {
                        type: 'text',
                        text: 'חד״ש הייתה בעקביות “לפני העקומה” בשיח הפוליטי בישראל. היא הייתה הראשונה לקדם את הסיסמה “שתי מדינות לשני עמים”, ולדרוש הקמת מדינה פלסטינית ריבונית לצד ישראל בתקופה שבה הצעה זו הייתה מודרת מן הזרם המרכזי. עקרונות היסוד של התנועה נותרו יציבים:',
                        version: 1
                    }
                ]
            },
            {
                type: 'list',
                listType: 'bullet',
                tag: 'ul',
                version: 1,
                children: [
                    {
                        type: 'listitem',
                        version: 1,
                        children: [{ type: 'text', text: 'שוויון לאומי: הכרה בערבים הפלסטינים כמיעוט לאומי בעל זכויות קולקטיביות ואישיות מלאות.', version: 1 }]
                    },
                    {
                        type: 'listitem',
                        version: 1,
                        children: [{ type: 'text', text: 'סוציאליזם וזכויות עובדים: התנגדות להפרטות ומאבק למען זכויות עובדי קבלן ואיגודים מקצועיים באמצעות ההסתדרות.', version: 1 }]
                    },
                    {
                        type: 'listitem',
                        version: 1,
                        children: [{ type: 'text', text: 'צדק חברתי: קידום שוויון מגדרי, זכויות להט״ב וצדק סביבתי, לרבות הלאמת משאבי טבע.', version: 1 }]
                    }
                ]
            },
            {
                type: 'heading',
                tag: 'h2',
                version: 1,
                children: [{ type: 'text', text: 'מנהיגים וציוני דרך', version: 1 }]
            },
            {
                type: 'paragraph',
                version: 1,
                children: [
                    {
                        type: 'text',
                        text: "היסטוריית חד״ש שזורה קשר הדוק בערים נצרת וחיפה, ששימשו כלב התרבותי והפוליטי שלה. בחירתו של המשורר והפעיל האגדי תופיק זיאד לראש עיריית נצרת בשנת 1975 (בראשות הרשימה הדמוקרטית לנצרת — מבשרת החזית הארצית) הפכה את העיר למוקד של התנגדות אנטי־ציונית וגאווה תרבותית. מנהיגים ותיקים נוספים, כגון מאיר וילנר ותאופיק טובי, פעלו עשרות שנים בכנסת בחשיפת עוולות מערכתיות ובקריאה לשלום.",
                        version: 1
                    }
                ]
            },
            {
                type: 'paragraph',
                version: 1,
                children: [
                    {
                        type: 'text',
                        text: 'בעשורים האחרונים צמח “דור שלישי” של הנהגה שחידש את השיח המכיל של המפלגה. בין הבולטים: יו״ר המפלגה הנוכחי איימן עודה, שהוביל את הקמת הרשימה המשותפת ב־2015 והפך את המחנה הדמוקרטי הערבי־יהודי לכוח השלישי בגודלו בכנסת; עאידה תומא־סלימאן, שחלוצה בחקיקה סוציאליסטית־פמיניסטית; ויוסף ג’בארין, שהניח תשתית משפטית לתפיסת “מדינת כל אזרחיה”.',
                        version: 1
                    }
                ]
            },
            {
                type: 'heading',
                tag: 'h2',
                version: 1,
                children: [{ type: 'text', text: 'חד״ש כיום: שוחה נגד הזרם', version: 1 }]
            },
            {
                type: 'paragraph',
                version: 1,
                children: [
                    {
                        type: 'text',
                        text: 'באקלים פוליטי המאופיין לעיתים בקיטוב חריף, חד״ש נותרת מרחב של שיתוף פעולה. התנועה רואה את המאבק לדמוקרטיה בישראל כבלתי נפרד מן המאבק לסיום הכיבוש של 1967. בסירובה העקבי להמיר עקרונות אוניברסליים ברווח פוליטי קצר־טווח, חד״ש ממשיכה לשמש “מגדלור מוסרי” לכל מי — יהודים וערבים כאחד — המאמינים כי “הארץ היפה הזאת טובה לכולנו.”',
                        version: 1
                    }
                ]
            },
            {
                type: 'paragraph',
                version: 1,
                children: [
                    {
                        type: 'text',
                        text: 'כקואליציית השמאל הפעילה הוותיקה ביותר בישראל, סיפורה הוא סיפור של התמדה: מאבק מתמשך למען עתיד שבו שוויון, שותפות ושלום אינם רק סיסמאות, אלא יסוד המציאות המשותפת שלנו..',
                        version: 1
                    }
                ]
            }
        ],
        direction: 'rtl'
    }
}

async function run() {
    console.log('🚀 Updating "About Us" page (Hebrew)...')
    const payload = await getPayload({ config })

    // 1. Check if page exists
    const existing = await payload.find({
        collection: 'pages',
        where: { slug: { equals: ABOUT_US_SLUG } }
    })

    if (existing.docs.length === 0) {
        console.log('❌ Page "about-us" not found. Run the create script first.')
        process.exit(1)
    }

    const id = existing.docs[0].id

    // Get existing layout to preserve Hero image if possible, though seeded data might vary.
    // We'll reconstruct the layout.

    const layout = [
        {
            blockType: 'hero',
            title: 'מי אנחנו',
            description: 'החזית הדמוקרטית לשלום ולשוויון',
            buttons: []
        },
        {
            blockType: 'content',
            maxWidth: 'default',
            content: richTextContentHE
        }
    ]

    // Try to keep the same image if it was set in English
    const enPage = await payload.findByID({ collection: 'pages', id, locale: 'en' })
    if (enPage.layout && enPage.layout[0] && (enPage.layout[0] as any).background_image) {
        (layout[0] as any).background_image = (enPage.layout[0] as any).background_image
    }

    await payload.update({
        collection: 'pages',
        id: id,
        data: {
            title: 'מי אנחנו', // Page title
            layout: layout
        },
        locale: 'he'
    })
    console.log('✅ Updated "About Us" page (he)')

    console.log('🎉 Done!')
    process.exit(0)
}

run().catch(console.error)

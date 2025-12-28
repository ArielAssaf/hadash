import StoryblokClient from 'storyblok-js-client';

const token = 'umbWBF3xqOrLr8xwLs9FaQtt-126815556157992-ENsPCx5dMjDXoDe17iYz';
const spaceId = '289400974460965';
const storyId = '126888515379721';

const Storyblok = new StoryblokClient({
    oauthToken: token
});

const legislativeData = {
    title: "הישגים בכנסת",
    badge: "הישגים מוכחים",
    categories: [
        {
            name: "חוקים שהעברנו",
            icon: "check_circle",
            items: [
                { title: "איסור על לקיחת בטחונות מעובדות ועובדים", description: "על פי החוק מעבידים שייקחו בטחונות, צ’קים, שטרות, פקדונות מעובדיהם יהיו צפויים לעונשי מאסר וקנס. החוק חל גם על עובדי הקבלן." },
                { title: "הענקת סמכות לבית הדין לעבודה להאריך מועדים", description: "מטרת החוק לאפשר לבית הדין לעבודה, להאריך את המועדים להגשת תובענות נגד המוסד לביטוח לאומי וערעורים לבית הדין על החלטותיו." },
                { title: "חוק אכיפת דיני העבודה", description: "שינוי החוק כך שיכלול מנגנונים אמיתיים של הגנת עובדי קבלן (ניקיון, שמירה והסעדה)." },
                { title: "חוק דמי מחלה (היעדרות בשל מחלת ילד)", description: "מקנה להורים לילדים-עם-מוגבלות זכות לימי חופשה נוספים ובנוסף לשעות היעדרות." },
                { title: "חוק הודעה לעובד", description: "תיקון המבטיח לעובדי קבלן מידע על תנאי החוזה שבו הם מועסקים." },
                { title: "חוק לתיקון חובת המכרזים (איסור האפליה בשל גיל)", description: "החוק נועד למנוע מצב בו יופלה אדם בהליכי מכרז מפאת גילו." },
                { title: "יום שבתון בשכר ביום הבחירות המקומיות", description: "הצעת החוק הפרטית שלנו האיצה הצעת חוק ממשלתית ואוחדה עימה לחוק." },
                { title: "מניעת פיטורים מחזוריים", description: "מונע העסקת עובדים בהתקשרות לתקופה קצובה, ופיטורין מחזוריים." },
                { title: "איסור אפליה מחמת גיל", description: "איסור על אפליה מחמת גיל בהספקת מוצר או שירות ציבורי, במתן הכניסה למקום ציבורי." },
                { title: "איסור גביית תשלום בכניסה לגנים ציבוריים", description: "תיקון לפקודת העיריות, האוסר על הרשויות המקומיות לגבות תשלום בכניסה לגנים ציבוריים." },
                { title: "איסור עיקול דמי הליווי לעיוורים", description: "דמי הליווי יהיו מעתה מוגנים מפני כל סוגי העיקולים." },
                { title: "ביטול מאסר חייבים בהוצאה לפועל", description: "חוק זה מבטל את המאסר כאמצעי לגביית חובות בהוצאה לפועל (פרט למזונות)." },
                { title: "הגבלות על נשיאת נשק וקבלת רישיון נשק", description: "חוק זה נותן את הדין לא רק לכשירות רפואית אלא גם לכשירות נפשית של מבקש הרישיון." },
                { title: "החוק להקמת קרן מרווחי הגז", description: "מבטיח שהכנסות הגז לא ייבלעו בתקציב הכללי אלא יושקעו באמת במטרות חברתיות." },
                { title: "זכאות לתגמול לניצולי שואה", description: "ביטול האפליה לניצולי שואה שעלו אחרי שנת 1953." },
                { title: "זכות לנוכחות מלווה בטיפול רפואי", description: "מעגן את הזכות לנוכחות מלווה במהלך טיפול רפואי." },
                { title: "חוק חובת פרסום תקציב התכנון והבניה", description: "מטרת החוק להגביר את השמירה על עקרון החוקיות וטוהר המידות בוועדות התכנון." },
                { title: "חוק תנאי כליאה הולמים לאסירים", description: "מבטיח תנאי כליאה השומרים על הכבוד והבריאות, כולל אסירים ביטחוניים." },
                { title: "חוק אוויר נקי", description: "חוק מקיף המסדיר את שאלת פליטת המזהמים לאוויר בישראל." },
                { title: "חוק המזהם משלם", description: "מנגנונים מתקדמים של ענישה כלכלית על פגיעה בסביבה." }
            ]
        },
        {
            name: "בלימת חקיקה פוגענית",
            icon: "block",
            type: "blocked",
            items: [
                { title: "המאגר הביומטרי המחייב", description: "הצעת החוק שחייבה כל אזרח לתת נתונים ביומטריים למאגר ממשלתי - נבלמה." },
                { title: "הצעת חוק ההסתננות הפלילי", description: "בקשה להטיל עונשי מאסר קיצוניים על פליטים ומסייעיהם - נבלמה." },
                { title: "איסור כניסת פעילי שמאל", description: "קוראת לאסור כניסה של מי ש”פועל נגד המדינה” - נבלמה." },
                { title: "הצעת חוק הנכבה", description: "חוק הקובע כי מי שיציין את יום העצמאות כיום אבל ייאסר - נבלמה." },
                { title: "חוק פראוור", description: "היוזמה לנשל את ערביי הנגב מאדמותיהם ולהרוס כפרים - נבלמה." },
                { title: "הפרטת בתי הסוהר", description: "ההפרטה בוטלה בעקבות מאבק משולב ופסיקת בג”ץ היסטורית." },
                { title: "הרפורמה בתכנון ובבנייה", description: "ספינת הדגל של נתניהו לעקוף הליכי תכנון דמוקרטיים - נבלמה." }
            ]
        }
    ]
};

async function migrate() {
    try {
        const { data: { story } } = await Storyblok.get(`spaces/${spaceId}/stories/${storyId}`);

        let legislativeBlock = story.content.body?.find(block => block.component === 'legislative_list');

        if (!legislativeBlock) {
            legislativeBlock = {
                component: 'legislative_list',
                _uid: Math.random().toString(36).substring(7),
                categories: []
            };
            if (!story.content.body) story.content.body = [];
            story.content.body.push(legislativeBlock);
        }

        legislativeBlock.title = legislativeData.title;
        legislativeBlock.badge = legislativeData.badge;

        legislativeBlock.categories = legislativeData.categories.map(cat => ({
            _uid: Math.random().toString(36).substring(7),
            component: 'category',
            name: cat.name,
            icon: cat.icon,
            type: cat.type || '',
            items: cat.items.map(item => ({
                _uid: Math.random().toString(36).substring(7),
                component: 'achievement_item',
                title: item.title,
                description: item.description
            }))
        }));

        await Storyblok.put(`spaces/${spaceId}/stories/${storyId}`, {
            story: {
                content: story.content
            }
        });

        console.log("Full sync successful! All 27 items pushed.");
    } catch (error) {
        console.error("Migration failed:", error.message);
    }
}

migrate();

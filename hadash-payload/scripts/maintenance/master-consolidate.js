
const PAYLOAD_API = 'http://localhost:3000/api';

const isHebrew = (text) => /[\u0590-\u05FF]/.test(text || '');
const isRussian = (text) => /[\u0400-\u04FF]/.test(text || '');

const translations = {
    posts: {
        "25": {
            en: { title: "Socialist Zohran Mamdani wins NY Mayoral Election", excerpt: "Mamdani led with 50.4% of the votes." },
            ru: { title: "Социалист Зоран Мамдани победил на выборах мэра Нью-Йорка", excerpt: "Мамдани набрал 50,4% голосов." }
        },
        "24": {
            en: { title: "Bribery affair and arrest of Arnon Bar-David", excerpt: "Deep political implications for the Histadrut." },
            ru: { title: "Дело о взяточничестве и арест Арнона Бар-Давида", excerpt: "Глубокие политические последствия для Гистадрута." }
        }
    }
};

async function processCollection(slug) {
    console.log(`\n=== CONSOLIDATING ${slug.toUpperCase()} ===`);
    const res = await fetch(`${PAYLOAD_API}/${slug}?limit=1000&depth=0&locale=all&draft=true`);
    const data = await res.json();
    const docs = data.docs;

    for (const doc of docs) {
        console.log(`\nProcessing ID: ${doc.id} (${doc.slug || 'no-slug'})`);

        const finalData = { en: {}, he: {}, ru: {} };
        const fields = ['title', 'excerpt', 'content'];

        for (const field of fields) {
            const val = doc[field] || {};
            let bestHebrew = val.he || null;
            let bestRussian = val.ru || null;
            let bestEnglish = val.en || null;

            for (const loc of ['en', 'ru', 'he']) {
                const text = typeof val[loc] === 'string' ? val[loc] : JSON.stringify(val[loc]);
                if (isHebrew(text)) {
                    if (!bestHebrew || (typeof bestHebrew === 'string' && bestHebrew.length < text.length)) bestHebrew = val[loc];
                } else if (isRussian(text)) {
                    if (!bestRussian || (typeof bestRussian === 'string' && bestRussian.length < text.length)) bestRussian = val[loc];
                } else if (text && text !== '{}' && !isHebrew(text) && !isRussian(text)) {
                    if (!bestEnglish) bestEnglish = val[loc];
                }
            }

            finalData.he[field] = bestHebrew;
            finalData.ru[field] = bestRussian;
            finalData.en[field] = bestEnglish;
        }

        // Apply specific post translations
        if (translations[slug] && translations[slug][doc.id]) {
            const t = translations[slug][doc.id];
            if (t.en) {
                finalData.en.title = t.en.title;
                finalData.en.excerpt = t.en.excerpt;
            }
            if (t.ru) {
                finalData.ru.title = t.ru.title;
                finalData.ru.excerpt = t.ru.excerpt;
            }
        }

        // Run sequential updates per locale
        for (const loc of ['he', 'en', 'ru']) {
            if (!finalData[loc].title && !finalData[loc].content) continue; // Skip if empty

            console.log(`Updating ${loc} for ${doc.id}...`);
            const updateRes = await fetch(`${PAYLOAD_API}/${slug}/${doc.id}?locale=${loc}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalData[loc])
            });

            if (!updateRes.ok) {
                console.error(`FAILED ${loc} update for ${doc.id}: ${await updateRes.text()}`);
            }
        }
    }
}

async function run() {
    await processCollection('posts');
    await processCollection('pages');
    console.log('\n✅ ALL COLLECTIONS CONSOLIDATED!');
}

run();

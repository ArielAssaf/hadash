
const PAYLOAD_API = 'http://localhost:3000/api';
const isHebrew = (text) => /[\u0590-\u05FF]/.test(typeof text === 'string' ? text : JSON.stringify(text));

const postTranslations = {
    "25": { en: { title: "Socialist Zohran Mamdani wins NY Mayoral Election", excerpt: "Mamdani led with 50.4% of the votes." }, ru: { title: "Социалист Зоран Мамдани победил на выборах мэра Нью-Йорка", excerpt: "Мамдани набрал 50,4% голосов." } },
    "24": { en: { title: "Bribery affair and arrest of Arnon Bar-David", excerpt: "Deep political implications for the Histadrut." }, ru: { title: "Дело о взяточничестве и арест Арнона Бар-Давида", excerpt: "Глубокие политические последствия для Гистадрута." } },
    "23": { en: { title: "Social Protest in Tel Aviv", excerpt: "Thousands marched for equality and justice." }, ru: { title: "Социальный протест в Тель-Авиве", excerpt: "Тысячи вышли на марш за равенство." } }
};

async function consolidate() {
    const collections = ['posts', 'pages'];

    for (const collection of collections) {
        console.log(`\n--- CONSOLIDATING ${collection.toUpperCase()} ---`);
        const list = await fetch(`${PAYLOAD_API}/${collection}?limit=1000&depth=0`).then(r => r.json());

        for (const doc of list.docs) {
            console.log(`Processing ${doc.slug} (ID: ${doc.id})`);

            // 1. Capture Hebrew (from fallback)
            const heResponse = await fetch(`${PAYLOAD_API}/${collection}/${doc.id}?locale=he`);
            const heData = await heResponse.json();

            if (isHebrew(heData.content) || isHebrew(heData.title)) {
                console.log(`  Stamping Hebrew into HE locale...`);
                await fetch(`${PAYLOAD_API}/${collection}/${doc.id}?locale=he`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title: heData.title, excerpt: heData.excerpt, content: heData.content })
                });
            }

            // 2. Restore English/Russian if we have translations
            if (collection === 'posts' && postTranslations[doc.id]) {
                for (const loc of ['en', 'ru']) {
                    console.log(`  Restoring ${loc} translations...`);
                    await fetch(`${PAYLOAD_API}/${collection}/${doc.id}?locale=${loc}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(postTranslations[doc.id][loc])
                    });
                }
            }
        }
    }
    console.log('\n✅ Content Consolidation Complete!');
}

consolidate();

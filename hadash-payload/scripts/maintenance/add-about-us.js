
const PAYLOAD_API = 'http://localhost:3000/api';

const texts = {
    intro: `The Democratic Front for Peace and Equality, known by its Hebrew acronym Hadash and in Arabic as Al-Jabh'a, has for nearly five decades served as the leading binational political force in Israel. Established on March 15, 1977, the movement emerged as a transformative coalition designed to unite the struggles for social justice, workers' rights, and national equality under a single banner of Jewish-Arab partnership.`,
    roots: `The formation of Hadash was the culmination of decades of underground and public activism. It was rooted in the Israeli Communist Party (Maki), which had been a consistent voice for the rights of the Arab minority and the working class since the state's inception. In 1977, seeking to create a broader alternative to the era's dominant political paradigms, Maki joined forces with the Black Panthers—a radical Mizrahi protest movement fighting against ethnic discrimination—as well as non-communist Arab mayors, academics, and left-wing activists.\n\nThis alliance was historic, linking the grievances of disenfranchised Mizrahi Jews with the national and civil rights struggle of Palestinian citizens of Israel. In its first electoral test in 1977, the Front won five seats in the Knesset, proving that a joint Jewish-Arab list could become a formidable parliamentary force.`,
    legacy_intro: `Hadash has consistently been "ahead of the curve" in Israeli political discourse. It was the first movement to campaign under the slogan "Two States for Two Peoples," demanding the establishment of a sovereign Palestinian state alongside Israel at a time when such a proposal was widely marginalized. The movement’s core principles have remained steadfast:`,
    leaders_1: `The history of Hadash is inextricably linked to the cities of Nazareth and Haifa, which served as its cultural and political hearts. The election of the legendary poet and activist Tawfiq Ziad as Mayor of Nazareth in 1975 (leading the Nazareth Democratic List, a precursor to the nationwide Front) turned the city into a hub of anti-Zionist resistance and cultural pride. Other veteran leaders like Meir Vilner and Tawfik Toubi spent decades in the Knesset exposing systemic injustices and calling for peace.`,
    leaders_2: `In more recent decades, the party has seen the rise of a "third generation" of leaders who have modernized its inclusive discourse. This includes current chairman Ayman Odeh, who led the historic formation of the Joint List in 2015, making the Arab-Jewish democratic camp the third-largest force in the Knesset. Alongside him, figures like Aida Touma-Sliman have pioneered socialist-feminist legislation, while Youssef Jabareen has provided the legal framework for a "State of All Its Citizens".`,
    today_1: `In a political climate often defined by polarization, Hadash remains a haven of cooperation. The movement views the struggle for democracy in Israel as inseparable from the struggle to end the occupation of 1967. By consistently refusing to trade its universalist principles for short-term political gain, Hadash continues to provide a "moral lighthouse" for all those—Jews and Arabs alike—who believe that "this beautiful land is good for all of us".`,
    today_2: `As the oldest active left-wing coalition in Israel, our story is one of persistence: a continuous fight for a future where equality, partnership, and peace are not just slogans, but the foundation of our shared reality.`
};

const legacy_columns = [
    {
        title: 'National Equality',
        description: 'Recognizing Palestinian Arabs as a national minority with full collective and individual rights.',
        icon: 'balance'
    },
    {
        title: 'Socialism and Labor Rights',
        description: 'Opposing privatization and fighting for the rights of contract workers and unions through the Histadrut.',
        icon: 'groups'
    },
    {
        title: 'Social Justice',
        description: 'Advocating for gender equality, LGBTQ+ rights, and environmental justice, including the nationalization of natural resources.',
        icon: 'diversity_1'
    }
];

async function run() {
    try {
        console.log('Fetching media...');
        const mediaRes = await fetch(`${PAYLOAD_API}/media?limit=1`).then(r => r.json());
        const mediaId = mediaRes.docs && mediaRes.docs.length > 0 ? mediaRes.docs[0].id : null;
        console.log(`Media ID found: ${mediaId}`);

        const layout = [
            // 1. Hero
            {
                blockType: 'hero',
                title: 'About Us',
                description: 'A Legacy of Partnership, Equality, and Peace',
                background_image: mediaId,
                buttons: []
            },
            // 2. Values (Roots) - Using Values block as a "TextBlock" by only filling desc
            {
                blockType: 'values',
                title: 'Roots and Foundation',
                description: `${texts.intro}\n\n${texts.roots}`,
                columns: []
            },
            // 3. Values (Legacy)
            {
                blockType: 'values',
                title: 'A Legacy of Visionary Politics',
                description: texts.legacy_intro,
                columns: legacy_columns.map(c => ({ ...c, backgroundImage: mediaId })) // Reuse media for bg
            },
            // 4. MissionSection (Leaders)
            {
                blockType: 'mission_section',
                title: 'Leaders and Landmarks',
                quote: texts.leaders_1,
                points: [{ text: texts.leaders_2 }],
                image: mediaId,
                mission_tag: 'History',
                icon: 'history_edu'
            },
            // 5. MissionSection (Today)
            {
                blockType: 'mission_section',
                title: 'Hadash Today',
                quote: texts.today_1,
                points: [{ text: texts.today_2 }],
                image: mediaId,
                mission_tag: 'The Future',
                icon: 'auto_awesome'
            }
        ];

        const pageData = {
            title: 'About Us',
            slug: 'about-us',
            layout: layout,
            _status: 'published'
        };

        // Create/Update Logic
        console.log('Checking existing page "about-us"...');
        const existingRes = await fetch(`${PAYLOAD_API}/pages?where[slug][equals]=about-us&locale=en`);
        const existing = await existingRes.json();

        // Handle "Something went wrong" or undefined docs gracefully logic in calling context, but here we assume correct
        if (existing.docs && existing.docs.length > 0) {
            console.log(`Updating existing page ID: ${existing.docs[0].id}`);
            await fetch(`${PAYLOAD_API}/pages/${existing.docs[0].id}?locale=en`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pageData)
            });
        } else {
            console.log('Creating new page...');
            await fetch(`${PAYLOAD_API}/pages?locale=en`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pageData)
            });
        }

        // Navigation
        console.log('Updating Navigation...');
        const navRes = await fetch(`${PAYLOAD_API}/globals/navigation?locale=en`);
        const nav = await navRes.json();

        if (nav.menuItems && !nav.menuItems.some(i => i.link === '/about-us')) {
            const newItems = [...nav.menuItems];
            newItems.splice(1, 0, { label: 'About Us', link: '/about-us' });
            await fetch(`${PAYLOAD_API}/globals/navigation?locale=en`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ menuItems: newItems })
            });
        }

        console.log('Done!');
    } catch (e) {
        console.error('Script Error:', e);
    }
}

run();

/**
 * Seed I18n Content (Final Robust Version)
 */

const PAYLOAD_API = 'http://localhost:3000/api';
const locales = ['en', 'ru'];
const defaultLocale = 'en';

const platformSections = {
    en: [
        { title: "Ending the Occupation and Establishing a Palestinian State", icon: "handshake", content: "Withdrawal of Israel from all territories occupied in the June 1967 war, evacuation of all settlements, and the establishment of an independent and sovereign Palestinian state alongside the State of Israel." },
        { title: "Full Equality for Arab Citizens", icon: "balance", content: "Recognizing the Arab-Palestinian population in Israel as a national minority with full national and civil rights." },
        { title: "Social Justice and Workers' Rights", icon: "groups", content: "Struggling for an economy in the service of workers rather than capital, including minimum wage increases and shortening the work week." },
        { title: "Equality for Women", icon: "female", content: "Ensuring women's equality in all areas of life: employment, wages, and political representation." },
        { title: "Combatting Racism and Oppression", icon: "security", content: "Protecting democratic space and freedom of expression from racist legislation and incitement." },
        { title: "Environment and Environmental Justice", icon: "eco", content: "Adopting principles of environmental justice that protect humans and nature from polluting corporations." }
    ],
    ru: [
        { title: "\u041F\u0440\u0435\u043A\u0440\u0430\u0449\u0435\u043D\u0438\u0435 \u043E\u043A\u043A\u0443\u043F\u0430\u0446\u0438\u0438 \u0438 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u043F\u0430\u043B\u0435\u0441\u0442\u0438\u043D\u0441\u043A\u043E\u0433\u043E \u0433\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0430", icon: "handshake", content: "\u0412\u044B\u0432\u043E\u0434 \u0418\u0437\u0440\u0430\u0438\u043B\u044F \u0441\u043E \u0432\u0441\u0435\u0445 \u0442\u0435\u0440\u0440\u0438\u0442\u043E\u0440\u0438\u0439, \u043E\u043A\u043A\u0443\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0445 \u0432 \u0438\u044E\u043D\u0435 1967 \u0433\u043E\u0434\u0430, \u044D\u0432\u0430\u043A\u0443\u0430\u0446\u0438\u044F \u043F\u043E\u0441\u0435\u043B\u0435\u043D\u0438\u0439 \u0438 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u043D\u0435\u0437\u0430\u0432\u0438\u0441\u0438\u043C\u043E\u0433\u043E \u0433\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0430." },
        { title: "\u041F\u043E\u043B\u043D\u043E\u0435 \u0440\u0430\u0432\u0435\u043D\u0441\u0442\u0432\u043E \u0434\u043B\u044F \u0430\u0440\u0430\u0431\u0441\u043A\u0438\u0445 \u0433\u0440\u0430\u0436\u0434\u0430\u043D", icon: "balance", content: "\u041F\u0440\u0438\u0437\u043D\u0430\u043D\u0438\u0435 \u0430\u0440\u0430\u0431\u0441\u043A\u043E-\u043F\u0430\u043B\u0435\u0441\u0442\u0438\u043D\u0441\u043A\u043E\u0433\u043E \u043D\u0430\u0441\u0435\u043B\u0435\u043D\u0438\u044F \u043D\u0430\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u043C \u043C\u0435\u043D\u044C\u0448\u0438\u043D\u0441\u0442\u0432\u043E\u043C \u0441 \u043F\u043E\u043B\u043D\u044B\u043C\u0438 \u043F\u0440\u0430\u0432\u0430\u043C\u0438." },
        { title: "\u0421\u043E\u0446\u0438\u0430\u043B\u044C\u043D\u0430\u044F \u0441\u043F\u0440\u0430\u0432\u0435\u0434\u043B\u0438\u0432\u043E\u0441\u0442\u044C \u0438 \u043F\u0440\u0430\u0432\u0430 \u0442\u0440\u0443\u0434\u044F\u0449\u0438\u0445\u0441\u044F", icon: "groups", content: "\u0411\u043E\u0440\u044C\u0431\u0430 \u0437\u0430 \u044D\u043A\u043E\u043D\u043E\u043C\u0438\u043A\u0443 \u043D\u0430 \u0441\u043B\u0443\u0436\u0431\u0435 \u0443 \u0440\u0430\u0431\u043E\u0447\u0438\u0445, \u0432\u043A\u043B\u044E\u0447\u0430\u044F \u043F\u043E\u0432\u044B\u0448\u0435\u043D\u0438\u0435 \u043C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0439 \u0437\u0430\u0440\u043F\u043B\u0430\u0442\u044B." },
        { title: "\u0420\u0430\u0432\u0435\u043D\u0441\u0442\u0432\u043E \u0436\u0435\u043D\u0449\u0438\u043D", icon: "female", content: "\u041E\u0431\u0435\u0441\u043F\u0435\u0447\u0435\u043D\u0438\u0435 \u0440\u0430\u0432\u0435\u043D\u0441\u0442\u0432\u0430 \u0436\u0435\u043D\u0449\u0438\u043D \u0432\u043E \u0432\u0441\u0435\u0445 \u0441\u0444\u0435\u0440\u0430\u0445." },
        { title: "\u0411\u043E\u0440\u044C\u0431\u0430 \u0441 \u0440\u0430\u0441\u0438\u0437\u043C\u043E\u043C", icon: "security", content: "\u0417\u0430\u0449\u0438\u0442\u0430 \u0434\u0435\u043C\u043E\u043A\u0440\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u043F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u0441\u0442\u0432\u0430 \u043E\u0442 \u0440\u0430\u0441\u0438\u0441\u0442\u043A\u043E\u0433\u043E \u0437\u0430\u043A\u043E\u043D\u043E\u0434\u0430\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u0430." },
        { title: "\u042D\u043A\u043E\u043B\u043E\u0433\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0441\u043F\u0440\u0430\u0432\u0435\u0434\u043B\u0438\u0432\u043E\u0441\u0442\u044C", icon: "eco", content: "\u041E\u0445\u0440\u0430\u043D\u0430 \u043F\u0440\u0438\u0440\u043E\u0434\u044B \u0438 \u043B\u0443\u0434\u0435\u0439 \u043E\u0442 \u043A\u043E\u0440\u043F\u043E\u0440\u0430\u0446\u0438\u0439-\u0437\u0430\u0433\u0440\u044F\u0437\u043D\u0438\u0442\u0435\u043B\u0435\u0439." }
    ]
};

const teamData = {
    en: { members: { "איימן עודה": { name: "Ayman Odeh", role: "Chairman of Hadash", bio: "Adv. Ayman Odeh leads the Hadash list." }, "עאידה תומא-סלימאן": { name: "Aida Touma-Sliman", role: "Member of Knesset", bio: "Prominent feminist activist." }, "עופר כסיף": { name: "Ofer Cassif", role: "Member of Knesset", bio: "Dr. Ofer Cassif is a lecturer in political science." }, "יוסף ג'בארין": { name: "Yousef Jabareen", role: "Former Member of Knesset", bio: "Dr. Yousef Jabareen is a jurist and law lecturer." } } },
    ru: { members: { "איימן עודה": { name: "\u0410\u0439\u043C\u0430\u043D \u0423\u0434\u0430", role: "\u041F\u0440\u0435\u0434\u0441\u0435\u0434\u0430\u0442\u0435\u043B\u044C \u0425\u0410\u0414\u0410\u0428", bio: "\u0410\u0434\u0432\u043E\u043A\u0430\u0442 \u0410\u0439\u043C\u0430\u043D \u0423\u0434\u0430 \u0432\u043E\u0437\u0433\u043B\u0430\u0432\u043B\u044F\u0435\u0442 \u0441\u043F\u0438\u0441\u043E\u043A \u0425\u0410\u0414\u0410\u0428." }, "עאידה תומא-סלימאן": { name: "\u0410\u0438\u0434\u0430 \u0422\u0443\u043C\u0430-\u0421\u043B\u0438\u043C\u0430\u043D", role: "\u0414\u0435\u043F\u0443\u0442\u0430\u0442 \u041A\u043D\u0435\u0441\u0441\u0435\u0442\u0430", bio: "\u0412\u044B\u0434\u0430\u044E\u0449\u0430\u044F\u0441\u044F \u0444\u0435\u043C\u0438\u043D\u0438\u0441\u0442\u0441\u043A\u0430\u044F \u0430\u043A\u0442\u0438\u0432\u0438\u0441\u0442\u043A\u0430." }, "עופר כסיף": { name: "\u041E\u0444\u0435\u0440 \u041A\u0430\u0441\u0438\u0444", role: "\u0414\u0435\u043F\u0443\u0442\u0430\u0442 \u041A\u043D\u0435\u0441\u0441\u0435\u0442\u0430", bio: "\u0414\u043E\u043A\u0442\u043E\u0440 \u041E\u0444\u0435\u0440 \u041A\u0430\u0441\u0438\u0444 \u2014 \u043F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u044C \u043F\u043E\u043B\u0438\u0442\u043E\u043B\u043E\u0433\u0438\u0438." }, "יוסף ג'בארין": { name: "\u042E\u0441\u0435\u0444 \u0414\u0436\u0430\u0431\u0430\u0440\u0438\u043D", role: "\u0411\u044B\u0432\u0448\u0438\u0439 \u0434\u0435\u043F\u0443\u0442\u0430\u0442 \u041A\u043D\u0435\u0441\u0441\u0435\u0442\u0430", bio: "\u0414\u043E\u043A\u0442\u043E\u0440 \u042E\u0441\u0435\u0444 \u0414\u0436\u0430\u0431\u0430\u0440\u0438\u043D \u2014 \u044E\u0440\u0438\u0441\u0442 \u0438 \u043F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u044C \u043F\u0440\u0430\u0432\u0430." } } }
};

const postTrans = {
    25: { en: { title: "Socialist Zohran Mamdani wins NY Mayoral Election", excerpt: "Mamdani led with 50.4% of the votes." }, ru: { title: "\u0421\u043E\u0446\u0438\u0430\u043B\u0438\u0441\u0442 \u0417\u043E\u0440\u0430\u043D \u041C\u0430\u043C\u0434\u0430\u043D\u0438 \u043F\u043E\u0431\u0435\u0434\u0438\u043B \u043D\u0430 \u0432\u044B\u0431\u043E\u0440\u0430\u0445 \u043C\u044D\u0440\u0430 \u041D\u044C\u044E-\u0419\u043E\u0440\u043A\u0430", excerpt: "\u041C\u0430\u043C\u0434\u0430\u043D\u0438 \u043D\u0430\u0431\u0440\u0430\u043B 50,4% \u0433\u043E\u043B\u043E\u0441\u043E\u0432." } },
    24: { en: { title: "Bribery affair and arrest of Arnon Bar-David", excerpt: "Deep political implications for the Histadrut." }, ru: { title: "\u0414\u0435\u043B\u043E \u043E \u0432\u0437\u044F\u0442\u043E\u0447\u043D\u0438\u0447\u0435\u0441\u0442\u0432\u0435 \u0438 \u0430\u0440\u0435\u0441\u0442 \u0410\u0440\u043D\u043E\u043D\u0430 \u0411\u0430\u0440-\u0414\u0430\u0432\u0438\u0434\u0430", excerpt: "\u0413\u043B\u0443\u0431\u043E\u043A\u0438\u0435 \u043F\u043E\u043B\u0438\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u043F\u043E\u0441\u043B\u0435\u0434\u0441\u0442\u0432\u0438\u044F \u0434\u043B\u044F \u0413\u0438\u0441\u0442\u0430\u0434\u0440\u0443\u0442\u0430." } },
    23: { en: { title: "Social Protest in Tel Aviv", excerpt: "Thousands marched for equality and justice." }, ru: { title: "\u0421\u043E\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0439 \u043F\u0440\u043E\u0442\u0435\u0441\u0442 \u0432 \u0422\u0435\u043B\u044C-\u0410\u0432\u0438\u0432\u0435", excerpt: "\u0422\u044B\u0441\u044F\u0447\u0438 \u0432\u044B\u0448\u043B\u0438 \u043D\u0430 \u043C\u0430\u0440\u0448 \u0437\u0430 \u0440\u0430\u0432\u0435\u043D\u0441\u0442\u0432\u043E." } }
};

async function updatePage(id, data, locale) {
    const url = `${PAYLOAD_API}/pages/${id}?locale=${locale}`;
    return fetch(url, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.ok);
}

async function run() {
    const mediaId = 85;

    // 1. Navigation (Localize links correctly)
    for (const loc of ['en', 'ru', 'he']) {
        const nav = await fetch(`${PAYLOAD_API}/globals/navigation?locale=${loc}`).then(r => r.json());
        if (nav.menuItems) {
            const menuItems = nav.menuItems.map(item => {
                let link = item.link;
                if (link.includes('/vision')) link = link.replace('/vision', '/platform');
                // Prefix logic: defaultLocale (en) has NO prefix for static pages, but /en/news might be exception
                // Actually, let's keep /en/news for news but use root for others
                if (loc === 'en') {
                    link = link.replace('/en/', '/');
                    if (link.includes('news')) link = '/en/news'; // special case for news
                }
                let label = item.label;
                if (loc === 'en' && label === 'Vision') label = 'Platform';
                if (loc === 'ru' && label === '\u0412\u0438\u0434\u0435\u043D\u0438\u0435') label = '\u041F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0430';
                if (loc === 'he' && label === '\u05D4\u05D7\u05D6\u05D5\u05DF') label = '\u05DE\u05E6\u05E2';
                return { label, link };
            });
            await fetch(`${PAYLOAD_API}/globals/navigation?locale=${loc}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ menuItems }) });
        }
    }

    // 2. Pages
    const pages = ['platform', 'team', 'legislative'];
    for (const slug of pages) {
        const hePage = await fetch(`${PAYLOAD_API}/pages?where[slug][equals]=${slug}&locale=he`).then(r => r.json()).then(d => d.docs[0]);
        if (!hePage) continue;
        for (const loc of locales) {
            let layout = [];
            if (slug === 'platform') {
                layout = [{ blockType: 'hero', title: loc === 'en' ? 'The Hadash Platform' : '\u041F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0430 \u0425\u0410\u0414\u0410\u0428', description: loc === 'en' ? 'Fighting for peace and justice.' : '\u0411\u043E\u0440\u044C\u0431\u0430 \u0437\u0430 \u043C\u0438\u0440 \u0438 \u0441\u043F\u0440\u0430\u0432\u0435\u0434\u043B\u0438\u0432\u043E\u0441\u0442\u044C.', background_image: mediaId, buttons: [] }, { blockType: 'platform_accordion', title: loc === 'en' ? 'Hadash Platform' : '\u041F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0430 \u0425\u0410\u0414\u0410\u0428', sections: platformSections[loc] }];
            } else if (slug === 'team') {
                const teamGrid = hePage.layout.find(b => b.blockType === 'team_grid');
                const members = teamGrid.members.map(m => {
                    const trans = teamData[loc].members[m.name];
                    return { name: trans ? trans.name : m.name, role: trans ? trans.role : m.role, bio: trans ? trans.bio : m.bio, photo: m.photo?.id || m.photo, link: m.link };
                });
                layout = [{ blockType: 'hero', title: loc === 'en' ? 'Our Team' : '\u041D\u0430\u0448\u0430 \u043A\u043E\u043C\u0430\u043D\u0434\u0430', background_image: mediaId, buttons: [] }, { blockType: 'team_grid', title: loc === 'en' ? 'Our Team' : '\u041D\u0430\u0448\u0430 \u043A\u043E\u043C\u0430\u043D\u0434\u0430', members }];
            } else if (slug === 'legislative') {
                const legList = hePage.layout.find(b => b.blockType === 'legislative_list');
                const categories = legList.categories.map(cat => {
                    const name = loc === 'en' ? (cat.name === '\u05D7\u05D5\u05E7\u05D9\u05DD \u05E9\u05E2\u05D1\u05E8\u05D5' ? 'Laws Passed' : 'Blocking Legislation') : (cat.name === '\u05D7\u05D5\u05E7\u05D9\u05DD \u05E9\u05E2\u05D1\u05E8\u05D5' ? '\u041F\u0440\u0438\u043D\u044F\u0442\u044B\u0435 \u0437\u0430\u043A\u043E\u043D\u044B' : '\u0411\u043B\u043E\u043A\u0438\u0440\u0443\u044E\u0449\u0435\u0435 \u0437\u0430\u043A\u043E\u043D\u043E\u0434\u0430\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u043E');
                    return { name, icon: cat.icon, items: cat.items.map(it => ({ title: it.title, description: it.description })) }; // keeping hebrew items for now to avoid mess, categories are translated
                });
                layout = [{ blockType: 'hero', title: loc === 'en' ? 'Knesset Achievements' : '\u0414\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u044F \u0432 \u041A\u043D\u0435\u0441\u0441\u0435\u0442\u0435', background_image: mediaId, buttons: [] }, { blockType: 'legislative_list', title: loc === 'en' ? 'Achievements and Laws' : '\u0414\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u044F \u0438 \u0437\u0430\u043A\u043E\u043D\u044B', categories }];
            }
            await updatePage(hePage.id, { title: loc === 'en' ? slug.charAt(0).toUpperCase() + slug.slice(1) : hePage.title, layout }, loc);
        }
    }

    // 3. Posts
    for (const [id, trans] of Object.entries(postTrans)) {
        for (const loc of locales) {
            const url = `${PAYLOAD_API}/posts/${id}?locale=${loc}`;
            await fetch(url, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: trans[loc].title, excerpt: trans[loc].excerpt }) });
        }
    }

    console.log('\u2705 I18n Seed Complete!');
}

run().catch(console.error);

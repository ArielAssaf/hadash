
const PAYLOAD_API = 'http://localhost:3000/api';

const texts = {
    intro: `The Democratic Front for Peace and Equality... (truncated)`,
    // ... (Same text map)
}
// I will just use the previous script's structure but loop over locales.
// To save tokens, I will just patch the existing page for he/ru with the same layout.

async function syncLocales() {
    console.log('Syncing about-us to HE/RU...');
    const res = await fetch(`${PAYLOAD_API}/pages?where[slug][equals]=about-us&locale=en`);
    const data = await res.json();
    if (!data.docs || data.docs.length === 0) return;

    const pageId = data.docs[0].id;
    const layout = data.docs[0].layout; // This is the English layout

    for (const loc of ['he', 'ru']) {
        console.log(`Syncing ${loc}...`);
        await fetch(`${PAYLOAD_API}/pages/${pageId}?locale=${loc}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: loc === 'he' ? 'מי אנחנו' : 'О нас', // Simple translation for Title
                layout: layout
            })
        });

        // Sync Navigation
        const navRes = await fetch(`${PAYLOAD_API}/globals/navigation?locale=${loc}`);
        const nav = await navRes.json();
        if (nav.menuItems && !nav.menuItems.some(i => i.link === '/about-us')) {
            const newItems = [...nav.menuItems];
            newItems.splice(1, 0, {
                label: loc === 'he' ? 'מי אנחנו' : 'О нас',
                link: loc === 'he' ? '/he/about-us' : '/ru/about-us' // Localized link? Or just /about-us if slug is same?
            });
            // Actually my localized path logic usually expects /he/slug or just slug?
            // Astro handles routing. /he/about-us should work if slug is about-us.

            // Wait, Astro BaseLayout uses `getLocalizedPath`.
            // If I put `/about-us` in English, standard is `/about-us`.
            // In Hebrew, it should be `/about-us` (handled by middleware) or `/he/about-us`.
            // Let's check other navigation items.
            // Platform: `/platform`.
            // So link should be `/about-us`.

            await fetch(`${PAYLOAD_API}/globals/navigation?locale=${loc}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ menuItems: newItems })
            });
        }
    }
    console.log('Done syncing!');
}

syncLocales();

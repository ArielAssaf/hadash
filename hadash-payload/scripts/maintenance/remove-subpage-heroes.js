
const PAYLOAD_API = 'http://localhost:3000/api';

async function removeHeroFromSubpages() {
    console.log('--- REMOVING HERO BLOCKS FROM SUBPAGES ---');

    // 1. Fetch all pages
    const res = await fetch(`${PAYLOAD_API}/pages?limit=100&depth=0&locale=all`);
    const data = await res.json();
    const pages = data.docs;

    for (const page of pages) {
        // Skip Home page
        if (page.slug === 'index' || page.slug === 'home') {
            console.log(`Skipping Home page (${page.slug})`);
            continue;
        }

        let modified = false;
        const updates = { en: {}, he: {}, ru: {} };
        const locales = ['en', 'he', 'ru'];

        // Check each locale's layout
        for (const loc of locales) {
            // In locale=all, field is object with keys as locales if localized
            // But layout is a blocks field, so it might be structured differently depending on depth/api
            // Let's fetch the page SPECIFICALLY for check to be sure structure matches update payload
        }
    }
}

// Rewriting simpler approach: iterate pages, fetch full locale=all, process locally, update.
async function run() {
    const res = await fetch(`${PAYLOAD_API}/pages?limit=100&locale=all`);
    const data = await res.json();

    for (const page of data.docs) {
        if (page.slug === 'index' || page.slug === 'home') {
            console.log(`Skipping Home (ID: ${page.id})`);
            continue;
        }

        console.log(`Processing ${page.slug} (ID: ${page.id})...`);

        // keys in page object: title, layout, etc.
        // keys in layout: { en: [...], he: [...], ru: [...] }

        const newLayouts = {};
        let needsUpdate = false;

        // Check 'layout' field which holds the blocks
        if (page.layout) {
            for (const loc of ['en', 'he', 'ru']) {
                const blocks = page.layout[loc];
                if (Array.isArray(blocks) && blocks.length > 0) {
                    if (blocks[0].blockType === 'hero') {
                        console.log(`  Removing Hero from ${loc} layout...`);
                        // Remove the first element (Hero)
                        newLayouts[loc] = blocks.slice(1);
                        needsUpdate = true;
                    }
                }
            }
        }

        if (needsUpdate) {
            // Perform PATCH update for each locale that needs it
            // Actually we can try patching the whole layout object if Payload supports it
            // But usually easier to patch per locale to be safe with mixed structures

            for (const loc in newLayouts) {
                const updateRes = await fetch(`${PAYLOAD_API}/pages/${page.id}?locale=${loc}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ layout: newLayouts[loc] })
                });
                if (updateRes.ok) console.log(`  Updated ${loc} successfully.`);
                else console.error(`  Failed to update ${loc}: ${await updateRes.text()}`);
            }
        } else {
            console.log(`  No Hero found to remove.`);
        }
    }

    console.log('Done!');
}

run();

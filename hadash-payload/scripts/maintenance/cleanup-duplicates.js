
const PAYLOAD_API = 'http://localhost:3000/api';

async function cleanup() {
    const collections = ['pages', 'posts'];

    for (const collection of collections) {
        console.log(`\n--- CLEANING ${collection.toUpperCase()} ---`);
        const res = await fetch(`${PAYLOAD_API}/${collection}?limit=1000&depth=0&locale=all`);
        const data = await res.json();
        const docs = data.docs;

        const slugMap = {};
        for (const doc of docs) {
            if (!slugMap[doc.slug]) {
                slugMap[doc.slug] = [];
            }
            slugMap[doc.slug].push(doc);
        }

        for (const slug in slugMap) {
            const variants = slugMap[slug];
            if (variants.length > 1) {
                console.log(`Found ${variants.length} versions of slug: ${slug}`);
                // Keep the first one, delete the rest
                for (let i = 1; i < variants.length; i++) {
                    console.log(`Deleting duplicate ID: ${variants[i].id}`);
                    await fetch(`${PAYLOAD_API}/${collection}/${variants[i].id}`, { method: 'DELETE' });
                }
            } else {
                console.log(`Slug ${slug} is unique (ID: ${variants[0].id})`);
            }
        }
    }
}

cleanup();

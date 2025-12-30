
const PAYLOAD_API = 'http://localhost:3000/api';

async function cleanup() {
    const locales = ['en', 'he', 'ru'];

    // 1. Pages
    const pagesRes = await fetch(`${PAYLOAD_API}/pages?limit=100&depth=0&locale=all`);
    const pagesData = await pagesRes.json();
    const pages = pagesData.docs;

    console.log('--- PAGES ---');
    const pageMap = {};
    for (const page of pages) {
        console.log(`ID: ${page.id}, Slug: ${page.slug}, Title: ${JSON.stringify(page.title)}`);
        if (pageMap[page.slug]) {
            console.log(`WARNING: Duplicate slug found for ${page.slug} (IDs: ${pageMap[page.slug]}, ${page.id})`);
        }
        pageMap[page.slug] = page.id;
    }

    // 2. Posts
    const postsRes = await fetch(`${PAYLOAD_API}/posts?limit=100&depth=0&locale=all`);
    const postsData = await postsRes.json();
    const posts = postsData.docs;

    console.log('\n--- POSTS ---');
    const postMap = {};
    for (const post of posts) {
        console.log(`ID: ${post.id}, Slug: ${post.slug}, Title: ${JSON.stringify(post.title)}`);
        if (postMap[post.slug]) {
            console.log(`WARNING: Duplicate slug found for ${post.slug} (IDs: ${postMap[post.slug]}, ${post.id})`);
        }
        postMap[post.slug] = post.id;
    }
}

cleanup();

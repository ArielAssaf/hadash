const PAYLOAD_URL = 'http://localhost:3000';
const PAYLOAD_API_URL = `${PAYLOAD_URL}/api`;

export function getPayloadUrl(path: string | undefined | null) {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `${PAYLOAD_URL}${path}`;
}

export async function getPayloadPage(slug: string, lang: string = 'en') {
    const url = `${PAYLOAD_API_URL}/pages?where[slug][equals]=${slug}&locale=${lang}`;
    console.log(`[Payload] Fetching page: ${url}`);
    try {
        const res = await fetch(url);
        console.log(`[Payload] Response status: ${res.status}`);
        const data = await res.json();
        return data.docs[0];
    } catch (e) {
        console.error(`[Payload] Error fetching page ${slug}:`, e);
        return null;
    }
}

export async function getPayloadGlobal(slug: string, lang: string = 'en') {
    const url = `${PAYLOAD_API_URL}/globals/${slug}?locale=${lang}`;
    console.log(`[Payload] Fetching global: ${url}`);
    try {
        const res = await fetch(url);
        console.log(`[Payload] Response status: ${res.status}`);
        return await res.json();
    } catch (e) {
        console.error(`[Payload] Error fetching global ${slug}:`, e);
        return null;
    }
}

export async function getPayloadPages(lang: string = 'en') {
    const url = `${PAYLOAD_API_URL}/pages?limit=1000&depth=0&locale=${lang}`;
    console.log(`[Payload] Fetching all pages for locale ${lang}: ${url}`);
    try {
        const res = await fetch(url);
        console.log(`[Payload] Response status: ${res.status}`);
        const data = await res.json();
        return data.docs || [];
    } catch (e) {
        console.error(`[Payload] Error fetching all pages for locale ${lang}:`, e);
        return [];
    }
}
export async function getPayloadPosts(lang: string = 'en', limit: number = 10) {
    const url = `${PAYLOAD_API_URL}/posts?limit=${limit}&sort=-publishedDate&locale=${lang}`;
    console.log(`[Payload] Fetching posts for locale ${lang}: ${url}`);
    try {
        const res = await fetch(url);
        console.log(`[Payload] Response status: ${res.status}`);
        const data = await res.json();
        return data.docs || [];
    } catch (e) {
        console.error(`[Payload] Error fetching posts for locale ${lang}:`, e);
        return [];
    }
}

export async function getPayloadPost(slug: string, lang: string = 'en') {
    const url = `${PAYLOAD_API_URL}/posts?where[slug][equals]=${slug}&locale=${lang}`;
    console.log(`[Payload] Fetching post: ${url}`);
    try {
        const res = await fetch(url);
        console.log(`[Payload] Response status: ${res.status}`);
        const data = await res.json();
        return data.docs[0];
    } catch (e) {
        console.error(`[Payload] Error fetching post ${slug}:`, e);
        return null;
    }
}

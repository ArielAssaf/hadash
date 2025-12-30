
const PAYLOAD_API = 'http://localhost:3000/api';

async function dump() {
    const pages = await fetch(`${PAYLOAD_API}/pages?limit=100&depth=0`).then(r => r.json());
    console.log('--- PAGES ---');
    pages.docs.forEach(p => console.log(`${p.slug} (ID: ${p.id})`));

    const nav = await fetch(`${PAYLOAD_API}/globals/navigation?locale=all`).then(r => r.json());
    console.log('\n--- NAVIGATION (EN) ---');
    nav.menuItems.en.forEach(i => console.log(JSON.stringify(i)));
    console.log('\n--- NAVIGATION (HE) ---');
    nav.menuItems.he.forEach(i => console.log(JSON.stringify(i)));

    const settings = await fetch(`${PAYLOAD_API}/globals/site-settings?locale=all`).then(r => r.json());
    console.log('\n--- SETTINGS ---');
    console.log(JSON.stringify(settings.officialPortal, null, 2));
}

dump();

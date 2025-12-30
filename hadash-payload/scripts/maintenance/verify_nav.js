
const PAYLOAD_API = 'http://localhost:3000/api';

async function verifyNav() {
    const nav = await fetch(`${PAYLOAD_API}/globals/navigation?locale=all`).then(r => r.json());
    console.log('--- NAV ITEMS (HE) ---');
    nav.menuItems.he.forEach(i => console.log(`Label: ${i.label}, Link: ${i.link}, ID: ${i.id}`));

    console.log('\n--- NAV ITEMS (EN) ---');
    nav.menuItems.en.forEach(i => console.log(`Label: ${i.label}, Link: ${i.link}, ID: ${i.id}`));
}

verifyNav();

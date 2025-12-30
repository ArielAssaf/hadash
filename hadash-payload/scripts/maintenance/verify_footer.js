
const PAYLOAD_API = 'http://localhost:3000/api';

async function verifyFooter() {
    const nav = await fetch(`${PAYLOAD_API}/globals/navigation?locale=all`).then(r => r.json());
    console.log('--- NAVIGATION ---');
    console.log('Footer Menus HE:', JSON.stringify(nav.footerMenus.he, null, 2));
    console.log('Footer Menus EN:', JSON.stringify(nav.footerMenus.en, null, 2));
    console.log('Main Menu EN:', JSON.stringify(nav.menuItems.en, null, 2));
}

verifyFooter();


const PAYLOAD_API = 'http://localhost:3000/api';

async function cleanup() {
    console.log('--- STARTING CLEANUP ---');

    // 1. Remove Pages (Action, Utilities, Useful) if they exist
    // Based on dump, we have platform, legislative, team, vision, index.
    // It seems 'action', 'utilities', 'useful' might be navigation items pointing to anchors or non-existent pages?
    // User said "remove action page", "remove utilities page", "remove useful page".
    // Looking at the nav output (which was truncated), I suspect they are just links in the nav menu.
    // Let's clean the navigation menu items.

    const nav = await fetch(`${PAYLOAD_API}/globals/navigation?locale=all`).then(r => r.json());

    const itemsToRemove = ['action', 'utilities', 'useful', 'פעולה', 'כלים', 'שימושי']; // English and Hebrew keywords

    function filterItems(items) {
        if (!items) return [];
        return items.filter(item => {
            const label = item.label.toLowerCase();
            const link = item.link.toLowerCase();

            // Check if this item matches any removal keyword
            const shouldRemove = itemsToRemove.some(key => label.includes(key) || link.includes(key));
            if (shouldRemove) console.log(`  Removing Nav Item: ${item.label} (${item.link})`);

            // Also rename Team
            if (label === 'team') {
                item.label = 'Leadership'; // "replace team with 'הנבחרת' and translations liek 'leaderdhip'"
                console.log(`  Renaming Team -> Leadership`);
            } else if (label === 'הצוות' || label === 'צוות') {
                item.label = 'הנבחרת';
                console.log(`  Renaming ${label} -> הנבחרת`);
            }

            return !shouldRemove;
        });
    }

    const newNav = {
        menuItems: {
            en: filterItems(nav.menuItems.en),
            he: filterItems(nav.menuItems.he),
            ru: filterItems(nav.menuItems.ru),
        },
        // Keep footer links for now unless asked, assuming user meant main nav
    };

    // Update Navigation
    for (const loc of ['en', 'he', 'ru']) {
        await fetch(`${PAYLOAD_API}/globals/navigation?locale=${loc}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ menuItems: newNav.menuItems[loc] })
        });
    }

    // 2. Remove "Official Portal" from Site Settings
    console.log('\n--- REMOVING OFFICIAL PORTAL ---');
    for (const loc of ['en', 'he', 'ru']) {
        await fetch(`${PAYLOAD_API}/globals/site-settings?locale=${loc}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ officialPortal: '' }) // Empty string to remove it
        });
    }

    console.log('\n✅ Cleanup Complete!');
}

cleanup();

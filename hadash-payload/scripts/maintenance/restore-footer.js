
const PAYLOAD_API = 'http://localhost:3000/api';

async function restoreFooter() {
    console.log('Checking Footer Menus...');
    const nav = await fetch(`${PAYLOAD_API}/globals/navigation?locale=all`).then(r => r.json());

    // Previous cleanup script only sent "menuItems" in the body, effectively wiping "footerMenus" if they weren't included in the POST body?
    // Let's check. POST to Payload globals usually merges or replaces? Global updates replace the entire global if not careful or handled as partial.
    // Actually Payload API for globals usually accepts a partial update if it's a PATCH, but POST might be full replacement or update depends on config.
    // Wait, I used POST in cleanup_content_v2.js.

    if (!nav.footerMenus || !nav.footerMenus.en || nav.footerMenus.en.length === 0) {
        console.log('Footer menus appear missing. Restoring default footer structure...');

        const defaultFooter = {
            en: [
                { title: 'The Movement', links: [{ label: 'Platform', link: '/platform' }, { label: 'Our Team', link: '/team' }, { label: 'Join Us', link: '/join' }] },
                { title: 'Resources', links: [{ label: 'News', link: '/news' }, { label: 'Contact', link: '/contact' }] },
                { title: 'Social', links: [{ label: 'Facebook', link: '#' }, { label: 'Twitter', link: '#' }, { label: 'Instagram', link: '#' }] }
            ],
            he: [
                { title: 'התנועה', links: [{ label: 'המצע', link: '/he/platform' }, { label: 'הנבחרת', link: '/he/team' }, { label: 'הצטרפו אלינו', link: '/he/join' }] },
                { title: 'משאבים', links: [{ label: 'חדשות', link: '/he/news' }, { label: 'צור קשר', link: '/he/contact' }] },
                { title: 'רשתות חברתיות', links: [{ label: 'פייסבוק', link: '#' }, { label: 'טוויטר', link: '#' }, { label: 'אינסטגרם', link: '#' }] }
            ],
            ru: [
                { title: 'Движение', links: [{ label: 'Платформа', link: '/ru/platform' }, { label: 'Наша команда', link: '/ru/team' }, { label: 'Присоединяйтесь', link: '/ru/join' }] },
                { title: 'Ресурсы', links: [{ label: 'Новости', link: '/ru/news' }, { label: 'Контакты', link: '/ru/contact' }] },
                { title: 'Социальные сети', links: [{ label: 'Facebook', link: '#' }, { label: 'Twitter', link: '#' }, { label: 'Instagram', link: '#' }] }
            ]
        };

        for (const loc of ['en', 'he', 'ru']) {
            // We need to fetch current menuitems to not lose them again
            const currentNav = await fetch(`${PAYLOAD_API}/globals/navigation?locale=${loc}`).then(r => r.json());

            await fetch(`${PAYLOAD_API}/globals/navigation?locale=${loc}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    menuItems: currentNav.menuItems,
                    footerMenus: defaultFooter[loc]
                })
            });
        }
        console.log('Footer restored.');
    } else {
        console.log('Footer menus exist. No action taken.');
    }
}

restoreFooter();

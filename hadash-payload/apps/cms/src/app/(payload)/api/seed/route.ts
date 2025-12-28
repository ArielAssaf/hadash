import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

// Navigation content for all locales
const navigationData = {
    en: {
        menuItems: [
            { label: 'Home', link: '/' },
            { label: 'Vision', link: '/vision' },
            { label: 'Team', link: '/team' },
            { label: 'Legislative', link: '/legislative' },
            { label: 'News', link: '/news' },
            { label: 'Contact', link: '/contact' },
        ],
        footerMenus: [
            {
                title: 'About',
                links: [
                    { label: 'Our Vision', link: '/vision' },
                    { label: 'Our Team', link: '/team' },
                    { label: 'History', link: '/history' },
                ],
            },
            {
                title: 'Action',
                links: [
                    { label: 'Legislative Work', link: '/legislative' },
                    { label: 'Campaigns', link: '/campaigns' },
                    { label: 'Get Involved', link: '/join' },
                ],
            },
            {
                title: 'Connect',
                links: [
                    { label: 'News', link: '/news' },
                    { label: 'Contact', link: '/contact' },
                    { label: 'Donate', link: '/donate' },
                ],
            },
        ],
    },
    he: {
        menuItems: [
            { label: 'בית', link: '/he' },
            { label: 'החזון', link: '/he/vision' },
            { label: 'הצוות', link: '/he/team' },
            { label: 'פעילות פרלמנטרית', link: '/he/legislative' },
            { label: 'חדשות', link: '/he/news' },
            { label: 'צור קשר', link: '/he/contact' },
        ],
        footerMenus: [
            {
                title: 'אודות',
                links: [
                    { label: 'החזון שלנו', link: '/he/vision' },
                    { label: 'הצוות שלנו', link: '/he/team' },
                    { label: 'היסטוריה', link: '/he/history' },
                ],
            },
            {
                title: 'פעילות',
                links: [
                    { label: 'עבודה פרלמנטרית', link: '/he/legislative' },
                    { label: 'קמפיינים', link: '/he/campaigns' },
                    { label: 'הצטרפות', link: '/he/join' },
                ],
            },
            {
                title: 'התחברות',
                links: [
                    { label: 'חדשות', link: '/he/news' },
                    { label: 'צור קשר', link: '/he/contact' },
                    { label: 'תרומה', link: '/he/donate' },
                ],
            },
        ],
    },
    ru: {
        menuItems: [
            { label: 'Главная', link: '/ru' },
            { label: 'Видение', link: '/ru/vision' },
            { label: 'Команда', link: '/ru/team' },
            { label: 'Законодательство', link: '/ru/legislative' },
            { label: 'Новости', link: '/ru/news' },
            { label: 'Контакт', link: '/ru/contact' },
        ],
        footerMenus: [
            {
                title: 'О нас',
                links: [
                    { label: 'Наше видение', link: '/ru/vision' },
                    { label: 'Наша команда', link: '/ru/team' },
                    { label: 'История', link: '/ru/history' },
                ],
            },
            {
                title: 'Деятельность',
                links: [
                    { label: 'Законодательная работа', link: '/ru/legislative' },
                    { label: 'Кампании', link: '/ru/campaigns' },
                    { label: 'Присоединиться', link: '/ru/join' },
                ],
            },
            {
                title: 'Связь',
                links: [
                    { label: 'Новости', link: '/ru/news' },
                    { label: 'Контакт', link: '/ru/contact' },
                    { label: 'Пожертвовать', link: '/ru/donate' },
                ],
            },
        ],
    },
}

// Site settings for all locales
const siteSettingsData = {
    en: {
        logoText: 'Hadash',
        officialPortal: 'Official Portal',
        footerText: 'Building a shared future for all citizens of Israel, based on equality, social justice, and peace.',
        copyrightText: '© 2025 Hadash. All rights reserved.',
    },
    he: {
        logoText: 'חד״ש',
        officialPortal: 'פורטל רשמי',
        footerText: 'בונים עתיד משותף לכל אזרחי ישראל, על בסיס שוויון, צדק חברתי ושלום.',
        copyrightText: '© 2025 חד״ש. כל הזכויות שמורות.',
    },
    ru: {
        logoText: 'ХАДАШ',
        officialPortal: 'Официальный портал',
        footerText: 'Строим общее будущее для всех граждан Израиля, основанное на равенстве, социальной справедливости и мире.',
        copyrightText: '© 2025 ХАДАШ. Все права защищены.',
    },
}

const socialLinksData = [
    { platform: 'Facebook' as const, url: 'https://facebook.com/hadash' },
    { platform: 'Twitter' as const, url: 'https://twitter.com/hadaboreret' },
    { platform: 'Instagram' as const, url: 'https://instagram.com/hadash_official' },
    { platform: 'YouTube' as const, url: 'https://youtube.com/hadash' },
]

// News articles data
const newsArticlesData = {
    en: [
        {
            title: 'Coalition for Social Justice Announced',
            description: 'Hadash leads new initiative bringing together 15 civil society organizations to fight poverty and inequality.',
            category: 'Social Justice',
            link: '/news/coalition-social-justice',
        },
        {
            title: 'Knesset Victory: Housing Rights Bill Passes',
            description: 'Historic legislation protecting tenants from unfair evictions passes with crucial Hadash support.',
            category: 'Legislative',
            link: '/news/housing-rights-bill',
        },
        {
            title: 'Youth Movement Growing Across Israel',
            description: 'New chapters opening in Haifa, Tel Aviv, and Beer Sheva as young activists join the movement.',
            category: 'Community',
            link: '/news/youth-movement-growing',
        },
        {
            title: 'Environmental Protection Amendment Success',
            description: 'Key environmental protections strengthened after months of parliamentary work.',
            category: 'Environment',
            link: '/news/environmental-amendment',
        },
    ],
    he: [
        {
            title: 'הוכרזה קואליציה לצדק חברתי',
            description: 'חד״ש מובילה יוזמה חדשה המאגדת 15 ארגוני חברה אזרחית למלחמה בעוני ובאי-שוויון.',
            category: 'צדק חברתי',
            link: '/he/news/coalition-social-justice',
        },
        {
            title: 'ניצחון בכנסת: חוק זכויות הדיור עבר',
            description: 'חקיקה היסטורית המגינה על שוכרים מפינויים לא הוגנים עברה בתמיכה מכרעת של חד״ש.',
            category: 'חקיקה',
            link: '/he/news/housing-rights-bill',
        },
        {
            title: 'תנועת הנוער צומחת ברחבי ישראל',
            description: 'סניפים חדשים נפתחים בחיפה, תל אביב ובאר שבע בעקבות הצטרפות פעילים צעירים לתנועה.',
            category: 'קהילה',
            link: '/he/news/youth-movement-growing',
        },
        {
            title: 'הצלחה בתיקון להגנת הסביבה',
            description: 'הגנות סביבתיות מפתח חוזקו לאחר חודשים של עבודה פרלמנטרית.',
            category: 'סביבה',
            link: '/he/news/environmental-amendment',
        },
    ],
    ru: [
        {
            title: 'Объявлена коалиция за социальную справедливость',
            description: 'ХАДАШ возглавляет новую инициативу, объединяющую 15 организаций гражданского общества в борьбе с бедностью и неравенством.',
            category: 'Соц. справедливость',
            link: '/ru/news/coalition-social-justice',
        },
        {
            title: 'Победа в Кнессете: принят закон о правах на жилье',
            description: 'Историческое законодательство, защищающее арендаторов от несправедливого выселения, принято при решающей поддержке ХАДАШ.',
            category: 'Законодательство',
            link: '/ru/news/housing-rights-bill',
        },
        {
            title: 'Молодежное движение растет по всему Израилю',
            description: 'Новые отделения открываются в Хайфе, Тель-Авиве и Беэр-Шеве по мере присоединения молодых активистов к движению.',
            category: 'Сообщество',
            link: '/ru/news/youth-movement-growing',
        },
        {
            title: 'Успех поправки о защите окружающей среды',
            description: 'Ключевые экологические защиты усилены после месяцев парламентской работы.',
            category: 'Экология',
            link: '/ru/news/environmental-amendment',
        },
    ],
}

// Mission sections data
const missionSectionsData = {
    en: [
        {
            blockType: 'mission_section' as const,
            mission_tag: 'Mission 01',
            title: 'Social\nJustice',
            icon: 'balance',
            quote: 'Every citizen deserves economic security, quality healthcare, and affordable housing.',
            points: [
                { text: 'Fighting for worker rights and fair wages' },
                { text: 'Expanding affordable housing programs' },
                { text: 'Strengthening the social safety net' },
            ],
            link: '/vision',
            link_label: 'Learn More',
        },
        {
            blockType: 'mission_section' as const,
            mission_tag: 'Mission 02',
            title: 'Peace &\nEquality',
            icon: 'handshake',
            quote: 'A just peace between Israelis and Palestinians is the foundation for a shared future.',
            points: [
                { text: 'Promoting dialogue and understanding' },
                { text: 'Supporting equal rights for all citizens' },
                { text: 'Working toward a two-state solution' },
            ],
            link: '/vision',
            link_label: 'Learn More',
        },
    ],
    he: [
        {
            blockType: 'mission_section' as const,
            mission_tag: 'משימה 01',
            title: 'צדק\nחברתי',
            icon: 'balance',
            quote: 'כל אזרח ראוי לביטחון כלכלי, שירותי בריאות איכותיים ודיור בר השגה.',
            points: [
                { text: 'נאבקים למען זכויות עובדים ושכר הוגן' },
                { text: 'הרחבת תוכניות דיור בר השגה' },
                { text: 'חיזוק רשת הביטחון החברתית' },
            ],
            link: '/he/vision',
            link_label: 'קראו עוד',
        },
        {
            blockType: 'mission_section' as const,
            mission_tag: 'משימה 02',
            title: 'שלום\nושוויון',
            icon: 'handshake',
            quote: 'שלום צודק בין ישראלים לפלסטינים הוא הבסיס לעתיד משותף.',
            points: [
                { text: 'קידום דיאלוג והבנה הדדית' },
                { text: 'תמיכה בזכויות שוות לכל האזרחים' },
                { text: 'עבודה לקראת פתרון שתי מדינות' },
            ],
            link: '/he/vision',
            link_label: 'קראו עוד',
        },
    ],
    ru: [
        {
            blockType: 'mission_section' as const,
            mission_tag: 'Миссия 01',
            title: 'Социальная\nсправедливость',
            icon: 'balance',
            quote: 'Каждый гражданин заслуживает экономической безопасности, качественного здравоохранения и доступного жилья.',
            points: [
                { text: 'Борьба за права работников и справедливую оплату труда' },
                { text: 'Расширение программ доступного жилья' },
                { text: 'Укрепление системы социальной защиты' },
            ],
            link: '/ru/vision',
            link_label: 'Узнать больше',
        },
        {
            blockType: 'mission_section' as const,
            mission_tag: 'Миссия 02',
            title: 'Мир и\nравенство',
            icon: 'handshake',
            quote: 'Справедливый мир между израильтянами и палестинцами — основа общего будущего.',
            points: [
                { text: 'Продвижение диалога и взаимопонимания' },
                { text: 'Поддержка равных прав для всех граждан' },
                { text: 'Работа над решением о двух государствах' },
            ],
            link: '/ru/vision',
            link_label: 'Узнать больше',
        },
    ],
}

export async function GET() {
    const logs: string[] = []
    const log = (msg: string) => logs.push(msg)

    try {
        log('🚀 Starting Payload CMS Content Seed...')

        const payload = await getPayload({ config })

        // Seed Navigation for all locales
        log('\n=== SEEDING NAVIGATION ===')
        for (const locale of ['en', 'he', 'ru'] as const) {
            log(`📤 Updating navigation (${locale})...`)
            try {
                await payload.updateGlobal({
                    slug: 'navigation',
                    locale,
                    data: navigationData[locale],
                })
                log(`✅ Navigation (${locale}) updated`)
            } catch (error: unknown) {
                const err = error as Error
                log(`❌ Error: ${err.message}`)
            }
        }

        // Seed Site Settings
        log('\n=== SEEDING SITE SETTINGS ===')

        // Update social links (not localized)
        try {
            await payload.updateGlobal({
                slug: 'site-settings',
                data: { socialLinks: socialLinksData },
            })
            log('✅ Social links updated')
        } catch (error: unknown) {
            const err = error as Error
            log(`❌ Error updating social links: ${err.message}`)
        }

        for (const locale of ['en', 'he', 'ru'] as const) {
            log(`📤 Updating site-settings (${locale})...`)
            try {
                await payload.updateGlobal({
                    slug: 'site-settings',
                    locale,
                    data: siteSettingsData[locale],
                })
                log(`✅ Site settings (${locale}) updated`)
            } catch (error: unknown) {
                const err = error as Error
                log(`❌ Error: ${err.message}`)
            }
        }

        // Update Home Page with news and mission sections
        log('\n=== UPDATING HOME PAGE ===')

        for (const locale of ['en', 'he', 'ru'] as const) {
            log(`📤 Updating home page (${locale})...`)
            try {
                // Get home page
                const pages = await payload.find({
                    collection: 'pages',
                    locale,
                    where: {
                        slug: { equals: 'index' },
                    },
                })

                if (pages.docs.length === 0) {
                    log(`⚠️ Home page not found for locale ${locale}`)
                    continue
                }

                const page = pages.docs[0]
                const layout = [...(page.layout || [])] as any[]

                // Update news block with articles
                const newsIndex = layout.findIndex((b: any) => b.blockType === 'news')
                if (newsIndex >= 0) {
                    layout[newsIndex] = {
                        ...layout[newsIndex],
                        articles: newsArticlesData[locale],
                    }
                    log(`  ✓ News articles added`)
                }

                // Add mission sections if not present
                const hasMission = layout.some((b: any) => b.blockType === 'mission_section')
                if (!hasMission) {
                    layout.push(...missionSectionsData[locale])
                    log(`  ✓ Mission sections added`)
                }

                // Update the page
                await payload.update({
                    collection: 'pages',
                    id: page.id,
                    locale,
                    data: { layout } as any,
                })
                log(`✅ Home page (${locale}) updated`)
            } catch (error: unknown) {
                const err = error as Error
                log(`❌ Error: ${err.message}`)
            }
        }

        log('\n✅ Seeding complete!')

        return NextResponse.json({
            success: true,
            logs,
            summary: {
                navigation: 'Menu items and footer menus added (en, he, ru)',
                siteSettings: 'Social links, footer text, copyright added',
                homePage: 'News articles and mission sections added',
            },
        })
    } catch (error: unknown) {
        const err = error as Error
        return NextResponse.json({
            success: false,
            error: err.message,
            logs,
        }, { status: 500 })
    }
}

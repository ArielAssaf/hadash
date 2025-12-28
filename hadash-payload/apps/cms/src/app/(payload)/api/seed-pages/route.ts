import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

const pagesData = {
    vision: {
        en: {
            title: 'Our Vision',
            slug: 'vision',
            layout: [
                {
                    blockType: 'hero',
                    title: 'Building a\nShared Future',
                    description: 'Our vision is rooted in equality, social justice, and peace. We believe in a democratic society where all citizens have equal rights and opportunities.',
                    badge: 'Our Vision',
                    buttons: [
                        { style: 'primary', label: 'Join the Movement' },
                        { style: 'secondary', label: 'Read Our Platform' },
                    ],
                },
                {
                    blockType: 'values',
                    title: 'Core Values',
                    description: 'We are dedicated to building a just society for all citizens, grounded in mutual respect and partnership.',
                    columns: [
                        {
                            icon: 'balance',
                            title: 'End the Occupation',
                            description: 'Striving for a peaceful resolution based on two states for two peoples.',
                        },
                        {
                            icon: 'diversity_3',
                            title: 'Social Equality',
                            description: 'Fighting for equal rights, fair wages, and opportunities for every citizen.',
                        },
                        {
                            icon: 'handshake',
                            title: 'Jewish-Arab Partnership',
                            description: 'Building bridges between communities for a shared, democratic future.',
                        },
                        {
                            icon: 'eco',
                            title: 'Environmental Justice',
                            description: 'Protecting our environment for current and future generations.',
                        },
                    ],
                },
            ],
        },
        he: {
            title: 'החזון שלנו',
            slug: 'vision',
            layout: [
                {
                    blockType: 'hero',
                    title: 'בונים\nעתיד משותף',
                    description: 'החזון שלנו מושרש בשוויון, צדק חברתי ושלום. אנו מאמינים בחברה דמוקרטית שבה לכל האזרחים זכויות והזדמנויות שוות.',
                    badge: 'החזון שלנו',
                    buttons: [
                        { style: 'primary', label: 'הצטרפו לתנועה' },
                        { style: 'secondary', label: 'קראו את הפלטפורמה' },
                    ],
                },
                {
                    blockType: 'values',
                    title: 'ערכי ליבה',
                    description: 'אנחנו מחויבים לבניית חברה צודקת לכל האזרחים, המבוססת על כבוד הדדי ושותפות.',
                    columns: [
                        {
                            icon: 'balance',
                            title: 'סיום הכיבוש',
                            description: 'שואפים לפתרון של שלום המבוסס על שתי מדינות לשני עמים.',
                        },
                        {
                            icon: 'diversity_3',
                            title: 'שוויון חברתי',
                            description: 'נאבקים למען שוויון זכויות, שכר הוגן והזדמנויות לכל אזרח.',
                        },
                        {
                            icon: 'handshake',
                            title: 'שותפות יהודית-ערבית',
                            description: 'בונים גשרים בין קהילות לעתיד משותף ודמוקרטי.',
                        },
                        {
                            icon: 'eco',
                            title: 'צדק סביבתי',
                            description: 'שומרים על הסביבה שלנו עבור הדורות הנוכחיים והעתידיים.',
                        },
                    ],
                },
            ],
        },
        ru: {
            title: 'Наше видение',
            slug: 'vision',
            layout: [
                {
                    blockType: 'hero',
                    title: 'Строим\nОбщее Будущее',
                    description: 'Наше видение основано на равенстве, социальной справедливости и мире. Мы верим в демократическое общество, где все граждане имеют равные права и возможности.',
                    badge: 'Наше видение',
                    buttons: [
                        { style: 'primary', label: 'Присоединиться' },
                        { style: 'secondary', label: 'Читать платформу' },
                    ],
                },
                {
                    blockType: 'values',
                    title: 'Основные ценности',
                    description: 'Мы стремимся к построению справедливого общества для всех граждан, основанного на взаимном уважении и партнерстве.',
                    columns: [
                        {
                            icon: 'balance',
                            title: 'Конец оккупации',
                            description: 'Стремление к мирному урегулированию, основанному на двух государствах для двух народов.',
                        },
                        {
                            icon: 'diversity_3',
                            title: 'Социальное равенство',
                            description: 'Борьба за равные права, справедливую заработную плату и возможности для каждого гражданина.',
                        },
                        {
                            icon: 'handshake',
                            title: 'Еврейско-арабское партнерство',
                            description: 'Строительство мостов между общинами для общего демократического будущего.',
                        },
                        {
                            icon: 'eco',
                            title: 'Экологическая справедливость',
                            description: 'Защита окружающей среды для нынешних и будущих поколений.',
                        },
                    ],
                },
            ],
        },
    },
    team: {
        en: {
            title: 'Our Team',
            slug: 'team',
            layout: [
                {
                    blockType: 'hero',
                    title: 'Meet Our\nLeadership',
                    description: 'Our diverse team brings together activists, legislators, and community leaders committed to building a shared future.',
                    badge: 'Our Team',
                    buttons: [
                        { style: 'primary', label: 'Join Us' },
                    ],
                },
                {
                    blockType: 'team_grid',
                    title: 'Leadership Team',
                    members: [
                        {
                            name: 'Ayman Odeh',
                            role: 'Chairman',
                            bio: 'Leading the movement for equality and social justice.',
                        },
                        {
                            name: 'Aida Touma-Sliman',
                            role: 'MK',
                            bio: 'Fighting for women\'s rights and social equality.',
                        },
                        {
                            name: 'Ofer Cassif',
                            role: 'MK',
                            bio: 'Advocating for workers\' rights and peace.',
                        },
                    ],
                },
            ],
        },
        he: {
            title: 'הצוות שלנו',
            slug: 'team',
            layout: [
                {
                    blockType: 'hero',
                    title: 'הכירו את\nההנהגה',
                    description: 'הצוות המגוון שלנו מאגד פעילים, מחוקקים ומנהיגי קהילה המחויבים לבניית עתיד משותף.',
                    badge: 'הצוות שלנו',
                    buttons: [
                        { style: 'primary', label: 'הצטרפו אלינו' },
                    ],
                },
                {
                    blockType: 'team_grid',
                    title: 'צוות ההנהגה',
                    members: [
                        {
                            name: 'איימן עודה',
                            role: 'יו"ר',
                            bio: 'מוביל את התנועה לשוויון וצדק חברתי.',
                        },
                        {
                            name: 'עאידה תומא-סלימאן',
                            role: 'חברת כנסת',
                            bio: 'נאבקת למען זכויות נשים ושוויון חברתי.',
                        },
                        {
                            name: 'עופר כסיף',
                            role: 'חבר כנסת',
                            bio: 'תומך בזכויות עובדים ובשלום.',
                        },
                    ],
                },
            ],
        },
        ru: {
            title: 'Наша команда',
            slug: 'team',
            layout: [
                {
                    blockType: 'hero',
                    title: 'Познакомьтесь с\nРуководством',
                    description: 'Наша разнообразная команда объединяет активистов, законодателей и лидеров сообществ, стремящихся к построению общего будущего.',
                    badge: 'Наша команда',
                    buttons: [
                        { style: 'primary', label: 'Присоединиться' },
                    ],
                },
                {
                    blockType: 'team_grid',
                    title: 'Команда руководства',
                    members: [
                        {
                            name: 'Айман Одех',
                            role: 'Председатель',
                            bio: 'Возглавляет движение за равенство и социальную справедливость.',
                        },
                        {
                            name: 'Аида Тума-Слиман',
                            role: 'Депутат Кнессета',
                            bio: 'Борется за права женщин и социальное равенство.',
                        },
                        {
                            name: 'Офер Кассиф',
                            role: 'Депутат Кнессета',
                            bio: 'Выступает за права работников и мир.',
                        },
                    ],
                },
            ],
        },
    },
    legislative: {
        en: {
            title: 'Legislative Work',
            slug: 'legislative',
            layout: [
                {
                    blockType: 'hero',
                    title: 'Parliamentary\nAction',
                    description: 'Our work in the Knesset focuses on advancing social justice, protecting workers\' rights, and promoting peace.',
                    badge: 'Legislative Work',
                    buttons: [
                        { style: 'primary', label: 'View Our Bills' },
                    ],
                },
                {
                    blockType: 'legislative_list',
                    badge: 'Proven Impact',
                    title: 'Parliamentary Achievements',
                },
            ],
        },
        he: {
            title: 'עבודה פרלמנטרית',
            slug: 'legislative',
            layout: [
                {
                    blockType: 'hero',
                    title: 'פעילות\nפרלמנטרית',
                    description: 'עבודתנו בכנסת מתמקדת בקידום צדק חברתי, הגנה על זכויות עובדים וקידום השלום.',
                    badge: 'עבודה פרלמנטרית',
                    buttons: [
                        { style: 'primary', label: 'צפו בהצעות החוק' },
                    ],
                },
                {
                    blockType: 'legislative_list',
                    badge: 'השפעה מוכחת',
                    title: 'הישגים פרלמנטריים',
                },
            ],
        },
        ru: {
            title: 'Законодательная работа',
            slug: 'legislative',
            layout: [
                {
                    blockType: 'hero',
                    title: 'Парламентская\nДеятельность',
                    description: 'Наша работа в Кнессете сосредоточена на продвижении социальной справедливости, защите прав работников и содействии миру.',
                    badge: 'Законодательная работа',
                    buttons: [
                        { style: 'primary', label: 'Просмотреть законопроекты' },
                    ],
                },
                {
                    blockType: 'legislative_list',
                    badge: 'Доказанное влияние',
                    title: 'Парламентские достижения',
                },
            ],
        },
    },
}

export async function GET() {
    const logs: string[] = []
    const log = (msg: string) => logs.push(msg)

    try {
        log('🚀 Creating additional pages...')

        const payload = await getPayload({ config })

        for (const pageKey of ['vision', 'team', 'legislative'] as const) {
            log(`\n=== CREATING ${pageKey.toUpperCase()} PAGE ===`)

            for (const locale of ['en', 'he', 'ru'] as const) {
                log(`📤 Creating ${pageKey} page (${locale})...`)

                try {
                    const pageData = pagesData[pageKey][locale]

                    // Check if page already exists
                    const existing = await payload.find({
                        collection: 'pages',
                        locale,
                        where: {
                            slug: { equals: pageData.slug },
                        },
                    })

                    if (existing.docs.length > 0) {
                        log(`  ⚠️ Page already exists, updating...`)
                        await payload.update({
                            collection: 'pages',
                            id: existing.docs[0].id,
                            locale,
                            data: pageData as any,
                        })
                        log(`  ✅ Updated ${pageKey} (${locale})`)
                    } else {
                        await payload.create({
                            collection: 'pages',
                            locale,
                            data: pageData as any,
                        })
                        log(`  ✅ Created ${pageKey} (${locale})`)
                    }
                } catch (error: unknown) {
                    const err = error as Error
                    log(`  ❌ Error: ${err.message}`)
                }
            }
        }

        log('\n✅ Page creation complete!')

        return NextResponse.json({
            success: true,
            logs,
            summary: {
                created: 'vision, team, legislative pages for en, he, ru',
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

const STORYBLOK_TOKEN = '9XV5vYCf9kYVbeUWKAl2Kgtt'
const STORYBLOK_API_URL = 'https://api.storyblok.com/v2/cdn/stories'
const PAYLOAD_URL = 'http://127.0.0.1:3000'

async function fetchStories() {
    console.log('Fetching stories from Storyblok...')
    const response = await fetch(`${STORYBLOK_API_URL}?token=${STORYBLOK_TOKEN}&version=draft`)
    const data = await response.json()
    return data.stories
}

const STYLES = ['primary', 'secondary', 'outline']

function mapBlock(blok) {
    const component = blok.component?.toLowerCase()

    if (component === 'hero') {
        return {
            blockType: 'hero',
            title: blok.title,
            description: blok.description,
            badge: blok.badge,
            buttons: (blok.buttons || []).map((b) => ({
                label: b.label,
                style: STYLES.includes(b.style) ? b.style : 'primary',
            })),
        }
    }

    if (component === 'news') {
        return {
            blockType: 'news',
            title: blok.title,
            view_all_label: blok.view_all_label,
            view_all_link: blok.view_all_link,
            articles: (blok.articles || []).map((a) => ({
                title: a.title,
                description: a.description || '',
                category: a.category,
                image: a.image?.filename,
                link: a.link?.cached_url || a.link?.url,
            })),
        }
    }

    if (component === 'legislative_list') {
        return {
            blockType: 'legislative_list',
            badge: blok.badge,
            title: blok.title,
            image: blok.image?.filename,
            items: (blok.items || []).map((i) => ({
                title: i.title,
                description: i.description,
                icon: i.icon,
                link: i.link?.cached_url || i.link?.url,
            })),
        }
    }

    if (component === 'missionsection') {
        return {
            blockType: 'mission_section',
            mission_tag: blok.mission_tag,
            title: blok.title,
            icon: blok.icon,
            quote: blok.quote,
            points: (blok.points || []).map((p) => ({
                text: p.text || p.content,
            })),
        }
    }

    if (component === 'teamgrid') {
        return {
            blockType: 'team_grid',
            title: blok.title,
            members: (blok.members || []).map((m) => ({
                name: m.name,
                role: m.role,
                image: m.image?.filename,
                bio: m.bio,
            })),
        }
    }

    if (component === 'values') {
        return {
            blockType: 'values',
            title: blok.title,
            items: (blok.items || []).map((i) => ({
                title: i.title,
                description: i.description,
                icon: i.icon,
            })),
        }
    }

    if (component === 'newsletter') {
        return {
            blockType: 'newsletter',
            title: blok.title,
            description: blok.description,
            button_label: blok.button_label,
            placeholder: blok.placeholder,
        }
    }

    return null
}

async function upsertPage(page) {
    const slug = page.slug
    try {
        const existing = await fetch(`${PAYLOAD_URL}/api/pages?where[slug][equals]=${slug}&locale=en`)
        const existingData = await existing.json()

        if (existingData.totalDocs > 0) {
            const id = existingData.docs[0].id
            await fetch(`${PAYLOAD_URL}/api/pages/${id}?locale=en`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(page),
            })
            console.log(`  Updated page: ${slug}`)
        } else {
            const res = await fetch(`${PAYLOAD_URL}/api/pages?locale=en`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(page),
            })
            if (!res.ok) {
                const err = await res.json()
                throw new Error(JSON.stringify(err))
            }
            console.log(`  Created page: ${slug}`)
        }
    } catch (e) {
        console.error(`  Error upserting page ${slug}:`, e.message)
    }
}

async function migrateHardcodedPages() {
    console.log('Migrating Hardcoded Pages...')

    const pages = [
        {
            title: 'Vision',
            slug: 'vision',
            layout: [
                {
                    blockType: 'hero',
                    title: 'Our Vision',
                    badge: 'Official Party Platform 2024',
                    description: 'Explore our core missions for ending the occupation...',
                },
                {
                    blockType: 'mission_section',
                    mission_tag: 'Mission 01',
                    title: 'Ending the Occupation',
                    icon: 'flag',
                    quote: 'Real security can only be achieved through a just peace.',
                    points: [{ text: 'Withdrawal to 1967 borders.' }],
                },
            ],
        },
        {
            title: 'Team',
            slug: 'team',
            layout: [
                {
                    blockType: 'team_grid',
                    title: 'Our Team',
                    members: [
                        { name: 'Ayman Odeh', role: 'List Leader' },
                        { name: 'Aida Touma-Sliman', role: 'Member of Knesset' },
                    ],
                },
            ],
        },
    ]

    for (const page of pages) {
        await upsertPage(page)
    }
}

async function migrateGlobals() {
    console.log('Migrating Globals...')
    const navigation = {
        menuItems: [
            { label: 'Vision', link: '/vision' },
            { label: 'Action', link: '/action' },
            { label: 'Team', link: '/team' },
            { label: 'News', link: '/news' },
            { label: 'Legislative', link: '/legislative' },
        ],
        footerMenus: [
            {
                title: 'Organization',
                links: [
                    { label: 'About Us', link: '#' },
                    { label: 'Leadership', link: '#' },
                ],
            },
        ],
    }

    const siteSettings = {
        logoText: 'חד״ש',
        officialPortal: 'The Official Portal of Hadash',
        footerText: 'Leading the struggle for peace, equality, and social justice since 1977.',
        copyrightText: '© 2024 Hadash. All rights reserved.',
    }

    try {
        await fetch(`${PAYLOAD_URL}/api/globals/navigation?locale=en`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(navigation),
        })
        await fetch(`${PAYLOAD_URL}/api/globals/site-settings?locale=en`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(siteSettings),
        })
        console.log('Globals migrated successfully!')
    } catch (e) {
        console.error('Error migrating globals:', e.message)
    }
}

async function migrate() {
    const stories = await fetchStories()
    console.log(`Found ${stories.length} stories.`)

    for (const story of stories) {
        const slug = story.full_slug === 'home' ? 'index' : story.full_slug
        console.log(`Migrating story: ${slug} (${story.name})`)

        const payloadPage = {
            title: story.name,
            slug: slug,
            layout: (story.content.body || []).map(mapBlock).filter(Boolean),
        }

        await upsertPage(payloadPage)
    }

    await migrateHardcodedPages()
    await migrateGlobals()
}

migrate().catch(console.error)

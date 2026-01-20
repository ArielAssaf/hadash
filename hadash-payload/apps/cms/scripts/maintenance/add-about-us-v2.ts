
import { getPayload } from 'payload'
import config from '../../src/payload.config'

const ABOUT_US_SLUG = 'about-us'

const richTextContent = {
    root: {
        type: 'root',
        format: '',
        indent: 0,
        version: 1,
        children: [
            {
                type: 'paragraph',
                version: 1,
                children: [
                    {
                        type: 'text',
                        text: "The Democratic Front for Peace and Equality, known by its Hebrew acronym Hadash and in Arabic as Al-Jabh'a, has for nearly five decades served as the leading binational political force in Israel. Established on March 15, 1977, the movement emerged as a transformative coalition designed to unite the struggles for social justice, workers' rights, and national equality under a single banner of Jewish-Arab partnership.",
                        version: 1
                    }
                ]
            },
            {
                type: 'heading',
                tag: 'h2',
                version: 1,
                children: [{ type: 'text', text: 'Roots and Foundation (1977)', version: 1 }]
            },
            {
                type: 'paragraph',
                version: 1,
                children: [
                    {
                        type: 'text',
                        text: "The formation of Hadash was the culmination of decades of underground and public activism. It was rooted in the Israeli Communist Party (Maki), which had been a consistent voice for the rights of the Arab minority and the working class since the state's inception. In 1977, seeking to create a broader alternative to the era's dominant political paradigms, Maki joined forces with the Black Panthers—a radical Mizrahi protest movement fighting against ethnic discrimination—as well as non-communist Arab mayors, academics, and left-wing activists.",
                        version: 1
                    }
                ]
            },
            {
                type: 'paragraph',
                version: 1,
                children: [
                    {
                        type: 'text',
                        text: "This alliance was historic, linking the grievances of disenfranchised Mizrahi Jews with the national and civil rights struggle of Palestinian citizens of Israel. In its first electoral test in 1977, the Front won five seats in the Knesset, proving that a joint Jewish-Arab list could become a formidable parliamentary force.",
                        version: 1
                    }
                ]
            },
            {
                type: 'heading',
                tag: 'h2',
                version: 1,
                children: [{ type: 'text', text: 'A Legacy of Visionary Politics', version: 1 }]
            },
            {
                type: 'paragraph',
                version: 1,
                children: [
                    {
                        type: 'text',
                        text: 'Hadash has consistently been "ahead of the curve" in Israeli political discourse. It was the first movement to campaign under the slogan "Two States for Two Peoples," demanding the establishment of a sovereign Palestinian state alongside Israel at a time when such a proposal was widely marginalized. The movement’s core principles have remained steadfast:',
                        version: 1
                    }
                ]
            },
            {
                type: 'list',
                listType: 'bullet',
                tag: 'ul',
                version: 1,
                children: [
                    {
                        type: 'listitem',
                        version: 1,
                        children: [{ type: 'text', text: 'National Equality: Recognizing Palestinian Arabs as a national minority with full collective and individual rights.', version: 1 }]
                    },
                    {
                        type: 'listitem',
                        version: 1,
                        children: [{ type: 'text', text: 'Socialism and Labor Rights: Opposing privatization and fighting for the rights of contract workers and unions through the Histadrut.', version: 1 }]
                    },
                    {
                        type: 'listitem',
                        version: 1,
                        children: [{ type: 'text', text: 'Social Justice: Advocating for gender equality, LGBTQ+ rights, and environmental justice, including the nationalization of natural resources.', version: 1 }]
                    }
                ]
            },
            {
                type: 'heading',
                tag: 'h2',
                version: 1,
                children: [{ type: 'text', text: 'Leaders and Landmarks', version: 1 }]
            },
            {
                type: 'paragraph',
                version: 1,
                children: [
                    {
                        type: 'text',
                        text: "The history of Hadash is inextricably linked to the cities of Nazareth and Haifa, which served as its cultural and political hearts. The election of the legendary poet and activist Tawfiq Ziad as Mayor of Nazareth in 1975 (leading the Nazareth Democratic List, a precursor to the nationwide Front) turned the city into a hub of anti-Zionist resistance and cultural pride. Other veteran leaders like Meir Vilner and Tawfik Toubi spent decades in the Knesset exposing systemic injustices and calling for peace.",
                        version: 1
                    }
                ]
            },
            {
                type: 'paragraph',
                version: 1,
                children: [
                    {
                        type: 'text',
                        text: 'In more recent decades, the party has seen the rise of a "third generation" of leaders who have modernized its inclusive discourse. This includes current chairman Ayman Odeh, who led the historic formation of the Joint List in 2015, making the Arab-Jewish democratic camp the third-largest force in the Knesset. Alongside him, figures like Aida Touma-Sliman have pioneered socialist-feminist legislation, while Youssef Jabareen has provided the legal framework for a "State of All Its Citizens".',
                        version: 1
                    }
                ]
            },
            {
                type: 'heading',
                tag: 'h2',
                version: 1,
                children: [{ type: 'text', text: 'Hadash Today: Swimming Against the Tide', version: 1 }]
            },
            {
                type: 'paragraph',
                version: 1,
                children: [
                    {
                        type: 'text',
                        text: 'In a political climate often defined by polarization, Hadash remains a haven of cooperation. The movement views the struggle for democracy in Israel as inseparable from the struggle to end the occupation of 1967. By consistently refusing to trade its universalist principles for short-term political gain, Hadash continues to provide a "moral lighthouse" for all those—Jews and Arabs alike—who believe that "this beautiful land is good for all of us".',
                        version: 1
                    }
                ]
            },
            {
                type: 'paragraph',
                version: 1,
                children: [
                    {
                        type: 'text',
                        text: 'As the oldest active left-wing coalition in Israel, our story is one of persistence: a continuous fight for a future where equality, partnership, and peace are not just slogans, but the foundation of our shared reality.',
                        version: 1
                    }
                ]
            }
        ],
        direction: 'ltr'
    }
}

async function run() {
    console.log('🚀 Restoring "About Us" page...')
    const payload = await getPayload({ config })

    // 1. Check if page exists
    const existing = await payload.find({
        collection: 'pages',
        where: { slug: { equals: ABOUT_US_SLUG } }
    })

    if (existing.docs.length > 0) {
        console.log('⚠️ Page already exists. Updating...')
        // Optional: update logic if needed
    }

    // 2. Create Page
    // We use same content for all locales for now, or just English
    const layout = [
        {
            blockType: 'hero',
            title: 'About Hadash',
            description: 'The Democratic Front for Peace and Equality',
            buttons: []
        },
        {
            blockType: 'content',
            maxWidth: 'default',
            content: richTextContent
        }
    ]

    const media = await payload.find({ collection: 'media', limit: 1 })
    const imageId = media.docs[0]?.id

    if (imageId) {
        (layout[0] as any).background_image = imageId
    }

    if (existing.docs.length === 0) {
        await payload.create({
            collection: 'pages',
            data: {
                title: 'About Us',
                slug: ABOUT_US_SLUG,
                layout: layout,
            },
            locale: 'en'
        })
        console.log('✅ Created "About Us" page (en)')

        // Seed he/ru with English content fallback 
        // (User only provided English, safer than empty)
        const newPage = await payload.find({ collection: 'pages', where: { slug: { equals: ABOUT_US_SLUG } } })
        const id = newPage.docs[0].id

        for (const loc of ['he', 'ru']) {
            await payload.update({
                collection: 'pages',
                id: id,
                data: {
                    title: loc === 'he' ? 'מי אנחנו' : 'О нас',
                    layout: layout
                },
                locale: loc
            })
            console.log(`✅ Created "About Us" page (${loc})`)
        }

    } else {
        // Update existing
        const id = existing.docs[0].id
        await payload.update({
            collection: 'pages',
            id: id,
            data: { layout },
            locale: 'en'
        })
        console.log('✅ Updated "About Us" page (en)')
    }

    // 3. Update Navigation
    console.log('🔄 Updating Navigation...')
    for (const loc of ['en', 'he', 'ru']) {
        const nav = await payload.findGlobal({ slug: 'navigation', locale: loc })
        const menuItems = (nav as any).menuItems || []

        // Check if link exists
        const link = loc === 'en' ? '/about-us' : `/${loc}/about-us`
        // Actually standardizing on /about-us usually works if middleware handles it, 
        // but let's stick to locale prefix if that's the pattern. 
        // Looking at `seed.ts`, links are like `/he/vision`.

        const label = loc === 'en' ? 'About Us' : (loc === 'he' ? 'מי אנחנו' : 'О нас')

        if (!menuItems.some((item: any) => item.link.includes('about-us'))) {
            const newItems = [...menuItems]
            // Insert after Home (index 0) or at end? Let's put it second.
            newItems.splice(1, 0, { label, link })

            await payload.updateGlobal({
                slug: 'navigation',
                locale: loc,
                data: { menuItems: newItems }
            })
            console.log(`✅ Added "About Us" to navigation (${loc})`)
        } else {
            console.log(`✓ "About Us" already in navigation (${loc})`)
        }
    }

    console.log('🎉 Done!')
    process.exit(0)
}

run().catch(console.error)

import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'
import fs from 'fs'
import path from 'path'

export async function POST() {
    const logs: string[] = []
    const log = (msg: string) => {
        const timestamp = new Date().toISOString()
        const formattedMsg = `[${timestamp}] ${msg}`
        console.log(formattedMsg)
        logs.push(formattedMsg)
    }

    try {
        log('🚀 Starting Robust Migration Seed...')
        const payload = await getPayload({ config })

        // 1. Load reference content
        let referenceContent: any
        const jsonPath = path.join(process.cwd(), 'src/app/(payload)/api/seed-complete/reference-content.json')
        log(`📖 Loading content from: ${jsonPath}`)

        try {
            const data = fs.readFileSync(jsonPath, 'utf-8')
            referenceContent = JSON.parse(data)
            log(`✅ Loaded reference content. Found ${Object.keys(referenceContent.pages).length} pages.`)
        } catch (err: any) {
            log(`❌ Failed to load reference-content.json: ${err.message}`)
            return NextResponse.json({ success: false, logs, error: 'Reference content missing or invalid' }, { status: 500 })
        }

        // 2. Process Pages (Sync Logic: Update if exists, Create if not)
        const pageKeys = Object.keys(referenceContent.pages)
        for (const pageKey of pageKeys) {
            const localesData = referenceContent.pages[pageKey]
            const mainLocale = 'he'
            const mainData = localesData[mainLocale]

            if (!mainData) continue

            log(`📄 Syncing page: ${pageKey}`)

            // Check if page already exists by slug
            const existingPage = await payload.find({
                collection: 'pages',
                where: {
                    slug: { equals: mainData.slug }
                },
                overrideAccess: true,
            })

            let targetPageId: string | number
            const processedLayoutHe = await processLayout(mainData.layout, payload, log)

            try {
                if (existingPage.docs.length > 0) {
                    targetPageId = existingPage.docs[0].id
                    log(`   🔄 Updating existing page: ${pageKey} (${targetPageId})`)
                    await payload.update({
                        collection: 'pages',
                        id: targetPageId,
                        locale: mainLocale,
                        data: {
                            title: mainData.title,
                            layout: processedLayoutHe,
                        },
                        overrideAccess: true,
                    })
                } else {
                    log(`   ✨ Creating new page: ${pageKey}`)
                    const createdPage = await payload.create({
                        collection: 'pages',
                        locale: mainLocale,
                        data: {
                            title: mainData.title,
                            slug: mainData.slug,
                            layout: processedLayoutHe,
                        },
                        overrideAccess: true,
                    })
                    targetPageId = createdPage.id
                }

                // Update for other locales
                for (const locale of ['en', 'ru']) {
                    const localeData = localesData[locale]
                    if (!localeData) continue

                    log(`   🌐 Syncing ${pageKey} for locale: ${locale}`)
                    const localeProcessedLayout = await processLayout(localeData.layout, payload, log)

                    await payload.update({
                        collection: 'pages',
                        id: targetPageId,
                        locale: locale as any,
                        data: {
                            title: localeData.title,
                            slug: localeData.slug,
                            layout: localeProcessedLayout,
                        },
                        overrideAccess: true,
                    })
                }
            } catch (err: any) {
                log(`❌ Error syncing page ${pageKey}: ${err.message}`)
            }
        }

        // 4. Seed Globals (Navigation & Site Settings)
        log('🌐 Seeding Navigation Global...')
        const menuItemsHe = [
            { label: 'מצע', link: '/he/platform' },
            { label: 'פעולה', link: '/he/#action' },
            { label: 'צוות', link: '/he/team' },
            { label: 'שימושי', link: '/he/#useful' },
            { label: 'תמיכה', link: '/he/#support' },
            { label: 'חדשות', link: '/he/news' },
            { label: 'חקיקה', link: '/he/legislative' },
        ]

        const menuItemsEn = [
            { label: 'Platform', link: '/en/platform' },
            { label: 'Action', link: '/en/#action' },
            { label: 'Team', link: '/en/team' },
            { label: 'Useful', link: '/en/#useful' },
            { label: 'Support', link: '/en/#support' },
            { label: 'News', link: '/en/news' },
            { label: 'Legislative', link: '/en/legislative' },
        ]

        const menuItemsRu = [
            { label: 'Платформа', link: '/ru/platform' },
            { label: 'Действие', link: '/ru/#action' },
            { label: 'Команда', link: '/ru/team' },
            { label: 'Полезное', link: '/ru/#useful' },
            { label: 'Поддержка', link: '/ru/#support' },
            { label: 'Новости', link: '/ru/news' },
            { label: 'Законодательство', link: '/ru/legislative' },
        ]

        await payload.updateGlobal({
            slug: 'navigation',
            locale: 'he',
            data: { menuItems: menuItemsHe },
            overrideAccess: true,
        })

        await payload.updateGlobal({
            slug: 'navigation',
            locale: 'en',
            data: { menuItems: menuItemsEn },
            overrideAccess: true,
        })

        await payload.updateGlobal({
            slug: 'navigation',
            locale: 'ru',
            data: { menuItems: menuItemsRu },
            overrideAccess: true,
        })

        log('⚙️ Seeding Site Settings Global...')
        await payload.updateGlobal({
            slug: 'site-settings',
            locale: 'he',
            data: {
                logoText: 'חד״ש',
                officialPortal: 'חזית דמוקרטית לשלום ולשוויון',
                footerText: 'שותפות יהודית-ערבית לשוויון, צדק חברתי ושלום.',
                copyrightText: '© 2024 חד״ש. כל הזכויות שמורות.',
            },
            overrideAccess: true,
        })

        await payload.updateGlobal({
            slug: 'site-settings',
            locale: 'en',
            data: {
                logoText: 'HADASH',
                officialPortal: 'Democratic Front for Peace and Equality',
                footerText: 'Jewish-Arab partnership for equality, social justice and peace.',
                copyrightText: '© 2024 HADASH. All rights reserved.',
            },
            overrideAccess: true,
        })

        await payload.updateGlobal({
            slug: 'site-settings',
            locale: 'ru',
            data: {
                logoText: 'ХАДАШ',
                officialPortal: 'Демократический фронт за мир и равенство',
                footerText: 'Еврейско-арабское партнерство за равенство, социальную справедливость и мир.',
                copyrightText: '© 2024 ХАДАШ. Все права защищены.',
            },
            overrideAccess: true,
        })

        log('🎉 Migration Seed Finished!')
        return NextResponse.json({ success: true, logs })

    } catch (error: any) {
        log(`🔥 FATAL ERROR: ${error.message}`)
        return NextResponse.json({ success: false, logs, error: error.message }, { status: 500 })
    }
}

async function processLayout(layout: any[], payload: any, log: Function) {
    if (!layout || !Array.isArray(layout)) return []

    const processedBlocks = []
    for (const block of layout) {
        const processedBlock: any = { ...block }

        if (block.blockType === 'hero') {
            if (block.backgroundImage) {
                processedBlock.background_image = await uploadImage(block.backgroundImage, payload, log)
                delete processedBlock.backgroundImage
            }
            if (block.buttons) {
                processedBlock.buttons = block.buttons.map((b: any) => ({
                    label: b.text,
                    style: b.variant || 'primary',
                }))
            }
        }

        if (block.blockType === 'values' && block.columns) {
            processedBlock.columns = await Promise.all(block.columns.map(async (col: any) => ({
                ...col,
                backgroundImage: col.backgroundImage ? await uploadImage(col.backgroundImage, payload, log) : null
            })))
        }

        if (block.blockType === 'team_grid' && block.members) {
            processedBlock.members = await Promise.all(block.members.map(async (m: any) => ({
                ...m,
                photo: m.photo ? await uploadImage(m.photo, payload, log) : null
            })))
        }

        if (block.blockType === 'news' && block.items) {
            processedBlock.articles = await Promise.all(block.items.map(async (item: any) => ({
                title: item.title,
                description: item.description,
                image: item.image ? await uploadImage(item.image, payload, log) : null,
                link: item.link
            })))
            delete processedBlock.items
        }

        processedBlocks.push(processedBlock)
    }
    return processedBlocks
}

const uploadedMedia = new Map<string, string>()

async function uploadImage(url: string, payload: any, log: Function): Promise<number | null> {
    if (!url || typeof url !== 'string' || !url.startsWith('http')) return null
    if (uploadedMedia.has(url)) return (uploadedMedia.get(url) as any)

    try {
        log(`    📸 Uploading image: ${url.split('/').pop()?.substring(0, 30)}...`)
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        })
        if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`)

        const buffer = Buffer.from(await res.arrayBuffer())
        let cleanName = (url.split('/').pop()?.split('?')[0] || `image-${Date.now()}`).replace(/[^a-zA-Z0-9]/g, '_')
        if (cleanName.length > 50) cleanName = cleanName.substring(0, 50)

        const contentType = res.headers.get('content-type') || 'image/jpeg'
        const extension = contentType.split('/')[1] || 'jpg'
        const filename = `${cleanName}.${extension}`

        const media = await payload.create({
            collection: 'media',
            data: { alt: filename },
            file: {
                data: buffer,
                mimetype: contentType,
                name: filename,
                size: buffer.length,
            },
            overrideAccess: true,
        })

        uploadedMedia.set(url, media.id)
        log(`    ✅ Uploaded: ${media.id}`)
        return media.id
    } catch (err: any) {
        log(`    ⚠️ Image upload failed for ${url}: ${err.message}`)
        return null
    }
}

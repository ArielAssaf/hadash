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

        // 2. Clean existing pages
        log('🧹 Cleaning existing pages...')
        const existingPages = await payload.find({
            collection: 'pages',
            limit: 100,
            overrideAccess: true,
        })
        log(`Found ${existingPages.docs.length} existing pages to delete`)

        for (const page of existingPages.docs) {
            await payload.delete({
                collection: 'pages',
                id: page.id,
                overrideAccess: true,
            })
            log(`🗑️ Deleted page: ${page.slug}`)
        }

        // 3. Process Pages
        const pageKeys = Object.keys(referenceContent.pages)
        for (const pageKey of pageKeys) {
            const localesData = referenceContent.pages[pageKey]
            const mainLocale = 'he'
            const mainData = localesData[mainLocale]

            if (!mainData) continue

            log(`📄 Creating page: ${pageKey} (${mainLocale})`)
            const processedLayout = await processLayout(mainData.layout, payload, log)

            try {
                const createdPage = await payload.create({
                    collection: 'pages',
                    locale: mainLocale,
                    data: {
                        title: mainData.title,
                        slug: mainData.slug,
                        layout: processedLayout,
                    },
                    overrideAccess: true,
                })

                log(`✅ Created ${pageKey} ID: ${createdPage.id}`)

                // Update for other locales
                for (const locale of ['en', 'ru']) {
                    const localeData = localesData[locale]
                    if (!localeData) continue

                    log(`  🌐 Updating ${pageKey} for locale: ${locale}`)
                    const localeProcessedLayout = await processLayout(localeData.layout, payload, log)

                    await payload.update({
                        collection: 'pages',
                        id: createdPage.id,
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
                log(`❌ Error creating/updating page ${pageKey}: ${err.message}`)
            }
        }

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
        const res = await fetch(url)
        if (!res.ok) throw new Error(`Fetch failed: ${res.statusText}`)

        const buffer = Buffer.from(await res.arrayBuffer())
        const filename = (url.split('/').pop()?.split('?')[0] || `image-${Date.now()}.jpg`).replace(/[^a-zA-Z0-9.]/g, '_')

        const media = await payload.create({
            collection: 'media',
            data: { alt: filename },
            file: {
                data: buffer,
                mimetype: res.headers.get('content-type') || 'image/jpeg',
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

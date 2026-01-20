
import { getPayload } from 'payload'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Manual .env loading
const envPath = path.resolve(dirname, '../../.env')
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf-8')
    envConfig.split('\n').forEach(line => {
        const [key, ...values] = line.split('=')
        if (key && values.length > 0) {
            const val = values.join('=')
            process.env[key.trim()] = val.trim().replace(/^["']|["']$/g, '')
        }
    })
}

// import config from '../../src/payload.config' // Commented out to prevent hoisting

const PAGE_SLUG = 'platform'

async function verify() {
    console.log('🔍 Verifying Platform page content...')

    // Dynamic import to ensure env is loaded first
    const { default: config } = await import('../../src/payload.config')

    const payload = await getPayload({ config })

    const pages = await payload.find({
        collection: 'pages',
        where: { slug: { equals: PAGE_SLUG } },
        // @ts-ignore
        locale: 'all' // Fetch all locales
    })

    if (pages.docs.length === 0) {
        console.error('❌ Platform page not found!')
        process.exit(1)
    }

    const page = pages.docs[0]
    console.log(`✅ Found Page ID: ${page.id}`)

    // Check Hebrew
    const hePage = await payload.findByID({
        collection: 'pages',
        id: page.id,
        locale: 'he'
    })

    // cast to any to access custom fields easily
    const heLayout = hePage.layout as any[]
    const heAccordion = heLayout?.find(b => b.blockType === 'platform_accordion')

    if (heAccordion) {
        console.log(`\n🇮🇱 Hebrew Content:`)
        console.log(`Title: ${heAccordion.title}`)
        console.log(`Sections: ${heAccordion.sections?.length || 0}`)
        heAccordion.sections?.forEach((s: any, i: number) => {
            console.log(`  ${i + 1}. ${s.title} (${s.content?.length} chars)`)
        })
    } else {
        console.error('❌ Hebrew PlatformAccordion block missing!')
    }

    // @ts-ignore
    const arPage = await payload.findByID({
        collection: 'pages',
        id: page.id,
        locale: 'ar'
    })

    const arLayout = arPage.layout as any[]
    const arAccordion = arLayout?.find(b => b.blockType === 'platform_accordion')

    if (arAccordion) {
        console.log(`\n🇵🇸 Arabic Content:`)
        console.log(`Title: ${arAccordion.title}`)
        console.log(`Sections: ${arAccordion.sections?.length || 0}`)
        arAccordion.sections?.forEach((s: any, i: number) => {
            console.log(`  ${i + 1}. ${s.title} (${s.content?.length} chars)`)
        })
    } else {
        console.error('❌ Arabic PlatformAccordion block missing!')
    }

    process.exit(0)
}

verify().catch(console.error)

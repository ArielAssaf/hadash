
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

async function run() {
    const { default: config } = await import('../../src/payload.config')
    const payload = await getPayload({ config })

    const res = await payload.find({
        collection: 'pages',
        where: { slug: { equals: 'index' } },
        locale: 'all'
    })

    if (res.docs.length === 0) {
        console.log('Index page not found')
        return
    }

    const page = res.docs[0]
    const layout = page.layout as any[]

    // Find Hero block
    const heroIndex = layout.findIndex(b => b.blockType === 'hero')
    if (heroIndex !== -1) {
        const hero = layout[heroIndex]

        // Update Hebrew buttons
        const hePage = await payload.findByID({
            collection: 'pages',
            id: page.id,
            locale: 'he'
        })
        const heLayout = [...(hePage.layout as any[])]
        const heHero = heLayout[heroIndex]
        if (heHero.buttons) {
            heHero.buttons = heHero.buttons.map((b: any) => {
                if (b.label.includes('מצע')) return { ...b, link: '/he/platform' }
                if (b.label.includes('מנשר')) return { ...b, link: '/he/vision' }
                return b
            })
        }
        await payload.update({
            collection: 'pages',
            id: page.id,
            data: { layout: heLayout },
            locale: 'he'
        })

        // Update Arabic buttons
        // @ts-ignore
        const arPage = await payload.findByID({
            collection: 'pages',
            id: page.id,
            locale: 'ar'
        })
        const arLayout = [...(arPage.layout as any[])]
        const arHero = arLayout[heroIndex]
        if (arHero.buttons) {
            arHero.buttons = arHero.buttons.map((b: any) => {
                if (b.label.includes('الدستور')) return { ...b, link: '/ar/platform' }
                if (b.label.includes('اقرأ')) return { ...b, link: '/ar/platform' }
                return b
            })
        }
        await payload.update({
            collection: 'pages',
            id: page.id,
            data: { layout: arLayout },
            // @ts-ignore
            locale: 'ar'
        })

        console.log('✅ Updated Hero buttons on index page')
    }

    process.exit(0)
}

run().catch(console.error)

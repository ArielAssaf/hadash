import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function GET() {
    try {
        console.log('--- Diagnosis Start ---')
        const payload = await getPayload({ config })

        const results: any = {
            collections: Object.keys(payload.collections),
            database: payload.db.adapterName,
            checks: {}
        }

        // Check Users
        try {
            const users = await payload.find({ collection: 'users', limit: 1 })
            results.checks.users = { success: true, count: users.totalDocs }
        } catch (e: any) {
            results.checks.users = { success: false, error: e.message }
        }

        // Check Pages
        try {
            const pages = await payload.find({ collection: 'pages', limit: 1 })
            results.checks.pages = { success: true, count: pages.totalDocs }
        } catch (e: any) {
            results.checks.pages = { success: false, error: e.message, stack: e.stack }
            console.error('Pages Check Failed:', e)
        }

        // Check Media
        try {
            const media = await payload.find({ collection: 'media', limit: 1 })
            results.checks.media = { success: true, count: media.totalDocs }
        } catch (e: any) {
            results.checks.media = { success: false, error: e.message }
        }

        return NextResponse.json(results)
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message,
            stack: error.stack
        }, { status: 500 })
    }
}

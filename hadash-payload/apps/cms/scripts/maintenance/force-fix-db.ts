import { getPayload } from 'payload'
import config from '../src/payload.config'
import { sql } from 'drizzle-orm'

async function forceFix() {
    console.log('🚀 Starting Raw DB Fix...')
    const payload = await getPayload({ config })

    try {
        // Access Drizzle instance
        const db = payload.db.drizzle

        // Check count
        console.log('📊 Checking raw count in "posts" table...')
        try {
            const countResult = await db.execute(sql`SELECT COUNT(*) as count FROM posts`)
            console.log('Raw count result:', countResult.rows[0])
        } catch (e: any) {
            console.log('Error checking count:', e.message)
        }

        // Update status
        console.log('🛠 Updating _status to "published" for all rows...')
        try {
            const updateResult = await db.execute(sql`UPDATE posts SET "_status" = 'published' WHERE "_status" IS NULL OR "_status" != 'published'`)
            console.log('Update result:', updateResult)
        } catch (e: any) {
            console.log('Error updating:', e.message)
        }

    } catch (error: any) {
        console.error(`❌ Script failed: ${error.message}`)
    }

    process.exit(0)
}

forceFix().catch((err) => {
    console.error('Error:', err)
    process.exit(1)
})

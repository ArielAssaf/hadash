import { getPayload } from 'payload'
import config from '../src/payload.config'
import { sql } from 'drizzle-orm'

async function checkLocales() {
    const payload = await getPayload({ config })
    const db = payload.db.drizzle

    try {
        console.log('📊 Checking row counts...')

        const postsCount = await db.execute(sql`SELECT COUNT(*) as count FROM posts`)
        console.log('posts table count:', postsCount.rows[0].count)

        // Check explicit table name for locales. Usually "posts_locales"
        const localesCount = await db.execute(sql`SELECT COUNT(*) as count FROM posts_locales`)
        console.log('posts_locales table count:', localesCount.rows[0].count)

        // Verify join ability
        const joinCheck = await db.execute(sql`
            SELECT p.id, p.slug, pl.title 
            FROM posts p 
            JOIN posts_locales pl ON p.id = pl._parent_id 
            LIMIT 5
        `)
        console.log('Sample joined data:', joinCheck.rows)

    } catch (error: any) {
        console.error(`❌ Check failed: ${error.message}`)
    }
    process.exit(0)
}

checkLocales()

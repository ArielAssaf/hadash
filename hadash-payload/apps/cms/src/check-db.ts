import { getPayload } from 'payload'
import config from './payload.config'

async function checkTables() {
    try {
        const payload = await getPayload({ config })
        // @ts-ignore - access the drizzle instance if possible or just run a raw query
        const db = payload.db
        console.log('Database adapter:', db.adapterName)

        // Attempt to list tables using a raw query
        const result = await payload.db.drizzle.execute('SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = \'public\'')
        console.log('Tables in database:', result.rows.map((r: any) => r.tablename).join(', '))

        process.exit(0)
    } catch (err) {
        console.error('Error checking tables:', err)
        process.exit(1)
    }
}

checkTables()

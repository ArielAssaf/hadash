import { getPayload } from 'payload'
import config from './payload.config'

async function debugDB() {
    try {
        console.log('--- Payload Debug Start ---')
        const payload = await getPayload({ config })
        console.log('Payload initialized')

        const collections = Object.keys(payload.collections)
        console.log('Registered collections:', collections.join(', '))

        try {
            console.log('Testing users find...')
            const users = await payload.find({ collection: 'users', limit: 1 })
            console.log('Users count:', users.totalDocs)
        } catch (e: any) {
            console.log('Users find failed:', e.message)
        }

        try {
            console.log('Testing pages find...')
            const pages = await payload.find({ collection: 'pages', limit: 1 })
            console.log('Pages count:', pages.totalDocs)
        } catch (e: any) {
            console.log('Pages find failed:', e.message)
            // If it fails with relation doesn't exist, we know the table is missing
        }

        process.exit(0)
    } catch (err: any) {
        console.error('Fatal initialization error:', err.message)
        console.error(err.stack)
        process.exit(1)
    }
}

debugDB()

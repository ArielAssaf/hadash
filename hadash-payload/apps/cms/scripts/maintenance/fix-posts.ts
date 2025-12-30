import { getPayload } from 'payload'
import config from '../src/payload.config'

async function fixStatus() {
    console.log('🚀 Starting Post Status Fix...')
    console.log('='.repeat(50))

    const payload = await getPayload({ config })

    try {
        console.log('🔍 Searching for all posts (including drafts)...')

        // Find all posts, seemingly drafts or otherwise
        const posts = await payload.find({
            collection: 'posts',
            draft: true, // important to find items that might not have published status
            limit: 100,
            depth: 0,
        })

        console.log(`📋 Found ${posts.docs.length} posts.`)

        if (posts.docs.length === 0) {
            console.log('❌ No posts found via Payload API. They might be truly gone or the API is filtering them.')
            // If this happens, we might need SQL.
        } else {
            console.log('🛠 Fixing status for each post...')
            for (const post of posts.docs) {
                const currentStatus = (post as any)._status
                console.log(`   - Post ID: ${post.id}, Title: "${post.title}", Current Status: ${currentStatus}`)

                if (!currentStatus || currentStatus !== 'published') {
                    try {
                        await payload.update({
                            collection: 'posts',
                            id: post.id,
                            data: {
                                _status: 'published', // Force publish to satisfy versions requirement
                            },
                        })
                        console.log(`     ✅ Updated to 'published'`)
                    } catch (updateErr: any) {
                        console.error(`     ❌ Update failed: ${updateErr.message}`)
                    }
                } else {
                    console.log(`     ✓ Already published`)
                }
            }
        }

    } catch (error: any) {
        console.error(`❌ Process failed: ${error.message}`)
    }

    console.log('\n' + '='.repeat(50))
    process.exit(0)
}

fixStatus().catch((err) => {
    console.error('Error:', err)
    process.exit(1)
})

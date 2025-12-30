import { getPayload } from 'payload'
import config from '../src/payload.config'

async function debugPosts() {
    console.log('🚀 Debugging Payload API View of Posts...')
    const payload = await getPayload({ config })

    try {
        console.log('🔍 Finding posts with draft=true...')
        const posts = await payload.find({
            collection: 'posts',
            draft: true,
            limit: 5,
        })
        console.log(`Payload found ${posts.docs.length} posts.`)
        if (posts.docs.length > 0) {
            console.log('First post sample:', JSON.stringify(posts.docs[0], null, 2))
        }

        console.log('🔍 Finding posts with draft=false (published only)...')
        const publishedPosts = await payload.find({
            collection: 'posts',
            draft: false,
            limit: 5,
        })
        console.log(`Payload found ${publishedPosts.docs.length} published posts.`)

    } catch (error: any) {
        console.error(`❌ Debug failed: ${error.message}`)
    }
    process.exit(0)
}

debugPosts()

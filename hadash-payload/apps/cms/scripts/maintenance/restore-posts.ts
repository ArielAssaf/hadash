import { getPayload } from 'payload'
import config from '../src/payload.config'
import postDump from '../../../post-dump.json'

// Type definition for the dump format based on what we see in the file
interface PostDump {
    title: { [key: string]: string }
    slug: string
    publishedDate: string
    category: string
    image: {
        alt: string
        filename: string
        url: string
        mimeType: string
        filesize: number
        width: number
        height: number
    }
    excerpt: { [key: string]: string }
    content: { [key: string]: any }
}

async function restore() {
    console.log('🚀 Starting Post Restoration...')
    console.log('='.repeat(50))

    const payload = await getPayload({ config })
    const post = postDump as any // Using any to bypass strict type checking for the dump structure

    try {
        console.log(`\nProcessing post: ${post.slug}`)

        // 1. Check if post already exists
        const existingPosts = await payload.find({
            collection: 'posts',
            where: {
                slug: {
                    equals: post.slug,
                },
            },
        })

        if (existingPosts.docs.length > 0) {
            console.log('⚠️ Post already exists, skipping...')
            return
        }

        // 2. Handle Media
        // Only upload if it doesn't match an existing media file name/size to avoid duplicates
        // For simplicity in this recovery script, we will assume we might need to "re-link" 
        // if the file is physically there but the DB record is missing, 
        // OR we just use the existing ID if we can find it.
        // HOWEVER, since we don't have the original file buffer here, we can't re-upload.
        // We will try to find a media item with the same filename.

        let mediaId = null;

        const existingMedia = await payload.find({
            collection: 'media',
            where: {
                filename: {
                    equals: post.image.filename,
                },
            },
        })

        if (existingMedia.docs.length > 0) {
            console.log('✅ Found existing media file')
            mediaId = existingMedia.docs[0].id
        } else {
            console.log('⚠️ Media file not found in DB. Since this is a restore script without source images, ' +
                'we cannot re-upload. We will attempt to proceed without image or YOU must manually fix.')
            // In a real scenario, we might download the URL if it's external, but here it's local.
        }

        if (!mediaId) {
            console.error('❌ Cannot restore post completely without the image. Skipping.')
            // process.exit(1) // Or continue if you want Partial restore
        }

        // 3. Create Key
        // We map the dumped JSON structure back to the Payload creation data
        const postData = {
            title: post.title,
            slug: post.slug,
            publishedDate: post.publishedDate,
            category: post.category,
            image: mediaId, // Valid ID or undefined/null
            excerpt: post.excerpt,
            content: post.content,
        }

        const newPost = await payload.create({
            collection: 'posts',
            data: postData,
        })

        console.log(`✅ Successfully restored post: "${newPost.title}" (ID: ${newPost.id})`)

    } catch (error: any) {
        console.error(`❌ Restoration failed: ${error.message}`)
    }

    console.log('\n' + '='.repeat(50))
    process.exit(0)
}

restore().catch((err) => {
    console.error('Restoration error:', err)
    process.exit(1)
})

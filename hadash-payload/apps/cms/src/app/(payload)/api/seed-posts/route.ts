
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

export const maxDuration = 300 // 5 minutes

// Simple slugify function for Hebrew
function slugify(text: string) {
    return text
        .toString()
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\u0590-\u05FF\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

async function downloadImage(url: string) {
    try {
        // Mock image if URL is broken or generic
        if (!url || url.includes('hadash.org.il')) {
            // For purposes of this demo, if the URL is internal hadash.org.il which might not be accessible or scraping protected, 
            // we might fallback to a placeholder if fetch fails.
            // But let's try fetching first.
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to fetch ${url}`);
        const arrayBuffer = await res.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const filename = url.split('/').pop() || `image-${Date.now()}.jpg`;
        const mimeType = res.headers.get('content-type') || 'image/jpeg';

        return { buffer, filename, mimeType };
    } catch (e) {
        console.error(`Error downloading image ${url}:`, e);
        return null;
    }
}

export async function GET() {
    const payload = await getPayload({ config: configPromise })

    try {
        const storiesPath = path.join(process.cwd(), 'src/app/(payload)/api/seed-posts/stories.json');

        // Fallback if file not found (sometimes cwd varies)
        let storiesData;
        if (fs.existsSync(storiesPath)) {
            storiesData = JSON.parse(fs.readFileSync(storiesPath, 'utf-8'));
        } else {
            // Try relative to __dirname if needed, or just hardcode checking common paths?
            // Actually Process.cwd() in Next.js is usually project root.
            // Let's try reading from the copy we just made.
            return NextResponse.json({ error: `File not found at ${storiesPath}` }, { status: 404 });
        }

        // 1. Delete existing posts to avoid duplicates (optional, or just upsert)
        // await payload.delete({ collection: 'posts', where: { id: { exists: true } } });

        const results = [];

        for (const story of storiesData) {
            // Check if post exists
            const existing = await payload.find({
                collection: 'posts',
                where: {
                    title: { equals: story.name }
                }
            });

            if (existing.totalDocs > 0) {
                results.push({ title: story.name, status: 'skipped' });
                continue;
            }

            // Handle Image
            let imageId = null;
            if (story.image_url) {
                const imgData = await downloadImage(story.image_url);
                if (imgData) {
                    const media = await payload.create({
                        collection: 'media',
                        data: {
                            alt: story.name,
                        },
                        file: {
                            data: imgData.buffer,
                            name: imgData.filename,
                            mimetype: imgData.mimeType,
                            size: imgData.buffer.length,
                        }
                    });
                    imageId = media.id;
                }
            }

            // Fallback image if download failed
            if (!imageId) {
                // You might want a default image here from your seeded media
                // For now we skip or use a placeholder if we had one known ID.
                // Let's assume we proceed without image or use a known one.
                // I'll query for ANY image to use as fallback
                const fallback = await payload.find({ collection: 'media', limit: 1 });
                if (fallback.docs.length > 0) imageId = fallback.docs[0].id;
            }

            // Create Content (Lexical)
            const rootChildren = story.paragraphs.map((p: string) => ({
                type: 'paragraph',
                children: [{ type: 'text', text: p, version: 1 }],
                version: 1,
            }));

            const content = {
                root: {
                    type: 'root',
                    format: '',
                    indent: 0,
                    version: 1,
                    children: rootChildren,
                    direction: 'rtl'
                }
            };

            const post = await payload.create({
                collection: 'posts',
                data: {
                    title: story.name,
                    slug: slugify(story.name),
                    publishedDate: story.date,
                    image: imageId, // Required field
                    content: content,
                    category: 'news',
                    excerpt: story.paragraphs[0] || '',
                }
            });

            results.push({ title: story.name, status: 'created', id: post.id });
        }

        return NextResponse.json({ success: true, results });

    } catch (error) {
        console.error('Seed posts error:', error);
        return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 });
    }
}

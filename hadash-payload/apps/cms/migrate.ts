import 'dotenv/config';
import { getPayload } from 'payload';
import config from './src/payload.config.ts';

const STORYBLOK_TOKEN = '9XV5vYCf9kYVbeUWKAl2Kgtt';
const STORYBLOK_API_URL = 'https://api.storyblok.com/v2/cdn/stories';

async function migrate() {
    const payload = await getPayload({ config: await config });

    console.log('Fetching stories from Storyblok...');
    const response = await fetch(`${STORYBLOK_API_URL}?token=${STORYBLOK_TOKEN}&version=draft`);
    const data = await response.json();
    const stories = data.stories;

    for (const story of stories) {
        if (story.is_startpage && story.full_slug !== 'home') continue; // Skip redundant folder start pages

        console.log(`Migrating: ${story.full_slug} (${story.name})`);
        const locale = mapLanguage(story.full_slug);

        const pageData = {
            title: story.name,
            slug: story.full_slug === 'home' ? 'index' : story.full_slug.replace(/^(he|ru)\//, ''),
            layout: transformBlocks(story.content.body, payload),
        };

        try {
            await payload.create({
                collection: 'pages',
                data: pageData,
                locale: locale,
            });
            console.log(`✅ Successfully migrated ${story.name} [${locale}]`);
        } catch (error) {
            console.error(`❌ Failed to migrate ${story.name}:`, error.message);
        }
    }
}

function mapLanguage(slug) {
    if (slug.startsWith('he/')) return 'he';
    if (slug.startsWith('ru/')) return 'ru';
    return 'en';
}

function transformBlocks(body, payload) {
    if (!body) return [];
    return body.map(blok => {
        switch (blok.component) {
            case 'hero':
                return {
                    blockType: 'hero',
                    title: blok.title,
                    description: blok.description,
                    badge: blok.badge,
                    buttons: blok.buttons?.map(btn => ({
                        label: btn.label,
                        style: btn.style || 'primary',
                    })),
                };
            case 'news':
                return {
                    blockType: 'news',
                    title: blok.title,
                    view_all_label: blok.view_all_label,
                    view_all_link: blok.view_all_link,
                    articles: blok.articles?.map(article => ({
                        title: article.title,
                        description: article.description,
                        category: article.category,
                        link: article.link?.cached_url,
                    })),
                };
            case 'legislative_list':
                return {
                    blockType: 'legislative_list',
                    title: blok.title,
                    badge: blok.badge,
                    categories: blok.categories?.map(cat => ({
                        name: cat.name,
                        icon: cat.icon,
                        type: cat.type || 'standard',
                        items: cat.items?.map(item => ({
                            title: item.title,
                            description: item.description,
                        })),
                    })),
                };
            default:
                console.warn(`⚠️ Unknown component: ${blok.component}`);
                return null;
        }
    }).filter(Boolean);
}

migrate().catch(console.error);

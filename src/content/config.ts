import { defineCollection, z } from 'astro:content';

const pagesCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        hero: z.object({
            title: z.string(),
            description: z.string(),
            buttons: z.array(z.object({
                label: z.string(),
                link: z.string(),
                style: z.enum(['primary', 'secondary']).default('primary')
            })).optional()
        }).optional(),
        sections: z.array(z.object({
            title: z.string(),
            icon: z.string().optional(),
            content: z.string().optional(),
            bulletPoints: z.array(z.object({ text: z.string() })).optional()
        })).optional(),
        missionSections: z.array(z.object({
            title: z.string(),
            mission_tag: z.string(),
            icon: z.string(),
            quote: z.string(),
            points: z.array(z.object({
                text: z.string()
            }))
        })).optional(),
        legislative: z.object({
            passed: z.array(z.object({
                title: z.string(),
                icon: z.string().optional(),
                content: z.string(),
                bulletPoints: z.array(z.object({ text: z.string() })).optional()
            })),
            blocked: z.array(z.object({
                title: z.string(),
                icon: z.string().optional(),
                content: z.string(),
                bulletPoints: z.array(z.object({ text: z.string() })).optional()
            }))
        }).optional(),
        isDonationPage: z.boolean().optional(),
    }),
});

const newsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        category: z.string(),
        publishDate: z.string().or(z.date()),
        image: z.string().optional(),
    }),
});

export const collections = {
    'pages': pagesCollection,
    'news': newsCollection,
};

import type { Block } from 'payload'

export const News: Block = {
    slug: 'news',
    fields: [
        {
            name: 'title',
            type: 'text',
            localized: true,
        },
        {
            name: 'articles',
            type: 'array',
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                    localized: true,
                },
                {
                    name: 'description',
                    type: 'textarea',
                    localized: true,
                },
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                },
                {
                    name: 'category',
                    type: 'text',
                    localized: true,
                },
                {
                    name: 'link',
                    type: 'text',
                },
            ],
        },
        {
            name: 'view_all_label',
            type: 'text',
            localized: true,
        },
        {
            name: 'view_all_link',
            type: 'text',
        },
    ],
}

import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
    slug: 'posts',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'publishedDate', 'category', 'status'],
    },
    versions: {
        drafts: true,
    },
    access: {
        read: () => true,
        update: () => true,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            localized: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            index: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'publishedDate',
            type: 'date',
            required: true,
            admin: {
                position: 'sidebar',
                date: {
                    pickerAppearance: 'dayOnly',
                    displayFormat: 'd MMM yyyy',
                }
            },
        },
        {
            name: 'category',
            type: 'select',
            options: [
                { label: 'News', value: 'news' },
                { label: 'Politics', value: 'politics' },
                { label: 'Social', value: 'social' },
                { label: 'Environment', value: 'environment' },
            ],
            defaultValue: 'news',
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'excerpt',
            type: 'textarea',
            localized: true,
        },
        {
            name: 'content',
            type: 'richText',
            localized: true,
            required: true,
        },
    ],
}

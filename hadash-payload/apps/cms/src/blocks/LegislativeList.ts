import type { Block } from 'payload'

export const LegislativeList: Block = {
    slug: 'legislative_list',
    fields: [
        {
            name: 'badge',
            type: 'text',
            localized: true,
        },
        {
            name: 'title',
            type: 'text',
            required: true,
            localized: true,
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'categories',
            type: 'array',
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    required: true,
                    localized: true,
                },
                {
                    name: 'icon',
                    type: 'text',
                },
                {
                    name: 'type',
                    type: 'select',
                    options: [
                        { label: 'Standard', value: 'standard' },
                        { label: 'Blocked', value: 'blocked' },
                    ],
                },
                {
                    name: 'items',
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
                    ],
                },
            ],
        },
    ],
}

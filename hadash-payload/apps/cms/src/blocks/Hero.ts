import type { Block } from 'payload'

export const Hero: Block = {
    slug: 'hero',
    fields: [
        {
            name: 'background_image',
            type: 'upload',
            relationTo: 'media',
        },
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
            name: 'description',
            type: 'textarea',
            localized: true,
        },
        {
            name: 'buttons',
            type: 'array',
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                    localized: true,
                },
                {
                    name: 'link',
                    type: 'text',
                    localized: true,
                },
                {
                    name: 'style',
                    type: 'select',
                    defaultValue: 'primary',
                    options: [
                        {
                            label: 'Primary',
                            value: 'primary',
                        },
                        {
                            label: 'Secondary',
                            value: 'secondary',
                        },
                    ],
                },
            ],
        },
    ],
}

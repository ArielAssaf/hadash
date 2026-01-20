
import { Block } from 'payload'

export const Content: Block = {
    slug: 'content',
    labels: {
        singular: 'Content',
        plural: 'Content Blocks',
    },
    fields: [
        {
            name: 'content',
            type: 'richText',
            label: 'Content',
            required: true,
            localized: true,
        },
        {
            name: 'maxWidth',
            type: 'select',
            options: [
                { label: 'Default', value: 'default' },
                { label: 'Wide', value: 'wide' },
                { label: 'Full', value: 'full' },
            ],
            defaultValue: 'default',
            admin: {
                position: 'sidebar',
            }
        }
    ],
}

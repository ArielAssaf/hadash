import { Block } from 'payload'

export const Newsletter: Block = {
    slug: 'newsletter',
    labels: {
        singular: 'Newsletter',
        plural: 'Newsletters',
    },
    fields: [
        {
            name: 'badge',
            type: 'text',
            localized: true,
        },
        {
            name: 'title',
            type: 'text',
            localized: true,
            required: true,
        },
        {
            name: 'description',
            type: 'textarea',
            localized: true,
        },
        {
            name: 'button_label',
            type: 'text',
            localized: true,
        },
        {
            name: 'placeholder',
            type: 'text',
            localized: true,
        },
    ],
}

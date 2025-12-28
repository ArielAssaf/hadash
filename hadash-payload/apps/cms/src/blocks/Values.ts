import { Block } from 'payload'

export const Values: Block = {
    slug: 'values',
    labels: {
        singular: 'Values',
        plural: 'Values Section',
    },
    fields: [
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
            name: 'columns',
            type: 'array',
            localized: true,
            fields: [
                {
                    name: 'icon',
                    type: 'text',
                },
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'description',
                    type: 'textarea',
                },
                {
                    name: 'backgroundImage',
                    type: 'upload',
                    relationTo: 'media',
                    label: 'Background Image',
                },
            ],
        },
    ],
}

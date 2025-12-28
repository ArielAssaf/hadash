import { Block } from 'payload'

export const MissionSection: Block = {
    slug: 'mission_section',
    labels: {
        singular: 'Mission Section',
        plural: 'Mission Sections',
    },
    fields: [
        {
            name: 'mission_tag',
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
            name: 'icon',
            type: 'text',
            localized: true,
        },
        {
            name: 'quote',
            type: 'textarea',
            localized: true,
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'points',
            type: 'array',
            localized: true,
            fields: [
                {
                    name: 'text',
                    type: 'text',
                    required: true,
                },
            ],
        },
        {
            name: 'link',
            type: 'text',
        },
        {
            name: 'link_label',
            type: 'text',
            localized: true,
        },
    ],
}

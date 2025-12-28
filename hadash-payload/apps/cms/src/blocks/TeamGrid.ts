import { Block } from 'payload'

export const TeamGrid: Block = {
    slug: 'team_grid',
    labels: {
        singular: 'Team Grid',
        plural: 'Team Grids',
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
            name: 'members',
            type: 'array',
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    localized: true,
                    required: true,
                },
                {
                    name: 'role',
                    type: 'text',
                    localized: true,
                },
                {
                    name: 'bio',
                    type: 'textarea',
                    localized: true,
                },
                {
                    name: 'photo',
                    type: 'upload',
                    relationTo: 'media',
                },
                {
                    name: 'link',
                    type: 'text',
                    label: 'Social Media/Website Link',
                },
            ],
        },
    ],
}

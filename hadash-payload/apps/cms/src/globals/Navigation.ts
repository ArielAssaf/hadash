import { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
    slug: 'navigation',
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'menuItems',
            type: 'array',
            localized: true,
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'link',
                    type: 'text',
                    required: true,
                },
            ],
        },
        {
            name: 'footerMenus',
            type: 'array',
            localized: true,
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'links',
                    type: 'array',
                    fields: [
                        {
                            name: 'label',
                            type: 'text',
                            required: true,
                        },
                        {
                            name: 'link',
                            type: 'text',
                            required: true,
                        },
                    ],
                },
            ],
        },
    ],
}

import { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
    slug: 'site-settings',
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'logoText',
            type: 'text',
            localized: true,
        },
        {
            name: 'officialPortal',
            type: 'text',
            localized: true,
        },
        {
            name: 'footerText',
            type: 'textarea',
            localized: true,
        },
        {
            name: 'socialLinks',
            type: 'array',
            fields: [
                {
                    name: 'platform',
                    type: 'select',
                    options: ['Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'YouTube'],
                },
                {
                    name: 'url',
                    type: 'text',
                    required: true,
                },
            ],
        },
        {
            name: 'copyrightText',
            type: 'text',
            localized: true,
        },
    ],
}

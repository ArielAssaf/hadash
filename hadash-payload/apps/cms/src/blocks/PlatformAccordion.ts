import { Block } from 'payload'

export const PlatformAccordion: Block = {
    slug: 'platform_accordion',
    labels: {
        singular: 'Platform Accordion',
        plural: 'Platform Accordions',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            localized: true,
        },
        {
            name: 'description',
            type: 'textarea',
            localized: true,
        },
        {
            name: 'sections',
            type: 'array',
            localized: true,
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'icon',
                    type: 'text',
                    defaultValue: 'info',
                },
                {
                    name: 'content',
                    type: 'textarea',
                    required: true,
                },
                {
                    name: 'bulletPoints',
                    type: 'array',
                    fields: [
                        {
                            name: 'text',
                            type: 'text',
                        }
                    ]
                }
            ],
        },
        {
            name: 'ctaTitle',
            type: 'text',
            localized: true,
        },
        {
            name: 'ctaDescription',
            type: 'text',
            localized: true,
        },
        {
            name: 'ctaButton1Text',
            type: 'text',
            localized: true,
        },
        {
            name: 'ctaButton1Link',
            type: 'text',
        },
        {
            name: 'ctaButton2Text',
            type: 'text',
            localized: true,
        },
        {
            name: 'ctaButton2Link',
            type: 'text',
        },
        {
            name: 'manifestoLink',
            type: 'text',
        },
        {
            name: 'manifestoLabel',
            type: 'text',
            localized: true,
        }
    ],
}

import type { CollectionConfig } from 'payload'
import { Hero } from '../blocks/Hero'
import { News } from '../blocks/News'
import { LegislativeList } from '../blocks/LegislativeList'
import { MissionSection } from '../blocks/MissionSection'
import { TeamGrid } from '../blocks/TeamGrid'
import { Values } from '../blocks/Values'
import { Newsletter } from '../blocks/Newsletter'

export const Pages: CollectionConfig = {
    slug: 'pages',
    admin: {
        useAsTitle: 'title',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            localized: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'layout',
            type: 'blocks',
            blocks: [Hero, News, LegislativeList, MissionSection, TeamGrid, Values, Newsletter],
        },
    ],
}

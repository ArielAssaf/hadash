import { defineConfig } from 'astro/config'
import storyblok from '@storyblok/astro'
import { loadEnv } from 'vite'
import tailwind from '@astrojs/tailwind'
import basicSsl from '@vitejs/plugin-basic-ssl'
const env = loadEnv('', process.cwd(), 'STORYBLOK')

// https://astro.build/config
export default defineConfig({
  site: 'https://ArielAssaf.github.io',
  base: '/hadash',
  integrations: [
    storyblok({
      //accessToken: env.STORYBLOK_TOKEN,
      accessToken: '9XV5vYCf9kYVbeUWKAl2Kgtt',
      apiOptions: {
        region: '',
      },
      bridge: {
        customParent: 'https://app.storyblok.com',
      },
      components: {
        page: 'storyblok/Page',
        feature: 'storyblok/Feature',
        grid: 'storyblok/Grid',
        teaser: 'storyblok/Teaser',
        hero: 'storyblok/Hero',
        values: 'storyblok/Values',
        news: 'storyblok/News',
        newsletter: 'storyblok/Newsletter',
        mission: 'storyblok/MissionSection',
        team_grid: 'storyblok/TeamGrid',
        legislative_list: 'storyblok/LegislativeList',
        vision_hero: 'storyblok/VisionHero',
        supporter_hub: 'storyblok/SupporterHub',
        transparency_section: 'storyblok/TransparencySection',
        event_list: 'storyblok/EventList',
      },
    }),
    tailwind(),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'he', 'ru'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [basicSsl()],
    server: {
      https: true,
    },
  },
})

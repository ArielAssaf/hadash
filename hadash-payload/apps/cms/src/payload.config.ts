import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Navigation } from './globals/Navigation'
import { SiteSettings } from './globals/SiteSettings'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      url: ({ data, locale, collectionConfig }) => {
        const baseUrl = 'http://localhost:4321'
        const code = (typeof locale === 'string' ? locale : (locale as any)?.code) || 'en'
        console.log('[LivePreview] Context:', {
          collection: collectionConfig?.slug,
          localeCode: code,
          dataSlug: data.slug,
          fullLocale: locale
        });

        if (collectionConfig?.slug === 'pages') {
          const prefix = code === 'en' ? '' : `/${code}`
          const url = `${baseUrl}${prefix}/${data.slug === 'index' ? '' : data.slug}`
          console.log(`[LivePreview] Page URL: ${url}`);
          return url
        }

        if (collectionConfig?.slug === 'posts') {
          const url = `${baseUrl}/${code}/news/${data.slug}`
          console.log(`[LivePreview] Post URL: ${url}`);
          return url
        }

        return baseUrl
      },
      collections: ['pages', 'posts'],
    },
  },
  collections: [Users, Media, Pages, Posts],
  globals: [Navigation, SiteSettings],
  localization: {
    locales: [
      {
        label: 'English',
        code: 'en',
      },
      {
        label: 'Hebrew',
        code: 'he',
        rtl: true,
      },
      {
        label: 'Russian',
        code: 'ru',
      },
      {
        label: 'Arabic',
        code: 'ar',
        rtl: true,
      },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
  }),
  plugins: [
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
})

import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  database: {
    type: 'filesystem'
  },
  collections: {
    games: defineCollection({
      type: 'page',
      source: 'games/*.md',
      schema: z.object({
        slug: z.string(),
        title: z.string(),
        description: z.string(),
        image: z.string().optional(),
        price: z.number(),
        currency: z.string().default('USD'),
        available: z.boolean().default(true),
        tags: z.array(z.string()).default([]),
        date: z.date().optional()
      })
    }),
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        slug: z.string(),
        title: z.string(),
        description: z.string(),
        image: z.string().optional(),
        date: z.date(),
        author: z.string(),
        tags: z.array(z.string()).default([]),
        published: z.boolean().default(true)
      })
    }),
    announcements: defineCollection({
      type: 'page',
      source: 'announcements/*.md',
      schema: z.object({
        slug: z.string(),
        title: z.string(),
        description: z.string(),
        image: z.string().optional(),
        date: z.date(),
        type: z.string().optional(),
        published: z.boolean().default(true)
      })
    }),
    stories: defineCollection({
      type: 'page',
      source: 'stories/*.md',
      schema: z.object({
        slug: z.string(),
        title: z.string(),
        description: z.string(),
        image: z.string().optional(),
        date: z.date(),
        author: z.string(),
        type: z.string().optional(),
        price: z.number().optional(),
        tags: z.array(z.string()).default([]),
        published: z.boolean().default(true)
      })
    }),
    manuals: defineCollection({
      type: 'page',
      source: 'manuals/*.md',
      schema: z.object({
        slug: z.string(),
        title: z.string(),
        description: z.string(),
        file: z.string().optional(),
        date: z.date(),
        game: z.string().optional(),
        type: z.string().optional(),
        download: z.string().optional(),
        published: z.boolean().default(true)
      })
    })
  }
})
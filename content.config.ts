import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    // Existing collections
    games: defineCollection({
      type: 'page',
      source: 'games/*.md',
      schema: z.object({
        slug: z.string(),
        title: z.string(),
        description: z.string(),
        thumbnail: z.string().optional(),
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
        thumbnail: z.string().optional(),
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
        thumbnail: z.string().optional(),
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
    }),

    // New design system collections
    design: defineCollection({
      type: 'data',
      source: 'design/*.yaml',
      schema: z.object({
        colors: z.object({
          primary: z.string(),
          secondary: z.string(),
          tertiary: z.string(),
          accent: z.string(),
          success: z.string(),
          info: z.string(),
          warning: z.string(),
          error: z.string(),
          neutral: z.string()
        }),
        typography: z.object({
          headings: z.object({
            fontFamily: z.string(),
            fontWeight: z.string()
          }),
          body: z.object({
            fontFamily: z.string(),
            fontSize: z.string(),
            lineHeight: z.string()
          })
        }),
        spacing: z.object({
          container: z.string(),
          section: z.string(),
          element: z.string()
        }),
        icons: z.object({
          mode: z.string(),
          cssLayer: z.string()
        })
      })
    }),

    navigation: defineCollection({
      type: 'data',
      source: 'navigation/*.yaml',
      schema: z.object({
        items: z.array(z.object({
          label: z.string(),
          to: z.string(),
          icon: z.string(),
          external: z.boolean().default(false),
          active: z.boolean().default(true)
        }))
      })
    }),

    footer: defineCollection({
      type: 'data',
      source: 'footer/*.yaml',
      schema: z.object({
        copyright: z.string(),
        tagline: z.string(),
        sections: z.array(z.object({
          title: z.string(),
          links: z.array(z.object({
            label: z.string(),
            to: z.string(),
            external: z.boolean().default(false),
            icon: z.string().optional()
          }))
        })),
        social: z.object({
          title: z.string(),
          links: z.array(z.object({
            platform: z.string(),
            url: z.string(),
            icon: z.string()
          }))
        })
      })
    }),

    components: defineCollection({
      type: 'data',
      source: 'components/*.yaml',
      schema: z.object({
        hero: z.object({
          title: z.string(),
          subtitle: z.string(),
          cta: z.object({
            text: z.string(),
            to: z.string(),
            variant: z.string().default('primary'),
            icon: z.string().optional()
          }),
          background: z.object({
            type: z.string(), // 'color', 'gradient', 'image'
            value: z.string()
          })
        }),
        games: z.object({
          title: z.string(),
          description: z.string(),
          emptyState: z.object({
            title: z.string(),
            description: z.string(),
            cta: z.object({
              text: z.string(),
              to: z.string()
            })
          })
        }),
        cta: z.object({
          title: z.string(),
          description: z.string(),
          cta: z.object({
            text: z.string(),
            to: z.string(),
            icon: z.string().optional()
          }),
          background: z.string()
        })
      })
    }),

    // Page content collections
    pages: defineCollection({
      type: 'data',
      source: 'pages/*.yaml',
      schema: z.object({
        home: z.object({
          meta: z.object({
            title: z.string(),
            description: z.string(),
            keywords: z.string()
          }),
          hero: z.object({
            title: z.string(),
            subtitle: z.string(),
            cta: z.object({
              text: z.string(),
              to: z.string()
            })
          }),
          featuredGames: z.object({
            title: z.string(),
            description: z.string(),
            viewAllText: z.string()
          }),
          latestBlog: z.object({
            title: z.string(),
            viewAllText: z.string()
          }),
          latestAnnouncements: z.object({
            title: z.string(),
            viewAllText: z.string()
          }),
          community: z.object({
            title: z.string(),
            description: z.string(),
            primaryCta: z.object({
              text: z.string(),
              to: z.string()
            }),
            secondaryCta: z.object({
              text: z.string(),
              to: z.string()
            })
          })
        }),
        games: z.object({
          meta: z.object({
            title: z.string(),
            description: z.string()
          }),
          header: z.object({
            title: z.string(),
            description: z.string()
          }),
          cta: z.object({
            title: z.string(),
            description: z.string(),
            buttonText: z.string(),
            buttonLink: z.string()
          })
        }),
        blog: z.object({
          meta: z.object({
            title: z.string(),
            description: z.string()
          }),
          header: z.object({
            title: z.string(),
            description: z.string()
          })
        }),
        stories: z.object({
          meta: z.object({
            title: z.string(),
            description: z.string()
          }),
          header: z.object({
            title: z.string(),
            description: z.string()
          })
        }),
        announcements: z.object({
          meta: z.object({
            title: z.string(),
            description: z.string()
          }),
          header: z.object({
            title: z.string(),
            description: z.string()
          })
        }),
        manuals: z.object({
          meta: z.object({
            title: z.string(),
            description: z.string()
          }),
          header: z.object({
            title: z.string(),
            description: z.string()
          })
        }),
        about: z.object({
          meta: z.object({
            title: z.string(),
            description: z.string()
          }),
          content: z.string()
        }),
        contact: z.object({
          meta: z.object({
            title: z.string(),
            description: z.string()
          }),
          header: z.object({
            title: z.string(),
            description: z.string()
          }),
          form: z.object({
            title: z.string(),
            description: z.string(),
            submitText: z.string()
          })
        })
      })
    })
  }
})
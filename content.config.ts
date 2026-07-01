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
        date: z.date().optional(),
        featured: z.boolean().default(false),
        published: z.boolean().default(true),
        manualUrl: z.string().optional(),
        resources: z.array(z.object({
          title: z.string(),
          url: z.string()
        })).optional(),
        coverImage: z.string().optional(),
        releaseDate: z.string().optional(),
        playerCount: z.object({
          min: z.number(),
          max: z.number()
        }).optional(),
        playTime: z.string().optional()
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
        published: z.boolean().default(true),
        featured: z.boolean().default(false)
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
        published: z.boolean().default(true),
        tags: z.array(z.string()).default([]),
        featured: z.boolean().default(false)
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
        currency: z.string().optional(),
        tags: z.array(z.string()).default([]),
        published: z.boolean().default(true),
        series: z.string().optional(),
        seriesOrder: z.number().optional(),
        seriesTotal: z.number().optional(),
        featured: z.boolean().default(false)
      })
    }),
    poetry: defineCollection({
      type: 'page',
      source: 'poetry/*.md',
      schema: z.object({
        slug: z.string(),
        title: z.string(),
        description: z.string().optional(),
        excerpt: z.string().optional(),
        thumbnail: z.string().optional(),
        image: z.string().optional(),
        date: z.date(),
        author: z.string().optional(),
        tags: z.array(z.string()).default([]),
        published: z.boolean().default(true),
        featured: z.boolean().default(false),
        authorNote: z.string().optional()
      })
    }),
    home: defineCollection({
      type: 'page',
      source: 'home.md',
      schema: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        navigation: z.boolean().default(false),
        collections: z.any().optional(),
        testimonials: z.array(z.object({
          name: z.string(),
          title: z.string(),
          company: z.string().optional(),
          avatar: z.string(),
          heading: z.string(),
          quote: z.string()
        })).optional()
      })
    }),
    about: defineCollection({
      type: 'page',
      source: 'about.md',
      schema: z.object({
        title: z.string(),
        description: z.string()
      })
    }),
    contact: defineCollection({
      type: 'page',
      source: 'contact.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        business: z.object({
          address: z.object({
            name: z.string(),
            line1: z.string(),
            line2: z.string(),
            line3: z.string()
          }),
          hours: z.array(z.string())
        }).optional()
      })
    }),
    forms: defineCollection({
      type: 'page',
      source: 'forms.md',
      schema: z.object({
        contactForm: z.object({
          subjects: z.array(z.object({
            label: z.string(),
            value: z.string()
          }))
        }).optional(),
        newsletterMessages: z.object({
          success: z.object({
            title: z.string(),
            description: z.string(),
            icon: z.string()
          }),
          error: z.object({
            title: z.string(),
            description: z.string(),
            icon: z.string()
          })
        }).optional(),
        contactMessages: z.object({
          success: z.object({
            title: z.string(),
            description: z.string(),
            icon: z.string()
          }),
          error: z.object({
            title: z.string(),
            description: z.string(),
            icon: z.string()
          })
        }).optional()
      })
    }),
    shop: defineCollection({
      type: 'page',
      source: 'shop.md',
      schema: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        seo: z.object({
          title: z.string(),
          description: z.string(),
          keywords: z.string().optional()
        }).optional(),
        featuredProducts: z.array(z.object({
          title: z.string(),
          description: z.string(),
          price: z.string(),
          icon: z.string(),
          badge: z.object({
            text: z.string(),
            color: z.string()
          })
        })).optional()
      })
    }),
    support: defineCollection({
      type: 'page',
      source: 'support.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        seo: z.object({
          title: z.string(),
          description: z.string(),
          keywords: z.string().optional()
        }).optional(),
        supportOptions: z.array(z.object({
          icon: z.string(),
          title: z.string(),
          description: z.string(),
          url: z.string(),
          buttonLabel: z.string(),
          color: z.string()
        })).optional()
      })
    }),
    licenses: defineCollection({
      type: 'page',
      source: 'licenses.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        faq: z.array(z.object({
          label: z.string(),
          content: z.string(),
          defaultOpen: z.boolean().optional()
        })).optional()
      })
    }),
    resources: defineCollection({
      type: 'page',
      source: 'resources/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        file: z.string().optional(),
        date: z.date().optional(),
        game: z.string().optional(),
        type: z.string().optional(),
        download: z.string().optional(),
        published: z.boolean().optional(),
        tags: z.array(z.string()).optional(),
        category: z.enum(['manual', 'character-sheets', 'reference', 'maps', 'templates', 'tools', 'stories']).optional(),
        fileSize: z.string().optional(),
        pageCount: z.number().optional(),
        downloadUrl: z.string().optional(),
        url: z.string().optional(),
        image: z.string().optional(),
        external: z.boolean().default(false),
        updatedAt: z.date().optional()
      }),
    }),
    portfolio: defineCollection({
      type: 'page',
      source: 'portfolio/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        image: z.string().optional(),
        icon: z.string().optional(),
        tags: z.array(z.string()).optional(),
        type: z.string().optional(),
        date: z.date().optional(),
        duration: z.string().optional(),
        thumbnail: z.string().optional(),
        link: z.string().optional(),
        status: z.string().optional(),
        published: z.boolean().default(true),
        game: z.string().optional(),
        artist: z.string().optional(),
        category: z.string().optional(),
        featured: z.boolean().default(false),
        createdAt: z.date().optional(),
        samplePages: z.array(z.object({
          image: z.string(),
          title: z.string()
        })).optional()
      }),
    }),
    artwork: defineCollection({
      type: 'page',
      source: 'artwork/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        game: z.enum(['blood-neon', 'era-of-silence', 'steal-the-kilogram']),
        type: z.enum(['character', 'location', 'scene', 'concept', 'item', 'vehicle', 'creature']),
        artist: z.string().optional(),
        fullImage: z.string(),
        thumbnail: z.string().optional(),
        tags: z.array(z.string()).default([]),
        published: z.boolean().default(true),
        featured: z.boolean().default(false),
        date: z.date().optional()
      })
    }),
    downloads: defineCollection({
      type: 'page',
      source: 'downloads/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        game: z.string().optional(),
        type: z.enum(['pdf', 'image', 'map', 'character-sheet', 'reference', 'toolkit', 'bundle']),
        fileUrl: z.string(),
        fileSize: z.string().optional(),
        pageCount: z.number().optional(),
        preview: z.string().optional(),
        license: z.string().optional(),
        version: z.string().optional(),
        published: z.boolean().default(true),
        featured: z.boolean().default(false),
        tags: z.array(z.string()).default([]),
        date: z.date().optional()
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
        }).optional(),
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
        }).optional(),
        blog: z.object({
          meta: z.object({
            title: z.string(),
            description: z.string()
          }),
          header: z.object({
            title: z.string(),
            description: z.string()
          })
        }).optional(),
        stories: z.object({
          meta: z.object({
            title: z.string(),
            description: z.string()
          }),
          header: z.object({
            title: z.string(),
            description: z.string()
          })
        }).optional(),
        announcements: z.object({
          meta: z.object({
            title: z.string(),
            description: z.string()
          }),
          header: z.object({
            title: z.string(),
            description: z.string()
          })
        }).optional(),
        resources: z.object({
          meta: z.object({
            title: z.string(),
            description: z.string()
          }),
          header: z.object({
            title: z.string(),
            description: z.string()
          })
        }).optional(),
        about: z.object({
          meta: z.object({
            title: z.string(),
            description: z.string()
          }),
          content: z.string()
        }).optional(),
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
        }).optional()
      })
    }),

  }
})

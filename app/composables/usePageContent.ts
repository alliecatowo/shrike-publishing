export const usePageContent = async (page: string) => {
  const { data: pageContent } = await useAsyncData(`page-content-${page}`, async () => {
    if (process.server) {
      // Return default content for SSR
      return getDefaultPageContent(page)
    }
    try {
      const content = await queryContent('/pages').findOne()
      return content || getDefaultPageContent(page)
    } catch (e) {
      return getDefaultPageContent(page)
    }
  })
  return pageContent
}

function getDefaultPageContent(page: string) {
  const defaults = {
    home: {
      meta: {
        title: 'Shrike Publishing',
        description: 'Shrike Tabletop makes Tabletop roleplaying games (RPGs) about combat and cooperation. Our games Era of Silence and Blood Neon are love letters to traditional game design!',
        keywords: 'tabletop games, board games, card games, literature, publishing, Era of Silence, Blood Neon, TTRPG'
      },
      featuredGames: {
        title: 'Featured Games',
        description: 'Discover our latest tabletop adventures',
        viewAllText: 'View All Games'
      },
      latestBlog: {
        title: 'Latest from the Blog',
        viewAllText: 'View All'
      },
      latestAnnouncements: {
        title: 'Announcements',
        viewAllText: 'View All'
      },
      community: {
        title: 'Join Our Community',
        description: 'Stay updated with our latest releases, behind-the-scenes content, and exclusive offers.',
        primaryCta: {
          text: 'Follow Us',
          to: '/contact'
        },
        secondaryCta: {
          text: 'Read Stories',
          to: '/stories'
        }
      }
    },
    games: {
      header: {
        title: 'Our Games',
        description: 'Discover our collection of innovative tabletop games, from strategic card games to immersive RPGs.'
      }
    },
    blog: {
      header: {
        title: 'Blog',
        description: 'Latest news, updates, and insights from the Shrike Publishing team.'
      }
    }
  }

  return defaults[page] || {}
}

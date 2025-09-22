export const useDesignSystem = async () => {
  const { data: designSystem } = await useAsyncData('design-system', async () => {
    // Import data directly for client-side or during build
    if (process.server) {
      // During SSR, return default values
      return {
        colors: {
          primary: 'red',
          secondary: 'amber',
          tertiary: 'purple',
          accent: 'pink',
          success: 'green',
          info: 'blue',
          warning: 'yellow',
          error: 'red',
          neutral: 'stone'
        },
        typography: {
          headings: {
            fontFamily: "'Volkhov', serif",
            fontWeight: '700'
          },
          body: {
            fontFamily: "'Merriweather Sans', sans-serif",
            fontSize: '1rem',
            lineHeight: '1.75'
          }
        },
        spacing: {
          container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
          section: 'py-8',
          element: 'space-y-4'
        },
        icons: {
          mode: 'css',
          cssLayer: 'base'
        }
      }
    }
    try {
      const content = await queryContent('/design').findOne()
      return content || {}
    } catch (e) {
      return {}
    }
  })

  return designSystem
}

export const useNavigation = async () => {
  const { data: navigation } = await useAsyncData('navigation', async () => {
    if (process.server) {
      return {
        items: [
          {
            label: 'Home',
            to: '/',
            icon: 'lucide:home',
            active: true
          },
          {
            label: 'Games',
            to: '/games',
            icon: 'lucide:box',
            active: true
          },
          {
            label: 'Blog',
            to: '/blog',
            icon: 'lucide:file-text',
            active: true
          },
          {
            label: 'Stories',
            to: '/stories',
            icon: 'lucide:book-open',
            active: true
          },
          {
            label: 'Announcements',
            to: '/announcements',
            icon: 'lucide:megaphone',
            active: true
          },
          {
            label: 'Manuals',
            to: '/manuals',
            icon: 'lucide:file',
            active: true
          },
          {
            label: 'About',
            to: '/about',
            icon: 'lucide:info',
            active: true
          },
          {
            label: 'Contact',
            to: '/contact',
            icon: 'lucide:mail',
            active: true
          }
        ]
      }
    }
    try {
      const content = await queryContent('/navigation').findOne()
      return content || {}
    } catch (e) {
      return {}
    }
  })

  return navigation
}

export const useFooter = async () => {
  const { data: footer } = await useAsyncData('footer', async () => {
    if (process.server) {
      return {
        copyright: '© 2025 Shrike Publishing. All rights reserved.',
        tagline: 'Independent tabletop game publisher',
        sections: [
          {
            title: 'Quick Links',
            links: [
              { label: 'Blog', to: '/blog' },
              { label: 'Announcements', to: '/announcements' },
              { label: 'Games', to: '/games' },
              { label: 'Stories', to: '/stories' }
            ]
          }
        ],
        social: {
          title: 'Connect',
          links: [
            { platform: 'Facebook', url: 'https://www.facebook.com/shrikepublishing', icon: 'lucide:facebook' },
            { platform: 'Twitter', url: 'https://twitter.com/ShrikePublisher', icon: 'lucide:twitter' },
            { platform: 'Instagram', url: 'https://www.instagram.com/shrikepublishing', icon: 'lucide:instagram' }
          ]
        }
      }
    }
    try {
      const content = await queryContent('/footer').findOne()
      return content || {}
    } catch (e) {
      return {}
    }
  })

  return footer
}


export const useComponents = async () => {
  const { data: components } = await useAsyncData('components-config', async () => {
    if (process.server) {
      // Return default components for SSR
      return getDefaultComponents()
    }
    try {
      const content = await queryContent('/components').findOne()
      return content || getDefaultComponents()
    } catch (e) {
      return getDefaultComponents()
    }
  })
  return components
}

function getDefaultComponents() {
  return {
    hero: {
      title: 'Welcome to Shrike Publishing',
      subtitle: 'Independent tabletop game publisher creating immersive worlds and unforgettable stories.',
      cta: {
        text: 'Explore Games',
        to: '/games',
        variant: 'primary',
        icon: 'i-lucide-play'
      }
    },
    games: {
      title: 'Our Games',
      description: 'Discover our latest tabletop adventures'
    },
    cta: {
      title: 'Want to Stay Updated?',
      description: 'Get notified about new releases and special offers.',
      cta: {
        text: 'Subscribe',
        to: '/contact',
        icon: 'i-lucide-mail'
      }
    }
  }
}


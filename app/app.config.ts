export default defineAppConfig({
    branding: {
      logo: '/ShrikeLogoNov2021.png',
      name: 'Shrike Publishing',
      logoAlt: 'Shrike Publishing'
    },
    headerCta: {
      label: 'Support Us',
      to: '/support',
      color: 'primary',
      size: 'sm',
      variant: 'outline'
    },
    navigation: {
      items: [
        {
          label: 'Home',
          to: '/',
          icon: 'lucide:home'
        },
        {
          label: 'Games',
          icon: 'lucide:gamepad-2',
          children: [
            { label: 'All Games', to: '/games', icon: 'lucide:layout-grid' },
            { label: 'Era of Silence', to: '/games/era-of-silence', icon: 'lucide:book-heart' },
            { label: 'Blood Neon', to: '/games/blood-neon', icon: 'lucide:radiation' },
            { label: 'Steal the Kilogram', to: '/games/steal-the-kilogram', icon: 'lucide:scale' }
          ]
        },
        {
          label: 'Writing',
          icon: 'lucide:pen-line',
          children: [
            { label: 'Stories', to: '/stories', icon: 'lucide:library' },
            { label: 'Poetry', to: '/poetry', icon: 'lucide:feather' },
            { label: 'Blog', to: '/blog', icon: 'lucide:rss' }
          ]
        },
        {
          label: 'Shop',
          icon: 'lucide:shopping-bag',
          children: [
            { label: 'itch.io Store', to: 'https://shrikepublishing.itch.io/', icon: 'lucide:external-link' },
            { label: 'DriveThruRPG', to: 'https://www.drivethrurpg.com/en/product/411680/era-of-silence-starter-kit', icon: 'lucide:external-link' },
            { label: 'Ko-fi', to: 'https://ko-fi.com/shrikepublishing', icon: 'lucide:external-link' }
          ]
        },
        {
          label: 'Resources',
          icon: 'lucide:folder',
          children: [
            { label: 'Downloads', to: '/resources', icon: 'lucide:download' },
            { label: 'Licenses', to: '/licenses', icon: 'lucide:file-text' }
          ]
        },
        {
          label: 'About',
          icon: 'lucide:info',
          children: [
            { label: 'About Me', to: '/about', icon: 'lucide:user' },
            { label: 'Contact', to: '/contact', icon: 'lucide:mail' }
          ]
        }
      ]
    },
    footer: {
      newsletter: {
        title: 'Stay Updated',
        description: 'Subscribe to our newsletter for the latest releases and news.'
      },
      social: [
        { icon: 'i-lucide-twitter', to: 'https://twitter.com/shrikepublishing' },
        { icon: 'i-lucide-facebook', to: 'https://facebook.com/shrikepublishing' },
        { icon: 'i-lucide-instagram', to: 'https://instagram.com/shrikepublishing' }
      ],
      columns: [
        {
          label: 'Quick Links',
          children: [
            { label: 'Home', to: '/' },
            { label: 'Stories', to: '/stories' },
            { label: 'Announcements', to: '/announcements' },
            { label: 'Resources', to: '/resources' }
          ]
        },
        {
          label: 'Games',
          children: [
            { label: 'All Games', to: '/games' },
            { label: 'Blood Neon', to: '/games/blood-neon' },
            { label: 'Era of Silence', to: '/games/era-of-silence' }
          ]
        }
      ],
      bottom: [
        { label: 'About', to: '/about' },
        { label: 'Contact', to: '/contact' },
        { label: 'Resources', to: '/resources' }
      ],
      copyright: '© {year} Shrike Publishing. All rights reserved.'
    },
    ui: {
      // Brand colors - Emphasizing pink, lavender, and red palette
      colors: {
        // Adopt brand maroon using Nuxt UI built-in palette 'rose'
        primary: 'red',
        secondary: 'pink',

        accent: 'purple',
        success: 'green',
        info: 'blue',
        warning: 'yellow',
        error: 'red',
        neutral: 'slate'
      },
      page: {
        slots: {
          center: 'lg:col-span-8 max-w-4xl mx-auto px-4'
        }
      }
    },
    icon: {
        mode: 'css',
        cssLayer: 'base',
        size: '24px' // Set default icon size
      }
  })
<template>
  <div class="min-h-screen bg-stone-50 dark:bg-stone-900">
    <!-- Navigation Header -->
    <header class="border-b border-muted bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Left: Logo -->
          <div class="flex items-center">
            <NuxtLink to="/" class="flex items-center">
              <NuxtImg
                src="/ShrikeLogoNov2021.png"
                alt="Shrike Publishing"
                class="h-10 w-auto"
                loading="eager"
              />
            </NuxtLink>
          </div>

          <!-- Center: Navigation -->
          <nav class="hidden md:flex space-x-8">
            <NuxtLink
              v-for="item in navigationItems"
              :key="item.label"
              :to="item.to"
              class="flex items-center space-x-2 text-gray-600 hover:text-primary dark:text-gray-400 px-3 py-2 text-sm font-medium transition-colors"
              :class="{ 'text-primary': $route.path === item.to }"
            >
              <Icon :name="item.icon" class="h-4 w-4" />
              <span>{{ item.label }}</span>
            </NuxtLink>
          </nav>

          <!-- Right: Actions -->
          <div class="flex items-center space-x-2">
            <UButton
              size="sm"
              variant="ghost"
              @click="toggleTheme"
            >
              <Icon name="lucide:moon" class="h-4 w-4" />
            </UButton>

            <UButton
              size="sm"
              variant="ghost"
              to="/contact"
            >
              <Icon name="lucide:shopping-cart" class="h-4 w-4" />
              Shop
            </UButton>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="border-t border-muted bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Left: Copyright -->
          <div class="flex flex-col space-y-2">
            <p class="text-sm text-muted">
              © 2025 Shrike Publishing. All rights reserved.
            </p>
            <p class="text-xs text-dimmed">
              Independent tabletop game publisher
            </p>
          </div>

          <!-- Center: Links -->
          <div class="flex flex-col space-y-2">
            <h3 class="text-sm font-semibold text-highlighted">Quick Links</h3>
            <div class="flex flex-wrap gap-4">
              <NuxtLink
                to="/blog"
                class="text-sm text-muted hover:text-primary"
              >
                Blog
              </NuxtLink>
              <NuxtLink
                to="/announcements"
                class="text-sm text-muted hover:text-primary"
              >
                Announcements
              </NuxtLink>
              <NuxtLink
                to="/games"
                class="text-sm text-muted hover:text-primary"
              >
                Games
              </NuxtLink>
              <NuxtLink
                to="/stories"
                class="text-sm text-muted hover:text-primary"
              >
                Stories
              </NuxtLink>
            </div>
          </div>

          <!-- Right: Social -->
          <div class="flex flex-col space-y-2">
            <h3 class="text-sm font-semibold text-highlighted">Connect</h3>
            <div class="flex space-x-3">
              <UButton
                size="sm"
                variant="ghost"
                href="https://www.facebook.com/shrikepublishing"
                target="_blank"
                aria-label="Facebook"
              >
                <Icon name="lucide:facebook" class="h-4 w-4" />
              </UButton>
              <UButton
                size="sm"
                variant="ghost"
                href="https://twitter.com/ShrikePublisher"
                target="_blank"
                aria-label="Twitter"
              >
                <Icon name="lucide:twitter" class="h-4 w-4" />
              </UButton>
              <UButton
                size="sm"
                variant="ghost"
                href="https://www.instagram.com/shrikepublishing"
                target="_blank"
                aria-label="Instagram"
              >
                <Icon name="lucide:instagram" class="h-4 w-4" />
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const navigationItems = [
  {
    label: 'Home',
    to: '/',
    icon: 'lucide:home'
  },
  {
    label: 'Games',
    to: '/games',
    icon: 'lucide:box'
  },
  {
    label: 'Blog',
    to: '/blog',
    icon: 'lucide:file-text'
  },
  {
    label: 'Stories',
    to: '/stories',
    icon: 'lucide:book-open'
  },
  {
    label: 'Announcements',
    to: '/announcements',
    icon: 'lucide:megaphone'
  },
  {
    label: 'Manuals',
    to: '/manuals',
    icon: 'lucide:file'
  },
  {
    label: 'About',
    to: '/about',
    icon: 'lucide:info'
  },
  {
    label: 'Contact',
    to: '/contact',
    icon: 'lucide:mail'
  }
]

const colorMode = useColorMode()

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

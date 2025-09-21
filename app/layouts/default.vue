<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Navigation Header -->
    <header class="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Left: Logo -->
          <div class="flex items-center">
            <NuxtLink to="/" class="flex items-center space-x-2">
              <UIcon name="i-heroicons-cube" class="h-8 w-8 text-primary" />
              <span class="text-xl font-bold">Shrike Publishing</span>
            </NuxtLink>
          </div>

          <!-- Center: Navigation -->
          <nav class="hidden md:flex space-x-8">
            <NuxtLink
              v-for="item in navigationItems"
              :key="item.label"
              :to="item.to"
              class="text-gray-600 hover:text-primary dark:text-gray-400 px-3 py-2 text-sm font-medium transition-colors"
              :class="{ 'text-primary': $route.path === item.to }"
            >
              {{ item.label }}
            </NuxtLink>
          </nav>

          <!-- Right: Actions -->
          <div class="flex items-center space-x-2">
            <UButton
              icon="i-heroicons-moon"
              size="sm"
              variant="ghost"
              @click="toggleTheme"
            />
            <UButton
              icon="i-heroicons-shopping-bag"
              size="sm"
              variant="ghost"
              to="/contact"
            >
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
    <footer class="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Left: Copyright -->
          <div class="flex flex-col space-y-2">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              © 2024 Shrike Publishing. All rights reserved.
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-500">
              Independent tabletop game publisher
            </p>
          </div>

          <!-- Center: Links -->
          <div class="flex flex-col space-y-2">
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Quick Links</h3>
            <div class="flex flex-wrap gap-4">
              <NuxtLink
                to="/blog"
                class="text-sm text-gray-600 hover:text-primary dark:text-gray-400"
              >
                Blog
              </NuxtLink>
              <NuxtLink
                to="/announcements"
                class="text-sm text-gray-600 hover:text-primary dark:text-gray-400"
              >
                Announcements
              </NuxtLink>
              <NuxtLink
                to="/games"
                class="text-sm text-gray-600 hover:text-primary dark:text-gray-400"
              >
                Games
              </NuxtLink>
              <NuxtLink
                to="/stories"
                class="text-sm text-gray-600 hover:text-primary dark:text-gray-400"
              >
                Stories
              </NuxtLink>
            </div>
          </div>

          <!-- Right: Social -->
          <div class="flex flex-col space-y-2">
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Connect</h3>
            <div class="flex space-x-3">
              <UButton
                icon="i-heroicons-globe-alt"
                size="sm"
                variant="ghost"
                to="/contact"
                aria-label="Social Links"
              />
              <UButton
                icon="i-heroicons-envelope"
                size="sm"
                variant="ghost"
                to="/contact"
                aria-label="Contact"
              />
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
    icon: 'i-heroicons-home'
  },
  {
    label: 'Games',
    to: '/games',
    icon: 'i-heroicons-cube'
  },
  {
    label: 'Blog',
    to: '/blog',
    icon: 'i-heroicons-document-text'
  },
  {
    label: 'Stories',
    to: '/stories',
    icon: 'i-heroicons-book-open'
  },
  {
    label: 'Announcements',
    to: '/announcements',
    icon: 'i-heroicons-megaphone'
  },
  {
    label: 'Manuals',
    to: '/manuals',
    icon: 'i-heroicons-document'
  },
  {
    label: 'About',
    to: '/about',
    icon: 'i-heroicons-information-circle'
  },
  {
    label: 'Contact',
    to: '/contact',
    icon: 'i-heroicons-envelope'
  }
]

const colorMode = useColorMode()

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

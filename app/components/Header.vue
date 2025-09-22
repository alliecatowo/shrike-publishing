<template>
  <UHeader class="border-b border-primary/15 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-primary/5">
    <template #left>
      <NuxtLink to="/" class="flex items-center">
        <img src="/ShrikeLogoNov2021.png" alt="Shrike Publishing" class="h-8 w-auto" />
      </NuxtLink>
    </template>

    <UNavigationMenu :items="navigationItems" class="hidden md:flex" />

    <template #right>
      <div class="flex items-center gap-2">
        <UColorModeButton />
        <UButton
          size="sm"
          variant="outline"
          to="/contact"
          leading-icon="i-lucide-shopping-cart"
        >
          Shop
        </UButton>
      </div>
    </template>

    <template #body>
      <UNavigationMenu :items="navigationItems" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

// Navigation items (content-driven can replace later)
const navigationItems: NavigationMenuItem[] = [
  { label: 'Home', to: '/', icon: 'i-lucide-home' },
  { label: 'Games', to: '/games', icon: 'i-lucide-gamepad-2' },
  { label: 'Blog', to: '/blog', icon: 'i-lucide-book-open' },
  { label: 'Stories', to: '/stories', icon: 'i-lucide-library' },
  { label: 'Announcements', to: '/announcements', icon: 'i-lucide-megaphone' },
  { label: 'About', to: '/about', icon: 'i-lucide-info' },
  { label: 'Contact', to: '/contact', icon: 'i-lucide-mail' }
]
</script>

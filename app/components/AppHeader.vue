<template>
  <UHeader class="border-b border-primary/15 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-primary/5">
    <template #left>
      <NuxtLink to="/" class="flex items-center gap-2">
        <NuxtImg :src="appConfig.branding.logo" :alt="appConfig.branding.logoAlt" class="h-8 w-auto" />
        <span class="text-xl font-bold text-gray-900 dark:text-white">{{ appConfig.branding.name }}</span>
      </NuxtLink>
    </template>

    <UNavigationMenu :items="navigationItems" class="hidden md:flex" />

    <template #right>
      <div class="flex items-center gap-2">
        <UButton
          size="sm"
          variant="ghost"
          aria-label="Search content"
          title="Search content (⌘L)"
          leading-icon="i-lucide-search"
          @click="triggerLoreSearch"
        >
          <span class="hidden lg:inline">Search</span>
          <UKbd class="hidden lg:inline-flex ml-2">⌘L</UKbd>
        </UButton>
        <UColorModeButton />
        <UButton
          :size="appConfig.headerCta.size"
          :variant="appConfig.headerCta.variant"
          :to="appConfig.headerCta.to"
          :color="appConfig.headerCta.color"
          leading-icon="i-lucide-heart"
        >
          {{ appConfig.headerCta.label }}
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

const appConfig = useAppConfig()

function toIcon(name?: string): string | undefined {
  if (!name) return undefined
  return `i-${name.replace(':', '-')}`
}

function mapItems(items: any[] | undefined): NavigationMenuItem[] {
  return (items || []).map((it) => ({
    label: it.label,
    to: it.to,
    icon: toIcon(it.icon),
    children: it.children ? mapItems(it.children) : undefined
  }))
}

const navigationItems = computed<NavigationMenuItem[]>(() => mapItems(appConfig.navigation.items))

// Trigger the global search command palette
function triggerLoreSearch() {
  // Simulate the Cmd+L / Ctrl+L keyboard shortcut
  const event = new KeyboardEvent('keydown', {
    key: 'l',
    metaKey: true,
    bubbles: true
  })
  document.dispatchEvent(event)
}
</script>

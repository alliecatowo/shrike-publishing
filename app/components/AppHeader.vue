<template>
  <UHeader class="border-b border-primary/15 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-primary/5">
    <template #left>
      <NuxtLink to="/" class="flex items-center gap-2">
        <img src="/ShrikeLogoNov2021.png" alt="Shrike Publishing" class="h-8 w-auto" >
        <span class="text-xl font-bold text-gray-900 dark:text-white">Shrike Publishing</span>
      </NuxtLink>
    </template>

    <UNavigationMenu :items="navigationItems" class="hidden md:flex" />

    <template #right>
      <div class="flex items-center gap-2">
        <UButton
          size="sm"
          variant="ghost"
          aria-label="Search lore wiki"
          title="Search lore wiki (⌘L)"
          leading-icon="i-lucide-search"
          @click="triggerLoreSearch"
        >
          <span class="hidden lg:inline">Search Lore</span>
          <UKbd class="hidden lg:inline-flex ml-2">⌘L</UKbd>
        </UButton>
        <UColorModeButton />
        <UButton
          size="sm"
          variant="outline"
          to="/support"
          leading-icon="i-lucide-heart"
        >
          Support Us
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

interface NavigationItemRaw {
  label: string
  to: string
  icon?: string
  children?: NavigationItemRaw[]
}

interface NavigationData {
  items?: NavigationItemRaw[]
}

const { data: navData } = await useAsyncData('main-navigation', () =>
  queryCollection('navigation').first()
)

function toIcon(name?: string): string | undefined {
  if (!name) return undefined
  return `i-${name.replace(':', '-')}`
}

function mapItems(items: NavigationItemRaw[] | undefined): NavigationMenuItem[] {
  return (items || []).map((it) => ({
    label: it.label,
    to: it.to,
    icon: toIcon(it.icon),
    children: it.children ? mapItems(it.children) : undefined
  }))
}

const navigationItems = computed<NavigationMenuItem[]>(() => mapItems((navData.value as NavigationData)?.items))

// Trigger the lore search command palette
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

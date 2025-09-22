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

const { data: navData } = await useAsyncData('main-navigation', () =>
  queryCollection('navigation').first()
)

function toIcon(name?: string) {
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

const navigationItems = computed<NavigationMenuItem[]>(() => mapItems((navData.value as any)?.items))
</script>

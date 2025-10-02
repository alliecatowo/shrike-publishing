<template>
  <div v-if="g">
    <UPageHero
      :title="g.title"
      :description="g.description"
      orientation="horizontal"
      class="bg-gradient-to-br from-primary/15 via-purple-500/10 to-amber-500/10 dark:from-primary/25 dark:via-purple-500/15 dark:to-amber-500/15"
    >
      <div v-if="g.image" class="max-w-3xl">
        <NuxtImg :src="g.image" :alt="`${g.title} Cover`" class="w-full rounded-lg shadow" />
      </div>
    </UPageHero>

    <UContainer class="py-8">
      <UPageGrid :cols="{ default: 1, lg: 3 }" class="gap-8">
        <!-- Main content -->
        <div class="lg:col-span-2 space-y-8">
          <UCard variant="outline">
            <div class="prose prose-neutral dark:prose-invert max-w-none">
                <ContentRenderer :value="g" />
            </div>
          </UCard>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <UPageCard
            title="Game Information"
            :description="`Price: $${g.price}`"
            variant="outline"
          >
            <div v-if="(g.tags?.length || 0)" class="flex flex-wrap gap-2 mt-4">
              <UBadge v-for="tag in g.tags" :key="tag" variant="subtle" size="sm">{{ tag }}</UBadge>
            </div>
          </UPageCard>

          <UPageCard
            title="Get the Game"
            description="Contact to Purchase"
            variant="outline"
          >
            <template #footer>
              <UButton to="/contact" variant="outline" size="sm" leading-icon="i-lucide-shopping-cart" class="w-full">
                Contact to Purchase
              </UButton>
            </template>
          </UPageCard>

          <!-- Manual Download Card -->
          <UPageCard v-if="g.manualUrl">
            <template #title>
              <h3 class="text-lg font-semibold">Game Manual</h3>
            </template>
            <UButton
              :to="g.manualUrl"
              variant="soft"
              icon="i-lucide-book-open"
              class="w-full"
              external
            >
              Download Manual
            </UButton>
          </UPageCard>

          <!-- Resources Card -->
          <UPageCard v-if="g.resources?.length">
            <template #title>
              <h3 class="text-lg font-semibold">Resources</h3>
            </template>
            <div class="space-y-2">
              <UButton
                v-for="resource in g.resources"
                :key="resource.url"
                :to="resource.url"
                variant="ghost"
                size="sm"
                class="w-full justify-start"
                icon="i-lucide-file-text"
                external
              >
                {{ resource.title }}
              </UButton>
            </div>
          </UPageCard>

          <UPageCard
            title="Related Games"
            description="Discover more games"
            variant="outline"
          >
            <UNavigationMenu :items="relatedGames" orientation="vertical" />
          </UPageCard>
        </div>
      </UPageGrid>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data: game } = await useAsyncData(`game-${slug}`, () =>
  queryCollection('games').where('slug', '=', slug).first()
)

if (!game.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Game not found'
  })
}

const { data: related } = await useAsyncData('related-games', () =>
  queryCollection('games').all()
)
const relatedGames = computed(() => (related.value || []).filter((x) => x.slug !== slug).map(game => ({
  label: game.title,
  to: `/games/${game.slug}`,
  avatar: {
    src: game.image
  }
})))

// Non-nullable computed for template usage
const g = computed(() => game.value as {
  title: string
  description: string
  image?: string
  price?: number
  tags?: string[]
  manualUrl?: string
  resources?: Array<{ title: string; url: string }>
})

useSeoMeta({
  title: `${g.value?.title} - Shrike Publishing`,
  description: g.value?.description,
  ogImage: g.value?.image
})
</script>
<template>
  <div>
    <UPageHero
      :title="g.title"
      :description="g.description"
      class="bg-gradient-to-br from-primary/15 via-purple-500/10 to-amber-500/10 dark:from-primary/25 dark:via-purple-500/15 dark:to-amber-500/15 py-10 md:py-14"
    >
      <div v-if="g.image" class="mt-6">
        <NuxtImg :src="g.image" :alt="`${g.title} Cover`" class="w-full max-w-3xl mx-auto rounded-lg shadow" />
      </div>
    </UPageHero>

    <UPageSection title="Game Details" description="Everything you need to know">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main content -->
        <div class="lg:col-span-2 space-y-8">
          <UCard variant="outline">
            <div class="prose prose-neutral dark:prose-invert max-w-none">
              <ContentDoc v-slot="{ doc }" :path="`/games/${slug}`">
                <ContentRenderer :value="doc" />
              </ContentDoc>
            </div>
          </UCard>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <UCard variant="outline">
            <div class="space-y-4">
              <h3 class="font-bold text-highlighted">Game Information</h3>
              <div class="space-y-3 text-sm">
                <div class="flex justify-between">
                  <span class="text-muted">Price:</span>
                  <span class="text-highlighted font-bold">${{ g.price }}</span>
                </div>
                <div v-if="(g.tags?.length || 0)" class="flex flex-wrap gap-2">
                  <UBadge v-for="tag in g.tags" :key="tag" variant="subtle" size="sm">{{ tag }}</UBadge>
                </div>
              </div>
            </div>
          </UCard>

          <UCard variant="outline">
            <div class="space-y-4">
              <h3 class="font-bold text-highlighted">Get the Game</h3>
              <div class="space-y-3">
                <UButton to="/contact" variant="outline" size="sm" leading-icon="i-lucide-shopping-cart" class="w-full justify-start">
                  Contact to Purchase
                </UButton>
              </div>
            </div>
          </UCard>

          <UCard variant="outline">
            <div class="space-y-4">
              <h3 class="font-bold text-highlighted">Related Games</h3>
              <div class="space-y-3">
                <NuxtLink
                  v-for="relatedGame in relatedGames"
                  :key="relatedGame.slug"
                  :to="`/games/${relatedGame.slug}`"
                  class="block group"
                >
                  <div class="flex gap-3">
                    <NuxtImg
                      :src="relatedGame.image"
                      :alt="relatedGame.title"
                      class="w-16 h-20 object-cover rounded group-hover:opacity-80 transition-opacity"
                    />
                    <div class="flex-1 min-w-0">
                      <h4 class="font-medium text-highlighted group-hover:text-primary transition-colors line-clamp-2">
                        {{ relatedGame.title }}
                      </h4>
                      <p class="text-sm text-muted line-clamp-2">{{ relatedGame.description }}</p>
                      <p class="text-sm font-bold text-primary">${{ relatedGame.price }}</p>
                    </div>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </UPageSection>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data: game } = await useAsyncData(`game-${slug}`, () =>
  queryCollection('games').where('slug', '=', slug).first()
)

const { data: related } = await useAsyncData('related-games', () =>
  queryCollection('games').all()
)
const relatedGames = computed(() => (related.value || []).filter((x) => x.slug !== slug))

// Non-nullable computed for template usage
const g = computed(() => game.value as unknown as { title: string; description: string; image?: string; price?: number; tags?: string[] })

useSeoMeta({
  title: `${g.value?.title} - Shrike Publishing`,
  description: g.value?.description,
  ogImage: g.value?.image
})
</script>
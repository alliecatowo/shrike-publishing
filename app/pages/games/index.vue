<template>
  <UContainer class="py-8">
    <div class="space-y-8">
      <!-- Page Header -->
      <div class="text-center space-y-4">
        <h1 class="text-4xl font-bold">Our Games</h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Discover our collection of innovative tabletop games, from strategic card games to immersive RPGs.
        </p>
      </div>

      <!-- Games Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UCard
          v-for="game in games"
          :key="game.slug"
          :to="`/games/${game.slug}`"
          class="hover:shadow-lg transition-shadow"
        >
          <template #header>
            <div class="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-t-lg flex items-center justify-center">
              <Icon name="mdi:cube-outline" class="h-16 w-16 text-primary" />
            </div>
          </template>

          <div class="p-6">
            <div class="flex items-start justify-between mb-3">
              <h3 class="text-xl font-semibold">{{ game.title }}</h3>
              <UBadge
                v-if="!game.available"
                color="error"
                variant="soft"
              >
                Coming Soon
              </UBadge>
              <UBadge
                v-else
                color="success"
                variant="soft"
              >
                Available
              </UBadge>
            </div>

            <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
              {{ game.description }}
            </p>

            <div class="flex flex-wrap gap-1 mb-4">
              <UBadge
                v-for="tag in game.tags"
                :key="tag"
                size="sm"
                variant="outline"
              >
                {{ tag }}
              </UBadge>
            </div>

            <div class="flex items-center justify-between">
              <div class="text-2xl font-bold text-primary">
                ${{ game.price }}
                <span class="text-sm text-gray-500">{{ game.currency }}</span>
              </div>
              <UButton size="sm" :to="`/games/${game.slug}`">
                Learn More
              </UButton>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Call to Action -->
      <div class="text-center space-y-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
        <h2 class="text-2xl font-bold">Want to Stay Updated?</h2>
        <p class="text-gray-600 dark:text-gray-400">
          Get notified about new releases and special offers.
        </p>
        <UButton to="/contact" icon="i-heroicons-envelope">
          Contact Us
        </UButton>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
// Fetch all games
const { data: games } = await useAsyncData('games', () =>
  queryCollection('games').order('date', 'DESC').all()
)

// SEO
useSeoMeta({
  title: 'Games - Shrike Publishing',
  description: 'Explore our collection of tabletop games including Era of Silence and Blood Neon.'
})
</script>

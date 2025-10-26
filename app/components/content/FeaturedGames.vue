<template>
  <UPageSection
    v-if="games?.length"
    :title="title"
    :description="description"
    class="py-4"
  >
    <UPageGrid :cols="{ default: 1, md: 2, lg: 3 }" class="gap-6">
      <UCard
        v-for="game in games"
        :key="game.slug"
        :to="`/games/${game.slug}`"
        variant="subtle"
        :spotlight="true"
        spotlight-color="primary"
        class="group"
      >
        <template #header>
          <NuxtImg
            v-if="game.coverImage || game.image"
            :src="game.coverImage || game.image"
            :alt="game.title"
            class="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </template>

        <div class="space-y-2">
          <h3 class="text-xl font-bold">
            {{ game.title }}
          </h3>
          <p class="text-muted leading-relaxed">
            {{ game.description }}
          </p>
        </div>

        <template #footer>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <UBadge variant="soft" color="success" size="sm">
                ${{ game.price }}
              </UBadge>
              <span class="text-sm text-muted">Available</span>
            </div>
            <UButton
              size="sm"
              variant="soft"
              color="primary"
              trailing-icon="i-lucide-arrow-right"
              :to="`/games/${game.slug}`"
            >
              Learn More
            </UButton>
          </div>
        </template>
      </UCard>
    </UPageGrid>

    <div class="text-center mt-8">
      <UButton
        to="/games"
        variant="outline"
        size="lg"
        trailing-icon="i-lucide-arrow-right"
      >
        View All Games
      </UButton>
    </div>
  </UPageSection>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string
  description?: string
}>()

// Access dynamic data passed from ContentRenderer via queryCollection in index.vue
const games = inject('featuredGames', ref([]))
</script>

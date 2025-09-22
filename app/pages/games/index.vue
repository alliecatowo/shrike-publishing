<template>
  <div>
    <!-- Page Header -->
    <UPageSection
      :title="pageContent?.games?.header?.title || 'Our Games'"
      :description="pageContent?.games?.header?.description || 'Discover our collection of innovative tabletop games, from strategic card games to immersive RPGs.'"
      :ui="{ container: 'text-center' }"
    />

    <!-- Games Grid -->
    <UPageSection>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        <UCard
          v-for="game in games"
          :key="game.slug"
          :to="`/games/${game.slug}`"
          variant="outline"
          class="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
        >
          <template #header>
            <div class="relative overflow-hidden">
              <!-- Game Cover Art -->
              <div class="aspect-[16/9] bg-gradient-to-br from-primary/15 via-purple-500/10 to-amber-500/10 dark:from-primary/25 dark:via-purple-500/15 dark:to-amber-500/15 rounded-t-lg relative">
                <NuxtImg
                  v-if="game.image"
                  :src="game.image"
                  :alt="`${game.title} Cover`"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div v-else class="w-full h-full flex items-center justify-center">
                  <UIcon name="i-lucide-gamepad-2" class="size-20 text-primary/60" />
                </div>
                
                <!-- Overlay -->
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                
                <!-- Status Badge -->
                <div class="absolute top-3 right-3">
                  <UBadge
                    :variant="game.available ? 'solid' : 'soft'"
                    :color="game.available ? 'success' : 'warning'"
                    size="sm"
                  >
                    {{ game.available ? 'Available' : 'Coming Soon' }}
                  </UBadge>
                </div>

                <!-- Preview Button -->
                <div class="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <UButton
                    variant="solid"
                    color="primary"
                    size="sm"
                    class="w-full"
                    trailing-icon="i-lucide-arrow-right"
                  >
                    Explore Game
                  </UButton>
                </div>
              </div>
            </div>
          </template>

          <div class="space-y-3">
            <!-- Title and Price -->
            <div class="flex items-start justify-between">
              <h3 class="text-xl font-bold text-highlighted group-hover:text-primary transition-colors line-clamp-2">
                {{ game.title }}
              </h3>
              <div v-if="game.price" class="text-right flex-shrink-0 ml-3">
                <div class="text-lg font-bold text-primary">
                  ${{ game.price }}
                </div>
                <div class="text-xs text-muted">{{ game.currency || 'USD' }}</div>
              </div>
            </div>

            <!-- Description -->
            <p class="text-muted leading-relaxed line-clamp-2">
              {{ game.description }}
            </p>

            <!-- Game Meta -->
            <div class="flex flex-wrap gap-2 text-sm">
              <UBadge v-for="tag in (game.tags || []).slice(0,3)" :key="tag" variant="subtle" size="sm">
                {{ tag }}
              </UBadge>
            </div>

            <!-- Tags overflow counter -->
            <div v-if="(game.tags?.length || 0) > 3" class="flex">
              <UBadge variant="outline" size="sm">
                +{{ (game.tags?.length || 0) - 3 }}
              </UBadge>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-2 pt-2">
              <UButton
                :to="`/games/${game.slug}`"
                variant="outline"
                size="sm"
                class="flex-1"
                trailing-icon="i-lucide-book-open"
              >
                Learn More
              </UButton>
              <UButton
                variant="soft"
                color="primary"
                size="sm"
                icon="i-lucide-arrow-right"
                :to="`/games/${game.slug}`"
              >
                View Details
              </UButton>
            </div>
          </div>
        </UCard>
      </div>
    </UPageSection>

    <!-- Call to Action -->
    <UPageCTA
      :title="components?.cta?.title || 'Want to Stay Updated?'"
      :description="components?.cta?.description || 'Get notified about new releases and special offers.'"
      :links="components?.cta?.cta ? [{
        label: components.cta.cta.text,
        to: components.cta.cta.to,
        ...(components.cta.cta.icon && { leadingIcon: components.cta.cta.icon })
      }] : []"
      :class="components?.cta?.background ? '' : 'bg-gray-50 dark:bg-gray-800'"
    />
  </div>
</template>

<script setup lang="ts">
import { usePageContent } from '~/composables/usePageContent'
import { useComponents } from '~/composables/useComponents'

// Fetch page content and components
const pageContent = await usePageContent('games')
const components = await useComponents()

// Fetch all games
const { data: games } = await useAsyncData('games-page', () =>
  queryCollection('games').order('date', 'DESC').all()
)

// SEO
useSeoMeta({
  title: pageContent.value?.games?.meta?.title || 'Games - Shrike Publishing',
  description: pageContent.value?.games?.meta?.description || 'Explore our collection of tabletop games.'
})
</script>

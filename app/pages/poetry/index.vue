<template>
  <UContainer class="py-8">
    <div class="max-w-6xl mx-auto space-y-8">
      <!-- Page Header -->
      <div class="text-center space-y-4">
        <h1 class="text-4xl font-bold">Poetry Collection</h1>
        <p class="text-xl text-gray-600 dark:text-gray-400">
          Verses exploring themes from our game worlds and beyond.
        </p>
      </div>

      <!-- Filter Tabs -->
      <UTabs v-model="activeTab" :items="tabs" />

      <!-- Poetry Grid -->
      <UPageGrid :cols="{ default: 1, sm: 2, lg: 3, xl: 4 }" class="gap-6">
        <UCard
          v-for="poem in filteredPoems"
          :key="poem.slug"
          :to="`/poetry/${poem.slug}`"
          class="card-hover group"
        >
          <template #header>
            <div class="aspect-[4/3] overflow-hidden rounded-t-md">
              <template v-if="poem.image || poem.thumbnail">
                <NuxtImg
                  :src="poem.image || poem.thumbnail"
                  :alt="poem.title"
                  class="w-full h-full object-cover block group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />
              </template>
              <template v-else>
                <div class="h-full w-full bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900 dark:to-purple-900 flex items-center justify-center">
                  <UIcon name="i-lucide-feather" class="h-12 w-12 text-pink-600 dark:text-pink-400" />
                </div>
              </template>
            </div>
          </template>

          <div class="p-5 space-y-3">
            <div class="flex items-center justify-between mb-3">
              <span class="text-sm text-gray-500">
                {{ poem.date }}
              </span>
              <UBadge
                v-if="poem.featured"
                color="pink"
                variant="soft"
                size="xs"
              >
                Featured
              </UBadge>
            </div>

            <h3 class="text-lg font-semibold line-clamp-2">{{ poem.title }}</h3>

            <p class="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 italic">
              {{ poem.description || poem.excerpt }}
            </p>

            <div class="flex items-center justify-between">
              <TagList :tags="poem.tags" color="pink" clickable />
              <UButton size="xs" variant="outline" :to="`/poetry/${poem.slug}`" trailing-icon="i-lucide-arrow-right">
                Read
              </UButton>
            </div>
          </div>
        </UCard>
      </UPageGrid>

      <!-- Empty State -->
      <div v-if="filteredPoems.length === 0" class="text-center py-12">
        <UIcon name="i-lucide-feather" class="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
          No {{ activeTab === 'all' ? 'poetry' : activeTab }} yet
        </h3>
        <p class="text-gray-500">Check back soon for new verses!</p>
      </div>

      <!-- Call to Action -->
      <div class="text-center space-y-4 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-lg p-8">
        <h2 class="text-2xl font-bold">Submit Your Poetry</h2>
        <p class="text-gray-600 dark:text-gray-400">
          We welcome submissions from writers inspired by our game worlds.
        </p>
        <UButton to="/contact" icon="i-lucide-mail" color="pink">
          Get in Touch
        </UButton>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import TagList from '~/components/TagList.vue'

// Fetch all poetry
const { data: poetry } = await useAsyncData('poetry', () =>
  queryCollection('poetry').order('date', 'DESC').find()
)

const poetryValue = computed(() => (poetry.value || []).filter(p => p.published))

const activeTab = ref('all')

const tabs = [
  { label: 'All Poetry', value: 'all' },
  { label: 'Era of Silence', value: 'era-of-silence' },
  { label: 'Blood Neon', value: 'blood-neon' },
  { label: 'Original', value: 'original' }
]

const filteredPoems = computed(() => {
  if (activeTab.value === 'all') return poetryValue.value
  return poetryValue.value.filter((poem) =>
    poem.tags?.includes(activeTab.value) || poem.category === activeTab.value
  )
})



// SEO
useSeoMeta({
  title: 'Poetry Collection - Shrike Publishing',
  description: 'Explore our collection of poetry inspired by our game worlds, including verses from Era of Silence and Blood Neon.',
  keywords: 'poetry, verse, creative writing, Era of Silence, Blood Neon, tabletop RPG poetry'
})
</script>

<template>
  <UContainer class="py-8">
    <div class="max-w-6xl mx-auto space-y-8">
      <!-- Page Header -->
      <UPageSection
        :title="pageContent?.stories?.header?.title || 'Stories & Literature'"
        :description="pageContent?.stories?.header?.description || 'Explore our published works and free stories set in our game worlds.'"
        :ui="{ container: 'text-center' }"
      />

      <!-- Filter Tabs -->
      <UTabs v-model="activeTab" :items="tabs" />

      <!-- Stories Grid -->
      <UPageGrid :cols="{ default: 1, sm: 2, lg: 3, xl: 4 }" class="gap-6">
        <UCard
          v-for="story in filteredStories"
          :key="story.slug"
          :to="`/stories/${story.slug}`"
          class="card-hover"
        >
          <template #header>
            <div class="aspect-[4/3] overflow-hidden rounded-t-md">
              <template v-if="story.image || story.thumbnail">
                <NuxtImg
                  :src="story.image || story.thumbnail"
                  :alt="story.title"
                  class="w-full h-full object-cover block"
                  loading="lazy"
                  decoding="async"
                />
              </template>
              <template v-else>
                <div class="h-full w-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 flex items-center justify-center">
                  <UIcon name="i-lucide-book-open" class="h-12 w-12 " color="purple" />
                </div>
              </template>
            </div>
          </template>

          <div class="p-5 space-y-3">
            <div class="flex items-center justify-between mb-3">
              <UBadge
                :color="story.type === 'free' ? 'success' : 'primary'"
                variant="soft"
              >
                {{ story.type === 'free' ? 'Free' : 'Published' }}
              </UBadge>
              <span class="text-sm text-gray-500">
                {{ formatDate(story.date) }}
              </span>
            </div>

            <h3 class="text-lg font-semibold line-clamp-2">{{ story.title }}</h3>

            <p class="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
              {{ story.description }}
            </p>

            <div class="flex items-center justify-between">
              <div class="flex flex-wrap gap-1">
                <UBadge
                  v-for="tag in story.tags"
                  :key="tag"
                  size="xs"
                  variant="soft"
                >
                  {{ tag }}
                </UBadge>
              </div>
              <UButton size="xs" variant="outline" :to="`/stories/${story.slug}`" trailing-icon="i-lucide-arrow-right">
                Read
              </UButton>
            </div>
          </div>
        </UCard>
      </UPageGrid>

      <!-- Empty State -->
      <div v-if="filteredStories.length === 0" class="text-center py-12">
        <UIcon name="i-lucide-book-open" class="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
          No {{ activeTab === 'all' ? 'stories' : activeTab }} yet
        </h3>
        <p class="text-gray-500">Check back soon for new content!</p>
      </div>

    </div>
  </UContainer>
</template>

<script setup lang="ts">
import { usePageContent } from '~/composables/usePageContent'

// Fetch page content
const pageContent = await usePageContent('stories')

// Fetch all stories
const { data: stories } = await useAsyncData('stories', () =>
  queryCollection('stories').where('published', '=', true).order('date', 'DESC').all()
)

const storiesValue = computed(() => stories.value || [])

const activeTab = ref('all')

const tabs = [
  { label: 'All Stories', value: 'all' },
  { label: 'Free Stories', value: 'free' },
  { label: 'Published Works', value: 'published' }
]

const filteredStories = computed(() => {
  if (activeTab.value === 'all') return storiesValue.value
  return storiesValue.value.filter((story) => story.type === activeTab.value)
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// SEO
useSeoMeta({
  title: pageContent.value?.stories?.meta?.title,
  description: pageContent.value?.stories?.meta?.description
})
</script>

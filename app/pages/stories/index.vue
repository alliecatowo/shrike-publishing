<template>
  <UContainer class="py-8">
    <div class="max-w-6xl mx-auto space-y-8">
      <!-- Page Header -->
      <div class="text-center space-y-4">
        <h1 class="text-4xl font-bold">Stories & Literature</h1>
        <p class="text-xl text-gray-600 dark:text-gray-400">
          Explore our published works and free stories set in our game worlds.
        </p>
      </div>

      <!-- Filter Tabs -->
      <UTabs v-model="activeTab" :items="tabs" />

      <!-- Stories Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                  <Icon name="lucide:book-open" class="h-12 w-12 text-purple-600 dark:text-purple-400" />
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
      </div>

      <!-- Empty State -->
      <div v-if="filteredStories.length === 0" class="text-center py-12">
        <Icon name="lucide:book-open" class="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
          No {{ activeTab === 'all' ? 'stories' : activeTab }} yet
        </h3>
        <p class="text-gray-500">Check back soon for new content!</p>
      </div>

      <!-- Call to Action -->
      <div class="text-center space-y-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
        <h2 class="text-2xl font-bold">Want to contribute?</h2>
        <p class="text-gray-600 dark:text-gray-400">
          We're always looking for talented writers to expand our worlds.
        </p>
        <UButton to="/contact" icon="i-heroicons-envelope">
          Get in Touch
        </UButton>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
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
  title: 'Stories & Literature - Shrike Publishing',
  description: 'Read free stories and published literature set in our game worlds, including tales from Era of Silence and Blood Neon.'
})
</script>

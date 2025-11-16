<script setup lang="ts">
// Fetch all lore entries
const { data: loreEntries } = await useAsyncData('lore-entries', () =>
  queryCollection('lore').where('published', true).all()
)

// Group entries by category
const groupedEntries = computed(() => {
  const groups: Record<string, any[]> = {}

  loreEntries.value?.forEach((entry) => {
    const category = entry.category || 'Uncategorized'
    if (!groups[category]) {
      groups[category] = []
    }
    groups[category].push(entry)
  })

  return groups
})

// Get all categories for filtering
const categories = computed(() => Object.keys(groupedEntries.value || {}))

// Featured entries
const featuredEntries = computed(() =>
  loreEntries.value?.filter(entry => entry.featured) || []
)

useSeoMeta({
  title: 'Lore Wiki',
  description: 'Explore the rich lore, characters, locations, and history of our worlds.',
})
</script>

<template>
  <UContainer class="py-12">
    <!-- Header -->
    <div class="mb-12 text-center">
      <h1 class="text-4xl font-bold mb-4">Lore Wiki</h1>
      <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Explore the rich lore, characters, locations, and history of our worlds. Use the search below to find specific entries.
      </p>
    </div>

    <!-- Content Search Component -->
    <div class="mb-12">
      <ContentSearch
        :files="loreEntries || []"
        file-icon="lucide:book-open"
        placeholder="Search the lore wiki..."
        class="max-w-2xl mx-auto"
      />
    </div>

    <!-- Featured Entries -->
    <div v-if="featuredEntries.length > 0" class="mb-12">
      <h2 class="text-2xl font-bold mb-6">Featured Entries</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UCard
          v-for="entry in featuredEntries"
          :key="entry._path"
          :to="entry._path"
          class="hover:shadow-lg transition-shadow"
        >
          <template v-if="entry.thumbnail || entry.image" #header>
            <img
              :src="entry.thumbnail || entry.image"
              :alt="entry.title"
              class="w-full h-48 object-cover"
            />
          </template>

          <div>
            <h3 class="text-xl font-semibold mb-2">{{ entry.title }}</h3>
            <p v-if="entry.description" class="text-gray-600 dark:text-gray-400 text-sm mb-3">
              {{ entry.description }}
            </p>

            <div class="flex flex-wrap gap-2">
              <UBadge v-if="entry.category" color="primary" variant="subtle" size="sm">
                {{ entry.category }}
              </UBadge>
              <UBadge v-if="entry.era" color="purple" variant="subtle" size="sm">
                {{ entry.era }}
              </UBadge>
              <UBadge v-if="entry.game" color="pink" variant="subtle" size="sm">
                {{ entry.game }}
              </UBadge>
            </div>
          </div>
        </UCard>
      </div>
    </div>

    <!-- Browse by Category -->
    <div v-if="categories.length > 0" class="mb-12">
      <h2 class="text-2xl font-bold mb-6">Browse by Category</h2>

      <UTabs :items="categories.map(cat => ({ label: cat, value: cat }))">
        <template #default="{ item }">
          <div class="py-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <NuxtLink
                v-for="entry in groupedEntries[item.value]"
                :key="entry._path"
                :to="entry._path"
                class="p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors group"
              >
                <div class="flex items-start gap-3">
                  <UIcon
                    name="lucide:book-open"
                    class="text-primary-500 mt-1 flex-shrink-0"
                  />
                  <div class="flex-1 min-w-0">
                    <h3 class="font-semibold group-hover:text-primary-500 transition-colors truncate">
                      {{ entry.title }}
                    </h3>
                    <p v-if="entry.description" class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">
                      {{ entry.description }}
                    </p>

                    <div class="flex flex-wrap gap-1 mt-2">
                      <UBadge v-if="entry.era" variant="subtle" size="xs" color="purple">
                        {{ entry.era }}
                      </UBadge>
                      <UBadge
                        v-for="tag in entry.tags?.slice(0, 2)"
                        :key="tag"
                        variant="subtle"
                        size="xs"
                      >
                        {{ tag }}
                      </UBadge>
                    </div>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </template>
      </UTabs>
    </div>

    <!-- Empty State -->
    <div v-if="!loreEntries || loreEntries.length === 0" class="text-center py-12">
      <UIcon name="lucide:book-open" class="text-6xl text-gray-400 mb-4 mx-auto" />
      <h3 class="text-xl font-semibold mb-2">No Lore Entries Yet</h3>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        The lore wiki is empty. Add content to <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">/content/lore/</code> to get started.
      </p>
    </div>
  </UContainer>
</template>

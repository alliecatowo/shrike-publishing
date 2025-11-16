<script setup lang="ts">
definePageMeta({
  layout: 'lore'
})

// Fetch all lore entries
const { data: allLoreEntries } = await useAsyncData('lore-entries', () =>
  queryCollection('lore').all()
)

// Filter out README and template files
const loreEntries = computed(() => {
  return allLoreEntries.value?.filter(entry => {
    const path = entry._path?.toLowerCase() || ''
    return !path.includes('readme') && !path.includes('_template')
  }) || []
})

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

// Get all categories for tabs
const categories = computed(() => {
  const cats = Object.keys(groupedEntries.value || {})
  const allCategory = {
    label: 'All',
    value: 'all',
    count: loreEntries.value?.length || 0
  }

  const categoryItems = cats.map(cat => ({
    label: cat,
    value: cat,
    count: groupedEntries.value[cat]?.length || 0
  }))

  return [allCategory, ...categoryItems]
})

// Featured entries
const featuredEntries = computed(() =>
  loreEntries.value?.filter(entry => entry.featured) || []
)

// Recent entries (last 6)
const recentEntries = computed(() =>
  loreEntries.value?.slice(0, 6) || []
)

// Get unique eras
const eras = computed(() => {
  const uniqueEras = new Set<string>()
  loreEntries.value?.forEach(entry => {
    if (entry.era) uniqueEras.add(entry.era)
  })
  return Array.from(uniqueEras)
})

useSeoMeta({
  title: 'Lore Wiki - Shrike Publishing',
  description: 'Explore the rich lore, characters, locations, and history of our worlds. A comprehensive wiki of stories, events, and knowledge.',
})
</script>

<template>
  <div>
    <!-- Hero Header -->
    <UPageSection
      title="Lore Wiki"
      description="Explore the rich lore, characters, locations, and history of our worlds. Use the search below to find specific entries or browse by category."
      :ui="{
        container: 'text-center',
        wrapper: 'bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 dark:from-primary/10 dark:via-purple-500/10 dark:to-pink-500/10'
      }"
    >
      <template #links>
        <div class="flex flex-wrap items-center justify-center gap-2 mt-4">
          <UBadge
            v-for="era in eras"
            :key="era"
            variant="subtle"
            color="purple"
            size="md"
          >
            <UIcon name="lucide:clock" class="mr-1" />
            {{ era }}
          </UBadge>
        </div>
      </template>
    </UPageSection>

    <!-- Featured Entries -->
    <UPageSection v-if="featuredEntries.length > 0">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-3xl font-bold mb-2">Featured Entries</h2>
          <p class="text-muted">Essential knowledge and highlighted content</p>
        </div>
        <UIcon name="lucide:star" class="text-4xl text-primary/20" />
      </div>

      <UPageGrid :cols="{ default: 1, md: 2, lg: 3 }">
        <UCard
          v-for="entry in featuredEntries"
          :key="entry._path"
          :to="entry._path"
          variant="outline"
          class="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <template v-if="entry.thumbnail || entry.image" #header>
            <div class="relative overflow-hidden aspect-video bg-gradient-to-br from-primary/10 to-purple-500/10">
              <NuxtImg
                :src="entry.thumbnail || entry.image"
                :alt="entry.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />

              <!-- Featured Badge -->
              <div class="absolute top-3 right-3">
                <UBadge color="primary" variant="solid" size="sm">
                  <UIcon name="lucide:star" class="mr-1" />
                  Featured
                </UBadge>
              </div>
            </div>
          </template>

          <div class="space-y-3">
            <h3 class="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
              {{ entry.title }}
            </h3>

            <p v-if="entry.description" class="text-muted leading-relaxed line-clamp-3">
              {{ entry.description }}
            </p>

            <div class="flex flex-wrap gap-2">
              <UBadge v-if="entry.category" color="primary" variant="subtle" size="sm">
                <UIcon name="lucide:folder" class="mr-1" />
                {{ entry.category }}
              </UBadge>
              <UBadge v-if="entry.era" color="purple" variant="subtle" size="sm">
                <UIcon name="lucide:clock" class="mr-1" />
                {{ entry.era }}
              </UBadge>
              <UBadge v-if="entry.game" color="pink" variant="subtle" size="sm">
                <UIcon name="lucide:gamepad-2" class="mr-1" />
                {{ entry.game }}
              </UBadge>
            </div>
          </div>

          <template #footer>
            <UButton
              :to="entry._path"
              variant="soft"
              color="primary"
              size="sm"
              block
              trailing-icon="lucide:arrow-right"
            >
              Read More
            </UButton>
          </template>
        </UCard>
      </UPageGrid>
    </UPageSection>

    <!-- Recent Entries -->
    <UPageSection v-if="recentEntries.length > 0 && !featuredEntries.length">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-3xl font-bold mb-2">Recent Additions</h2>
          <p class="text-muted">Latest lore entries added to the wiki</p>
        </div>
        <UIcon name="lucide:clock" class="text-4xl text-primary/20" />
      </div>

      <UPageGrid :cols="{ default: 1, md: 2, lg: 3 }">
        <UCard
          v-for="entry in recentEntries"
          :key="entry._path"
          :to="entry._path"
          variant="outline"
          class="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          <div class="space-y-3">
            <div class="flex items-start gap-3">
              <div class="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-purple-500/10 flex-shrink-0">
                <UIcon
                  :name="entry.category === 'Characters' ? 'lucide:user' :
                         entry.category === 'Locations' ? 'lucide:map-pin' :
                         entry.category === 'Historical Events' ? 'lucide:scroll' :
                         entry.category === 'Phenomena' ? 'lucide:sparkles' :
                         entry.category === 'Organizations' ? 'lucide:users' :
                         entry.category === 'Guides' ? 'lucide:compass' :
                         'lucide:book-open'"
                  class="text-primary size-6"
                />
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-semibold group-hover:text-primary transition-colors truncate mb-1">
                  {{ entry.title }}
                </h3>
                <p v-if="entry.description" class="text-sm text-muted line-clamp-2">
                  {{ entry.description }}
                </p>
              </div>
            </div>

            <div class="flex flex-wrap gap-1">
              <UBadge v-if="entry.category" variant="subtle" size="xs">
                {{ entry.category }}
              </UBadge>
              <UBadge v-if="entry.era" variant="subtle" size="xs" color="purple">
                {{ entry.era }}
              </UBadge>
              <UBadge
                v-for="tag in entry.tags?.slice(0, 2)"
                :key="tag"
                variant="outline"
                size="xs"
              >
                {{ tag }}
              </UBadge>
            </div>
          </div>
        </UCard>
      </UPageGrid>
    </UPageSection>

    <!-- Browse by Category -->
    <UPageSection v-if="categories.length > 0">
      <div class="mb-8">
        <h2 class="text-3xl font-bold mb-2">Browse by Category</h2>
        <p class="text-muted">Explore lore organized by type and topic</p>
      </div>

      <UTabs
        :items="categories.map(cat => ({
          label: `${cat.label} (${cat.count})`,
          value: cat.value,
          slot: cat.value,
          icon: cat.value === 'all' ? 'lucide:grid-3x3' :
                cat.value === 'Characters' ? 'lucide:user' :
                cat.value === 'Locations' ? 'lucide:map-pin' :
                cat.value === 'Historical Events' ? 'lucide:scroll' :
                cat.value === 'Phenomena' ? 'lucide:sparkles' :
                cat.value === 'Organizations' ? 'lucide:users' :
                cat.value === 'Guides' ? 'lucide:compass' :
                'lucide:folder'
        }))"
        :ui="{
          wrapper: 'space-y-6',
          list: {
            wrapper: 'mb-6',
            background: 'bg-gray-100 dark:bg-gray-800/50',
            rounded: 'rounded-lg',
            padding: 'p-1'
          }
        }"
      >
        <template #all>
          <div class="py-6">
            <UPageGrid :cols="{ default: 1, md: 2, lg: 3 }">
              <UCard
                v-for="entry in loreEntries"
                :key="entry._path"
                :to="entry._path"
                variant="outline"
                class="group hover:shadow-lg hover:border-primary/50 transition-all duration-200"
              >
                <div class="flex items-start gap-4">
                  <div class="p-2.5 rounded-lg bg-gradient-to-br from-primary/10 to-purple-500/10 flex-shrink-0 group-hover:scale-110 transition-transform">
                    <UIcon
                      name="lucide:book-open"
                      class="text-primary size-5"
                    />
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="font-semibold text-lg group-hover:text-primary transition-colors mb-2 line-clamp-1">
                      {{ entry.title }}
                    </h3>
                    <p v-if="entry.description" class="text-sm text-muted line-clamp-2 mb-3">
                      {{ entry.description }}
                    </p>

                    <div class="flex flex-wrap gap-1.5">
                      <UBadge v-if="entry.category" variant="subtle" size="xs" color="primary">
                        <UIcon name="lucide:folder" class="mr-1" />
                        {{ entry.category }}
                      </UBadge>
                      <UBadge v-if="entry.era" variant="subtle" size="xs" color="purple">
                        <UIcon name="lucide:clock" class="mr-1" />
                        {{ entry.era }}
                      </UBadge>
                      <UBadge v-if="entry.game" variant="subtle" size="xs" color="pink">
                        <UIcon name="lucide:gamepad-2" class="mr-1" />
                        {{ entry.game }}
                      </UBadge>
                      <UBadge
                        v-for="tag in entry.tags?.slice(0, 2)"
                        :key="tag"
                        variant="outline"
                        size="xs"
                      >
                        {{ tag }}
                      </UBadge>
                      <UBadge v-if="(entry.tags?.length || 0) > 2" variant="outline" size="xs">
                        +{{ (entry.tags?.length || 0) - 2 }}
                      </UBadge>
                    </div>
                  </div>
                </div>
              </UCard>
            </UPageGrid>
          </div>
        </template>

        <template v-for="cat in categories.filter(c => c.value !== 'all')" :key="cat.value" #[cat.value]>
          <div class="py-6">
            <UPageGrid :cols="{ default: 1, md: 2, lg: 3 }">
              <UCard
                v-for="entry in groupedEntries[cat.value]"
                :key="entry._path"
                :to="entry._path"
                variant="outline"
                class="group hover:shadow-lg hover:border-primary/50 transition-all duration-200"
              >
                <div class="flex items-start gap-4">
                  <div class="p-2.5 rounded-lg bg-gradient-to-br from-primary/10 to-purple-500/10 flex-shrink-0 group-hover:scale-110 transition-transform">
                    <UIcon
                      name="lucide:book-open"
                      class="text-primary size-5"
                    />
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="font-semibold text-lg group-hover:text-primary transition-colors mb-2 line-clamp-1">
                      {{ entry.title }}
                    </h3>
                    <p v-if="entry.description" class="text-sm text-muted line-clamp-2 mb-3">
                      {{ entry.description }}
                    </p>

                    <div class="flex flex-wrap gap-1.5">
                      <UBadge v-if="entry.era" variant="subtle" size="xs" color="purple">
                        <UIcon name="lucide:clock" class="mr-1" />
                        {{ entry.era }}
                      </UBadge>
                      <UBadge v-if="entry.game" variant="subtle" size="xs" color="pink">
                        <UIcon name="lucide:gamepad-2" class="mr-1" />
                        {{ entry.game }}
                      </UBadge>
                      <UBadge
                        v-for="tag in entry.tags?.slice(0, 2)"
                        :key="tag"
                        variant="outline"
                        size="xs"
                      >
                        {{ tag }}
                      </UBadge>
                      <UBadge v-if="(entry.tags?.length || 0) > 2" variant="outline" size="xs">
                        +{{ (entry.tags?.length || 0) - 2 }}
                      </UBadge>
                    </div>
                  </div>
                </div>
              </UCard>
            </UPageGrid>
          </div>
        </template>
      </UTabs>
    </UPageSection>

    <!-- Empty State -->
    <UPageSection v-if="!loreEntries || loreEntries.length === 0">
      <div class="text-center py-16">
        <div class="mb-6 flex justify-center">
          <div class="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-500/10">
            <UIcon name="lucide:book-open" class="text-6xl text-primary" />
          </div>
        </div>
        <h3 class="text-2xl font-bold mb-3">No Lore Entries Yet</h3>
        <p class="text-muted mb-6 max-w-md mx-auto">
          The lore wiki is empty. Add content to <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">/content/lore/</code> to get started.
        </p>
        <div class="flex flex-wrap gap-3 justify-center">
          <UButton
            to="https://content.nuxt.com/docs"
            target="_blank"
            variant="outline"
            trailing-icon="lucide:external-link"
          >
            Learn About Nuxt Content
          </UButton>
        </div>
      </div>
    </UPageSection>
  </div>
</template>

<script setup lang="ts">
// Fetch search sections from all content collections for global search
const { data: searchFiles } = useLazyAsyncData('global-search-files', async () => {
  // Ignore h1 tags to prevent duplicates (page titles are already represented by the page itself)
  const searchOptions = { ignoredTags: ['h1'] }

  const results = await Promise.allSettled([
    queryCollectionSearchSections('lore', searchOptions),
    queryCollectionSearchSections('stories', searchOptions),
    queryCollectionSearchSections('blog', searchOptions),
    queryCollectionSearchSections('poetry', searchOptions),
    queryCollectionSearchSections('announcements', searchOptions),
    queryCollectionSearchSections('games', searchOptions)
  ])

  // Flatten all successful results into a single array
  return results
    .filter((result): result is PromiseFulfilledResult<any[]> => result.status === 'fulfilled')
    .flatMap(result => result.value)
}, { server: false })

// Fetch combined navigation from key collections
const { data: searchNavigation } = await useAsyncData('global-search-navigation', async () => {
  const results = await Promise.allSettled([
    queryCollectionNavigation('lore'),
    queryCollectionNavigation('stories'),
    queryCollectionNavigation('blog'),
    queryCollectionNavigation('poetry'),
    queryCollectionNavigation('announcements'),
    queryCollectionNavigation('games')
  ])

  // Combine all successful navigation results
  return results
    .filter((result): result is PromiseFulfilledResult<any[]> => result.status === 'fulfilled')
    .flatMap(result => result.value)
})

const searchTerm = ref('')
</script>

<template>
  <UApp>
    <NuxtRouteAnnouncer />

    <!-- Global Content Search (Cmd+L) -->
    <ClientOnly>
      <LazyUContentSearch
        v-model:search-term="searchTerm"
        :files="searchFiles || []"
        :navigation="searchNavigation || []"
        shortcut="meta_l"
        placeholder="Search content..."
        file-icon="lucide:search"
        :fuse="{ resultLimit: 20 }"
        title="Search"
        description="Search through lore, stories, blog posts, poetry, and more"
      />
    </ClientOnly>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

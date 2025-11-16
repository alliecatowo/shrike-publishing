<script setup lang="ts">
// Fetch lore search sections for global command palette
const { data: loreSearchSections } = useLazyAsyncData('lore-search-global', () =>
  queryCollectionSearchSections('lore'),
  { server: false }
)

const loreSearchTerm = ref('')
</script>

<template>
  <UApp>
    <NuxtRouteAnnouncer />

    <!-- Global Lore Wiki Search (Cmd+L) -->
    <ClientOnly>
      <LazyUContentSearch
        v-model:search-term="loreSearchTerm"
        :files="loreSearchSections || []"
        shortcut="meta_l"
        placeholder="Search lore wiki..."
        file-icon="lucide:book-open"
        :fuse="{ resultLimit: 42 }"
        :color-mode="false"
        title="Search Lore"
        description="Search through all lore entries, characters, locations, and more"
      />
    </ClientOnly>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

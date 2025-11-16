<script setup lang="ts">
const route = useRoute()

// Get the full slug path
const slug = Array.isArray(route.params.slug)
  ? route.params.slug.join('/')
  : route.params.slug

// Fetch the lore entry
const { data: entry } = await useAsyncData(`lore-${slug}`, () =>
  queryCollection('lore').path(`/lore/${slug}`).first()
)

// Fetch related entries if they exist
const { data: relatedEntries } = await useAsyncData(`lore-related-${slug}`, async () => {
  if (!entry.value?.relatedEntries || entry.value.relatedEntries.length === 0) {
    return []
  }

  const related = await Promise.all(
    entry.value.relatedEntries.map((relatedSlug: string) =>
      queryCollection('lore').path(`/lore/${relatedSlug}`).first()
    )
  )

  return related.filter(Boolean)
})

// Fetch other entries in the same category
const { data: categoryEntries } = await useAsyncData(`lore-category-${slug}`, async () => {
  if (!entry.value?.category) return []

  const entries = await queryCollection('lore')
    .where('category', entry.value.category)
    .where('published', true)
    .all()

  // Filter out current entry
  return entries.filter(e => e._path !== entry.value._path).slice(0, 6)
})

// 404 if entry not found
if (!entry.value) {
  throw createError({
    statusCode: 404,
    message: 'Lore entry not found'
  })
}

// SEO
useSeoMeta({
  title: entry.value.title,
  description: entry.value.description || `Explore ${entry.value.title} in our lore wiki`,
  ogTitle: entry.value.title,
  ogDescription: entry.value.description,
  ogImage: entry.value.image,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <UContainer class="py-12">
    <div class="max-w-4xl mx-auto">
      <!-- Breadcrumbs -->
      <nav class="mb-8">
        <ol class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <li>
            <NuxtLink to="/lore" class="hover:text-primary-500">
              Lore Wiki
            </NuxtLink>
          </li>
          <li>
            <UIcon name="lucide:chevron-right" class="text-xs" />
          </li>
          <li v-if="entry.category">
            <span class="text-gray-900 dark:text-gray-100">{{ entry.category }}</span>
          </li>
          <li v-if="entry.category">
            <UIcon name="lucide:chevron-right" class="text-xs" />
          </li>
          <li class="text-gray-900 dark:text-gray-100 font-medium">
            {{ entry.title }}
          </li>
        </ol>
      </nav>

      <!-- Header -->
      <div class="mb-8">
        <!-- Featured Image -->
        <div v-if="entry.image" class="mb-6 rounded-lg overflow-hidden">
          <img
            :src="entry.image"
            :alt="entry.title"
            class="w-full h-auto"
          />
        </div>

        <!-- Title & Meta -->
        <h1 class="text-4xl font-bold mb-4">{{ entry.title }}</h1>

        <div v-if="entry.description" class="text-xl text-gray-600 dark:text-gray-400 mb-6">
          {{ entry.description }}
        </div>

        <!-- Metadata Badges -->
        <div class="flex flex-wrap gap-2 mb-6">
          <UBadge v-if="entry.category" color="primary" variant="subtle">
            <UIcon name="lucide:folder" class="mr-1" />
            {{ entry.category }}
          </UBadge>

          <UBadge v-if="entry.era" color="purple" variant="subtle">
            <UIcon name="lucide:clock" class="mr-1" />
            {{ entry.era }}
          </UBadge>

          <UBadge v-if="entry.game" color="pink" variant="subtle">
            <UIcon name="lucide:gamepad-2" class="mr-1" />
            {{ entry.game }}
          </UBadge>

          <UBadge v-if="entry.subcategory" color="gray" variant="subtle">
            {{ entry.subcategory }}
          </UBadge>

          <UBadge
            v-for="tag in entry.tags"
            :key="tag"
            variant="outline"
            size="sm"
          >
            {{ tag }}
          </UBadge>
        </div>

        <!-- Timeline Info -->
        <div
          v-if="entry.timeline"
          class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 mb-6"
        >
          <div class="flex items-center gap-2 text-sm">
            <UIcon name="lucide:calendar" class="text-primary-500" />
            <span class="font-semibold">Timeline:</span>
            <span v-if="entry.timeline.year">Year {{ entry.timeline.year }}</span>
            <span v-if="entry.timeline.era" class="mx-2">•</span>
            <span v-if="entry.timeline.era">{{ entry.timeline.era }}</span>
            <span v-if="entry.timeline.season" class="mx-2">•</span>
            <span v-if="entry.timeline.season">{{ entry.timeline.season }}</span>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="prose prose-gray dark:prose-invert max-w-none mb-12">
        <ContentRenderer :value="entry" />
      </div>

      <!-- Related Entries -->
      <div v-if="relatedEntries && relatedEntries.length > 0" class="mb-12">
        <h2 class="text-2xl font-bold mb-6">Related Entries</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NuxtLink
            v-for="related in relatedEntries"
            :key="related._path"
            :to="related._path"
            class="p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors group"
          >
            <div class="flex items-start gap-3">
              <UIcon
                name="lucide:link"
                class="text-primary-500 mt-1 flex-shrink-0"
              />
              <div>
                <h3 class="font-semibold group-hover:text-primary-500 transition-colors">
                  {{ related.title }}
                </h3>
                <p v-if="related.description" class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {{ related.description }}
                </p>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- More from Category -->
      <div v-if="categoryEntries && categoryEntries.length > 0" class="mb-12">
        <h2 class="text-2xl font-bold mb-6">More from {{ entry.category }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <NuxtLink
            v-for="catEntry in categoryEntries"
            :key="catEntry._path"
            :to="catEntry._path"
            class="p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors group"
          >
            <h3 class="font-semibold group-hover:text-primary-500 transition-colors mb-1">
              {{ catEntry.title }}
            </h3>
            <p v-if="catEntry.description" class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {{ catEntry.description }}
            </p>
          </NuxtLink>
        </div>
      </div>

      <!-- Back to Wiki -->
      <div class="pt-8 border-t border-gray-200 dark:border-gray-800">
        <NuxtLink
          to="/lore"
          class="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 transition-colors"
        >
          <UIcon name="lucide:arrow-left" />
          Back to Lore Wiki
        </NuxtLink>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import TagList from '~/components/TagList.vue'

const route = useRoute()

// Get the full slug path
const slug = Array.isArray(route.params.slug)
  ? route.params.slug.join('/')
  : route.params.slug

// Fetch the lore entry
const { data: entry } = await useAsyncData(`lore-${slug}`, () =>
  queryCollection('lore').path(`/lore/${slug}`).first()
)

// 404 if entry not found
if (!entry.value) {
  throw createError({
    statusCode: 404,
    message: 'Lore entry not found'
  })
}

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

// Fetch other entries in the same category using ContentNearest-style approach
const { data: categoryEntries } = await useAsyncData(`lore-category-${slug}`, async () => {
  if (!entry.value?.category) return []

  const entries = await queryCollection('lore')
    .where('category', entry.value.category)
    .where('published', true)
    .all()

  // Filter out current entry and limit to 6
  return entries.filter(e => e._path !== entry.value._path).slice(0, 6)
})

// Fetch entries from the same era
const { data: eraEntries } = await useAsyncData(`lore-era-${slug}`, async () => {
  if (!entry.value?.era) return []

  const entries = await queryCollection('lore')
    .where('era', entry.value.era)
    .where('published', true)
    .all()

  // Filter out current entry and entries already in related/category
  const excludePaths = [
    entry.value._path,
    ...(relatedEntries.value?.map(e => e._path) || []),
    ...(categoryEntries.value?.map(e => e._path) || [])
  ]

  return entries
    .filter(e => !excludePaths.includes(e._path))
    .slice(0, 3)
})

// Fetch prev/next entries using surroundings
const { data: surroundings } = await useAsyncData(`lore-surroundings-${slug}`, async () => {
  return await queryCollectionItemSurroundings('lore', entry.value?._path)
})

// Computed for page header
const entryValue = computed(() => entry.value!)

// Get category icon
const categoryIcon = computed(() => {
  const category = entryValue.value.category
  if (category === 'Characters') return 'lucide:user'
  if (category === 'Locations') return 'lucide:map-pin'
  if (category === 'Historical Events') return 'lucide:scroll'
  if (category === 'Phenomena') return 'lucide:sparkles'
  if (category === 'Organizations') return 'lucide:users'
  if (category === 'Guides') return 'lucide:compass'
  return 'lucide:book-open'
})

// SEO
useSeoMeta({
  title: `${entryValue.value.title} - Lore Wiki`,
  description: entryValue.value.description || `Explore ${entryValue.value.title} in our lore wiki`,
  ogTitle: entryValue.value.title,
  ogDescription: entryValue.value.description,
  ogImage: entryValue.value.image,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <UPage>
    <UContainer>
      <!-- Page Header -->
      <UPageHeader
        :title="entryValue.title"
        :description="entryValue.description"
      >
        <template #badge>
          <UBadge
            v-if="entryValue.category"
            variant="subtle"
            color="primary"
            size="md"
          >
            <UIcon :name="categoryIcon" class="mr-1" />
            {{ entryValue.category }}
          </UBadge>
        </template>

        <template #subtext>
          <div class="flex flex-wrap items-center gap-3 text-sm">
            <span v-if="entryValue.era" class="flex items-center gap-1.5 text-muted">
              <UIcon name="lucide:clock" class="size-4" />
              {{ entryValue.era }}
            </span>
            <span v-if="entryValue.game" class="flex items-center gap-1.5 text-muted">
              <UIcon name="lucide:gamepad-2" class="size-4" />
              {{ entryValue.game }}
            </span>
            <span v-if="entryValue.date" class="flex items-center gap-1.5 text-muted">
              <UIcon name="lucide:calendar" class="size-4" />
              {{ new Date(entryValue.date).toLocaleDateString() }}
            </span>
          </div>
        </template>

        <template v-if="entryValue.tags && entryValue.tags.length > 0" #tags>
          <TagList :tags="entryValue.tags" variant="subtle" />
        </template>
      </UPageHeader>

      <UPageBody>
        <!-- Timeline Info -->
        <div
          v-if="entryValue.timeline"
          class="mb-8 p-5 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 dark:from-primary/10 dark:via-purple-500/10 dark:to-pink-500/10 rounded-xl border border-primary/20"
        >
          <div class="flex items-start gap-4">
            <div class="p-2.5 rounded-lg bg-primary/10 flex-shrink-0">
              <UIcon name="lucide:calendar-clock" class="text-primary size-6" />
            </div>
            <div>
              <h3 class="font-semibold mb-2 text-lg">Timeline</h3>
              <div class="flex flex-wrap items-center gap-4 text-sm">
                <span v-if="entryValue.timeline.year" class="flex items-center gap-1.5">
                  <UBadge variant="subtle" color="purple" size="sm">
                    Year {{ entryValue.timeline.year }}
                  </UBadge>
                </span>
                <span v-if="entryValue.timeline.era">
                  <UBadge variant="subtle" color="primary" size="sm">
                    {{ entryValue.timeline.era }}
                  </UBadge>
                </span>
                <span v-if="entryValue.timeline.season">
                  <UBadge variant="subtle" color="pink" size="sm">
                    {{ entryValue.timeline.season }}
                  </UBadge>
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Featured Image -->
        <div v-if="entryValue.image" class="mb-8">
          <div class="relative overflow-hidden rounded-xl">
            <NuxtImg
              :src="entryValue.image"
              :alt="entryValue.title"
              class="w-full h-auto aspect-video object-cover"
              format="webp"
              sizes="(max-width: 768px) 100vw, 1024px"
              :placeholder="true"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>

        <!-- Content -->
        <div class="prose prose-lg dark:prose-invert max-w-none mb-12">
          <ContentRenderer :value="entryValue" />
        </div>

        <!-- Related Entries -->
        <div v-if="relatedEntries && relatedEntries.length > 0" class="mb-12">
          <div class="flex items-center gap-3 mb-6">
            <div class="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-purple-500/10">
              <UIcon name="lucide:link" class="text-primary size-5" />
            </div>
            <div>
              <h2 class="text-2xl font-bold">Related Entries</h2>
              <p class="text-sm text-muted">Connected knowledge and references</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NuxtLink
              v-for="related in relatedEntries"
              :key="related._path"
              :to="related._path"
              class="group p-5 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-lg transition-all duration-200"
            >
              <div class="flex items-start gap-4">
                <div class="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-purple-500/10 flex-shrink-0 group-hover:scale-110 transition-transform">
                  <UIcon
                    name="lucide:arrow-right"
                    class="text-primary size-5"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="font-semibold group-hover:text-primary transition-colors mb-1">
                    {{ related.title }}
                  </h3>
                  <p v-if="related.description" class="text-sm text-muted line-clamp-2">
                    {{ related.description }}
                  </p>
                  <div v-if="related.category" class="mt-2">
                    <UBadge variant="outline" size="xs">
                      {{ related.category }}
                    </UBadge>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>

        <!-- More from Category -->
        <div v-if="categoryEntries && categoryEntries.length > 0" class="mb-12">
          <div class="flex items-center gap-3 mb-6">
            <div class="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-purple-500/10">
              <UIcon :name="categoryIcon" class="text-primary size-5" />
            </div>
            <div>
              <h2 class="text-2xl font-bold">More from {{ entryValue.category }}</h2>
              <p class="text-sm text-muted">Explore similar entries</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <UCard
              v-for="catEntry in categoryEntries"
              :key="catEntry._path"
              :to="catEntry._path"
              variant="outline"
              class="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div class="space-y-3">
                <h3 class="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                  {{ catEntry.title }}
                </h3>
                <p v-if="catEntry.description" class="text-sm text-muted line-clamp-2">
                  {{ catEntry.description }}
                </p>
                <div class="flex flex-wrap gap-1">
                  <UBadge v-if="catEntry.era" variant="subtle" size="xs" color="purple">
                    {{ catEntry.era }}
                  </UBadge>
                  <UBadge
                    v-for="tag in catEntry.tags?.slice(0, 2)"
                    :key="tag"
                    variant="outline"
                    size="xs"
                  >
                    {{ tag }}
                  </UBadge>
                </div>
              </div>
            </UCard>
          </div>
        </div>

        <!-- Same Era Entries -->
        <div v-if="eraEntries && eraEntries.length > 0" class="mb-12">
          <div class="flex items-center gap-3 mb-6">
            <div class="p-2 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10">
              <UIcon name="lucide:clock" class="text-purple-500 size-5" />
            </div>
            <div>
              <h2 class="text-2xl font-bold">From {{ entryValue.era }}</h2>
              <p class="text-sm text-muted">Events and entries from the same era</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <NuxtLink
              v-for="eraEntry in eraEntries"
              :key="eraEntry._path"
              :to="eraEntry._path"
              class="group p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-purple-500/50 dark:hover:border-purple-500/50 hover:shadow-md transition-all duration-200"
            >
              <h3 class="font-semibold group-hover:text-purple-500 transition-colors mb-2 line-clamp-2">
                {{ eraEntry.title }}
              </h3>
              <p v-if="eraEntry.category" class="text-xs text-muted">
                {{ eraEntry.category }}
              </p>
            </NuxtLink>
          </div>
        </div>
      </UPageBody>
    </UContainer>

    <!-- Table of Contents (Right Sidebar) -->
    <template #right>
      <UContentToc
        v-if="entryValue?.body?.toc?.links?.length"
        :links="entryValue.body.toc.links"
        title="On this page"
        :ui="{
          wrapper: 'sticky top-20'
        }"
      />
    </template>

    <!-- Bottom Navigation -->
    <template #bottom>
      <UContainer>
        <!-- Prev/Next Navigation -->
        <div v-if="surroundings && (surroundings[0] || surroundings[1])" class="py-8 border-t border-gray-200 dark:border-gray-800">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Previous Entry -->
            <NuxtLink
              v-if="surroundings[0]"
              :to="surroundings[0]._path"
              class="group p-5 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-md transition-all"
            >
              <div class="flex items-start gap-3">
                <div class="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-purple-500/10 flex-shrink-0 group-hover:scale-110 transition-transform">
                  <UIcon name="lucide:arrow-left" class="text-primary size-5" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs text-muted mb-1">Previous</p>
                  <h3 class="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                    {{ surroundings[0].title }}
                  </h3>
                  <p v-if="surroundings[0].description" class="text-sm text-muted mt-1 line-clamp-1">
                    {{ surroundings[0].description }}
                  </p>
                </div>
              </div>
            </NuxtLink>

            <!-- Spacer for alignment when only next exists -->
            <div v-else class="hidden md:block" />

            <!-- Next Entry -->
            <NuxtLink
              v-if="surroundings[1]"
              :to="surroundings[1]._path"
              class="group p-5 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-md transition-all"
            >
              <div class="flex items-start gap-3">
                <div class="flex-1 min-w-0 text-right md:order-1">
                  <p class="text-xs text-muted mb-1">Next</p>
                  <h3 class="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                    {{ surroundings[1].title }}
                  </h3>
                  <p v-if="surroundings[1].description" class="text-sm text-muted mt-1 line-clamp-1">
                    {{ surroundings[1].description }}
                  </p>
                </div>
                <div class="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-purple-500/10 flex-shrink-0 group-hover:scale-110 transition-transform md:order-2">
                  <UIcon name="lucide:arrow-right" class="text-primary size-5" />
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>

        <!-- Back to Wiki -->
        <div class="py-8 border-t border-gray-200 dark:border-gray-800">
          <div class="flex items-center justify-between">
            <UButton
              to="/lore"
              variant="outline"
              leading-icon="lucide:arrow-left"
              size="lg"
            >
              Back to Wiki
            </UButton>

            <UButton
              v-if="entryValue.game"
              :to="`/games/${entryValue.game.toLowerCase().replace(/\s+/g, '-')}`"
              variant="soft"
              color="primary"
              trailing-icon="lucide:gamepad-2"
              size="lg"
            >
              View {{ entryValue.game }}
            </UButton>
          </div>
        </div>
      </UContainer>
    </template>
  </UPage>
</template>

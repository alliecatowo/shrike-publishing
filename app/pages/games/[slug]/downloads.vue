<template>
  <div v-if="game">
    <!-- Hero Section -->
    <UPageHero
      :title="`${game.title} Downloads`"
      :description="`Free resources, reference materials, and downloads for ${game.title}`"
      orientation="horizontal"
      class="bg-gradient-to-br from-primary/15 via-purple-500/10 to-amber-500/10 dark:from-primary/25 dark:via-purple-500/15 dark:to-amber-500/15"
    >
      <template #links>
        <UButton
          :to="`/games/${route.params.slug}`"
          variant="soft"
          leading-icon="i-lucide-arrow-left"
          size="lg"
        >
          Back to Game
        </UButton>
        <UButton
          :to="`/games/${route.params.slug}/gallery`"
          variant="outline"
          leading-icon="i-lucide-image"
          size="lg"
        >
          View Gallery
        </UButton>
      </template>
    </UPageHero>

    <UContainer class="py-12">
      <!-- Downloads organized by type -->
      <div v-if="hasDownloads" class="space-y-12">
        <!-- PDFs & Manuals -->
        <UPageSection
          v-if="downloadsByType.pdf.length > 0"
          title="Game Manuals & PDFs"
          description="Core rulebooks and supplementary materials"
        >
          <UPageGrid :cols="{ default: 1, md: 2, lg: 3 }" class="gap-6">
            <UCard
              v-for="download in downloadsByType.pdf"
              :key="download._path"
              variant="outline"
              class="group hover:shadow-xl transition-all duration-300 hover:border-primary/50 dark:hover:border-primary/30"
            >
              <div class="space-y-4">
                <!-- Icon & Title -->
                <div class="flex items-start gap-3">
                  <div class="w-12 h-12 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <UIcon name="i-lucide-book" class="h-6 w-6 text-primary" />
                  </div>
                  <div class="flex-1">
                    <h3 class="font-semibold text-lg line-clamp-2">{{ download.title }}</h3>
                    <UBadge v-if="download.version" variant="soft" size="xs" class="mt-1">
                      v{{ download.version }}
                    </UBadge>
                  </div>
                </div>

                <!-- Description -->
                <p v-if="download.description" class="text-sm text-muted line-clamp-3">
                  {{ download.description }}
                </p>

                <!-- Meta Info -->
                <div class="flex flex-wrap gap-3 text-xs text-muted">
                  <div v-if="download.fileSize" class="flex items-center gap-1">
                    <UIcon name="i-lucide-hard-drive" class="h-3 w-3" />
                    <span>{{ download.fileSize }}</span>
                  </div>
                  <div v-if="download.pageCount" class="flex items-center gap-1">
                    <UIcon name="i-lucide-file-text" class="h-3 w-3" />
                    <span>{{ download.pageCount }} pages</span>
                  </div>
                  <div v-if="download.license" class="flex items-center gap-1">
                    <UIcon name="i-lucide-scale" class="h-3 w-3" />
                    <span>{{ download.license }}</span>
                  </div>
                </div>

                <!-- Tags -->
                <div v-if="download.tags?.length" class="flex flex-wrap gap-1">
                  <UBadge
                    v-for="tag in download.tags"
                    :key="tag"
                    size="xs"
                    variant="subtle"
                  >
                    {{ tag }}
                  </UBadge>
                </div>

                <!-- Download Button -->
                <UButton
                  :to="download.fileUrl"
                  block
                  color="primary"
                  trailing-icon="i-lucide-download"
                  download
                  external
                >
                  Download PDF
                </UButton>

                <!-- Updated Date -->
                <div v-if="download.date" class="text-xs text-muted text-center">
                  Updated {{ formatDate(download.date) }}
                </div>
              </div>
            </UCard>
          </UPageGrid>
        </UPageSection>

        <!-- Character Sheets -->
        <UPageSection
          v-if="downloadsByType['character-sheet'].length > 0"
          title="Character Sheets"
          description="Ready-to-print character sheets and templates"
        >
          <UPageGrid :cols="{ default: 1, md: 2, lg: 3 }" class="gap-6">
            <UCard
              v-for="download in downloadsByType['character-sheet']"
              :key="download._path"
              variant="outline"
              class="group hover:shadow-xl transition-all duration-300"
            >
              <div class="space-y-4">
                <div class="flex items-start gap-3">
                  <div class="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <UIcon name="i-lucide-user" class="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div class="flex-1">
                    <h3 class="font-semibold text-lg line-clamp-2">{{ download.title }}</h3>
                  </div>
                </div>

                <p v-if="download.description" class="text-sm text-muted line-clamp-2">
                  {{ download.description }}
                </p>

                <div v-if="download.preview" class="aspect-[8.5/11] rounded-lg overflow-hidden border">
                  <NuxtImg :src="download.preview" :alt="download.title" class="w-full h-full object-cover" />
                </div>

                <UButton
                  :to="download.fileUrl"
                  block
                  variant="soft"
                  color="blue"
                  trailing-icon="i-lucide-download"
                  download
                  external
                >
                  Download Sheet
                </UButton>
              </div>
            </UCard>
          </UPageGrid>
        </UPageSection>

        <!-- Maps & Images -->
        <UPageSection
          v-if="downloadsByType.map.length > 0 || downloadsByType.image.length > 0"
          title="Maps & Assets"
          description="Tactical maps, location images, and visual aids"
        >
          <UPageGrid :cols="{ default: 1, md: 2, lg: 3 }" class="gap-6">
            <UCard
              v-for="download in [...downloadsByType.map, ...downloadsByType.image]"
              :key="download._path"
              variant="outline"
              class="group hover:shadow-xl transition-all duration-300"
            >
              <div class="space-y-4">
                <div class="flex items-start gap-3">
                  <div class="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <UIcon :name="download.type === 'map' ? 'i-lucide-map' : 'i-lucide-image'" class="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div class="flex-1">
                    <h3 class="font-semibold text-lg line-clamp-2">{{ download.title }}</h3>
                  </div>
                </div>

                <p v-if="download.description" class="text-sm text-muted line-clamp-2">
                  {{ download.description }}
                </p>

                <div v-if="download.preview" class="aspect-video rounded-lg overflow-hidden border">
                  <NuxtImg :src="download.preview" :alt="download.title" class="w-full h-full object-cover" />
                </div>

                <UButton
                  :to="download.fileUrl"
                  block
                  variant="soft"
                  color="green"
                  trailing-icon="i-lucide-download"
                  download
                  external
                >
                  Download {{ download.type === 'map' ? 'Map' : 'Image' }}
                </UButton>
              </div>
            </UCard>
          </UPageGrid>
        </UPageSection>

        <!-- Reference Materials -->
        <UPageSection
          v-if="downloadsByType.reference.length > 0"
          title="Quick Reference"
          description="Cheat sheets, tables, and quick reference guides"
        >
          <UPageGrid :cols="{ default: 1, md: 2, lg: 3 }" class="gap-6">
            <UCard
              v-for="download in downloadsByType.reference"
              :key="download._path"
              variant="outline"
              class="group hover:shadow-xl transition-all duration-300"
            >
              <div class="space-y-4">
                <div class="flex items-start gap-3">
                  <div class="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <UIcon name="i-lucide-book-open" class="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div class="flex-1">
                    <h3 class="font-semibold text-lg line-clamp-2">{{ download.title }}</h3>
                  </div>
                </div>

                <p v-if="download.description" class="text-sm text-muted line-clamp-2">
                  {{ download.description }}
                </p>

                <UButton
                  :to="download.fileUrl"
                  block
                  variant="soft"
                  color="purple"
                  trailing-icon="i-lucide-download"
                  download
                  external
                >
                  Download Reference
                </UButton>
              </div>
            </UCard>
          </UPageGrid>
        </UPageSection>

        <!-- Toolkits & Bundles -->
        <UPageSection
          v-if="downloadsByType.toolkit.length > 0 || downloadsByType.bundle.length > 0"
          title="Toolkits & Bundles"
          description="Complete resource packages and specialized tools"
        >
          <UPageGrid :cols="{ default: 1, md: 2, lg: 3 }" class="gap-6">
            <UCard
              v-for="download in [...downloadsByType.toolkit, ...downloadsByType.bundle]"
              :key="download._path"
              variant="outline"
              class="group hover:shadow-xl transition-all duration-300 border-2"
            >
              <div class="space-y-4">
                <div class="flex items-start gap-3">
                  <div class="w-12 h-12 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <UIcon name="i-lucide-package" class="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div class="flex-1">
                    <h3 class="font-semibold text-lg line-clamp-2">{{ download.title }}</h3>
                    <UBadge color="amber" variant="soft" size="xs" class="mt-1">
                      {{ download.type === 'bundle' ? 'Bundle' : 'Toolkit' }}
                    </UBadge>
                  </div>
                </div>

                <p v-if="download.description" class="text-sm text-muted line-clamp-3">
                  {{ download.description }}
                </p>

                <UButton
                  :to="download.fileUrl"
                  block
                  color="amber"
                  trailing-icon="i-lucide-download"
                  download
                  external
                >
                  Download {{ download.type === 'bundle' ? 'Bundle' : 'Toolkit' }}
                </UButton>
              </div>
            </UCard>
          </UPageGrid>
        </UPageSection>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <UIcon name="i-lucide-inbox" class="size-20 text-muted mx-auto mb-6" />
        <h3 class="text-2xl font-bold mb-3">No Downloads Available Yet</h3>
        <p class="text-muted mb-6 max-w-md mx-auto">
          Check back soon for downloadable resources for {{ game.title }}!
        </p>
        <UButton :to="`/games/${route.params.slug}`" variant="outline">
          Back to Game Page
        </UButton>
      </div>

      <!-- Call to Action -->
      <UPageSection v-if="hasDownloads" class="mt-12">
        <UCard variant="soft" class="max-w-3xl mx-auto text-center">
          <div class="space-y-4">
            <h3 class="text-2xl font-bold">Looking for More?</h3>
            <p class="text-muted">
              Explore our gallery for artwork and sample pages, or check out all our free resources.
            </p>
            <div class="flex flex-wrap gap-3 justify-center">
              <UButton
                :to="`/games/${route.params.slug}/gallery`"
                variant="outline"
                leading-icon="i-lucide-image"
              >
                View Gallery
              </UButton>
              <UButton
                to="/resources"
                variant="outline"
                leading-icon="i-lucide-download"
              >
                All Resources
              </UButton>
            </div>
          </div>
        </UCard>
      </UPageSection>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

// Fetch game data
const { data: game } = await useAsyncData(`game-${slug}`, () =>
  queryCollection('games').where('slug', '=', slug).first()
)

if (!game.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Game not found'
  })
}

// Fetch downloads for this game
const { data: downloads } = await useAsyncData(`${slug}-downloads`, () =>
  queryCollection('downloads')
    .where('game', '=', slug)
    .where('published', '=', true)
    .all()
)

// Organize downloads by type
const downloadsByType = computed(() => {
  const items = downloads.value || []
  return {
    pdf: items.filter((d: any) => d.type === 'pdf'),
    'character-sheet': items.filter((d: any) => d.type === 'character-sheet'),
    map: items.filter((d: any) => d.type === 'map'),
    image: items.filter((d: any) => d.type === 'image'),
    reference: items.filter((d: any) => d.type === 'reference'),
    toolkit: items.filter((d: any) => d.type === 'toolkit'),
    bundle: items.filter((d: any) => d.type === 'bundle')
  }
})

// Check if there are any downloads
const hasDownloads = computed(() => {
  return downloads.value && downloads.value.length > 0
})

// Format date helper
const formatDate = (date: string | Date) => {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

// SEO
useSeoMeta({
  title: `${game.value?.title} Downloads - Shrike Publishing`,
  description: `Free downloads, character sheets, maps, and resources for ${game.value?.title}`,
  ogImage: game.value?.coverImage || game.value?.image
})
</script>

<template>
  <div v-if="game">
    <!-- Hero Section -->
    <UPageHero
      :title="`${game.title} Gallery`"
      :description="game.description || 'Explore the visual world of the game'"
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
      </template>
    </UPageHero>

    <UContainer class="py-12">
      <!-- Sample Pages Section (Era of Silence only) -->
      <div v-if="route.params.slug === 'era-of-silence' && samplePages.length > 0" class="mb-16">
        <UPageSection
          title="Sample Pages"
          description="Preview pages from the game manual"
        >
          <UCarousel
            v-slot="{ item }"
            :items="samplePages"
            :ui="{
              item: 'basis-full md:basis-1/2 lg:basis-1/3',
              container: 'gap-4'
            }"
            arrows
            class="rounded-lg overflow-hidden"
          >
            <div class="group cursor-pointer relative h-96" @click="openLightbox(item)">
              <NuxtImg
                :src="item.src"
                :alt="item.alt"
                class="w-full h-full object-cover rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
                <UIcon
                  name="i-lucide-expand"
                  class="size-10 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </UCarousel>
        </UPageSection>
      </div>

      <!-- Artwork Gallery with Tabs -->
      <UPageSection
        title="Artwork Gallery"
        description="Browse artwork by category"
      >
        <UTabs v-model="selectedTab" :items="tabs" class="mb-8">
          <template #item="{ item }">
            <div v-if="item.artworks.length > 0" class="py-6">
              <UPageGrid :cols="{ default: 1, sm: 2, lg: 3, xl: 4 }" class="gap-6">
                <UCard
                  v-for="art in item.artworks"
                  :key="art._path"
                  variant="outline"
                  class="group hover:shadow-xl transition-all duration-300 cursor-pointer"
                  @click="openLightbox({ src: art.fullImage || art.thumbnail, alt: art.title, title: art.title, description: art.description, artist: art.artist })"
                >
                  <div class="relative overflow-hidden aspect-[3/4]">
                    <NuxtImg
                      :src="art.thumbnail || art.fullImage"
                      :alt="art.title"
                      class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div class="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 class="text-white font-bold text-sm mb-1 line-clamp-2">{{ art.title }}</h3>
                      <p v-if="art.artist" class="text-white/80 text-xs">by {{ art.artist }}</p>
                    </div>
                    <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <UIcon
                        name="i-lucide-expand"
                        class="size-6 text-white drop-shadow-lg"
                      />
                    </div>
                  </div>
                </UCard>
              </UPageGrid>
            </div>
            <div v-else class="py-12 text-center">
              <UIcon name="i-lucide-image-off" class="size-16 text-muted mx-auto mb-4" />
              <p class="text-muted">No {{ item.label.toLowerCase() }} artwork available yet.</p>
            </div>
          </template>
        </UTabs>
      </UPageSection>
    </UContainer>

    <!-- Lightbox Modal -->
    <UModal v-model="lightboxOpen" :ui="{ width: 'max-w-6xl' }">
      <div v-if="selectedImage" class="p-6">
        <div class="relative">
          <NuxtImg
            :src="selectedImage.src"
            :alt="selectedImage.alt"
            class="w-full h-auto max-h-[70vh] object-contain rounded-lg"
          />
        </div>
        <div v-if="selectedImage.title || selectedImage.description || selectedImage.artist" class="mt-6 space-y-3">
          <h3 v-if="selectedImage.title" class="text-2xl font-bold">{{ selectedImage.title }}</h3>
          <p v-if="selectedImage.description" class="text-muted">{{ selectedImage.description }}</p>
          <div v-if="selectedImage.artist" class="flex items-center gap-2">
            <UBadge variant="soft" color="primary">
              <UIcon name="i-lucide-palette" class="size-3 mr-1" />
              {{ selectedImage.artist }}
            </UBadge>
          </div>
        </div>
      </div>
    </UModal>
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

// Fetch artwork for this game
const { data: artwork } = await useAsyncData(`${slug}-artwork`, () =>
  queryCollection('artwork')
    .where('game', '=', slug)
    .where('published', '=', true)
    .all()
)

// Filter artwork by type
const artworkByType = computed(() => {
  const art = artwork.value || []
  return {
    characters: art.filter((a: any) => a.type === 'character'),
    locations: art.filter((a: any) => a.type === 'location'),
    scenes: art.filter((a: any) => a.type === 'scene'),
    concept: art.filter((a: any) => a.type === 'concept'),
    creatures: art.filter((a: any) => a.type === 'creature'),
    cover: art.filter((a: any) => a.type === 'cover'),
    all: art
  }
})

// Tab configuration
const selectedTab = ref(0)
const tabs = computed(() => {
  const baseTabs = [
    {
      label: 'All Artwork',
      artworks: artworkByType.value.all,
      slot: 'all'
    }
  ]

  // Add tabs only if they have content
  if (artworkByType.value.characters.length > 0) {
    baseTabs.push({
      label: 'Characters',
      artworks: artworkByType.value.characters,
      slot: 'characters'
    })
  }

  if (artworkByType.value.creatures.length > 0) {
    baseTabs.push({
      label: 'Creatures',
      artworks: artworkByType.value.creatures,
      slot: 'creatures'
    })
  }

  if (artworkByType.value.locations.length > 0) {
    baseTabs.push({
      label: 'Locations',
      artworks: artworkByType.value.locations,
      slot: 'locations'
    })
  }

  if (artworkByType.value.scenes.length > 0) {
    baseTabs.push({
      label: 'Scenes',
      artworks: artworkByType.value.scenes,
      slot: 'scenes'
    })
  }

  if (artworkByType.value.concept.length > 0) {
    baseTabs.push({
      label: 'Concept Art',
      artworks: artworkByType.value.concept,
      slot: 'concept'
    })
  }

  if (artworkByType.value.cover.length > 0) {
    baseTabs.push({
      label: 'Cover Art',
      artworks: artworkByType.value.cover,
      slot: 'cover'
    })
  }

  return baseTabs
})

// Sample pages for Era of Silence
const samplePages = computed(() => {
  if (slug !== 'era-of-silence') return []

  // Generate array of sample page images (using hyphenated versions)
  const pages = [
    '2022-09-20 COVER.png',
    'cover-front.png',
    'cover-back.png',
    'intro-text-crawl.png',
    'index-first-page.png',
    'character-creation-overview.png',
    'archetype.png',
    'armor.png',
    'bunny-power-armor.png',
    'buried-peoples-1.png',
    'buried-peoples-2.png',
    'elek-human-spread.png',
    'rising-city-spread.png',
    'underworld-the-stacks.png',
    'world-of-vian.png',
    'ruins-alchemy-technology.png',
    'chemis.png',
    'playing-the-game.png',
    'shooting-fighting-dice.png',
    'magic.png',
    'part_4_magic.png',
    'aberrations.png',
    'combat-biker.png'
  ]

  return pages.map(filename => ({
    src: `/images/era-of-silence/sample-pages/${filename}`,
    alt: `Era of Silence - ${filename.replace('.png', '').replace(/-/g, ' ').replace(/_/g, ' ')}`,
    title: filename.replace('.png', '').replace(/-/g, ' ').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }))
})

// Lightbox functionality
const lightboxOpen = ref(false)
const selectedImage = ref<{
  src: string
  alt: string
  title?: string
  description?: string
  artist?: string
} | null>(null)

function openLightbox(image: any) {
  selectedImage.value = image
  lightboxOpen.value = true
}

// SEO
useSeoMeta({
  title: `${game.value?.title} Gallery - Shrike Publishing`,
  description: `Explore artwork and imagery from ${game.value?.title}`,
  ogImage: game.value?.coverImage || game.value?.image
})
</script>

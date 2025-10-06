<template>
  <div>
    <!-- Hero Section -->
    <UPageHero
      title="Portfolio"
      description="Showcasing our creative work across design, art, writing, audio, and video production."
      class="bg-gradient-to-br from-amber-100/50 via-orange-100/30 to-red-100/50 dark:from-amber-900/20 dark:via-orange-900/15 dark:to-red-900/20"
    >
      <template #links>
        <UButton
          to="#work"
          size="lg"
          color="amber"
          trailing-icon="i-lucide-arrow-down"
        >
          View Our Work
        </UButton>
      </template>
    </UPageHero>

    <!-- Introduction -->
    <UPageSection
      title="Creative Excellence"
      description="Every aspect of our games is crafted with passion and attention to detail"
      :ui="{ container: 'text-center' }"
    >
      <div class="max-w-3xl mx-auto">
        <UCard variant="soft">
          <div class="prose prose-lg dark:prose-invert max-w-none text-center">
            <p class="text-gray-600 dark:text-gray-400">
              At Shrike Publishing, we're more than just a game publisher. We're a collective of
              designers, artists, writers, and creators passionate about bringing immersive worlds
              to life. Explore our portfolio to see the breadth of our creative capabilities.
            </p>
          </div>
        </UCard>
      </div>
    </UPageSection>

    <!-- Sample Pages Preview -->
    <UPageSection
      title="Sample Pages Preview"
      description="Browse through sample pages from Era of Silence rulebook"
      class="bg-gradient-to-br from-gray-50/50 to-gray-100/30 dark:from-gray-900/30 dark:to-gray-800/20"
    >
      <div class="max-w-5xl mx-auto">
        <UCarousel
          v-slot="{ item }"
          :items="samplePages"
          arrows
          dots
          :autoplay="5000"
          :ui="{
            item: 'snap-center',
            container: 'rounded-lg overflow-hidden shadow-xl'
          }"
        >
          <div class="relative aspect-[8.5/11] bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg overflow-hidden">
            <NuxtImg
              :src="item.image"
              :alt="item.title"
              class="w-full h-full object-contain"
              loading="lazy"
            />
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <p class="text-white font-semibold text-center">{{ item.title }}</p>
            </div>
          </div>
        </UCarousel>
      </div>
    </UPageSection>

    <!-- Portfolio Tabs -->
    <UPageSection id="work">
      <div class="max-w-6xl mx-auto">
        <!-- Game Filter Buttons -->
        <div class="flex justify-center gap-2 mb-6">
          <UButton
            v-for="filter in gameFilters"
            :key="filter.value"
            :variant="selectedGame === filter.value ? 'solid' : 'outline'"
            :color="selectedGame === filter.value ? 'primary' : 'neutral'"
            size="sm"
            @click="selectedGame = filter.value"
          >
            {{ filter.label }}
          </UButton>
        </div>

        <UTabs v-model="activeTab" :items="portfolioTabs" class="mb-8" />

        <!-- Design Tab Content -->
        <div v-if="activeTab === 'design'" class="space-y-8">
          <div class="text-center space-y-2 mb-6">
            <h2 class="text-2xl font-bold">Game & Graphic Design</h2>
            <p class="text-gray-600 dark:text-gray-400">
              Layout, typography, and visual design for tabletop games
            </p>
          </div>

          <UPageGrid :cols="{ default: 1, md: 2 }" class="gap-6">
            <UPageCard
              v-for="item in designPortfolio"
              :key="item.title"
              :title="item.title"
              :description="item.description"
              class="group"
              spotlight
            >
              <template #header>
                <div class="aspect-[16/9] overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900 dark:to-orange-900 rounded-t-lg relative">
                  <NuxtImg
                    v-if="item.image"
                    :src="item.image"
                    :alt="item.title"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div v-else class="w-full h-full flex items-center justify-center">
                    <UIcon :name="item.icon" class="h-16 w-16 text-amber-600 dark:text-amber-400" />
                  </div>

                  <!-- Game Badge Overlay -->
                  <div v-if="item.game" class="absolute top-3 right-3">
                    <UBadge
                      :color="item.game === 'blood-neon' ? 'red' : 'amber'"
                      variant="solid"
                      size="sm"
                    >
                      {{ item.game === 'blood-neon' ? 'Blood Neon' : 'Era of Silence' }}
                    </UBadge>
                  </div>
                </div>
              </template>

              <div class="space-y-3">
                <TagList :tags="item.tags" color="amber" />
              </div>
            </UPageCard>
          </UPageGrid>
        </div>

        <!-- Drawings Tab Content -->
        <div v-if="activeTab === 'drawings'" class="space-y-8">
          <ArtworkFeed
            title="Illustrations & Artwork"
            description="Character art, landscapes, and visual storytelling"
            :artwork="drawingsArtwork"
          />
        </div>

        <!-- Writing Tab Content -->
        <div v-if="activeTab === 'writing'" class="space-y-8">
          <div class="text-center space-y-2 mb-6">
            <h2 class="text-2xl font-bold">Writing & Narrative Design</h2>
            <p class="text-gray-600 dark:text-gray-400">
              Stories, lore, and game mechanics that bring worlds to life
            </p>
          </div>

          <div class="max-w-4xl mx-auto space-y-6">
            <UCard
              v-for="item in writingPortfolio"
              :key="item.title"
              variant="outline"
              class="hover:shadow-lg transition-shadow"
            >
              <div class="flex gap-4">
                <div class="flex-shrink-0">
                  <div class="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-lg flex items-center justify-center">
                    <UIcon :name="item.icon" class="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                  </div>
                </div>
                <div class="flex-1 space-y-3">
                  <div class="flex items-start justify-between">
                    <div>
                      <h3 class="text-lg font-bold">{{ item.title }}</h3>
                      <p class="text-sm text-gray-500">{{ item.type }}</p>
                    </div>
                    <UBadge :color="item.status === 'published' ? 'green' : 'blue'" variant="soft">
                      {{ item.status }}
                    </UBadge>
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ item.description }}</p>
                  <TagList :tags="item.tags" />
                  <UButton
                    v-if="item.link"
                    :to="item.link"
                    variant="outline"
                    size="sm"
                    trailing-icon="i-lucide-arrow-right"
                  >
                    Read More
                  </UButton>
                </div>
              </div>
            </UCard>
          </div>
        </div>

        <!-- Audio Tab Content -->
        <div v-if="activeTab === 'audio'" class="space-y-8">
          <div class="text-center space-y-2 mb-6">
            <h2 class="text-2xl font-bold">Audio Production</h2>
            <p class="text-gray-600 dark:text-gray-400">
              Soundscapes, music, and audio design for immersive experiences
            </p>
          </div>

          <div class="max-w-3xl mx-auto space-y-6">
            <UCard
              v-for="item in audioPortfolio"
              :key="item.title"
              variant="outline"
              class="hover:shadow-lg transition-shadow"
            >
              <div class="space-y-4">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900 dark:to-teal-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <UIcon name="i-lucide-music" class="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div class="flex-1">
                    <h3 class="text-lg font-bold">{{ item.title }}</h3>
                    <p class="text-sm text-gray-500">{{ item.duration }} • {{ item.type }}</p>
                  </div>
                </div>

                <p class="text-sm text-gray-600 dark:text-gray-400">{{ item.description }}</p>

                <!-- Audio Player Placeholder -->
                <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex items-center gap-3">
                  <UButton icon="i-lucide-play" size="sm" color="green" />
                  <div class="flex-1 h-2 bg-gray-300 dark:bg-gray-700 rounded-full">
                    <div class="h-full bg-green-500 rounded-full" style="width: 0%"/>
                  </div>
                  <span class="text-xs text-gray-500">{{ item.duration }}</span>
                </div>

                <div class="flex items-center justify-between">
                  <TagList :tags="item.tags" color="green" />
                  <UButton
                    v-if="item.link"
                    :to="item.link"
                    external
                    target="_blank"
                    variant="outline"
                    size="sm"
                    trailing-icon="i-lucide-external-link"
                  >
                    Listen on Platform
                  </UButton>
                </div>
              </div>
            </UCard>
          </div>
        </div>

        <!-- Video Tab Content -->
        <div v-if="activeTab === 'video'" class="space-y-8">
          <div class="text-center space-y-2 mb-6">
            <h2 class="text-2xl font-bold">Video Production</h2>
            <p class="text-gray-600 dark:text-gray-400">
              Trailers, tutorials, and visual storytelling
            </p>
          </div>

          <UPageGrid :cols="{ default: 1, md: 2 }" class="gap-6">
            <UPageCard
              v-for="item in videoPortfolio"
              :key="item.title"
              :title="item.title"
              :description="item.description"
              class="group"
              spotlight
            >
              <template #header>
                <div class="aspect-video overflow-hidden bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900 dark:to-pink-900 rounded-t-lg relative">
                  <NuxtImg
                    v-if="item.thumbnail"
                    :src="item.thumbnail"
                    :alt="item.title"
                    class="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div v-else class="w-full h-full flex items-center justify-center">
                    <UIcon name="i-lucide-video" class="h-16 w-16 text-red-600 dark:text-red-400" />
                  </div>
                  <div class="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                    <div class="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <UIcon name="i-lucide-play" class="h-8 w-8 text-gray-900 ml-1" />
                    </div>
                  </div>

                  <!-- Game Badge Overlay -->
                  <div v-if="item.game" class="absolute top-3 right-3">
                    <UBadge
                      :color="item.game === 'blood-neon' ? 'red' : 'amber'"
                      variant="solid"
                      size="sm"
                    >
                      {{ item.game === 'blood-neon' ? 'Blood Neon' : 'Era of Silence' }}
                    </UBadge>
                  </div>

                  <!-- Duration Badge -->
                  <div class="absolute top-3 left-3">
                    <UBadge
                      color="gray"
                      variant="solid"
                      size="sm"
                    >
                      {{ item.duration }}
                    </UBadge>
                  </div>
                </div>
              </template>

              <div class="space-y-3">
                <TagList :tags="item.tags" color="red" />
                <UButton
                  v-if="item.link"
                  :to="item.link"
                  external
                  target="_blank"
                  block
                  color="red"
                  trailing-icon="i-lucide-external-link"
                >
                  Watch on YouTube
                </UButton>
              </div>
            </UPageCard>
          </UPageGrid>
        </div>
      </div>
    </UPageSection>

    <!-- Services Offered -->
    <UPageSection
      title="Work With Us"
      description="Interested in collaborating? We offer creative services beyond our games."
      :ui="{ container: 'text-center' }"
    >
      <UPageGrid :cols="{ default: 1, md: 3 }" class="gap-6 max-w-4xl mx-auto">
        <UCard variant="soft" color="primary">
          <div class="text-center space-y-3">
            <div class="flex justify-center">
              <div class="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <UIcon name="i-lucide-palette" class="h-6 w-6 text-primary" />
              </div>
            </div>
            <h3 class="font-bold">Design Services</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Layout, branding, and visual design for your projects
            </p>
          </div>
        </UCard>

        <UCard variant="soft" color="purple">
          <div class="text-center space-y-3">
            <div class="flex justify-center">
              <div class="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                <UIcon name="i-lucide-pen-tool" class="h-6 w-6 text-purple-500" />
              </div>
            </div>
            <h3 class="font-bold">Writing & Editing</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Game writing, narrative design, and editorial services
            </p>
          </div>
        </UCard>

        <UCard variant="soft" color="pink">
          <div class="text-center space-y-3">
            <div class="flex justify-center">
              <div class="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center">
                <UIcon name="i-lucide-video" class="h-6 w-6 text-pink-500" />
              </div>
            </div>
            <h3 class="font-bold">Media Production</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Audio and video production for marketing and content
            </p>
          </div>
        </UCard>
      </UPageGrid>

      <div class="mt-8">
        <UButton to="/contact" size="lg" color="primary" icon="i-lucide-mail">
          Get in Touch
        </UButton>
      </div>
    </UPageSection>

    <!-- Call to Action -->
    <UPageCTA
      title="Let's Create Something Amazing"
      description="Whether you need design work, creative writing, or media production, we're here to help."
      :links="[
        {
          label: 'View Our Games',
          to: '/games',
          leadingIcon: 'i-lucide-gamepad-2'
        },
        {
          label: 'Contact Us',
          to: '/contact',
          variant: 'outline',
          leadingIcon: 'i-lucide-mail'
        }
      ]"
    />

    <AppLightbox :images="drawingsPortfolio" :open="isLightboxOpen" :start-index="lightboxStartIndex" @update:open="isLightboxOpen = $event" />
  </div>
</template>

<script setup lang="ts">
import AppLightbox from '~/components/AppLightbox.vue'
import TagList from '~/components/TagList.vue'
import ArtworkFeed from '~/components/ArtworkFeed.vue'

const portfolioTabs = [
  { label: 'Design', value: 'design', icon: 'i-lucide-palette' },
  { label: 'Drawings', value: 'drawings', icon: 'i-lucide-image' },
  { label: 'Writing', value: 'writing', icon: 'i-lucide-pen-tool' },
  { label: 'Audio', value: 'audio', icon: 'i-lucide-music' },
  { label: 'Video', value: 'video', icon: 'i-lucide-video' }
]

const gameFilters = [
  { label: 'All', value: 'all' },
  { label: 'Blood Neon', value: 'blood-neon' },
  { label: 'Era of Silence', value: 'era-of-silence' }
]

const activeTab = ref('design')
const selectedGame = ref('all')

const { data: portfolioItems } = await useAsyncData('portfolio', () =>
  queryCollection('portfolio').where('published', '=', true).order('title', 'asc').all()
)

// Filter by game
const filteredPortfolioItems = computed(() => {
  if (selectedGame.value === 'all') {
    return portfolioItems.value || []
  }
  return portfolioItems.value?.filter(item => item.game === selectedGame.value) || []
})

const designPortfolio = computed(() => filteredPortfolioItems.value?.filter(item => item.type === 'design') || [])
const drawingsPortfolio = computed(() => filteredPortfolioItems.value?.filter(item => item.type === 'drawing') || [])
const writingPortfolio = computed(() => filteredPortfolioItems.value?.filter(item => item.type === 'writing') || [])
const audioPortfolio = computed(() => filteredPortfolioItems.value?.filter(item => item.type === 'audio') || [])
const videoPortfolio = computed(() => filteredPortfolioItems.value?.filter(item => item.type === 'video') || [])

// Transform drawings for ArtworkFeed component
const drawingsArtwork = computed(() => {
  return drawingsPortfolio.value.map((item, index) => ({
    id: `drawing-${index}`,
    title: item.title,
    description: item.description || '',
    image: item.image,
    artist: 'Shrike Publishing',
    artistAvatar: '/images/logo.png',
    category: item.category || 'illustration',
    tags: item.tags || [],
    likes: 0,
    createdAt: new Date().toISOString(),
    medium: 'Digital Art'
  }))
})

// Sample pages for carousel
const samplePages = [
  { image: '/images/era-of-silence/sample-pages/world-of-vian.png', title: 'World of Vian' },
  { image: '/images/era-of-silence/sample-pages/character-creation-overview.png', title: 'Character Creation Overview' },
  { image: '/images/era-of-silence/sample-pages/combat-biker.png', title: 'Combat Biker' },
  { image: '/images/era-of-silence/sample-pages/magic.png', title: 'Magic System' },
  { image: '/images/era-of-silence/sample-pages/elek-human-spread.png', title: 'Elek & Human Spread' }
]

// Lightbox state
const isLightboxOpen = ref(false)
const lightboxStartIndex = ref(0)

const openLightbox = (index: number, _category: string) => {
  lightboxStartIndex.value = index
  isLightboxOpen.value = true
}

// SEO
useSeoMeta({
  title: 'Portfolio - Shrike Publishing',
  description: 'Explore our creative portfolio featuring game design, illustrations, writing, audio production, and video content from Shrike Publishing.',
  keywords: 'game design portfolio, tabletop design, illustration, creative writing, audio production, video production'
})
</script>

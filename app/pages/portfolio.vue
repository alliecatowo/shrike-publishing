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

    <!-- Portfolio Tabs -->
    <UPageSection id="work">
      <div class="max-w-6xl mx-auto">
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
            <UCard
              v-for="item in designPortfolio"
              :key="item.title"
              variant="outline"
              class="group hover:shadow-xl transition-all duration-300"
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
                </div>
              </template>

              <div class="space-y-3">
                <h3 class="text-xl font-bold">{{ item.title }}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ item.description }}</p>
                <div class="flex flex-wrap gap-1">
                  <UBadge v-for="tag in item.tags" :key="tag" size="xs" variant="soft" color="amber">
                    {{ tag }}
                  </UBadge>
                </div>
              </div>
            </UCard>
          </UPageGrid>
        </div>

        <!-- Drawings Tab Content -->
        <div v-if="activeTab === 'drawings'" class="space-y-8">
          <div class="text-center space-y-2 mb-6">
            <h2 class="text-2xl font-bold">Illustrations & Artwork</h2>
            <p class="text-gray-600 dark:text-gray-400">
              Character art, landscapes, and visual storytelling
            </p>
          </div>

          <UPageGrid :cols="{ default: 2, md: 3, lg: 4 }" class="gap-4">
            <UCard
              v-for="(item, index) in drawingsPortfolio"
              :key="item.title"
              variant="outline"
              class="group hover:shadow-lg transition-all cursor-pointer"
              @click="openLightbox(index, 'drawings')"
            >
              <template #header>
                <div class="aspect-square overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900 dark:to-purple-900 rounded-t-lg">
                  <NuxtImg
                    v-if="item.image"
                    :src="item.image"
                    :alt="item.title"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div v-else class="w-full h-full flex items-center justify-center">
                    <UIcon name="i-lucide-image" class="h-12 w-12 text-pink-600 dark:text-pink-400" />
                  </div>
                </div>
              </template>

              <div class="text-sm font-semibold truncate">{{ item.title }}</div>
            </UCard>
          </UPageGrid>
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
                  <div class="flex flex-wrap gap-1">
                    <UBadge v-for="tag in item.tags" :key="tag" size="xs" variant="subtle">
                      {{ tag }}
                    </UBadge>
                  </div>
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
                    <div class="h-full bg-green-500 rounded-full" style="width: 0%"></div>
                  </div>
                  <span class="text-xs text-gray-500">{{ item.duration }}</span>
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex flex-wrap gap-1">
                    <UBadge v-for="tag in item.tags" :key="tag" size="xs" variant="soft" color="green">
                      {{ tag }}
                    </UBadge>
                  </div>
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
            <UCard
              v-for="item in videoPortfolio"
              :key="item.title"
              variant="outline"
              class="group hover:shadow-xl transition-all duration-300"
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
                </div>
              </template>

              <div class="space-y-3">
                <div class="flex items-start justify-between">
                  <h3 class="text-lg font-bold">{{ item.title }}</h3>
                  <span class="text-xs text-gray-500">{{ item.duration }}</span>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ item.description }}</p>
                <div class="flex flex-wrap gap-1">
                  <UBadge v-for="tag in item.tags" :key="tag" size="xs" variant="soft" color="red">
                    {{ tag }}
                  </UBadge>
                </div>
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
            </UCard>
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
  </div>
</template>

<script setup lang="ts">
// Active tab
const activeTab = ref('design')

// Portfolio tabs
const portfolioTabs = [
  { label: 'Design', value: 'design', icon: 'i-lucide-palette' },
  { label: 'Drawings', value: 'drawings', icon: 'i-lucide-image' },
  { label: 'Writing', value: 'writing', icon: 'i-lucide-pen-tool' },
  { label: 'Audio', value: 'audio', icon: 'i-lucide-music' },
  { label: 'Video', value: 'video', icon: 'i-lucide-video' }
]

// Design portfolio items
const designPortfolio = [
  {
    title: 'Era of Silence Core Rulebook',
    description: 'Complete game design and layout for a 200+ page tabletop RPG.',
    image: null,
    icon: 'i-lucide-book-open',
    tags: ['Layout Design', 'Typography', 'Game Design']
  },
  {
    title: 'Blood Neon Branding',
    description: 'Logo, color palette, and visual identity for cyberpunk RPG.',
    image: null,
    icon: 'i-lucide-zap',
    tags: ['Branding', 'Logo Design', 'Style Guide']
  },
  {
    title: 'Character Sheet Design',
    description: 'Functional and beautiful character sheets optimized for gameplay.',
    image: null,
    icon: 'i-lucide-user',
    tags: ['UX Design', 'Print Design', 'Forms']
  },
  {
    title: 'Card Game Layout',
    description: 'Professional card design with print-ready specifications.',
    image: null,
    icon: 'i-lucide-credit-card',
    tags: ['Card Design', 'Print Production', 'Iconography']
  }
]

// Drawings portfolio items
const drawingsPortfolio = [
  { title: 'Wasteland Survivor', image: null },
  { title: 'Neon Street Scene', image: null },
  { title: 'Character Concept Art', image: null },
  { title: 'Faction Logo Studies', image: null },
  { title: 'Environment Sketches', image: null },
  { title: 'Weapon Designs', image: null },
  { title: 'Creature Illustrations', image: null },
  { title: 'Map Illustrations', image: null }
]

// Writing portfolio items
const writingPortfolio = [
  {
    title: 'Era of Silence Setting Bible',
    type: 'World-building',
    description: 'Complete setting guide covering history, factions, technology, and culture in a post-apocalyptic world.',
    icon: 'i-lucide-book-open',
    tags: ['World-building', 'Lore', 'Game Writing'],
    status: 'published',
    link: '/games/era-of-silence'
  },
  {
    title: 'Blood Neon Campaign: Corporate Shadows',
    type: 'Adventure Module',
    description: 'Multi-session campaign exploring corporate intrigue in a cyberpunk dystopia.',
    icon: 'i-lucide-map',
    tags: ['Adventure', 'Narrative Design', 'Game Mechanics'],
    status: 'published',
    link: null
  },
  {
    title: 'Short Fiction: Echoes in the Silence',
    type: 'Creative Writing',
    description: 'Series of short stories set in the Era of Silence universe, exploring themes of survival and humanity.',
    icon: 'i-lucide-feather',
    tags: ['Fiction', 'Storytelling', 'Character Development'],
    status: 'published',
    link: '/stories'
  },
  {
    title: 'Game Design Blog Articles',
    type: 'Educational Content',
    description: 'Technical articles on game design, mechanics, and publishing.',
    icon: 'i-lucide-file-text',
    tags: ['Technical Writing', 'Game Design', 'Education'],
    status: 'ongoing',
    link: '/blog'
  }
]

// Audio portfolio items
const audioPortfolio = [
  {
    title: 'Era of Silence Main Theme',
    type: 'Original Music',
    duration: '3:45',
    description: 'Atmospheric ambient track capturing the desolation and hope of the post-apocalyptic setting.',
    tags: ['Ambient', 'Soundtrack', 'Original Composition'],
    link: null
  },
  {
    title: 'Blood Neon Combat Ambience',
    type: 'Sound Design',
    duration: '15:00',
    description: 'Looping cyberpunk soundscape with neon hum, traffic, and distant gunfire.',
    tags: ['Soundscape', 'Ambient', 'Game Audio'],
    link: null
  },
  {
    title: 'Podcast: Behind the Dice',
    type: 'Podcast',
    duration: '45:30',
    description: 'Interview series discussing game design philosophy and creative process.',
    tags: ['Podcast', 'Interview', 'Educational'],
    link: null
  }
]

// Video portfolio items
const videoPortfolio = [
  {
    title: 'Era of Silence Launch Trailer',
    duration: '2:15',
    description: 'Cinematic trailer introducing the world and core themes of Era of Silence.',
    thumbnail: null,
    tags: ['Trailer', 'Motion Graphics', 'Editing'],
    link: null
  },
  {
    title: 'How to Play: Blood Neon',
    duration: '12:30',
    description: 'Tutorial video walking players through the core mechanics and setup.',
    thumbnail: null,
    tags: ['Tutorial', 'Educational', 'Animation'],
    link: null
  },
  {
    title: 'Game Design Devlog Series',
    duration: 'Series',
    description: 'Behind-the-scenes look at our development process and design decisions.',
    thumbnail: null,
    tags: ['Devlog', 'Educational', 'Vlog'],
    link: null
  },
  {
    title: 'Character Creation Guide',
    duration: '8:45',
    description: 'Step-by-step guide to creating memorable characters in our games.',
    thumbnail: null,
    tags: ['Tutorial', 'Screen Recording', 'Voice Over'],
    link: null
  }
]

// Lightbox functionality (placeholder)
const openLightbox = (index: number, category: string) => {
  console.log(`Opening lightbox for ${category} item ${index}`)
  // In a real implementation, this would open a modal with the full-size image
}

// SEO
useSeoMeta({
  title: 'Portfolio - Shrike Publishing',
  description: 'Explore our creative portfolio featuring game design, illustrations, writing, audio production, and video content from Shrike Publishing.',
  keywords: 'game design portfolio, tabletop design, illustration, creative writing, audio production, video production'
})
</script>

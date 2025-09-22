<template>
  <div class="space-y-8">
    <!-- Hero Banner -->
    <div class="relative overflow-hidden rounded-xl">
      <NuxtImg
        :src="game.banner || '/placeholder-banner.jpg'"
        :alt="`${game.title} Banner`"
        class="w-full h-64 md:h-80 object-cover"
        loading="eager"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div class="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">{{ game.title }}</h1>
        <p class="text-white/90 text-lg">{{ game.tagline }}</p>
      </div>
    </div>

    <!-- Artwork Carousel -->
    <UPageSection title="Artwork Gallery" description="Explore the visual world of the game">
      <UCarousel
        v-slot="{ item }"
        :items="artworkItems"
        arrows
        dots
        :autoplay="{ delay: 5000 }"
        class="w-full"
      >
        <UModal>
          <div class="group cursor-pointer">
            <NuxtImg
              :src="item.image"
              :alt="item.title"
              class="w-full h-80 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
              <UIcon 
                name="i-lucide-expand" 
                class="size-8 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </div>
          </div>

          <template #content>
            <div class="max-w-4xl mx-auto">
              <NuxtImg
                :src="item.image"
                :alt="item.title"
                class="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              <div class="p-6 space-y-4">
                <h3 class="text-xl font-bold text-highlighted">{{ item.title }}</h3>
                <p class="text-muted">{{ item.description }}</p>
                <div class="flex items-center gap-2">
                  <UBadge variant="soft" color="primary">{{ item.artist }}</UBadge>
                  <UBadge variant="outline" size="sm">{{ item.category }}</UBadge>
                </div>
              </div>
            </div>
          </template>
        </UModal>
      </UCarousel>
    </UPageSection>

    <!-- Character Art Grid -->
    <UPageSection title="Character Gallery" description="Meet the heroes and villains">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UCard
          v-for="character in characterArt"
          :key="character.id"
          variant="outline"
          class="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <template #header>
            <div class="relative overflow-hidden">
              <NuxtImg
                :src="character.image"
                :alt="character.name"
                class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div class="absolute bottom-4 left-4 right-4">
                <h3 class="text-white font-bold text-lg">{{ character.name }}</h3>
                <p class="text-white/80 text-sm">{{ character.role }}</p>
              </div>
            </div>
          </template>

          <div class="space-y-3">
            <p class="text-muted text-sm leading-relaxed">{{ character.description }}</p>
            <div class="flex flex-wrap gap-2">
              <UBadge
                v-for="trait in character.traits"
                :key="trait"
                variant="subtle"
                size="sm"
              >
                {{ trait }}
              </UBadge>
            </div>
          </div>
        </UCard>
      </div>
    </UPageSection>

    <!-- Concept Art Timeline -->
    <UPageSection title="Development Journey" description="Behind the scenes concept art">
      <div class="space-y-8">
        <div
          v-for="(phase, index) in conceptPhases"
          :key="phase.id"
          class="flex flex-col lg:flex-row gap-8 items-center"
          :class="{ 'lg:flex-row-reverse': index % 2 === 1 }"
        >
          <div class="flex-1 space-y-4">
            <div class="flex items-center gap-3">
              <UBadge variant="soft" color="secondary">Phase {{ index + 1 }}</UBadge>
              <h3 class="text-2xl font-bold text-highlighted">{{ phase.title }}</h3>
            </div>
            <p class="text-muted leading-relaxed">{{ phase.description }}</p>
            <div class="flex gap-2">
              <UButton
                v-for="artwork in phase.artworks.slice(0, 3)"
                :key="artwork.id"
                variant="ghost"
                size="sm"
                class="text-primary"
              >
                {{ artwork.title }}
              </UButton>
            </div>
          </div>
          
          <div class="flex-1">
            <UCarousel
              v-slot="{ item }"
              :items="phase.artworks"
              arrows
              :ui="{ item: 'basis-full' }"
              class="w-full"
            >
              <div class="relative group">
                <NuxtImg
                  :src="item.image"
                  :alt="item.title"
                  class="w-full h-64 object-cover rounded-lg shadow-lg"
                />
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent rounded-b-lg p-4">
                  <p class="text-white font-medium">{{ item.title }}</p>
                  <p class="text-white/70 text-sm">{{ item.artist }}</p>
                </div>
              </div>
            </UCarousel>
          </div>
        </div>
      </div>
    </UPageSection>

    <!-- Download Section -->
    <UPageSection title="Game Materials" description="Download PDFs and resources">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <UCard
          v-for="download in gameDownloads"
          :key="download.id"
          variant="outline"
          class="group hover:shadow-lg transition-all duration-200"
        >
          <div class="flex items-start gap-4">
            <div class="size-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center group-hover:from-primary/20 group-hover:to-secondary/20 transition-colors">
              <UIcon :name="download.icon" class="size-8 text-primary" />
            </div>
            <div class="flex-1 space-y-2">
              <h3 class="font-bold text-highlighted group-hover:text-primary transition-colors">
                {{ download.title }}
              </h3>
              <p class="text-muted text-sm">{{ download.description }}</p>
              <div class="flex items-center gap-2">
                <UBadge variant="soft" size="sm">{{ download.fileSize }}</UBadge>
                <UBadge variant="outline" size="sm">{{ download.fileType }}</UBadge>
              </div>
            </div>
            <UButton
              :to="download.downloadUrl"
              variant="outline"
              size="sm"
              trailing-icon="i-lucide-download"
              target="_blank"
            >
              Download
            </UButton>
          </div>
        </UCard>
      </div>
    </UPageSection>
  </div>
</template>

<script setup lang="ts">
interface Artwork {
  id: string
  image: string
  title: string
  description: string
  artist: string
  category: string
}

interface Character {
  id: string
  name: string
  role: string
  description: string
  image: string
  traits: string[]
}

interface ConceptPhase {
  id: string
  title: string
  description: string
  artworks: Artwork[]
}

interface GameDownload {
  id: string
  title: string
  description: string
  icon: string
  fileSize: string
  fileType: string
  downloadUrl: string
}

interface GameGalleryProps {
  game: {
    title: string
    tagline: string
    banner: string
  }
  artworkItems: Artwork[]
  characterArt: Character[]
  conceptPhases: ConceptPhase[]
  gameDownloads: GameDownload[]
}

defineProps<GameGalleryProps>()
</script>

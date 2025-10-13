<template>
  <UPageSection 
    :title="title || 'Artwork Gallery'"
    :description="description || 'Explore our latest concept art and illustrations'"
  >
    <!-- Filter Tags -->
    <div class="flex flex-wrap gap-2 mb-8">
      <UButton
        v-for="tag in filterTags"
        :key="tag"
        :variant="selectedTag === tag ? 'solid' : 'outline'"
        :color="selectedTag === tag ? 'primary' : 'neutral'"
        size="sm"
        @click="selectedTag = selectedTag === tag ? 'all' : tag"
      >
        {{ tag }}
      </UButton>
    </div>

    <!-- Artwork Grid -->
    <UPageGrid :cols="{ default: 1, md: 2, lg: 3, xl: 4 }" class="gap-6">
      <UCard
        v-for="artworkItem in filteredArtwork"
        :key="artworkItem.id"
        variant="outline"
        class="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        @click="openModal(artworkItem)"
      >
          <template #header>
            <div class="relative overflow-hidden">
              <NuxtImg
                :src="artworkItem.image"
                :alt="artworkItem.title"
                :style="{ aspectRatio: artworkItem.aspectRatio || 'auto' }"
                class="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <UIcon
                  name="i-lucide-expand"
                  class="size-8 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>

              <!-- Overlay Info -->
              <div class="absolute top-3 right-3">
                <UBadge
                  :variant="getTagVariant(artworkItem.category)"
                  :color="getTagColor(artworkItem.category)"
                  size="sm"
                >
                  {{ artworkItem.category }}
                </UBadge>
              </div>
            </div>
          </template>

          <div class="space-y-3">
            <div class="space-y-1">
              <h3 class="font-semibold text-highlighted group-hover:text-primary transition-colors line-clamp-2">
                {{ artworkItem.title }}
              </h3>
              <p class="text-muted text-sm line-clamp-2">{{ artworkItem.description }}</p>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <UAvatar
                  :src="artworkItem.artistAvatar || '/default-avatar.png'"
                  :alt="artworkItem.artist"
                  size="xs"
                />
                <span class="text-sm font-medium text-highlighted">{{ artworkItem.artist }}</span>
              </div>

              <div class="flex items-center gap-1 text-muted">
                <UIcon name="i-lucide-heart" class="size-4" />
                <span class="text-sm">{{ artworkItem.likes || 0 }}</span>
              </div>
            </div>

            <div class="flex flex-wrap gap-1">
              <UBadge
                v-for="tag in artworkItem.tags?.slice(0, 3)"
                :key="tag"
                variant="subtle"
                size="sm"
                class="text-xs"
              >
                {{ tag }}
              </UBadge>
            </div>
          </div>
        </UCard>
    </UPageGrid>

    <!-- Single Modal for all artwork -->
    <UModal
      v-if="selectedArtwork"
      v-model:open="isModalOpen"
      :title="selectedArtwork.title"
      :ui="{
        content: 'w-full max-w-6xl',
        body: 'p-6'
      }"
    >
      <template #body>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Image -->
            <div class="lg:col-span-2">
              <NuxtImg
                :src="selectedArtwork.image"
                :alt="selectedArtwork.title"
                class="w-full h-auto max-h-[70vh] object-contain rounded-lg"
              />
            </div>

            <!-- Details -->
            <div class="space-y-6">
              <div class="space-y-3">
                <div class="flex items-center gap-3">
                  <UAvatar
                    :src="selectedArtwork.artistAvatar || '/default-avatar.png'"
                    :alt="selectedArtwork.artist"
                    size="sm"
                  />
                  <div>
                    <h3 class="font-bold text-highlighted">{{ selectedArtwork.artist }}</h3>
                    <p class="text-sm text-muted">Artist</p>
                  </div>
                </div>

                <h2 class="text-2xl font-bold text-highlighted">{{ selectedArtwork.title }}</h2>
                <p class="text-muted leading-relaxed">{{ selectedArtwork.description }}</p>
              </div>

              <USeparator />

              <div class="space-y-4">
                <div>
                  <h4 class="font-semibold text-highlighted mb-2">Details</h4>
                  <div class="space-y-2 text-sm">
                    <div class="flex justify-between">
                      <span class="text-muted">Category:</span>
                      <UBadge :color="getTagColor(selectedArtwork.category)" size="sm">
                        {{ selectedArtwork.category }}
                      </UBadge>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-muted">Created:</span>
                      <span class="text-highlighted">{{ formatDate(selectedArtwork.createdAt) }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-muted">Medium:</span>
                      <span class="text-highlighted">{{ selectedArtwork.medium || 'Digital Art' }}</span>
                    </div>
                  </div>
                </div>

                <div v-if="selectedArtwork.tags?.length">
                  <h4 class="font-semibold text-highlighted mb-2">Tags</h4>
                  <div class="flex flex-wrap gap-2">
                    <UBadge
                      v-for="tag in selectedArtwork.tags"
                      :key="tag"
                      variant="subtle"
                      size="sm"
                    >
                      {{ tag }}
                    </UBadge>
                  </div>
                </div>

                <div class="flex gap-2">
                  <UButton
                    variant="soft"
                    color="primary"
                    leading-icon="i-lucide-heart"
                    size="sm"
                  >
                    Like ({{ selectedArtwork.likes || 0 }})
                  </UButton>
                  <UButton
                    variant="outline"
                    leading-icon="i-lucide-share-2"
                    size="sm"
                  >
                    Share
                  </UButton>
                </div>
              </div>

              <USeparator />

              <!-- Related Artwork -->
              <div v-if="getRelatedArtwork(selectedArtwork).length">
                <h4 class="font-semibold text-highlighted mb-3">More by {{ selectedArtwork.artist }}</h4>
                <div class="grid grid-cols-2 gap-3">
                  <div
                    v-for="related in getRelatedArtwork(selectedArtwork).slice(0, 4)"
                    :key="related.id"
                    class="group cursor-pointer"
                    @click="openModal(related)"
                  >
                    <NuxtImg
                      :src="related.image"
                      :alt="related.title"
                      class="w-full h-20 object-cover rounded-md group-hover:opacity-80 transition-opacity"
                    />
                    <p class="text-xs text-muted mt-1 line-clamp-1">{{ related.title }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </template>
    </UModal>

    <!-- Load More -->
    <div v-if="hasMore" class="text-center mt-12">
      <UButton
        variant="outline"
        size="lg"
        :loading="loading"
        trailing-icon="i-lucide-chevron-down"
        @click="loadMore"
      >
        Load More Artwork
      </UButton>
    </div>
  </UPageSection>
</template>

<script setup lang="ts">
interface ArtworkItem {
  id: string
  title: string
  description: string
  image: string
  artist: string
  artistAvatar?: string
  category: string
  tags?: string[]
  likes?: number
  createdAt: string
  medium?: string
  aspectRatio?: string
}

interface ArtworkFeedProps {
  title?: string
  description?: string
  artwork: ArtworkItem[]
  hasMore?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<ArtworkFeedProps>(), {
  title: 'Artwork Gallery',
  description: 'Browse our collection of creative works',
  hasMore: false,
  loading: false
})

const emit = defineEmits<{
  loadMore: []
}>()

const selectedTag = ref<string>('all')
const selectedArtwork = ref<ArtworkItem | null>(null)
const isModalOpen = ref(false)

function openModal(artwork: ArtworkItem) {
  selectedArtwork.value = artwork
  isModalOpen.value = true
}

const filterTags = computed(() => {
  const tags = ['all', ...new Set(props.artwork.map(item => item.category))]
  return tags
})

const filteredArtwork = computed(() => {
  if (selectedTag.value === 'all') {
    return props.artwork
  }
  return props.artwork.filter(item => item.category === selectedTag.value)
})

const getTagColor = (category: string): string => {
  const colorMap: Record<string, string> = {
    'character': 'primary',
    'environment': 'secondary', 
    'concept': 'info',
    'cover': 'warning',
    'illustration': 'success',
    'sketch': 'neutral'
  }
  return colorMap[category.toLowerCase()] || 'neutral'
}

const getTagVariant = (category: string): string => {
  return category === 'cover' ? 'solid' : 'soft'
}

const getRelatedArtwork = (currentItem: ArtworkItem) => {
  return props.artwork.filter(item =>
    item.id !== currentItem.id &&
    item.artist === currentItem.artist
  )
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const loadMore = () => {
  emit('loadMore')
}
</script>

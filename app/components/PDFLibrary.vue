<template>
  <UPageSection 
    title="Game Library"
    description="Download rulebooks, supplements, and character sheets"
  >
    <!-- Search and Filters -->
    <div class="mb-8 space-y-4">
      <div class="flex flex-col md:flex-row gap-4">
        <UInput
          v-model="searchQuery"
          placeholder="Search PDFs..."
          leading-icon="i-lucide-search"
          class="flex-1"
        />
        <USelect
          v-model="selectedCategory"
          :options="categoryOptions"
          placeholder="All Categories"
          class="md:w-48"
        />
        <USelect
          v-model="selectedGame"
          :options="gameOptions" 
          placeholder="All Games"
          class="md:w-48"
        />
      </div>
    </div>

    <!-- PDF Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UCard
        v-for="pdf in filteredPDFs"
        :key="pdf.id"
        variant="outline"
        class="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      >
        <template #header>
          <div class="relative">
            <!-- PDF Preview/Cover -->
            <div class="aspect-[3/4] bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg flex items-center justify-center relative overflow-hidden">
              <NuxtImg
                v-if="pdf.coverImage"
                :src="pdf.coverImage"
                :alt="`${pdf.title} Cover`"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div v-else class="text-center space-y-3">
                <UIcon :name="getPDFIcon(pdf.type)" class="size-16 text-primary/60" />
                <p class="text-sm text-muted font-medium">{{ pdf.type }}</p>
              </div>
              
              <!-- Overlay -->
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <UIcon 
                  name="i-lucide-download" 
                  class="size-8 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>

            <!-- Badges -->
            <div class="absolute top-3 left-3 right-3 flex justify-between">
              <UBadge
                :variant="getGameVariant(pdf.game)"
                :color="getGameColor(pdf.game)"
                size="sm"
              >
                {{ pdf.game }}
              </UBadge>
              <UBadge
                v-if="pdf.isNew"
                variant="solid"
                color="success"
                size="sm"
              >
                New
              </UBadge>
            </div>
          </div>
        </template>

        <div class="space-y-4">
          <div class="space-y-2">
            <h3 class="font-bold text-lg text-highlighted group-hover:text-primary transition-colors line-clamp-2">
              {{ pdf.title }}
            </h3>
            <p class="text-muted text-sm line-clamp-3">{{ pdf.description }}</p>
          </div>

          <!-- PDF Details -->
          <div class="space-y-3">
            <div class="flex items-center justify-between text-sm">
              <span class="text-muted">File Size:</span>
              <span class="text-highlighted font-medium">{{ pdf.fileSize }}</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-muted">Pages:</span>
              <span class="text-highlighted font-medium">{{ pdf.pageCount }}</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-muted">Version:</span>
              <span class="text-highlighted font-medium">{{ pdf.version }}</span>
            </div>
          </div>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2">
            <UBadge
              v-for="tag in pdf.tags"
              :key="tag"
              variant="subtle"
              size="sm"
            >
              {{ tag }}
            </UBadge>
          </div>

          <!-- Actions -->
          <div class="flex gap-2 pt-2">
            <UButton
              :to="pdf.downloadUrl"
              variant="solid"
              color="primary"
              size="sm"
              leading-icon="i-lucide-download"
              target="_blank"
              class="flex-1"
              @click="trackDownload(pdf)"
            >
              Download
            </UButton>
            <UButton
              v-if="pdf.previewUrl"
              :to="pdf.previewUrl"
              variant="outline"
              size="sm"
              icon="i-lucide-eye"
              target="_blank"
            >
              Preview
            </UButton>
            <UDropdownMenu :items="getActionItems(pdf)">
              <UButton
                variant="ghost"
                size="sm"
                icon="i-lucide-more-horizontal"
              />
            </UDropdownMenu>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Empty State -->
    <div v-if="filteredPDFs.length === 0" class="text-center py-12">
      <UIcon name="i-lucide-file-x" class="size-16 text-muted mx-auto mb-4" />
      <h3 class="text-lg font-semibold text-highlighted mb-2">No PDFs Found</h3>
      <p class="text-muted mb-6">Try adjusting your search or filter criteria.</p>
      <UButton @click="clearFilters" variant="outline">
        Clear Filters
      </UButton>
    </div>

    <!-- Stats Section -->
    <div class="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
      <UCard variant="subtle" class="text-center">
        <div class="space-y-2">
          <UIcon name="i-lucide-file-text" class="size-8 text-primary mx-auto" />
          <p class="text-2xl font-bold text-highlighted">{{ pdfs.length }}</p>
          <p class="text-sm text-muted">Total PDFs</p>
        </div>
      </UCard>
      <UCard variant="subtle" class="text-center">
        <div class="space-y-2">
          <UIcon name="i-lucide-gamepad-2" class="size-8 text-secondary mx-auto" />
          <p class="text-2xl font-bold text-highlighted">{{ uniqueGames.length }}</p>
          <p class="text-sm text-muted">Games</p>
        </div>
      </UCard>
      <UCard variant="subtle" class="text-center">
        <div class="space-y-2">
          <UIcon name="i-lucide-download" class="size-8 text-success mx-auto" />
          <p class="text-2xl font-bold text-highlighted">{{ totalDownloads }}</p>
          <p class="text-sm text-muted">Downloads</p>
        </div>
      </UCard>
      <UCard variant="subtle" class="text-center">
        <div class="space-y-2">
          <UIcon name="i-lucide-calendar" class="size-8 text-warning mx-auto" />
          <p class="text-2xl font-bold text-highlighted">{{ recentUpdates }}</p>
          <p class="text-sm text-muted">Recent Updates</p>
        </div>
      </UCard>
    </div>
  </UPageSection>
</template>

<script setup lang="ts">
interface PDFItem {
  id: string
  title: string
  description: string
  type: 'rulebook' | 'supplement' | 'character-sheet' | 'quick-reference' | 'adventure'
  game: string
  coverImage?: string
  downloadUrl: string
  previewUrl?: string
  fileSize: string
  pageCount: number
  version: string
  tags: string[]
  isNew?: boolean
  downloads?: number
  updatedAt: string
}

interface PDFLibraryProps {
  pdfs: PDFItem[]
}

const props = defineProps<PDFLibraryProps>()

const searchQuery = ref('')
const selectedCategory = ref('')
const selectedGame = ref('')

const categoryOptions = computed(() => [
  { label: 'All Categories', value: '' },
  { label: 'Rulebooks', value: 'rulebook' },
  { label: 'Supplements', value: 'supplement' },
  { label: 'Character Sheets', value: 'character-sheet' },
  { label: 'Quick Reference', value: 'quick-reference' },
  { label: 'Adventures', value: 'adventure' }
])

const gameOptions = computed(() => [
  { label: 'All Games', value: '' },
  ...uniqueGames.value.map(game => ({ label: game, value: game }))
])

const uniqueGames = computed(() => {
  return [...new Set(props.pdfs.map(pdf => pdf.game))]
})

const filteredPDFs = computed(() => {
  return props.pdfs.filter(pdf => {
    const matchesSearch = !searchQuery.value || 
      pdf.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      pdf.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesCategory = !selectedCategory.value || pdf.type === selectedCategory.value
    const matchesGame = !selectedGame.value || pdf.game === selectedGame.value

    return matchesSearch && matchesCategory && matchesGame
  })
})

const totalDownloads = computed(() => {
  return props.pdfs.reduce((sum, pdf) => sum + (pdf.downloads || 0), 0)
})

const recentUpdates = computed(() => {
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  return props.pdfs.filter(pdf => new Date(pdf.updatedAt) > oneWeekAgo).length
})

const getPDFIcon = (type: string): string => {
  const iconMap: Record<string, string> = {
    'rulebook': 'i-lucide-book-open',
    'supplement': 'i-lucide-book-plus',
    'character-sheet': 'i-lucide-user',
    'quick-reference': 'i-lucide-bookmark',
    'adventure': 'i-lucide-map'
  }
  return iconMap[type] || 'i-lucide-file-text'
}

const getGameColor = (game: string): string => {
  const colorMap: Record<string, string> = {
    'Era of Silence': 'primary',
    'Blood Neon': 'warning',
    'General': 'neutral'
  }
  return colorMap[game] || 'secondary'
}

const getGameVariant = (game: string): string => {
  return game === 'General' ? 'outline' : 'soft'
}

const getActionItems = (pdf: PDFItem) => [
  [{
    label: 'Copy Link',
    icon: 'i-lucide-link',
    click: () => copyToClipboard(pdf.downloadUrl)
  }, {
    label: 'Share',
    icon: 'i-lucide-share-2',
    click: () => sharePDF(pdf)
  }]
]

const trackDownload = (pdf: PDFItem) => {
  // Track download analytics
  console.log(`Downloaded: ${pdf.title}`)
}

const copyToClipboard = async (url: string) => {
  try {
    await navigator.clipboard.writeText(url)
    // Show toast notification
  } catch (err) {
    console.error('Failed to copy: ', err)
  }
}

const sharePDF = (pdf: PDFItem) => {
  if (navigator.share) {
    navigator.share({
      title: pdf.title,
      text: pdf.description,
      url: pdf.downloadUrl
    })
  }
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  selectedGame.value = ''
}
</script>

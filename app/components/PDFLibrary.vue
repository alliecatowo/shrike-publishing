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

    <!-- PDF Table -->
    <UTable
      :data="filteredPDFs"
      :columns="columns"
      class="flex-1"
    >
      <template #title-cell="{ row }">
        <div class="flex items-start gap-3">
          <div class="relative">
            <!-- PDF Preview/Cover -->
            <div class="w-16 h-20 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg flex items-center justify-center relative overflow-hidden">
              <NuxtImg
                v-if="row.original.coverImage"
                :src="row.original.coverImage"
                :alt="`${row.original.title} Cover`"
                class="w-full h-full object-cover"
              />
              <div v-else class="text-center space-y-1">
                <UIcon :name="getPDFIcon(row.original.type)" class="size-4 text-primary/60" />
                <p class="text-xs text-muted font-medium">{{ row.original.type }}</p>
              </div>
            </div>

            <!-- Badges -->
            <div class="absolute -top-1 -right-1">
              <UBadge
                v-if="row.original.isNew"
                variant="solid"
                color="success"
                size="xs"
              >
                New
              </UBadge>
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="font-bold text-highlighted line-clamp-2">
              {{ row.original.title }}
            </h3>
            <p class="text-muted text-sm line-clamp-2 mt-1">{{ row.original.description }}</p>
          </div>
        </div>
      </template>

      <template #game-cell="{ row }">
        <UBadge
          :variant="getGameVariant(row.original.game)"
          :color="getGameColor(row.original.game)"
          size="sm"
        >
          {{ row.original.game }}
        </UBadge>
      </template>

      <template #details-cell="{ row }">
        <div class="space-y-1 text-sm">
          <div class="flex justify-between">
            <span class="text-muted">Size:</span>
            <span class="text-highlighted font-medium">{{ row.original.fileSize }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted">Pages:</span>
            <span class="text-highlighted font-medium">{{ row.original.pageCount }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted">Version:</span>
            <span class="text-highlighted font-medium">{{ row.original.version }}</span>
          </div>
        </div>
      </template>

      <template #tags-cell="{ row }">
        <div class="flex flex-wrap gap-1">
          <UBadge
            v-for="tag in row.original.tags"
            :key="tag"
            variant="subtle"
            size="sm"
          >
            {{ tag }}
          </UBadge>
        </div>
      </template>

      <template #actions-cell="{ row }">
        <div class="flex gap-1">
          <UButton
            :to="row.original.downloadUrl"
            variant="solid"
            color="primary"
            size="xs"
            leading-icon="i-lucide-download"
            target="_blank"
            @click="trackDownload(row.original)"
          >
            Download
          </UButton>
          <UButton
            v-if="row.original.previewUrl"
            :to="row.original.previewUrl"
            variant="outline"
            size="xs"
            icon="i-lucide-eye"
            target="_blank"
          >
            Preview
          </UButton>
          <UDropdownMenu :items="getActionItems(row.original)">
            <UButton
              variant="ghost"
              size="xs"
              icon="i-lucide-more-horizontal"
            />
          </UDropdownMenu>
        </div>
      </template>
    </UTable>

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
import type { TableColumn } from '@nuxt/ui'

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

const columns = computed(() => [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => row.getValue('title')
  },
  {
    accessorKey: 'game',
    header: 'Game',
    cell: ({ row }) => row.getValue('game')
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type = row.getValue('type') as string
      return type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')
    }
  },
  {
    accessorKey: 'details',
    header: 'Details',
    cell: ({ row }) => row.getValue('details')
  },
  {
    accessorKey: 'tags',
    header: 'Tags',
    cell: ({ row }) => row.getValue('tags')
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => row.getValue('actions')
  }
])

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

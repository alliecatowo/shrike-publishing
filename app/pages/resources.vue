<template>
  <div>
    <!-- Hero Section -->
    <UPageHero
      title="Free Resources"
      description="Download free assets, reference materials, and tools to enhance your gaming experience."
      class="bg-gradient-to-br from-primary-100/50 via-secondary-100/30 to-pink-100/50 dark:from-primary-900/20 dark:via-secondary-900/15 dark:to-pink-900/20"
    >
      <template #links>
        <UButton
          to="#downloads"
          size="lg"
          color="primary"
          trailing-icon="i-lucide-download"
        >
          Browse Downloads
        </UButton>
      </template>
    </UPageHero>

    <!-- Search and Filters Section -->
    <UPageSection
      title="Resource Categories"
      description="Everything you need to run and play our games"
      :ui="{ container: 'text-center' }"
    >
      <div class="space-y-6">
        <!-- Search Bar -->
        <div class="max-w-2xl mx-auto">
          <UInput
            v-model="searchQuery"
            placeholder="Search resources by title or description..."
            leading-icon="i-lucide-search"
            size="lg"
          />
        </div>

        <!-- Category Tabs with Badges -->
        <div class="flex flex-wrap justify-center gap-2">
          <UButton
            v-for="tab in categoryTabsWithCounts"
            :key="tab.value"
            :variant="activeCategory === tab.value ? 'solid' : 'ghost'"
            :color="activeCategory === tab.value ? 'primary' : 'neutral'"
            size="sm"
            @click="activeCategory = tab.value"
          >
            {{ tab.label }}
            <template #trailing>
              <UBadge
                :color="activeCategory === tab.value ? 'neutral' : 'neutral'"
                :variant="activeCategory === tab.value ? 'solid' : 'soft'"
                size="xs"
                class="ml-2"
              >
                {{ tab.count }}
              </UBadge>
            </template>
          </UButton>
        </div>

        <!-- View Toggle -->
        <div class="flex justify-end">
          <UFieldGroup>
            <UButton
              :variant="viewMode === 'cards' ? 'solid' : 'ghost'"
              :color="viewMode === 'cards' ? 'primary' : 'neutral'"
              icon="i-lucide-layout-grid"
              size="sm"
              @click="viewMode = 'cards'"
            >
              Card View
            </UButton>
            <UButton
              :variant="viewMode === 'table' ? 'solid' : 'ghost'"
              :color="viewMode === 'table' ? 'primary' : 'neutral'"
              icon="i-lucide-table"
              size="sm"
              @click="viewMode = 'table'"
            >
              Table View
            </UButton>
          </UFieldGroup>
        </div>
      </div>
    </UPageSection>

    <!-- Resources Grid/Table -->
    <UPageSection id="downloads">
      <!-- Card View -->
      <UPageGrid v-if="viewMode === 'cards'" :cols="{ default: 1, md: 2, lg: 3 }" class="gap-6">
        <UPageCard
          v-for="resource in filteredResources"
          :key="resource._path"
          :title="resource.title"
          :description="resource.description"
          :icon="getResourceIcon(resource.type || resource.category)"
          variant="outline"
          spotlight
          spotlight-color="primary"
        >
          <template #header>
            <!-- Cover Preview -->
            <div v-if="resource.cover" class="w-full h-48 rounded-lg overflow-hidden bg-gradient-to-br from-primary-100/50 to-secondary-100/50 dark:from-primary-900/20 dark:to-secondary-900/20">
              <NuxtImg
                :src="resource.cover"
                :alt="`${resource.title} Cover`"
                class="w-full h-full object-cover"
              />
            </div>
          </template>

          <template #title>
            <div class="flex items-start justify-between gap-2">
              <h3 class="font-semibold text-lg line-clamp-2 flex-1">{{ resource.title }}</h3>
              <UBadge
                :color="getCategoryColor(resource.category || '')"
                variant="soft"
                size="xs"
              >
                {{ formatCategoryLabel(resource.category || '') }}
              </UBadge>
            </div>
          </template>

          <template #body>
            <div class="space-y-4">
              <!-- Meta Info -->
              <div class="grid grid-cols-3 gap-2 text-xs">
                <div class="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <UIcon name="i-lucide-file" class="h-4 w-4 text-primary-600 dark:text-primary-400 mb-1" />
                  <span class="text-gray-600 dark:text-gray-400">{{ resource.format || 'PDF' }}</span>
                </div>
                <div v-if="resource.fileSize" class="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <UIcon name="i-lucide-hard-drive" class="h-4 w-4 text-primary-600 dark:text-primary-400 mb-1" />
                  <span class="text-gray-600 dark:text-gray-400">{{ resource.fileSize }}</span>
                </div>
                <div v-if="resource.pages" class="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <UIcon name="i-lucide-book-open" class="h-4 w-4 text-primary-600 dark:text-primary-400 mb-1" />
                  <span class="text-gray-600 dark:text-gray-400">{{ resource.pages }}p</span>
                </div>
              </div>

              <!-- Tags -->
              <div v-if="resource.tags && resource.tags.length" class="flex flex-wrap gap-1">
                <UBadge
                  v-for="tag in resource.tags"
                  :key="tag"
                  size="xs"
                  variant="subtle"
                  color="neutral"
                >
                  {{ tag }}
                </UBadge>
              </div>
            </div>
          </template>

          <template #footer>
            <div class="space-y-3">
              <!-- Download Button -->
              <UButton
                :to="resource.downloadUrl || resource.url || resource.file || resource.download"
                external
                :target="resource.external ? '_blank' : undefined"
                :download="!resource.external"
                block
                color="primary"
                :leading-icon="resource.external ? 'i-lucide-external-link' : 'i-lucide-download'"
              >
                {{ resource.external ? 'View Resource' : 'Download PDF' }}
              </UButton>

              <!-- Updated Date -->
              <div class="text-xs text-gray-500 text-center">
                <UIcon name="i-lucide-calendar" class="inline h-3 w-3 mr-1" />
                Updated {{ formatDate(resource.date || resource.updatedAt) }}
              </div>
            </div>
          </template>
        </UPageCard>
      </UPageGrid>

      <!-- Table View -->
      <UTable
        v-else
        :data="filteredResources"
        :columns="tableColumns"
      >
        <template #title-cell="{ row }">
          <div class="flex items-start gap-3 py-2">
            <div class="relative flex-shrink-0">
              <!-- Cover Preview or Icon -->
              <div class="w-16 h-20 bg-gradient-to-br from-primary-100/50 to-secondary-100/50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-lg flex items-center justify-center overflow-hidden">
                <NuxtImg
                  v-if="row.cover"
                  :src="row.cover"
                  :alt="`${row.title} Cover`"
                  class="w-full h-full object-cover"
                />
                <div v-else class="text-center">
                  <UIcon :name="getResourceIcon(row.type || row.category)" class="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold text-base line-clamp-2">{{ row.title }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">{{ row.description }}</p>
            </div>
          </div>
        </template>

        <template #category-cell="{ row }">
          <UBadge
            :color="getCategoryColor(row.category || '')"
            variant="soft"
            size="sm"
          >
            {{ formatCategoryLabel(row.category || '') }}
          </UBadge>
        </template>

        <template #metadata-cell="{ row }">
          <div class="space-y-1 text-sm">
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-file" class="h-3 w-3 text-gray-500" />
              <span class="text-gray-600 dark:text-gray-400">{{ row.format || 'PDF' }}</span>
            </div>
            <div v-if="row.fileSize" class="flex items-center gap-2">
              <UIcon name="i-lucide-hard-drive" class="h-3 w-3 text-gray-500" />
              <span class="text-gray-600 dark:text-gray-400">{{ row.fileSize }}</span>
            </div>
            <div v-if="row.pages" class="flex items-center gap-2">
              <UIcon name="i-lucide-book-open" class="h-3 w-3 text-gray-500" />
              <span class="text-gray-600 dark:text-gray-400">{{ row.pages }} pages</span>
            </div>
          </div>
        </template>

        <template #tags-cell="{ row }">
          <div class="flex flex-wrap gap-1">
            <UBadge
              v-for="tag in (row.tags || [])"
              :key="tag"
              variant="subtle"
              size="xs"
              color="neutral"
            >
              {{ tag }}
            </UBadge>
          </div>
        </template>

        <template #actions-cell="{ row }">
          <div class="flex gap-2">
            <UButton
              :to="row.downloadUrl || row.url || row.file || row.download"
              external
              :target="row.external ? '_blank' : undefined"
              :download="!row.external"
              variant="solid"
              color="primary"
              size="sm"
              :leading-icon="row.external ? 'i-lucide-external-link' : 'i-lucide-download'"
            >
              {{ row.external ? 'View' : 'Download' }}
            </UButton>
          </div>
        </template>
      </UTable>

      <!-- Empty State -->
      <div v-if="filteredResources.length === 0" class="text-center py-16">
        <UIcon name="i-lucide-search-x" class="h-20 w-20 text-gray-400 mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          No resources found
        </h3>
        <p class="text-gray-500 mb-6">
          {{ searchQuery ? 'Try adjusting your search terms or filters' : `No ${activeCategory === 'all' ? 'resources' : formatCategoryLabel(activeCategory || '')} available yet` }}
        </p>
        <UButton
          v-if="searchQuery || activeCategory !== 'all'"
          variant="outline"
          color="neutral"
          @click="() => { searchQuery = ''; activeCategory = 'all' }"
        >
          Clear Filters
        </UButton>
      </div>
    </UPageSection>

    <!-- Community Resources -->
    <UPageSection
      title="Community Creations"
      description="Amazing resources created by our community"
      :ui="{ container: 'text-center' }"
    >
      <UPageGrid :cols="{ default: 1, md: 2, lg: 3 }" class="gap-6">
        <UCard
          v-for="community in communityResources"
          :key="community.title"
          variant="outline"
          class="hover:shadow-lg transition-shadow"
        >
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-full flex items-center justify-center flex-shrink-0">
                <UIcon :name="community.icon" class="h-5 w-5 " color="purple" />
              </div>
              <div class="flex-1">
                <h3 class="font-semibold">{{ community.title }}</h3>
                <p class="text-xs text-gray-500">by {{ community.creator }}</p>
              </div>
            </div>

            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ community.description }}
            </p>

            <UButton
              :to="community.url"
              external
              target="_blank"
              variant="outline"
              size="sm"
              block
              trailing-icon="i-lucide-external-link"
            >
              View Resource
            </UButton>
          </div>
        </UCard>
      </UPageGrid>

      <div class="text-center mt-8">
        <UCard variant="soft" class="max-w-2xl mx-auto">
          <div class="space-y-3">
            <h3 class="text-lg font-semibold">Share Your Resources</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Created something awesome? We'd love to feature your work here!
            </p>
            <UButton to="/contact" color="secondary" icon="i-lucide-mail">
              Submit Your Resource
            </UButton>
          </div>
        </UCard>
      </div>
    </UPageSection>

    <!-- FAQ Section -->
    <UPageSection v-if="resourcesContent?.faq" title="Frequently Asked Questions">
      <UAccordion :items="resourcesContent.faq" />
    </UPageSection>

    <!-- Quick Reference -->
    <UPageSection
      title="Quick Reference Guides"
      description="Essential rules and tables at your fingertips"
      :ui="{ container: 'text-center' }"
    >
      <div class="max-w-4xl mx-auto">
        <UPageGrid :cols="{ default: 1, md: 2 }" class="gap-6">
          <UCard
            v-for="guide in quickReferenceGuides"
            :key="guide.title"
            variant="outline"
            class="hover:shadow-lg transition-shadow"
          >
            <div class="flex items-start gap-4">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <UIcon :name="guide.icon" class="h-8 w-8 " color="info" />
              </div>
              <div class="flex-1 space-y-3">
                <div>
                  <h3 class="font-semibold text-lg">{{ guide.title }}</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ guide.description }}</p>
                </div>
                <UButton
                  :to="guide.url"
                  external
                  :target="guide.external ? '_blank' : undefined"
                  :download="!guide.external"
                  variant="soft"
                  size="sm"
                  trailing-icon="i-lucide-download"
                >
                  Download PDF
                </UButton>
              </div>
            </div>
          </UCard>
        </UPageGrid>
      </div>
    </UPageSection>

    <!-- Call to Action -->
    <UPageCTA
      title="Need More Help?"
      description="Check out our full game manuals, tutorials, and community forums."
      :links="[
        {
          label: 'View Game Resources',
          to: '/games',
          leadingIcon: 'i-lucide-book-open'
        },
        {
          label: 'Visit Community Forums',
          to: '/contact',
          variant: 'outline',
          leadingIcon: 'i-lucide-users'
        }
      ]"
    />
  </div>
</template>

<script setup lang="ts">
import { refDebounced } from '@vueuse/core'
import { RESOURCE_CATEGORIES } from '~/constants/categories'

// Fetch resources from content collection
const { data: resources } = await useAsyncData('resources', () =>
  queryCollection('resources').where('published', '=', true).order('date', 'DESC').all()
)

// Fetch resources page content (FAQ, etc.)
const { data: resourcesContent } = await useAsyncData('resources-content', () =>
  queryCollection('resources').where('path', '=', '/resources').first()
)

const resourcesValue = computed(() => resources.value || [])

// View mode state
const viewMode = ref<'cards' | 'table'>('cards')

// Search query with debouncing
const searchQuery = ref('')
const debouncedSearchQuery = refDebounced(searchQuery, 300)

// Category tabs
const activeCategory = ref('all')
const categoryTabs = RESOURCE_CATEGORIES

// Category tabs with counts
const categoryTabsWithCounts = computed(() => {
  return categoryTabs.map(tab => {
    const count = tab.value === 'all'
      ? resourcesValue.value.length
      : resourcesValue.value.filter(r => r.category === tab.value).length
    return { ...tab, count }
  })
})

// Filter resources by category and search
const filteredResources = computed(() => {
  let filtered = resourcesValue.value

  // Filter by category
  if (activeCategory.value !== 'all') {
    filtered = filtered.filter((r) => r.category === activeCategory.value)
  }

  // Filter by search query
  if (debouncedSearchQuery.value) {
    const query = debouncedSearchQuery.value.toLowerCase()
    filtered = filtered.filter((r) =>
      r.title?.toLowerCase().includes(query) ||
      r.description?.toLowerCase().includes(query) ||
      r.tags?.some(tag => tag.toLowerCase().includes(query))
    )
  }

  return filtered
})

// Table columns configuration
const tableColumns = computed(() => [
  {
    accessorKey: 'title',
    header: 'Resource',
    cell: ({ row }) => row.getValue('title')
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => row.getValue('category')
  },
  {
    accessorKey: 'metadata',
    header: 'Details',
    cell: ({ row }) => row.getValue('metadata')
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

// Helper functions
const getResourceIcon = (type: string) => {
  const icons: Record<string, string> = {
    'manual': 'i-lucide-book',
    'character-sheet': 'i-lucide-user',
    'reference': 'i-lucide-book-open',
    'map': 'i-lucide-map',
    'template': 'i-lucide-file-text',
    'tool': 'i-lucide-wrench',
    'pdf': 'i-lucide-file',
    'image': 'i-lucide-image',
    'spreadsheet': 'i-lucide-table'
  }
  return icons[type] || 'i-lucide-file'
}

const getCategoryColor = (category: string): 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral' => {
  const colors: Record<string, 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'> = {
    'manual': 'info',
    'character-sheets': 'primary',
    'reference': 'secondary',
    'maps': 'info',
    'templates': 'warning',
    'tools': 'error'
  }
  return colors[category] || 'neutral'
}

// Format category label for display
const formatCategoryLabel = (category: string) => {
  const labels: Record<string, string> = {
    'manual': 'Manual',
    'character-sheets': 'Character Sheet',
    'reference': 'Reference',
    'maps': 'Maps & Assets',
    'templates': 'Template',
    'tools': 'Tool'
  }
  return labels[category] || category
}

// Format date for display
const formatDate = (dateStr: string) => {
  if (!dateStr) return 'Unknown'
  try {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  } catch {
    return dateStr
  }
}

// Sample community resources
const communityResources = [
  {
    title: 'Character Builder App',
    creator: 'Alex Chen',
    description: 'Interactive web app for creating Era of Silence characters.',
    url: '#',
    icon: 'i-lucide-smartphone'
  },
  {
    title: 'Custom Faction Generator',
    creator: 'Sarah Johnson',
    description: 'Randomly generate factions for Blood Neon campaigns.',
    url: '#',
    icon: 'i-lucide-shuffle'
  },
  {
    title: 'Encounter Tables',
    creator: 'Mike Rivera',
    description: 'Comprehensive random encounter tables for all our games.',
    url: '#',
    icon: 'i-lucide-dice-6'
  }
]

// Quick reference guides
const quickReferenceGuides = [
  {
    title: 'Era of Silence Quick Reference',
    description: 'Core mechanics, combat rules, and skill checks on 2 pages.',
    icon: 'i-lucide-zap',
    url: '#'
  },
  {
    title: 'Blood Neon Combat Cheat Sheet',
    description: 'Fast-paced combat flow chart and critical hit tables.',
    icon: 'i-lucide-sword',
    url: '#'
  },
  {
    title: 'GM Screen Inserts',
    description: 'Printable inserts with essential tables and charts.',
    icon: 'i-lucide-layout-dashboard',
    url: '#'
  },
  {
    title: 'Condition & Status Reference',
    description: 'Complete list of conditions, effects, and their mechanics.',
    icon: 'i-lucide-heart-pulse',
    url: '#'
  }
]

// SEO
useSeoMeta({
  title: 'Free Resources - Shrike Publishing',
  description: 'Download free character sheets, reference guides, maps, and tools for Era of Silence, Blood Neon, and other Shrike Publishing games.',
  keywords: 'free RPG resources, character sheets, reference guides, tabletop tools, game assets'
})
</script>

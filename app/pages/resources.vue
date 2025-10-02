<template>
  <div>
    <!-- Hero Section -->
    <UPageHero
      title="Free Resources"
      description="Download free assets, reference materials, and tools to enhance your gaming experience."
      class="bg-gradient-to-br from-emerald-100/50 via-teal-100/30 to-cyan-100/50 dark:from-emerald-900/20 dark:via-teal-900/15 dark:to-cyan-900/20"
    >
      <template #links>
        <UButton
          to="#downloads"
          size="lg"
          color="emerald"
          trailing-icon="i-lucide-download"
        >
          Browse Downloads
        </UButton>
      </template>
    </UPageHero>

    <!-- Categories Section -->
    <UPageSection
      title="Resource Categories"
      description="Everything you need to run and play our games"
      :ui="{ container: 'text-center' }"
    >
      <UTabs v-model="activeCategory" :items="categoryTabs" />
    </UPageSection>

    <!-- Resources Grid -->
    <UPageSection id="downloads">
      <UPageGrid :cols="{ default: 1, md: 2, lg: 3 }" class="gap-6">
        <UCard
          v-for="resource in filteredResources"
          :key="resource.slug"
          variant="outline"
          class="group hover:shadow-xl transition-all duration-300 hover:border-emerald-300 dark:hover:border-emerald-700 hover:-translate-y-1"
        >
          <div class="space-y-4">
            <!-- Resource Icon/Image -->
            <div class="flex items-start justify-between">
              <div class="flex items-start gap-3">
                <div class="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900 dark:to-teal-900 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <UIcon :name="getResourceIcon(resource.type)" class="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div class="flex-1">
                  <h3 class="font-semibold text-lg line-clamp-2">{{ resource.title }}</h3>
                  <UBadge
                    :color="getCategoryColor(resource.category)"
                    variant="soft"
                    size="xs"
                    class="mt-1"
                  >
                    {{ resource.category }}
                  </UBadge>
                </div>
              </div>
            </div>

            <!-- Description -->
            <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
              {{ resource.description }}
            </p>

            <!-- Meta Info -->
            <div class="flex flex-wrap gap-2 text-xs text-gray-500">
              <div class="flex items-center gap-1">
                <UIcon name="i-lucide-file" class="h-3 w-3" />
                <span>{{ resource.format || 'PDF' }}</span>
              </div>
              <div v-if="resource.fileSize" class="flex items-center gap-1">
                <UIcon name="i-lucide-hard-drive" class="h-3 w-3" />
                <span>{{ resource.fileSize }}</span>
              </div>
              <div v-if="resource.pages" class="flex items-center gap-1">
                <UIcon name="i-lucide-book-open" class="h-3 w-3" />
                <span>{{ resource.pages }} pages</span>
              </div>
            </div>

            <!-- Tags -->
            <div class="flex flex-wrap gap-1">
              <UBadge
                v-for="tag in resource.tags"
                :key="tag"
                size="xs"
                variant="subtle"
              >
                {{ tag }}
              </UBadge>
            </div>

            <!-- Download Button -->
            <UButton
              :to="resource.downloadUrl || resource.url"
              :external="resource.external"
              :target="resource.external ? '_blank' : undefined"
              block
              color="emerald"
              :trailing-icon="resource.external ? 'i-lucide-external-link' : 'i-lucide-download'"
            >
              {{ resource.external ? 'View Resource' : 'Download' }}
            </UButton>

            <!-- Updated Date -->
            <div class="text-xs text-gray-500 text-center">
              Updated {{ resource.date || resource.updatedAt }}
            </div>
          </div>
        </UCard>
      </UPageGrid>

      <!-- Empty State -->
      <div v-if="filteredResources.length === 0" class="text-center py-12">
        <UIcon name="i-lucide-inbox" class="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
          No {{ activeCategory === 'all' ? 'resources' : activeCategory }} found
        </h3>
        <p class="text-gray-500">Check back soon for new downloads!</p>
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
                <UIcon :name="community.icon" class="h-5 w-5 text-purple-600 dark:text-purple-400" />
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
            <UButton to="/contact" color="purple" icon="i-lucide-mail">
              Submit Your Resource
            </UButton>
          </div>
        </UCard>
      </div>
    </UPageSection>

    <!-- FAQ Section -->
    <UPageSection title="Frequently Asked Questions">
      <UAccordion
        :items="[
          {
            label: 'Can I print these resources at home?',
            content: 'Yes! All our resources are designed to be printable on standard home printers. We recommend using high-quality paper for the best results.'
          },
          {
            label: 'Are digital versions available?',
            content: 'Absolutely. All resources are provided as PDF files that you can view on any device or print as needed.'
          },
          {
            label: 'Can I share these resources with friends?',
            content: 'We encourage sharing our games with friends! Feel free to share the resources, but please don\'t distribute them commercially without permission.'
          },
          {
            label: 'How often are resources updated?',
            content: 'We update our resources with errata and clarifications. Check back regularly or follow our announcements for updates.'
          }
        ]"
      />
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
                <UIcon :name="guide.icon" class="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div class="flex-1 space-y-3">
                <div>
                  <h3 class="font-semibold text-lg">{{ guide.title }}</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ guide.description }}</p>
                </div>
                <UButton
                  :to="guide.url"
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
// Fetch resources from content collection
const { data: resources } = await useAsyncData('resources', () =>
  queryCollection('resources').where('published', '=', true).order('date', 'DESC').all()
)

const resourcesValue = computed(() => resources.value || [])

// Category tabs
const activeCategory = ref('all')
const categoryTabs = [
  { label: 'All Resources', value: 'all' },
  { label: 'Manuals', value: 'manual' },
  { label: 'Character Sheets', value: 'character-sheets' },
  { label: 'Reference Guides', value: 'reference' },
  { label: 'Maps & Assets', value: 'maps' },
  { label: 'Templates', value: 'templates' },
  { label: 'Tools', value: 'tools' }
]

// Filter resources by category
const filteredResources = computed(() => {
  if (activeCategory.value === 'all') return resourcesValue.value
  return resourcesValue.value.filter((r) => r.category === activeCategory.value)
})

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

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    'manual': 'blue',
    'character-sheets': 'blue',
    'reference': 'purple',
    'maps': 'green',
    'templates': 'orange',
    'tools': 'pink'
  }
  return colors[category] || 'gray'
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

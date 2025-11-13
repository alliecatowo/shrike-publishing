<template>
  <ContentRenderer v-if="page" :value="page" :data="dynamicData" />
</template>

<script setup lang="ts">
// Query the home collection for MDC content
const { data: page } = await useAsyncData('home-page', () =>
  queryCollection('home').first()
)

// Helper function to build collection query from frontmatter config
function buildCollectionQuery(collectionName: string, config: any) {
  let query = queryCollection(collectionName)

  // Apply filters from config
  if (config?.featured !== undefined) {
    query = query.where('featured', '=', config.featured)
  }
  if (config?.published !== undefined) {
    query = query.where('published', '=', config.published)
  }
  if (config?.tags && Array.isArray(config.tags) && config.tags.length > 0) {
    // Filter by tags if specified
    query = query.where('tags', 'contains-any', config.tags)
  }

  // Apply ordering
  if (config?.order) {
    query = query.order(config.order, config?.direction || 'DESC')
  }

  // Apply limit
  if (config?.limit) {
    query = query.limit(config.limit)
  }

  return query.all()
}

// Fetch dynamic content collections using frontmatter config
const collectionConfig = computed(() => page.value?.collections || {})

const { data: games } = await useAsyncData('home-games', () => {
  const config = page.value?.collections?.games || {
    featured: true,
    published: true,
    limit: 3,
    order: 'date',
    direction: 'DESC'
  }
  return buildCollectionQuery('games', config)
})

const { data: posts } = await useAsyncData('home-blog', () => {
  const config = page.value?.collections?.blog || {
    featured: true,
    published: true,
    limit: 3,
    order: 'date',
    direction: 'DESC'
  }
  return buildCollectionQuery('blog', config)
})

const { data: announcements } = await useAsyncData('home-announcements', () => {
  const config = page.value?.collections?.announcements || {
    featured: true,
    published: true,
    limit: 3,
    order: 'date',
    direction: 'DESC'
  }
  return buildCollectionQuery('announcements', config)
})

const { data: stories } = await useAsyncData('home-stories', () => {
  const config = page.value?.collections?.stories || {
    featured: true,
    published: true,
    limit: 3,
    order: 'date',
    direction: 'DESC'
  }
  return buildCollectionQuery('stories', config)
})

// Prepare data for the template
const featuredGames = computed(() => games.value || [])
const featuredStories = computed(() => stories.value || [])
const latestPosts = computed(() => posts.value || [])
const latestAnnouncements = computed(() => announcements.value || [])
const testimonials = computed(() => page.value?.testimonials || [])

// Provide data to prose components via inject/provide
provide('featuredGames', featuredGames)
provide('featuredStories', featuredStories)
provide('latestPosts', latestPosts)
provide('latestAnnouncements', latestAnnouncements)
provide('testimonials', testimonials)

// Prepare dynamic data to pass to ContentRenderer
const dynamicData = computed(() => ({
  featuredGames: featuredGames.value,
  featuredStories: featuredStories.value,
  latestPosts: latestPosts.value,
  latestAnnouncements: latestAnnouncements.value,
  testimonials: testimonials.value
}))

// SEO configuration
useSeoMeta({
  title: page.value?.title,
  description: page.value?.description
})
</script>

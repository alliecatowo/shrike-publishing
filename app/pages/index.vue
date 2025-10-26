<template>
  <ContentRenderer v-if="page" :value="page" :data="dynamicData" />
</template>

<script setup lang="ts">
// Query the home collection for MDC content
const { data: page } = await useAsyncData('home-page', () =>
  queryCollection('home').first()
)

// Fetch dynamic content collections
const { data: games } = await useAsyncData('home-games', () =>
  queryCollection('games')
    .where('featured', '=', true)
    .where('published', '=', true)
    .order('date', 'DESC')
    .limit(3)
    .all()
)

const { data: posts } = await useAsyncData('home-blog', () =>
  queryCollection('blog')
    .where('featured', '=', true)
    .where('published', '=', true)
    .order('date', 'DESC')
    .limit(3)
    .all()
)

const { data: announcements } = await useAsyncData('home-announcements', () =>
  queryCollection('announcements')
    .where('featured', '=', true)
    .where('published', '=', true)
    .order('date', 'DESC')
    .limit(3)
    .all()
)

const { data: stories } = await useAsyncData('home-stories', () =>
  queryCollection('stories')
    .where('featured', '=', true)
    .where('published', '=', true)
    .order('date', 'DESC')
    .limit(3)
    .all()
)

// Prepare data for the template
const featuredGames = computed(() => games.value || [])
const featuredStories = computed(() => stories.value || [])
const latestPosts = computed(() => posts.value || [])
const latestAnnouncements = computed(() => announcements.value || [])

// Provide data to prose components via inject/provide
provide('featuredGames', featuredGames)
provide('featuredStories', featuredStories)
provide('latestPosts', latestPosts)
provide('latestAnnouncements', latestAnnouncements)

// Prepare dynamic data to pass to ContentRenderer
const dynamicData = computed(() => ({
  featuredGames: featuredGames.value,
  featuredStories: featuredStories.value,
  latestPosts: latestPosts.value,
  latestAnnouncements: latestAnnouncements.value
}))

// SEO configuration
useSeoMeta({
  title: 'Shrike Publishing - Independent Tabletop Games',
  description: 'Discover innovative tabletop games from Shrike Publishing. From cyberpunk adventures to strategic card games, we create immersive worlds and unforgettable stories.',
  keywords: 'tabletop games, board games, card games, RPG, cyberpunk, indie publisher'
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <div class="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/10 py-24">
      <UContainer class="text-center">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-5xl md:text-6xl font-bold mb-6">
            <span class="shrike-text-gradient">Shrike Publishing</span>
          </h1>
          <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Baltimore-based storytelling studio creating tabletop games and literature. Our output focuses on telling stories of action and characters across tabletop games, written fiction, and other media!
          </p>
          <UButton
            to="/games"
            size="lg"
          >
            <Icon name="lucide:box" class="h-5 w-5 mr-2" />
            Explore Our Games
          </UButton>
        </div>
      </UContainer>
    </div>

    <!-- Featured Games -->
    <UPageSection
      title="Featured Games"
      description="Discover our latest tabletop adventures"
      :ui="{ container: 'text-center' }"
    >

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <NuxtLink
            v-for="game in featuredGames"
            :key="game.slug"
            :to="`/games/${game.slug}`"
            class="block"
          >
            <UCard class="game-card">
            <template #header>
              <div class="aspect-video bg-gray-200 dark:bg-gray-800 rounded-t-lg flex items-center justify-center">
                <Icon name="lucide:box" class="h-12 w-12 text-gray-400" />
              </div>
            </template>

            <div class="p-6">
              <h3 class="text-xl font-semibold mb-2">{{ game.title }}</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">{{ game.description }}</p>
              <div class="flex items-center justify-between">
                <span class="text-lg font-bold text-primary">${{ game.price }}</span>
                <UButton size="sm" variant="outline">Learn More</UButton>
              </div>
            </div>
            </UCard>
          </NuxtLink>
        </div>

      <div class="text-center">
        <UButton to="/games" variant="outline">
          View All Games
        </UButton>
      </div>
    </UPageSection>

    <!-- Latest Blog Posts & Announcements -->
    <UContainer>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Latest Blog Posts -->
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold">Latest from the Blog</h2>
            <UButton to="/blog" variant="ghost" size="sm">
              View All
            </UButton>
          </div>

          <div class="space-y-4">
            <NuxtLink
              v-for="post in latestPosts"
              :key="post.slug"
              :to="`/blog/${post.slug}`"
              class="block"
            >
              <UCard class="game-card">
              <div class="flex space-x-4">
                <div class="w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-lg flex-shrink-0 flex items-center justify-center">
                  <Icon name="lucide:file-text" class="h-6 w-6 text-gray-400" />
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="font-semibold text-sm line-clamp-2">{{ post.title }}</h3>
                  <p class="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{{ post.description }}</p>
                  <p class="text-xs text-gray-500 mt-2">{{ formatDate(post.date) }}</p>
                </div>
              </div>
              </UCard>
            </NuxtLink>
          </div>
        </div>

        <!-- Latest Announcements -->
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold">Announcements</h2>
            <UButton to="/announcements" variant="ghost" size="sm">
              View All
            </UButton>
          </div>

          <div class="space-y-4">
            <NuxtLink
              v-for="announcement in latestAnnouncements"
              :key="announcement.slug"
              :to="`/announcements/${announcement.slug}`"
              class="block"
            >
              <UCard class="game-card">
              <div class="flex space-x-4">
                <div class="w-16 h-16 bg-primary/10 rounded-lg flex-shrink-0 flex items-center justify-center">
                  <Icon name="lucide:megaphone" class="h-6 w-6 text-primary" />
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="font-semibold text-sm line-clamp-2">{{ announcement.title }}</h3>
                  <p class="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{{ announcement.description }}</p>
                  <p class="text-xs text-gray-500 mt-2">{{ formatDate(announcement.date) }}</p>
                </div>
              </div>
              </UCard>
            </NuxtLink>
          </div>
        </div>
      </div>
    </UContainer>

    <!-- Call to Action -->
    <UContainer>
      <UPageHero
        title="Join Our Community"
        description="Stay updated with our latest releases, behind-the-scenes content, and exclusive offers."
        orientation="horizontal"
        :ui="{ container: 'max-w-4xl' }"
      >
        <div class="flex gap-4 justify-center">
          <UButton
            to="/contact"
            size="lg"
          >
            <Icon name="lucide:users" class="h-5 w-5 mr-2" />
            Follow Us
          </UButton>
          <UButton
            to="/stories"
            size="lg"
            variant="outline"
          >
            <Icon name="lucide:book-open" class="h-5 w-5 mr-2" />
            Read Stories
          </UButton>
        </div>
      </UPageHero>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
// Fetch featured games
const { data: games } = await useAsyncData('games', () =>
  queryCollection('games').order('date', 'DESC').all()
)
const featuredGames = computed(() => games.value?.slice(0, 2) || [])

// Fetch latest blog posts
const { data: posts } = await useAsyncData('blog', () =>
  queryCollection('blog').where('published', '=', true).order('date', 'DESC').all()
)
const latestPosts = computed(() => posts.value?.slice(0, 3) || [])

// Fetch latest announcements
const { data: announcements } = await useAsyncData('announcements', () =>
  queryCollection('announcements').where('published', '=', true).order('date', 'DESC').all()
)
const latestAnnouncements = computed(() => announcements.value?.slice(0, 3) || [])

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// SEO
useSeoMeta({
  title: 'Shrike Publishing',
  description: 'Shrike Tabletop makes Tabletop roleplaying games (RPGs) about combat and cooperation. Our games Era of Silence and Blood Neon are love letters to traditional game design!',
  keywords: 'tabletop games, board games, card games, literature, publishing, Era of Silence, Blood Neon, TTRPG'
})
</script>

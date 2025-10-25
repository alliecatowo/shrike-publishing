<template>
  <div>
    <!-- Render home.md content with ContentRenderer -->
    <ContentRenderer v-if="page" :value="page" :data="dynamicData" />

    <!-- Featured Games Section (Dynamic) -->
    <UPageSection
      v-if="featuredGames.length"
      title="Featured Games"
      description="Discover our latest tabletop adventures"
      class="py-4"
    >
      <UPageGrid :cols="{ default: 1, md: 2, lg: 3 }" class="gap-6">
        <UCard
          v-for="game in featuredGames"
          :key="game.slug"
          :to="`/games/${game.slug}`"
          variant="subtle"
          class="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
        >
          <template #header>
            <NuxtImg
              v-if="game.coverImage || game.image"
              :src="game.coverImage || game.image"
              :alt="game.title"
              class="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </template>

          <div class="space-y-2">
            <h3 class="text-xl font-bold text-highlighted group-hover:text-primary transition-colors">
              {{ game.title }}
            </h3>
            <p class="text-muted leading-relaxed">
              {{ game.description }}
            </p>
          </div>

          <template #footer>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <UBadge variant="soft" color="success" size="sm">
                  ${{ game.price }}
                </UBadge>
                <span class="text-sm text-muted">Available</span>
              </div>
              <UButton
                size="sm"
                variant="soft"
                color="primary"
                trailing-icon="i-lucide-arrow-right"
                :to="`/games/${game.slug}`"
              >
                Learn More
              </UButton>
            </div>
          </template>
        </UCard>
      </UPageGrid>

      <div class="text-center mt-8">
        <UButton
          to="/games"
          variant="outline"
          size="lg"
          trailing-icon="i-lucide-arrow-right"
          class="hover:scale-105 transition-transform duration-300"
        >
          View All Games
        </UButton>
      </div>
    </UPageSection>

    <!-- Latest Updates Section (Blog Posts & Announcements) -->
    <UPageSection
      v-if="latestPosts.length || latestAnnouncements.length"
      title="Latest Updates"
      description="Stay current with our blog posts and announcements"
      class="py-4"
    >
      <UPageGrid :cols="{ default: 1, lg: 2 }" class="gap-6">
        <!-- Latest Blog Posts -->
        <UPageCard
          v-if="latestPosts.length"
          variant="subtle"
          class="hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold">
                Latest from the Blog
              </h3>
              <UButton
                to="/blog"
                variant="ghost"
                size="sm"
                trailing-icon="i-lucide-arrow-right"
                class="hover:scale-105 transition-transform duration-300"
              >
                View All
              </UButton>
            </div>
          </template>

          <template #body>
            <div class="space-y-3">
              <UBlogPost
                v-for="post in latestPosts"
                :key="post.slug"
                :to="`/blog/${post.slug}`"
                :title="post.title"
                :description="post.description"
                :date="post.date"
                orientation="vertical"
                variant="subtle"
                class="hover:bg-primary/5 transition-colors duration-300 rounded-lg p-2 -m-2"
              />
            </div>
          </template>
        </UPageCard>

        <!-- Latest Announcements -->
        <UPageCard
          v-if="latestAnnouncements.length"
          variant="subtle"
          class="hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold">
                Announcements
              </h3>
              <UButton
                to="/announcements"
                variant="ghost"
                size="sm"
                trailing-icon="i-lucide-arrow-right"
                class="hover:scale-105 transition-transform duration-300"
              >
                View All
              </UButton>
            </div>
          </template>

          <template #body>
            <div class="space-y-3">
              <UBlogPost
                v-for="announcement in latestAnnouncements"
                :key="announcement.slug"
                :to="`/announcements/${announcement.slug}`"
                :title="announcement.title"
                :description="announcement.description"
                :date="announcement.date"
                :badge="{ label: 'Announcement', color: 'warning', variant: 'subtle' }"
                orientation="vertical"
                variant="subtle"
                class="hover:bg-secondary/5 transition-colors duration-300 rounded-lg p-2 -m-2"
              />
            </div>
          </template>
        </UPageCard>
      </UPageGrid>
    </UPageSection>

    <!-- Featured Stories Section -->
    <UPageSection
      v-if="featuredStories.length"
      title="Featured Stories"
      description="Read our latest published works"
      class="py-4"
    >
      <UPageGrid :cols="{ default: 1, md: 2, lg: 3 }" class="gap-6">
        <div
          v-for="story in featuredStories"
          :key="story.slug"
          class="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <UBlogPost
            :to="`/stories/${story.slug}`"
            :title="story.title"
            :description="story.description"
            :date="story.date"
            :image="story.image || story.thumbnail"
            orientation="vertical"
            variant="subtle"
            class="h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          />
        </div>
      </UPageGrid>
    </UPageSection>
  </div>
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

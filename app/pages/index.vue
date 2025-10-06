<template>
  <div>
    <!-- Hero Section -->
    <UPageHero
      :title="components?.hero?.title || 'Welcome to Shrike Publishing'"
      :description="components?.hero?.subtitle || 'Independent tabletop game publisher creating immersive worlds and unforgettable stories.'"
      :links="components?.hero?.cta ? [{
        label: components.hero.cta.text,
        to: components.hero.cta.to,
        variant: components.hero.cta.variant || 'primary',
        ...(components.hero.cta.icon && { trailingIcon: components.hero.cta.icon })
      }] : []"
      class="bg-gradient-to-br from-primary/15 via-neutral-900/20 to-secondary/10 dark:from-primary/25 dark:via-neutral-900/30 dark:to-secondary/20"
    >
      <div class="absolute inset-0 bg-gradient-to-r from-primary/15 to-transparent pointer-events-none" />
    </UPageHero>

    <ScrollDown />

    <!-- Featured Games -->
    <UPageSection
      :title="pageContent?.home?.featuredGames?.title || 'Featured Games'"
      :description="pageContent?.home?.featuredGames?.description || 'Discover our latest tabletop adventures'"
    >
      <UPageGrid :cols="{ default: 1, md: 2 }" class="gap-8">
        <UCard
          v-for="game in featuredGames"
          :key="game.slug"
          :to="`/games/${game.slug}`"
          variant="outline"
          class="group hover:shadow-xl transition-all duration-300 hover:border-primary/30 hover:-translate-y-1"
        >
          <template #header>
            <NuxtImg
              :src="game.coverImage || game.image"
              :alt="game.title"
              class="w-full h-48 object-cover rounded-t-lg"
              loading="lazy"
            />
          </template>

          <div class="space-y-2">
            <h3 class="text-xl font-bold text-highlighted group-hover:text-primary transition-colors">{{ game.title }}</h3>
            <p class="text-muted leading-relaxed">{{ game.description }}</p>
          </div>

          <template #footer>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <UBadge variant="soft" color="success" size="sm">
                  ${{ game.price }}
                </UBadge>
                <span class="text-sm text-muted">Available</span>
              </div>
              <UButton size="sm" variant="soft" color="primary" trailing-icon="i-lucide-arrow-right" :to="`/games/${game.slug}`">
                Learn More
              </UButton>
            </div>
          </template>
        </UCard>
      </UPageGrid>

      <div class="text-center mt-12">
        <UButton to="/games" variant="outline" size="lg" trailing-icon="i-lucide-arrow-right">
          {{ pageContent?.home?.featuredGames?.viewAllText || 'View All Games' }}
        </UButton>
      </div>
    </UPageSection>

    <!-- Stats & Highlights -->
    <UPageSection
      title="Our Impact"
      description="Join thousands of players in immersive storytelling adventures"
    >
      <UPageGrid :cols="{ default: 1, sm: 2, lg: 4 }" class="gap-6">
        <UPageCard
          title="50K+"
          description="Stories Created"
          variant="soft"
          :spotlight="true"
          spotlight-color="primary"
          class="text-center group"
        >
          <template #header>
            <div class="flex justify-center mb-4">
              <div class="relative">
                <div class="absolute inset-0 blur-lg bg-primary/20 rounded-full group-hover:bg-primary/30 transition-colors" />
                <div class="relative w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                  <UIcon name="i-lucide-book-open" class="h-6 w-6 text-primary" />
                </div>
              </div>
            </div>
          </template>
        </UPageCard>

        <UPageCard
          title="12K+"
          description="Active Players"
          variant="soft"
          :spotlight="true"
          spotlight-color="secondary"
          class="text-center group"
        >
          <template #header>
            <div class="flex justify-center mb-4">
              <div class="relative">
                <div class="absolute inset-0 blur-lg bg-secondary/20 rounded-full group-hover:bg-secondary/30 transition-colors" />
                <div class="relative w-12 h-12 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-full flex items-center justify-center">
                  <UIcon name="i-lucide-users" class="h-6 w-6 text-secondary" />
                </div>
              </div>
            </div>
          </template>
        </UPageCard>

        <UPageCard
          title="8"
          description="Published Games"
          variant="soft"
          :spotlight="true"
          spotlight-color="success"
          class="text-center group"
        >
          <template #header>
            <div class="flex justify-center mb-4">
              <div class="relative">
                <div class="absolute inset-0 blur-lg bg-success/20 rounded-full group-hover:bg-success/30 transition-colors" />
                <div class="relative w-12 h-12 bg-gradient-to-br from-success/20 to-success/10 rounded-full flex items-center justify-center">
                  <UIcon name="i-lucide-gamepad-2" class="h-6 w-6 text-success" />
                </div>
              </div>
            </div>
          </template>
        </UPageCard>

        <UPageCard
          title="4.9★"
          description="Average Rating"
          variant="soft"
          :spotlight="true"
          spotlight-color="warning"
          class="text-center group"
        >
          <template #header>
            <div class="flex justify-center mb-4">
              <div class="relative">
                <div class="absolute inset-0 blur-lg bg-warning/20 rounded-full group-hover:bg-warning/30 transition-colors" />
                <div class="relative w-12 h-12 bg-gradient-to-br from-warning/20 to-warning/10 rounded-full flex items-center justify-center">
                  <UIcon name="i-lucide-star" class="h-6 w-6 text-warning" />
                </div>
              </div>
            </div>
          </template>
        </UPageCard>
      </UPageGrid>
    </UPageSection>

    <!-- Testimonials -->
    <UPageSection
      title="What Players Say"
      description="Don't just take our word for it - hear from our community"
    >
      <UPageGrid :cols="{ default: 1, md: 2, lg: 3 }" class="gap-6">
        <UPageCard
          title="Absolutely incredible storytelling"
          description="Era of Silence completely changed how I think about tabletop RPGs. The world-building is phenomenal and every session leaves me wanting more."
          variant="soft"
          orientation="vertical"
          class="text-center max-w-md mx-auto"
        >
          <template #leading>
            <div class="flex justify-center">
              <UAvatar
                text="SJ"
                alt="Sarah Johnson"
                size="lg"
              />
            </div>
          </template>
          <template #footer>
            <div class="text-sm text-muted">Sarah Johnson - Game Master</div>
          </template>
        </UPageCard>

        <UPageCard
          title="Best investment in gaming"
          description="Blood Neon has become our weekly ritual. The mechanics are innovative and the story keeps us engaged for hours."
          variant="soft"
          orientation="vertical"
          class="text-center max-w-md mx-auto"
        >
          <template #leading>
            <div class="flex justify-center">
              <UAvatar
                text="MC"
                alt="Mike Chen"
                size="lg"
              />
            </div>
          </template>
          <template #footer>
            <div class="text-sm text-muted">Mike Chen - Player</div>
          </template>
        </UPageCard>

        <UPageCard
          title="Professional quality"
          description="The production value and attention to detail in these games rivals anything from major publishers. Truly impressive work."
          variant="soft"
          orientation="vertical"
          class="text-center max-w-md mx-auto"
        >
          <template #leading>
            <div class="flex justify-center">
              <UAvatar
                text="AR"
                alt="Alex Rivera"
                size="lg"
              />
            </div>
          </template>
          <template #footer>
            <div class="text-sm text-muted">Alex Rivera - Content Creator</div>
          </template>
        </UPageCard>
      </UPageGrid>
    </UPageSection>

    <!-- Newsletter Signup -->
    <UPageSection
      title="Stay Updated"
      description="Get the latest news, exclusive content, and early access to new releases"
    >
      <NewsletterCTA />
    </UPageSection>

    <!-- Recent Releases Timeline -->
    <UPageSection
      title="Recent Releases"
      description="Check out our latest games and updates"
    >
      <UTimeline
        :items="recentReleases"
        orientation="vertical"
      />
    </UPageSection>

    <!-- Featured Stories -->
    <UPageSection
      title="Featured Stories"
      description="Read our latest published works"
    >
      <UPageGrid :cols="{ default: 1, md: 2, lg: 3 }" class="gap-6">
        <UBlogPost
          v-for="story in featuredStories"
          :key="story.slug"
          :to="`/stories/${story.slug}`"
          :title="story.title"
          :description="story.description"
          :date="story.date"
          :image="story.image || story.thumbnail"
          orientation="vertical"
          variant="outline"
        />
      </UPageGrid>
    </UPageSection>

    <!-- Latest Blog Posts & Announcements -->
    <UPageSection
      title="Latest Updates"
      description="Stay current with our blog posts and announcements"
    >
      <UPageGrid :cols="{ default: 1, lg: 2 }" class="gap-6">
        <!-- Blog Posts Card -->
        <UPageCard variant="soft">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold">Latest from the Blog</h3>
              <UButton to="/blog" variant="ghost" size="sm" trailing-icon="i-lucide-arrow-right">
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
                :authors="post.authors"
                orientation="vertical"
                variant="subtle"
              />
            </div>
          </template>
        </UPageCard>

        <!-- Announcements Card -->
        <UPageCard variant="soft">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold">Announcements</h3>
              <UButton to="/announcements" variant="ghost" size="sm" trailing-icon="i-lucide-arrow-right">
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
                :authors="announcement.authors"
                :badge="{ label: 'Announcement', color: 'warning', variant: 'subtle' }"
                orientation="vertical"
                variant="subtle"
              />
            </div>
          </template>
        </UPageCard>
      </UPageGrid>
    </UPageSection>

    <!-- Call to Action -->
    <UPageCTA
      :title="pageContent?.home?.community?.title || 'Join Our Community'"
      :description="pageContent?.home?.community?.description || 'Stay updated with our latest releases, behind-the-scenes content, and exclusive offers.'"
      :links="[
        {
          label: pageContent?.home?.community?.primaryCta?.text || 'Follow Us',
          to: pageContent?.home?.community?.primaryCta?.to || '/contact',
          leadingIcon: 'i-lucide-users'
        },
        {
          label: pageContent?.home?.community?.secondaryCta?.text || 'Read Stories',
          to: pageContent?.home?.community?.secondaryCta?.to || '/stories',
          variant: 'outline',
          leadingIcon: 'i-lucide-book-open'
        }
      ]"
    />
  </div>
</template>

<script setup lang="ts">
// Composables for content management
const pageContent = await usePageContent('home')
const components = await useComponents()

// Fetch content collections with optimized queries
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

// Computed values for clean template usage
const featuredGames = computed(() => games.value || [])
const featuredStories = computed(() => stories.value || [])
const latestPosts = computed(() => (posts.value || []).map(post => ({
  ...post,
  authors: post.authors || []
})));

interface Author {
  name: string
  avatar?: {
    src: string
  }
}

interface AnnouncementView {
  slug: string
  title: string
  description?: string
  date: string
  authors?: Author[]
  tags?: string[]
}

interface AnnouncementRaw {
  slug: string
  title: string
  description?: string
  date: string
  authors?: Author[]
  tags?: string[]
}

// Recent releases data
const recentReleases = [
  {
    date: 'Dec 2024',
    title: 'The Silent Observer',
    description: 'New cyberpunk short story published on our stories page.',
    icon: 'i-lucide-book-open',
    to: '/stories/the-last-whisper'
  },
  {
    date: 'Nov 2024',
    title: 'Era of Silence - Quick Reference Guide',
    description: 'Updated quick reference guide with clarifications and new content.',
    icon: 'i-lucide-file-text',
    to: '/resources/era-of-silence-quick-reference'
  },
  {
    date: 'Oct 2024',
    title: 'Blood Neon Expansion',
    description: 'Corporate Shadows expansion released with new mechanics and story content.',
    icon: 'i-lucide-gamepad-2',
    to: '/announcements/blood-neon-expansion'
  },
  {
    date: 'Sep 2024',
    title: 'Community Newsletter Launch',
    description: 'Monthly newsletter featuring behind-the-scenes content and player spotlights.',
    icon: 'i-lucide-mail'
  }
]

const latestAnnouncements = computed<AnnouncementView[]>(() => {
  const items = announcements.value || []
  return items.map((a: AnnouncementRaw) => ({
    slug: a.slug,
    title: a.title,
    description: a.description,
    date: a.date,
    authors: a.authors || [{ name: 'Shrike Team', avatar: { src: '/ShrikeLogoNov2021.png' } }],
    tags: a.tags ?? []
  }))
})

// SEO configuration
useSeoMeta({
  title: pageContent.value?.home?.meta?.title || 'Shrike Publishing - Independent Tabletop Games',
  description: pageContent.value?.home?.meta?.description || 'Discover innovative tabletop games from Shrike Publishing. From cyberpunk adventures to strategic card games, we create immersive worlds and unforgettable stories.',
  keywords: pageContent.value?.home?.meta?.keywords || 'tabletop games, board games, card games, RPG, cyberpunk, indie publisher'
})
</script>

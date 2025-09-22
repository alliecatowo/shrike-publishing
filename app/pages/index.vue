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
      class="bg-gradient-to-br from-primary/15 via-neutral-900/20 to-tertiary/10 dark:from-primary/25 dark:via-neutral-900/30 dark:to-tertiary/20"
    >
      <div class="absolute inset-0 bg-gradient-to-r from-primary/15 to-transparent pointer-events-none" />
    </UPageHero>

    <!-- Featured Games -->
    <UPageSection
      :title="pageContent?.home?.featuredGames?.title || 'Featured Games'"
      :description="pageContent?.home?.featuredGames?.description || 'Discover our latest tabletop adventures'"
      :ui="{ container: 'text-center' }"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <UCard
          v-for="game in featuredGames"
          :key="game.slug"
          :to="`/games/${game.slug}`"
          variant="outline"
          class="group hover:shadow-xl transition-all duration-300 hover:border-primary/30 hover:-translate-y-1"
        >
          <template #header>
            <NuxtImg
              :src="game.image"
              :alt="game.title"
              class="w-full h-48 object-cover rounded-t-lg"
              loading="lazy"
            />
          </template>

          <div class="space-y-4">
            <div class="space-y-2">
              <h3 class="text-xl font-bold text-highlighted group-hover:text-primary transition-colors">{{ game.title }}</h3>
              <p class="text-muted leading-relaxed">{{ game.description }}</p>
            </div>
            <div class="flex items-center justify-between pt-2">
              <div class="flex items-center gap-2">
                <UBadge variant="soft" color="success" size="sm">
                  ${{ game.price }}
                </UBadge>
                <span class="text-sm text-muted">Available</span>
              </div>
              <UButton size="sm" variant="soft" color="primary" trailing-icon="i-lucide-arrow-right">
                Learn More
              </UButton>
            </div>
          </div>
        </UCard>
      </div>

      <div class="text-center mt-12">
        <UButton to="/games" variant="outline" size="lg" trailing-icon="i-lucide-arrow-right">
          {{ pageContent?.home?.featuredGames?.viewAllText || 'View All Games' }}
        </UButton>
      </div>
    </UPageSection>

    <!-- Latest Blog Posts & Announcements -->
    <UContainer>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Latest Blog Posts -->
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold text-highlighted">{{ pageContent?.home?.latestBlog?.title || 'Latest from the Blog' }}</h2>
            <UButton to="/blog" variant="outline" size="sm" trailing-icon="i-lucide-arrow-right">
              {{ pageContent?.home?.latestBlog?.viewAllText || 'View All' }}
            </UButton>
          </div>

          <div class="space-y-4" :class="'group/card'">
            <UCard
              v-for="post in latestPosts"
              :key="post.slug"
              :to="`/blog/${post.slug}`"
              variant="outline"
              class="group hover:shadow-md transition-all duration-200 hover:border-primary/20"
            >
              <div class="flex gap-4">
                <div class="flex-shrink-0">
                  <div class="size-14 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center group-hover:from-primary/20 group-hover:to-secondary/20 transition-colors">
                    <UIcon name="i-lucide-file-text" class="size-6 text-primary" />
                  </div>
                </div>
                <div class="flex-1 min-w-0 space-y-3">
                  <div class="flex items-center gap-2">
                    <UBadge variant="soft" size="sm" color="primary">{{ post.author || 'Author' }}</UBadge>
                    <span class="text-sm text-muted">{{ formatDate(post.date) }}</span>
                  </div>
                  <h3 class="font-semibold text-lg line-clamp-2 text-highlighted group-hover:text-primary transition-colors">{{ post.title }}</h3>
                  <p class="text-muted text-sm line-clamp-2 leading-relaxed">{{ post.description }}</p>
                  <div class="flex items-center justify-between">
                    <div class="flex flex-wrap gap-1">
                      <UBadge
                        v-for="tag in post.tags?.slice(0, 2)"
                        :key="tag"
                        size="sm"
                        variant="subtle"
                        color="neutral"
                      >
                        {{ tag }}
                      </UBadge>
                    </div>
                    <UButton size="sm" variant="ghost" color="primary" trailing-icon="i-lucide-arrow-right">
                      Read More
                    </UButton>
                  </div>
                </div>
              </div>
            </UCard>
          </div>
        </div>

        <!-- Latest Announcements -->
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold text-highlighted">{{ pageContent?.home?.latestAnnouncements?.title || 'Announcements' }}</h2>
            <UButton to="/announcements" variant="outline" size="sm" trailing-icon="i-lucide-arrow-right">
              {{ pageContent?.home?.latestAnnouncements?.viewAllText || 'View All' }}
            </UButton>
          </div>

          <div class="space-y-4">
            <UCard
              v-for="announcement in latestAnnouncements"
              :key="announcement.slug"
              :to="`/announcements/${announcement.slug}`"
              variant="outline"
              class="group hover:shadow-md transition-all duration-200 hover:border-warning/20"
            >
              <div class="flex gap-4">
                <div class="flex-shrink-0">
                  <div class="size-14 bg-gradient-to-br from-warning/10 to-info/10 rounded-lg flex items-center justify-center group-hover:from-warning/20 group-hover:to-info/20 transition-colors">
                    <UIcon name="i-lucide-megaphone" class="size-6 text-warning" />
                  </div>
                </div>
                <div class="flex-1 min-w-0 space-y-3">
                  <div class="flex items-center gap-2">
                    <UBadge variant="soft" size="sm" color="warning">{{ announcement.author || 'Shrike Team' }}</UBadge>
                    <span class="text-sm text-muted">{{ formatDate(announcement.date) }}</span>
                  </div>
                  <h3 class="font-semibold text-lg line-clamp-2 text-highlighted group-hover:text-primary transition-colors">{{ announcement.title }}</h3>
                  <p class="text-muted text-sm line-clamp-2 leading-relaxed">{{ announcement.description }}</p>
                  <div class="flex items-center justify-between">
                    <div class="flex flex-wrap gap-1">
                      <UBadge
                        v-for="tag in announcement.tags?.slice(0, 2)"
                        :key="tag"
                        size="sm"
                        variant="subtle"
                        color="neutral"
                      >
                        {{ tag }}
                      </UBadge>
                    </div>
                    <UButton size="sm" variant="ghost" color="primary" trailing-icon="i-lucide-arrow-right">
                      Read More
                    </UButton>
                  </div>
                </div>
              </div>
            </UCard>
          </div>
        </div>
      </div>
    </UContainer>

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
  queryCollection('games').order('date', 'DESC').limit(2).all()
)

const { data: posts } = await useAsyncData('home-blog', () =>
  queryCollection('blog')
    .where('published', '=', true)
    .order('date', 'DESC')
    .limit(3)
    .all()
)

const { data: announcements } = await useAsyncData('home-announcements', () =>
  queryCollection('announcements')
    .where('published', '=', true)
    .order('date', 'DESC')
    .limit(3)
    .all()
)

// Computed values for clean template usage
const featuredGames = computed(() => games.value || [])
const latestPosts = computed(() => posts.value || [])
interface AnnouncementView {
  slug: string
  title: string
  description?: string
  date: string
  author?: string
  tags?: string[]
}

const latestAnnouncements = computed<AnnouncementView[]>(() => {
  const items = announcements.value || []
  return items.map((a: any) => ({
    slug: a.slug,
    title: a.title,
    description: a.description,
    date: a.date,
    author: a.author ?? 'Shrike Team',
    tags: a.tags ?? []
  }))
})

// Utility function for consistent date formatting
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// SEO configuration
useSeoMeta({
  title: pageContent.value?.home?.meta?.title || 'Shrike Publishing - Independent Tabletop Games',
  description: pageContent.value?.home?.meta?.description || 'Discover innovative tabletop games from Shrike Publishing. From cyberpunk adventures to strategic card games, we create immersive worlds and unforgettable stories.',
  keywords: pageContent.value?.home?.meta?.keywords || 'tabletop games, board games, card games, RPG, cyberpunk, indie publisher'
})
</script>

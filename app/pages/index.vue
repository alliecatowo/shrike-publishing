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
              :src="game.image"
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
      <UPageGrid :cols="{ default: 1, sm: 2, lg: 4 }">
        <UTooltip text="Total number of stories published.">
          <UPageCard title="50K+" description="Stories Created" variant="outline" class="text-center" />
        </UTooltip>
        <UTooltip text="Estimated number of active players across all our games.">
          <UPageCard title="12K+" description="Active Players" variant="outline" class="text-center" />
        </UTooltip>
        <UTooltip text="Total number of games published.">
          <UPageCard title="8" description="Published Games" variant="outline" class="text-center" />
        </UTooltip>
        <UTooltip text="Average rating from our players.">
          <UPageCard title="4.9★" description="Average Rating" variant="outline" class="text-center" />
        </UTooltip>
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
                src="https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face"
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
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
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
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
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
      <UModal>
        <UButton label="Subscribe to our newsletter" size="xl" />

        <template #content>
          <UCard>
            <div class="space-y-6">
              <div class="space-y-4">
                <h3 class="text-2xl font-bold text-highlighted">Join Our Newsletter</h3>
                <p class="text-muted">
                  Subscribe to receive updates about new games, behind-the-scenes content, and exclusive offers.
                </p>
              </div>

              <UForm :schema="newsletterSchema" :state="newsletterForm" class="space-y-4" @submit="onNewsletterSubmit">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <UFieldGroup label="First Name" name="firstName">
                    <UInput
                      v-model="newsletterForm.firstName"
                      placeholder="Enter your first name"
                      required
                    />
                  </UFieldGroup>
                  <UFieldGroup label="Email" name="email">
                    <UInput
                      v-model="newsletterForm.email"
                      type="email"
                      placeholder="your@email.com"
                      required
                    />
                  </UFieldGroup>
                </div>
                <UButton type="submit" size="lg" :loading="newsletterLoading" class="w-full">
                  Subscribe to Newsletter
                </UButton>
              </UForm>

              <p class="text-sm text-muted">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </UCard>
        </template>
      </UModal>
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
        <UCard variant="outline">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold">Latest from the Blog</h3>
              <UButton to="/blog" variant="ghost" size="sm" trailing-icon="i-lucide-arrow-right">
                View All
              </UButton>
            </div>
          </template>

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
        </UCard>

        <!-- Announcements Card -->
        <UCard variant="outline">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold">Announcements</h3>
              <UButton to="/announcements" variant="ghost" size="sm" trailing-icon="i-lucide-arrow-right">
                View All
              </UButton>
            </div>
          </template>

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
        </UCard>
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

const { data: stories } = await useAsyncData('home-stories', () =>
  queryCollection('stories')
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

// Newsletter form
const newsletterForm = reactive({
  firstName: '',
  email: ''
})

const newsletterLoading = ref(false)

const newsletterSchema = {
  firstName: { type: 'string', required: true, minLength: 2 },
  email: { type: 'string', required: true, format: 'email' }
}

const onNewsletterSubmit = async () => {
  newsletterLoading.value = true
  try {
    // In a real app, you'd send this to your backend
    console.log('Newsletter signup:', newsletterForm)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Reset form
    Object.assign(newsletterForm, {
      firstName: '',
      email: ''
    })

    // Show success message
    alert('Thank you for subscribing! Check your email for confirmation.')
  } catch (error) {
    console.error('Error subscribing to newsletter:', error)
    alert('There was an error subscribing. Please try again.')
  } finally {
    newsletterLoading.value = false
  }
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

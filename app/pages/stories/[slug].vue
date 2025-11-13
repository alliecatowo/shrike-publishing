<template>
  <!-- Story Header -->
  <UPage> 
    <UContainer>
    <UPageHeader
    :title="storyValue.title"
    :description="storyValue.description"
    :badge="{ label: storyValue.type === 'free' ? 'Free Story' : 'Published Work', color: storyValue.type === 'free' ? 'success' : 'primary', variant: 'soft' }"
    >
    <template #subtext>
        <ReadingProgress />
        <div class="flex items-center justify-center space-x-4 text-sm text-gray-500">
          <span>By {{ storyValue.author }}</span>
          <span>•</span>
          <span>{{ storyValue.date }}</span>
          <span v-if="readingTime">•</span>
          <span v-if="readingTime">{{ readingTime }} min read</span>
        </div>
      </template>
      <template #tags>
        <TagList :tags="storyValue.tags" clickable />
      </template>
    </UPageHeader>
    <UPageBody>
      

      <!-- Series Navigation -->
      <UCard v-if="storyValue.series">
        <div class="flex items-center justify-between">
          <UBadge variant="soft" color="primary">
            Part {{ storyValue.seriesOrder }} of {{ storyValue.seriesTotal }} in {{ storyValue.series }}
          </UBadge>

          <div class="flex gap-2">
            <UButton
              v-if="prevStory"
              :to="`/stories/${prevStory.slug}`"
              variant="outline"
              icon="i-lucide-chevron-left"
              size="sm"
            >
              Previous
            </UButton>
            <UButton
              v-if="nextStory"
              :to="`/stories/${nextStory.slug}`"
              variant="outline"
              trailing-icon="i-lucide-chevron-right"
              size="sm"
            >
              Next
            </UButton>
          </div>
        </div>
      </UCard>

      <!-- Story Image -->
      <div>
        <template v-if="storyValue.thumbnail || storyValue.image">
          <NuxtImg
            :src="storyValue.thumbnail || storyValue.image"
            :alt="storyValue.title"
            class="w-full aspect-video object-cover rounded-lg"
            format="webp"
            sizes="(max-width: 768px) 100vw, 1024px"
            :placeholder="true"
          />
        </template>
        <template v-else>
          <div class="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-lg flex items-center justify-center">
            <UIcon name="i-lucide-book-open" class="h-16 w-16 " color="purple" />
          </div>
        </template>
      </div>

      <!-- Story Content -->
      <ContentRenderer :value="storyValue" />

      <!-- Purchase/CTA Section -->
      <UPageCTA
        v-if="storyValue.type === 'published'"
        title="Enjoyed this story?"
        description="This is an excerpt from our published work. Get the full story and support our writing."
        :links="[{ label: 'Purchase Now', to: '/contact', icon: 'i-lucide-shopping-cart' }]"
      />

      <!-- Related Stories -->
      <div class="space-y-6">
        <h2 class="text-2xl font-bold">More Stories</h2>
        <UPageGrid :cols="{ default: 1, md: 2, lg: 3 }" class="gap-6">
          <UBlogPost
            v-for="relatedStory in relatedStories"
            :key="relatedStory.slug"
            :to="`/stories/${relatedStory.slug}`"
            :title="relatedStory.title"
            :description="relatedStory.description"
            :image="relatedStory.thumbnail || relatedStory.image"
            :date="relatedStory.date"
            :authors="[{ name: relatedStory.author }]"
            :badge="{
              label: relatedStory.type === 'free' ? 'Free' : 'Published',
              color: relatedStory.type === 'free' ? 'success' : 'primary',
              variant: 'soft'
            }"
            variant="outline"
          />
        </UPageGrid>
      </div>

      <!-- Back to Stories -->
      <div class="text-center">
        <UButton to="/stories" variant="outline" icon="i-lucide-arrow-left">
          Back to Stories
        </UButton>
      </div>
    </UPageBody>

    <template #right>
        <UContentToc
          v-if="storyValue?.body?.toc?.links?.length"
          :links="storyValue.body.toc.links"
          title="On this page"
        />
    </template>
    </UContainer>
  </UPage>
</template>

<script setup lang="ts">
import TagList from '~/components/TagList.vue'

const route = useRoute()
const slug = route.params.slug as string

// Fetch story content
const { data: story } = await useAsyncData(`story-${slug}`, () =>
  queryCollection('stories').where('slug', '=', slug).first()
)

if (!story.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Story not found'
  })
}

const storyValue = computed(() => story.value!)

// Calculate reading time (average 200 words per minute)
const readingTime = computed(() => {
  if (!storyValue.value?.body) return null
  const text = JSON.stringify(storyValue.value.body)
  const wordCount = text.split(/\s+/).length
  const minutes = Math.ceil(wordCount / 200)
  return minutes
})

// Fetch series navigation stories
const series = storyValue.value.series
const seriesOrder = storyValue.value.seriesOrder
const seriesTotal = storyValue.value.seriesTotal

const { data: prevStory } = await useAsyncData('prev-story', async () => {
  if (!series || !seriesOrder || seriesOrder <= 1) return null
  return await queryCollection('stories')
    .where('series', '=', series)
    .where('seriesOrder', '=', seriesOrder - 1)
    .first()
})

const { data: nextStory } = await useAsyncData('next-story', async () => {
  if (!series || !seriesTotal || !seriesOrder || seriesOrder >= seriesTotal) return null
  return await queryCollection('stories')
    .where('series', '=', series)
    .where('seriesOrder', '=', seriesOrder + 1)
    .first()
})

// Fetch related stories with smart algorithm
const { data: allStories } = await useAsyncData('related-stories', () =>
  queryCollection('stories').where('published', '=', true).all()
)

const relatedStories = computed(() => {
  if (!allStories.value) return []

  const current = storyValue.value

  // Score each story for relevance
  let scored = allStories.value
    .filter((s) => s.slug !== slug) // Exclude current story
    .map((story) => {
      let score = 0

      // Same series = highest priority
      if (current.series && story.series === current.series) {
        score += 100
      }

      // Matching tags
      const commonTags = story.tags?.filter(tag =>
        current.tags?.includes(tag)
      ).length || 0
      score += commonTags * 10

      // Same type (free vs published)
      if (story.type === current.type) {
        score += 5
      }

      // Featured content bonus
      if (story.featured) {
        score += 3
      }

      // Recency bonus (newer stories slightly preferred)
      const daysSincePublish = story.date ?
        (Date.now() - new Date(story.date).getTime()) / (1000 * 60 * 60 * 24) :
        Infinity
      if (daysSincePublish < 30) score += 2
      else if (daysSincePublish < 90) score += 1

      return { ...story, score }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 4) // Get top 4 instead of 2

  return scored
})



// SEO
useSeoMeta({
  title: `${storyValue.value.title} - Stories & Literature - Shrike Publishing`,
  description: storyValue.value.description
})
</script>

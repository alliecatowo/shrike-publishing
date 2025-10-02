<template>
  <UPage>
    <UPageBody>
      <ReadingProgress />

      <!-- Story Header -->
      <UPageHeader
        :title="storyValue.title"
        :description="storyValue.description"
        :badge="{ label: storyValue.type === 'free' ? 'Free Story' : 'Published Work', color: storyValue.type === 'free' ? 'success' : 'primary', variant: 'soft' }"
      >
        <template #subtext>
          <div class="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <span>By {{ storyValue.author }}</span>
            <span>•</span>
            <span>{{ storyValue.date }}</span>
          </div>
        </template>
        <template #tags>
          <TagList :tags="storyValue.tags" clickable />
        </template>
      </UPageHeader>

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
            <UIcon name="i-lucide-book-open" class="h-16 w-16 text-purple-600 dark:text-purple-400" />
          </div>
        </template>
      </div>

      <!-- Story Content -->
      <div class="prose prose-lg dark:prose-invert">
        <ContentRenderer :value="storyValue" />
      </div>

      <!-- Purchase/CTA Section -->
      <UPageCTA
        v-if="storyValue.type === 'published'"
        title="Enjoyed this story?"
        description="This is an excerpt from our published work. Get the full story and support our writing."
        :links="[{ label: 'Purchase Now', to: '/contact', icon: 'i-lucide-shopping-cart' }]"
      />

      <!-- Related Stories -->
      <div class="space-y-4">
        <h2 class="text-xl font-bold">More Stories</h2>
        <UPageGrid :cols="{ default: 1, md: 2 }" class="gap-4">
          <UBlogPost
            v-for="relatedStory in relatedStories"
            :key="relatedStory.slug"
            :to="`/stories/${relatedStory.slug}`"
            :title="relatedStory.title"
            :description="relatedStory.description"
            :badge="{ label: relatedStory.type, color: relatedStory.type === 'free' ? 'success' : 'primary', variant: 'soft' }"
            orientation="horizontal"
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
      <UPageAside>
        <UContentToc :links="storyValue?.body?.toc?.links" title="On this page" />
      </UPageAside>
    </template>
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

// Fetch related stories
const { data: allStories } = await useAsyncData('related-stories', () =>
  queryCollection('stories').where('published', '=', true).order('date', 'DESC').all()
)

const relatedStories = computed(() =>
  allStories.value?.filter((s) => s.slug !== slug).slice(0, 2) || []
)



// SEO
useSeoMeta({
  title: `${storyValue.value.title} - Stories & Literature - Shrike Publishing`,
  description: storyValue.value.description
})
</script>

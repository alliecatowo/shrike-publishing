<template>
  <UContainer class="py-8">
    <div class="max-w-3xl mx-auto space-y-8">
      <!-- Story Header -->
      <div class="text-center space-y-4">
        <UBadge
          :color="storyValue.type === 'free' ? 'success' : 'primary'"
          variant="soft"
          size="lg"
        >
          {{ storyValue.type === 'free' ? 'Free Story' : 'Published Work' }}
        </UBadge>

        <h1 class="text-4xl font-bold">{{ storyValue.title }}</h1>

        <div class="flex items-center justify-center space-x-4 text-sm text-gray-500">
          <span>By {{ storyValue.author }}</span>
          <span>•</span>
          <span>{{ formatDate(storyValue.date) }}</span>
        </div>

        <p class="text-xl text-gray-600 dark:text-gray-400">{{ storyValue.description }}</p>

        <div class="flex flex-wrap gap-2 justify-center">
          <UBadge
            v-for="tag in storyValue.tags"
            :key="tag"
            size="sm"
            variant="soft"
          >
            {{ tag }}
          </UBadge>
        </div>
      </div>

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
            <Icon name="lucide:book-open" class="h-16 w-16 text-purple-600 dark:text-purple-400" />
          </div>
        </template>
      </div>

      <!-- Story Content -->
      <div class="prose prose-lg dark:prose-invert max-w-none">
        <ContentRenderer :value="storyValue" />
      </div>

      <!-- Purchase/CTA Section -->
      <div v-if="storyValue.type === 'published'" class="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center space-y-4">
        <h2 class="text-2xl font-bold">Enjoyed this story?</h2>
        <p class="text-gray-600 dark:text-gray-400">
          This is an excerpt from our published work. Get the full story and support our writing.
        </p>
        <div class="flex items-center justify-center space-x-4">
          <span class="text-2xl font-bold text-primary">${{ storyValue.price }}</span>
          <UButton icon="i-heroicons-shopping-bag" to="/contact">
            Purchase Now
          </UButton>
        </div>
      </div>

      <!-- Related Stories -->
      <div class="space-y-4">
        <h2 class="text-xl font-bold">More Stories</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UCard
            v-for="relatedStory in relatedStories"
            :key="relatedStory.slug"
            :to="`/stories/${relatedStory.slug}`"
            class="hover:shadow-md transition-shadow"
          >
            <div class="flex space-x-3">
              <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="lucide:book-open" class="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-semibold text-sm line-clamp-1">{{ relatedStory.title }}</h3>
                <p class="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                  {{ relatedStory.description }}
                </p>
                <UBadge
                  :color="relatedStory.type === 'free' ? 'success' : 'primary'"
                  variant="soft"
                  size="xs"
                  class="mt-1"
                >
                  {{ relatedStory.type }}
                </UBadge>
              </div>
            </div>
          </UCard>
        </div>
      </div>

      <!-- Back to Stories -->
      <div class="text-center">
        <UButton to="/stories" variant="outline" icon="i-heroicons-arrow-left">
          Back to Stories
        </UButton>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
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

// Fetch related stories
const { data: allStories } = await useAsyncData('related-stories', () =>
  queryCollection('stories').where('published', '=', true).order('date', 'DESC').all()
)

const relatedStories = computed(() =>
  allStories.value?.filter((s) => s.slug !== slug).slice(0, 2) || []
)

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// SEO
useSeoMeta({
  title: `${storyValue.value.title} - Stories & Literature - Shrike Publishing`,
  description: storyValue.value.description
})
</script>

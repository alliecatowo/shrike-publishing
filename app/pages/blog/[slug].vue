<template>
  <UContainer class="py-8">
    <div class="max-w-3xl mx-auto space-y-8">
      <!-- Article Header -->
      <div class="space-y-4">
        <div class="flex items-center space-x-3">
          <UBadge variant="outline">{{ postValue.author }}</UBadge>
          <span class="text-gray-500">•</span>
          <span class="text-gray-500">{{ formatDate(postValue.date) }}</span>
        </div>

        <h1 class="text-4xl font-bold">{{ postValue.title }}</h1>

        <p class="text-xl text-gray-600 dark:text-gray-400">{{ postValue.description }}</p>

        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="tag in postValue.tags"
            :key="tag"
            size="sm"
            variant="soft"
          >
            {{ tag }}
          </UBadge>
        </div>
      </div>

      <!-- Article Image -->
      <div class="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg flex items-center justify-center">
        <Icon name="mdi:file-document-outline" class="h-16 w-16 text-blue-600 dark:text-blue-400" />
      </div>

      <!-- Article Content -->
      <div class="prose prose-lg dark:prose-invert max-w-none">
        <ContentRenderer :value="postValue" />
      </div>

      <!-- Article Footer -->
      <div class="border-t pt-8 space-y-6">
        <!-- Share Buttons -->
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold">Share this post</h3>
          <div class="flex space-x-2">
            <UButton
              icon="i-heroicons-share"
              size="sm"
              variant="outline"
              @click="sharePost"
            >
              Share
            </UButton>
          </div>
        </div>

        <!-- Related Posts -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold">More from the blog</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UCard
              v-for="relatedPost in relatedPosts"
              :key="relatedPost.slug"
              :to="`/blog/${relatedPost.slug}`"
              class="hover:shadow-md transition-shadow"
            >
              <h4 class="font-semibold text-sm">{{ relatedPost.title }}</h4>
              <p class="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                {{ relatedPost.description }}
              </p>
            </UCard>
          </div>
        </div>

        <!-- Back to Blog -->
        <div class="text-center">
          <UButton to="/blog" variant="outline" icon="i-heroicons-arrow-left">
            Back to Blog
          </UButton>
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

// Fetch post content
const { data: post } = await useAsyncData(`blog-post-${slug}`, () =>
  queryCollection('blog').where('slug', '=', slug).first()
)

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Blog post not found'
  })
}

// Fetch related posts (simple implementation - get latest posts excluding current)
const { data: allPosts } = await useAsyncData('related-posts', () =>
  queryCollection('blog').where('published', '=', true).order('date', 'DESC').all()
)
const postValue = computed(() => post.value!)
const relatedPosts = computed(() =>
  allPosts.value?.filter((p) => p.slug !== slug).slice(0, 2) || []
)

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const sharePost = () => {
  if (navigator.share) {
    navigator.share({
      title: postValue.value.title,
      text: postValue.value.description,
      url: window.location.href
    })
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(window.location.href)
  }
}

// SEO
useSeoMeta({
  title: `${postValue.value.title} - Shrike Publishing Blog`,
  description: postValue.value.description,
  keywords: postValue.value.tags?.join(', ')
})
</script>

<template>
  <UContainer class="py-8">
    <div class="max-w-6xl mx-auto space-y-8">
      <!-- Page Header -->
      <div class="text-center space-y-4">
        <h1 class="text-4xl font-bold">Blog</h1>
        <p class="text-xl text-gray-600 dark:text-gray-400">
          Insights into game design, tabletop gaming trends, and behind-the-scenes content.
        </p>
      </div>

      <!-- Blog Posts -->
      <!-- Blog Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <UCard
          v-for="post in postsValue"
          :key="post.slug"
          :to="`/blog/${post.slug}`"
          class="transition-all hover:shadow-lg hover:-translate-y-0.5"
        >
          <div class="space-y-4">
            <div class="aspect-[4/3] overflow-hidden rounded-md">
              <template v-if="post.image || post.thumbnail">
                <NuxtImg :src="post.image || post.thumbnail" :alt="post.title" class="w-full h-full object-cover block" format="webp" sizes="(max-width: 768px) 100vw, 50vw" />
              </template>
              <template v-else>
                <div class="h-full w-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center">
                  <Icon name="lucide:file-text" class="h-12 w-12 text-blue-600 dark:text-blue-400" />
                </div>
              </template>
            </div>
            <div class="space-y-2">
              <h2 class="text-lg font-semibold line-clamp-2">{{ post.title }}</h2>
              <p class="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">{{ post.description }}</p>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex flex-wrap gap-1">
                <UBadge v-for="tag in post.tags" :key="tag" size="xs" variant="soft">{{ tag }}</UBadge>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-xs text-gray-500">{{ formatDate(post.date) }}</span>
                <UButton :to="`/blog/${post.slug}`" size="xs" variant="outline" trailing-icon="i-lucide-arrow-right">
                  Read
                </UButton>
              </div>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Pagination (if needed) -->
      <div v-if="postsValue.length === 0" class="text-center py-12">
        <Icon name="lucide:file-text" class="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">No blog posts yet</h3>
        <p class="text-gray-500">Check back soon for updates!</p>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
// Fetch all blog posts
const { data: posts } = await useAsyncData('blog', () =>
  queryCollection('blog').where('published', '=', true).order('date', 'DESC').all()
)

const postsValue = computed(() => posts.value || [])

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// SEO
useSeoMeta({
  title: 'Blog - Shrike Publishing',
  description: 'Read our latest thoughts on game design, tabletop gaming trends, and publishing insights.'
})
</script>

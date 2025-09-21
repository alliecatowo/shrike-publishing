<template>
  <UContainer class="py-8">
    <div class="max-w-4xl mx-auto space-y-8">
      <!-- Page Header -->
      <div class="text-center space-y-4">
        <h1 class="text-4xl font-bold">Blog</h1>
        <p class="text-xl text-gray-600 dark:text-gray-400">
          Insights into game design, tabletop gaming trends, and behind-the-scenes content.
        </p>
      </div>

      <!-- Blog Posts -->
      <div class="space-y-8">
        <UCard
          v-for="post in postsValue"
          :key="post.slug"
          :to="`/blog/${post.slug}`"
          class="hover:shadow-lg transition-shadow"
        >
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <!-- Post Image -->
            <div class="md:col-span-1">
              <div class="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg flex items-center justify-center">
                <Icon name="mdi:file-document-outline" class="h-12 w-12 text-blue-600 dark:text-blue-400" />
              </div>
            </div>

            <!-- Post Content -->
            <div class="md:col-span-3 space-y-3">
              <div class="flex items-center space-x-3">
                <h2 class="text-xl font-semibold">{{ post.title }}</h2>
                <UBadge variant="outline" size="sm">
                  {{ post.author }}
                </UBadge>
              </div>

              <p class="text-gray-600 dark:text-gray-400 line-clamp-3">
                {{ post.description }}
              </p>

              <div class="flex items-center justify-between">
                <div class="flex flex-wrap gap-1">
                  <UBadge
                    v-for="tag in post.tags"
                    :key="tag"
                    size="sm"
                    variant="soft"
                  >
                    {{ tag }}
                  </UBadge>
                </div>
                <span class="text-sm text-gray-500">
                  {{ formatDate(post.date) }}
                </span>
              </div>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Pagination (if needed) -->
      <div v-if="postsValue.length === 0" class="text-center py-12">
        <Icon name="mdi:file-document-outline" class="h-16 w-16 text-gray-400 mx-auto mb-4" />
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

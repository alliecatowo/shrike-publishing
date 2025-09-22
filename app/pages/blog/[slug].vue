<template>
  <UPage>
    <UPageHeader
      :title="postValue.title"
      :description="postValue.description"
    >
      <template #top>
        <div class="flex items-center gap-3 mb-4">
          <UBadge variant="outline">{{ postValue.author }}</UBadge>
          <span class="text-muted">•</span>
          <span class="text-muted">{{ formatDate(postValue.date) }}</span>
        </div>

        <div class="flex flex-wrap gap-2 mb-6">
          <UBadge
            v-for="tag in postValue.tags"
            :key="tag"
            size="sm"
            variant="soft"
          >
            {{ tag }}
          </UBadge>
        </div>
      </template>
    </UPageHeader>

    <UPageBody>
      <!-- Article Image -->
      <div>
        <template v-if="postValue.image">
          <NuxtImg
            :src="postValue.image"
            :alt="postValue.title"
            class="w-full aspect-video object-cover rounded-lg"
            format="webp"
            sizes="(max-width: 768px) 100vw, 1024px"
            :placeholder="true"
          />
        </template>
        <template v-else>
          <div class="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="lucide:file-text" class="h-16 w-16 text-primary" />
          </div>
        </template>
      </div>

      <!-- Article Content -->
      <div class="prose prose-lg dark:prose-invert max-w-none mb-8">
        <ContentRenderer :value="postValue" />
      </div>

      <!-- Share Buttons -->
      <div class="flex items-center justify-between border-t pt-8 mb-8">
        <h3 class="text-lg font-semibold">Share this post</h3>
        <UButton
          icon="i-heroicons-share"
          size="sm"
          variant="outline"
          @click="sharePost"
        >
          Share
        </UButton>
      </div>

      <!-- Related Posts -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">More from the blog</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UBlogPost
            v-for="relatedPost in relatedPosts"
            :key="relatedPost.slug"
            :title="relatedPost.title"
            :description="relatedPost.description"
            :date="relatedPost.date"
            :authors="relatedPost.author ? [{ name: relatedPost.author }] : []"
            :to="`/blog/${relatedPost.slug}`"
            variant="outline"
          />
        </div>
      </div>
    </UPageBody>

    <template #right>
      <!-- Table of Contents -->
      <UContentToc
        v-if="postValue?.body?.toc?.links?.length"
        :links="postValue.body.toc.links"
        title="On this page"
      />
    </template>

    <template #bottom>
      <!-- Back to Blog -->
      <div class="text-center pt-8">
        <UButton to="/blog" variant="outline" icon="i-heroicons-arrow-left">
          Back to Blog
        </UButton>
      </div>
    </template>
  </UPage>
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

<template>
  <UPageSection
    v-if="posts?.length || announcements?.length"
    :title="title"
    :description="description"
    class="py-4"
  >
    <UPageGrid :cols="{ default: 1, lg: 2 }" class="gap-6">
      <!-- Latest Blog Posts -->
      <UPageCard
        v-if="posts?.length"
        variant="outline"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">
              <slot name="blog-heading" />
            </h3>
            <UButton
              to="/blog"
              variant="ghost"
              size="sm"
              trailing-icon="i-lucide-arrow-right"
            >
              <slot name="blog-link-text" />
            </UButton>
          </div>
        </template>

        <template #body>
          <div class="space-y-3">
            <UBlogPost
              v-for="post in posts"
              :key="post.slug"
              :to="`/blog/${post.slug}`"
              :title="post.title"
              :description="post.description"
              :date="post.date"
              orientation="vertical"
              variant="subtle"
            />
          </div>
        </template>
      </UPageCard>

      <!-- Latest Announcements -->
      <UPageCard
        v-if="announcements?.length"
        variant="outline"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">
              <slot name="announcements-heading" />
            </h3>
            <UButton
              to="/announcements"
              variant="ghost"
              size="sm"
              trailing-icon="i-lucide-arrow-right"
            >
              <slot name="announcements-link-text" />
            </UButton>
          </div>
        </template>

        <template #body>
          <div class="space-y-3">
            <UBlogPost
              v-for="announcement in announcements"
              :key="announcement.slug"
              :to="`/announcements/${announcement.slug}`"
              :title="announcement.title"
              :description="announcement.description"
              :date="announcement.date"
              :badge="{ label: 'Announcement', color: 'warning', variant: 'subtle' }"
              orientation="vertical"
              variant="subtle"
            />
          </div>
        </template>
      </UPageCard>
    </UPageGrid>
  </UPageSection>
</template>

<script setup lang="ts">
/**
 * LatestUpdates Component
 *
 * Displays latest blog posts and announcements in a two-column grid.
 * Text content can be customized via named slots.
 *
 * Usage in MDC:
 * ::latest-updates{title="Latest Updates" description="Stay current with our blog posts and announcements"}
 * #blog-heading
 * Latest from the Blog
 *
 * #blog-link-text
 * View All
 *
 * #announcements-heading
 * Announcements
 *
 * #announcements-link-text
 * View All
 * ::
 */
defineProps<{
  title?: string
  description?: string
}>()

// Access dynamic data passed from ContentRenderer via queryCollection in index.vue
const posts = inject('latestPosts', ref([]))
const announcements = inject('latestAnnouncements', ref([]))
</script>

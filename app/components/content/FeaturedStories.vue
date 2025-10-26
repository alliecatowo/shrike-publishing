<template>
  <UPageSection
    v-if="stories?.length"
    :title="title"
    :description="description"
    class="py-4"
  >
    <UPageGrid :cols="{ default: 1, md: 2, lg: 3 }" class="gap-6">
      <UBlogPost
        v-for="story in stories"
        :key="story.slug"
        :to="`/stories/${story.slug}`"
        :title="story.title"
        :description="story.description"
        :date="story.date"
        :image="story.image || story.thumbnail"
        orientation="vertical"
        variant="subtle"
        class="h-full"
      />
    </UPageGrid>
  </UPageSection>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
}>()

// Access dynamic data passed from ContentRenderer via queryCollection in index.vue
const stories = inject('featuredStories', ref([]))
</script>

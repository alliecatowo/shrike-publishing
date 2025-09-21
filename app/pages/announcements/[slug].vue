<template>
  <UContainer class="py-8">
    <div class="max-w-3xl mx-auto space-y-8">
      <!-- Announcement Header -->
      <div class="text-center space-y-4">
        <UBadge
          color="primary"
          variant="soft"
          size="lg"
        >
          {{ announcementValue.type || 'announcement' }}
        </UBadge>

        <h1 class="text-4xl font-bold">{{ announcementValue.title }}</h1>

        <p class="text-xl text-gray-600 dark:text-gray-400">{{ announcementValue.description }}</p>

        <p class="text-gray-500">{{ formatDate(announcementValue.date) }}</p>
      </div>

      <!-- Announcement Content -->
      <div class="prose prose-lg dark:prose-invert max-w-none">
        <ContentRenderer :value="announcementValue" />
      </div>

      <!-- Back to Announcements -->
      <div class="text-center">
        <UButton to="/announcements" variant="outline" icon="i-heroicons-arrow-left">
          Back to Announcements
        </UButton>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

// Fetch announcement content
const { data: announcement } = await useAsyncData(`announcement-${slug}`, () =>
  queryCollection('announcements').where('slug', '=', slug).first()
)

if (!announcement.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Announcement not found'
  })
}

const announcementValue = computed(() => announcement.value!)

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}


// SEO
useSeoMeta({
  title: `${announcementValue.value.title} - Shrike Publishing Announcements`,
  description: announcementValue.value.description
})
</script>

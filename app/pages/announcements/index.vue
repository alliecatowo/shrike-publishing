<template>
  <UContainer class="py-8">
    <div class="max-w-4xl mx-auto space-y-8">
      <!-- Page Header -->
      <div class="text-center space-y-4">
        <h1 class="text-4xl font-bold">Announcements</h1>
        <p class="text-xl text-gray-600 dark:text-gray-400">
          Stay updated with our latest news, product releases, and company updates.
        </p>
      </div>

      <!-- Announcements -->
      <div class="space-y-6">
        <UCard
          v-for="announcement in announcementsValue"
          :key="announcement.slug"
          :to="`/announcements/${announcement.slug}`"
          class="hover:shadow-lg transition-shadow"
        >
          <div class="flex items-start space-x-4">
            <!-- Announcement Icon -->
            <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <UIcon name="i-heroicons-megaphone" class="h-6 w-6 text-primary" />
            </div>

            <!-- Announcement Content -->
            <div class="flex-1 min-w-0 space-y-2">
              <div class="flex items-center justify-between">
                <h2 class="text-xl font-semibold">{{ announcement.title }}</h2>
              <UBadge
                color="primary"
                variant="soft"
                size="sm"
              >
                {{ announcement.type || 'announcement' }}
              </UBadge>
              </div>

              <p class="text-gray-600 dark:text-gray-400 line-clamp-2">
                {{ announcement.description }}
              </p>

              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">
                  {{ formatDate(announcement.date) }}
                </span>
                <UButton size="sm" variant="ghost">
                  Read More →
                </UButton>
              </div>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Empty State -->
      <div v-if="announcementsValue.length === 0" class="text-center py-12">
        <UIcon name="i-heroicons-megaphone" class="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">No announcements yet</h3>
        <p class="text-gray-500">Check back soon for updates!</p>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
// Fetch all announcements
const { data: announcements } = await useAsyncData('announcements', () =>
  queryCollection('announcements').where('published', '=', true).order('date', 'DESC').all()
)

const announcementsValue = computed(() => announcements.value || [])

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}


// SEO
useSeoMeta({
  title: 'Announcements - Shrike Publishing',
  description: 'Stay updated with the latest news and announcements from Shrike Publishing.'
})
</script>

<template>
  <UContainer class="py-8">
    <div class="max-w-4xl mx-auto space-y-8">
      <!-- Page Header -->
      <div class="text-center space-y-4">
        <h1 class="text-4xl font-bold">Game Manuals & Resources</h1>
        <p class="text-xl text-gray-600 dark:text-gray-400">
          Download rulebooks, character sheets, and other resources for our games.
        </p>
      </div>

      <!-- Manuals Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UCard
          v-for="manual in manualsValue"
          :key="manual.slug"
          class="hover:shadow-lg transition-shadow"
        >
          <div class="p-6 space-y-4">
            <!-- Manual Icon -->
            <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <UIcon name="i-heroicons-document" class="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>

            <!-- Manual Info -->
            <div>
              <h3 class="text-xl font-semibold mb-2">{{ manual.title }}</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-3">
                {{ manual.description }}
              </p>

              <div class="flex items-center space-x-2 mb-4">
                <UBadge variant="outline" size="sm">
                  {{ manual.game }}
                </UBadge>
                <UBadge variant="soft" size="sm">
                  {{ manual.type }}
                </UBadge>
              </div>
            </div>

            <!-- Download Button -->
            <UButton
              :href="manual.download"
              icon="i-heroicons-arrow-down-tray"
              target="_blank"
              rel="noopener"
              block
            >
              Download
            </UButton>
          </div>
        </UCard>
      </div>

      <!-- Empty State -->
      <div v-if="manualsValue.length === 0" class="text-center py-12">
        <UIcon name="i-heroicons-document" class="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">No manuals available yet</h3>
        <p class="text-gray-500">Check back soon for downloadable resources!</p>
      </div>

      <!-- FAQ Section -->
      <UCard>
        <template #header>
          <h2 class="text-2xl font-bold">Frequently Asked Questions</h2>
        </template>

        <div class="space-y-4">
          <UAccordion
            :items="[
              {
                label: 'Can I print these manuals at home?',
                content: 'Yes! All our manuals are designed to be printable on standard home printers. We recommend using high-quality paper for the best results.'
              },
              {
                label: 'Are digital versions available?',
                content: 'Absolutely. All manuals are provided as PDF files that you can view on any device or print as needed.'
              },
              {
                label: 'Can I share these manuals with friends?',
                content: 'We encourage sharing our games with friends! Feel free to share the manuals, but please don\'t distribute them commercially without permission.'
              },
              {
                label: 'How often are manuals updated?',
                content: 'We update our manuals with errata and clarifications. Check back regularly or follow our announcements for updates.'
              }
            ]"
          />
        </div>
      </UCard>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
// Fetch all manuals
const { data: manuals } = await useAsyncData('manuals', () =>
  queryCollection('manuals').where('published', '=', true).order('date', 'DESC').all()
)

const manualsValue = computed(() => manuals.value || [])

// SEO
useSeoMeta({
  title: 'Manuals & Resources - Shrike Publishing',
  description: 'Download rulebooks, character sheets, and other resources for Shrike Publishing games including Era of Silence and Blood Neon.'
})
</script>

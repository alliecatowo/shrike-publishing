<template>
  <UContainer class="py-8">
    <div class="max-w-4xl mx-auto space-y-8">
      <!-- Game Header -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Game Image -->
        <div class="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
          <Icon name="lucide:box" class="h-32 w-32 text-primary" />
        </div>

        <!-- Game Info -->
        <div class="space-y-6">
          <div>
            <h1 class="text-4xl font-bold mb-2">{{ gameValue.title }}</h1>
            <p class="text-xl text-gray-600 dark:text-gray-400">{{ gameValue.description }}</p>
          </div>

          <div class="flex flex-wrap gap-2">
            <UBadge
              v-for="tag in gameValue.tags"
              :key="tag"
              size="sm"
            >
              {{ tag }}
            </UBadge>
          </div>

          <div class="space-y-4">
            <div class="flex items-center space-x-4">
              <span class="text-3xl font-bold text-primary">
                ${{ gameValue.price }}
                <span class="text-lg text-gray-500">{{ gameValue.currency }}</span>
              </span>
              <UBadge
                :color="gameValue.available ? 'success' : 'error'"
                variant="soft"
              >
                {{ gameValue.available ? 'Available' : 'Coming Soon' }}
              </UBadge>
            </div>

            <div class="flex space-x-3">
              <UButton
                v-if="gameValue.available"
                size="lg"
                icon="i-heroicons-shopping-bag"
                to="/contact"
              >
                Buy Now
              </UButton>
              <UButton
                size="lg"
                variant="outline"
                icon="i-heroicons-eye"
                to="/manuals"
              >
                View Manual
              </UButton>
            </div>
          </div>
        </div>
      </div>

      <!-- Game Content -->
      <div class="prose prose-lg dark:prose-invert max-w-none">
        <ContentRenderer :value="gameValue" />
      </div>

      <!-- Related Content -->
      <div class="space-y-6">
        <h2 class="text-2xl font-bold">Related Content</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Related Stories -->
          <UCard to="/stories" class="hover:shadow-md transition-shadow">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <Icon name="lucide:book-open" class="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 class="font-semibold">Stories & Literature</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">Read stories set in this world</p>
              </div>
            </div>
          </UCard>

          <!-- Blog Posts -->
          <UCard to="/blog" class="hover:shadow-md transition-shadow">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <Icon name="lucide:file-text" class="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 class="font-semibold">Development Blog</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">Learn about game design</p>
              </div>
            </div>
          </UCard>
        </div>
      </div>

      <!-- Back to Games -->
      <div class="text-center">
        <UButton to="/games" variant="outline" icon="i-heroicons-arrow-left">
          Back to Games
        </UButton>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

// Fetch game content
const { data: game } = await useAsyncData(`game-${slug}`, () =>
  queryCollection('games').where('slug', '=', slug).first()
)

if (!game.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Game not found'
  })
}

const gameValue = computed(() => game.value!)

// SEO
useSeoMeta({
  title: `${gameValue.value.title} - Shrike Publishing`,
  description: gameValue.value.description
})
</script>

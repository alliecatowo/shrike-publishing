<template>
  <UContainer class="py-8">
    <div class="max-w-3xl mx-auto space-y-8">
      <!-- Poetry Header -->
      <div class="text-center space-y-4">
        <UBadge
          v-if="poemValue.featured"
          color="pink"
          variant="soft"
          size="lg"
        >
          Featured Poetry
        </UBadge>

        <h1 class="text-4xl font-bold">{{ poemValue.title }}</h1>

        <div class="flex items-center justify-center space-x-4 text-sm text-gray-500">
          <span>By {{ poemValue.author || 'Anonymous' }}</span>
          <span>•</span>
          <span>{{ formatDate(poemValue.date) }}</span>
        </div>

        <p v-if="poemValue.description" class="text-xl text-gray-600 dark:text-gray-400">
          {{ poemValue.description }}
        </p>

        <div class="flex flex-wrap gap-2 justify-center">
          <UBadge
            v-for="tag in poemValue.tags"
            :key="tag"
            size="sm"
            variant="soft"
            color="pink"
          >
            {{ tag }}
          </UBadge>
        </div>
      </div>

      <!-- Poetry Image -->
      <div v-if="poemValue.image || poemValue.thumbnail">
        <NuxtImg
          :src="poemValue.image || poemValue.thumbnail"
          :alt="poemValue.title"
          class="w-full aspect-video object-cover rounded-lg"
          format="webp"
          sizes="(max-width: 768px) 100vw, 1024px"
          :placeholder="true"
        />
      </div>

      <!-- Poetry Content -->
      <div class="prose prose-lg dark:prose-invert max-w-none">
        <div class="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/10 dark:to-purple-900/10 rounded-lg p-8 md:p-12">
          <ContentRenderer :value="poemValue" class="poem-content" />
        </div>
      </div>

      <!-- Author Note -->
      <div v-if="poemValue.authorNote" class="border-l-4 border-pink-500 pl-4 py-2">
        <p class="text-sm text-gray-600 dark:text-gray-400 italic">
          <span class="font-semibold">Author's Note:</span> {{ poemValue.authorNote }}
        </p>
      </div>

      <!-- Share Buttons -->
      <div class="flex items-center justify-between border-t pt-8 mb-8">
        <h3 class="text-lg font-semibold">Share this poem</h3>
        <div class="flex gap-2">
          <UButton
            icon="i-lucide-share-2"
            size="sm"
            variant="outline"
            @click="sharePoem"
          >
            Share
          </UButton>
          <UButton
            icon="i-lucide-heart"
            size="sm"
            variant="soft"
            color="pink"
          >
            Save
          </UButton>
        </div>
      </div>

      <!-- Navigation -->
      <div class="grid grid-cols-2 gap-4">
        <UButton
          v-if="previousPoem"
          :to="`/poetry/${previousPoem.slug}`"
          variant="outline"
          icon="i-lucide-arrow-left"
          class="justify-start"
        >
          <div class="text-left truncate">
            <div class="text-xs text-gray-500">Previous</div>
            <div class="font-semibold truncate">{{ previousPoem.title }}</div>
          </div>
        </UButton>
        <div v-else></div>

        <UButton
          v-if="nextPoem"
          :to="`/poetry/${nextPoem.slug}`"
          variant="outline"
          trailing-icon="i-lucide-arrow-right"
          class="justify-end"
        >
          <div class="text-right truncate">
            <div class="text-xs text-gray-500">Next</div>
            <div class="font-semibold truncate">{{ nextPoem.title }}</div>
          </div>
        </UButton>
      </div>

      <!-- Related Poetry -->
      <div class="space-y-4">
        <h2 class="text-xl font-bold">More Poetry</h2>
        <UPageGrid :cols="{ default: 1, md: 2 }" class="gap-4">
          <UCard
            v-for="relatedPoem in relatedPoems"
            :key="relatedPoem.slug"
            :to="`/poetry/${relatedPoem.slug}`"
            class="hover:shadow-md transition-shadow"
          >
            <div class="flex space-x-3">
              <div class="w-12 h-12 bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900 dark:to-purple-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <UIcon name="i-lucide-feather" class="h-6 w-6 text-pink-600 dark:text-pink-400" />
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-semibold text-sm line-clamp-1">{{ relatedPoem.title }}</h3>
                <p class="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                  {{ relatedPoem.description || relatedPoem.excerpt }}
                </p>
                <div class="flex items-center gap-1 mt-1">
                  <UBadge
                    v-for="tag in relatedPoem.tags?.slice(0, 2)"
                    :key="tag"
                    variant="soft"
                    color="pink"
                    size="xs"
                  >
                    {{ tag }}
                  </UBadge>
                </div>
              </div>
            </div>
          </UCard>
        </UPageGrid>
      </div>

      <!-- Back to Poetry -->
      <div class="text-center">
        <UButton to="/poetry" variant="outline" icon="i-lucide-arrow-left">
          Back to Poetry Collection
        </UButton>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

// Fetch poem content
const { data: poem } = await useAsyncData(`poetry-${slug}`, () =>
  queryCollection('poetry').where('slug', '=', slug).first()
)

if (!poem.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Poem not found'
  })
}

const poemValue = computed(() => poem.value!)

// Fetch all poems for navigation
const { data: allPoems } = await useAsyncData('all-poetry', () =>
  queryCollection('poetry').where('published', '=', true).order('date', 'DESC').all()
)

// Find current poem index and get previous/next
const currentIndex = computed(() =>
  allPoems.value?.findIndex((p) => p.slug === slug) ?? -1
)

const previousPoem = computed(() =>
  currentIndex.value > 0 ? allPoems.value?.[currentIndex.value - 1] : null
)

const nextPoem = computed(() =>
  currentIndex.value < (allPoems.value?.length ?? 0) - 1
    ? allPoems.value?.[currentIndex.value + 1]
    : null
)

// Related poems (same tags, excluding current)
const relatedPoems = computed(() => {
  const poems = allPoems.value?.filter((p) => {
    if (p.slug === slug) return false
    // Find poems with at least one matching tag
    const currentTags = poemValue.value.tags || []
    const poemTags = p.tags || []
    return currentTags.some((tag) => poemTags.includes(tag))
  })
  return poems?.slice(0, 2) || []
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const sharePoem = () => {
  if (navigator.share) {
    navigator.share({
      title: poemValue.value.title,
      text: poemValue.value.description || `Read "${poemValue.value.title}" by ${poemValue.value.author || 'Shrike Publishing'}`,
      url: window.location.href
    })
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(window.location.href)
  }
}

// SEO
useSeoMeta({
  title: `${poemValue.value.title} - Poetry - Shrike Publishing`,
  description: poemValue.value.description || `A poem by ${poemValue.value.author || 'Shrike Publishing'}`,
  keywords: poemValue.value.tags?.join(', ')
})
</script>

<style scoped>
/* Special styling for poetry content */
.poem-content :deep(p) {
  @apply text-center leading-relaxed;
}

.poem-content :deep(em) {
  @apply italic text-pink-700 dark:text-pink-400;
}

.poem-content :deep(strong) {
  @apply font-bold text-pink-800 dark:text-pink-300;
}
</style>

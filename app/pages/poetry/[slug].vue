<template>
  <UPage>
    <UPageBody>
      <!-- Poetry Header -->
      <UPageHeader
        :title="poemValue.title"
        :description="poemValue.description"
        :badge="poemValue.featured ? { label: 'Featured Poetry', color: 'pink', variant: 'soft' } : undefined"
      >
        <template #subtext>
          <div class="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <span>By {{ poemValue.author || 'Anonymous' }}</span>
            <span>•</span>
            <span>{{ poemValue.date }}</span>
          </div>
        </template>
        <template #tags>
          <TagList :tags="poemValue.tags" color="pink" clickable />
        </template>
      </UPageHeader>

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
      <div class="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/10 dark:to-purple-900/10 rounded-lg p-8 md:p-12">
        <ContentRenderer :value="poemValue" class="poem-content" />
      </div>

      <!-- Author Note -->
      <UAlert
        v-if="poemValue.authorNote"
        title="Author's Note"
        :description="poemValue.authorNote"
        color="pink"
        variant="subtle"
        icon="i-lucide-pen-square"
      />

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
      <UCard>
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
          <div v-else/>

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
      </UCard>

      <!-- Related Poetry -->
      <div class="space-y-4">
        <h2 class="text-xl font-bold">More Poetry</h2>
        <UPageGrid :cols="{ default: 1, md: 2 }" class="gap-4">
          <UBlogPost
            v-for="relatedPoem in relatedPoems"
            :key="relatedPoem.slug"
            :to="`/poetry/${relatedPoem.slug}`"
            :title="relatedPoem.title"
            :description="relatedPoem.description || relatedPoem.excerpt"
            :badge="{ label: 'Poetry', color: 'pink', variant: 'soft' }"
            orientation="horizontal"
          />
        </UPageGrid>
      </div>

      <!-- Back to Poetry -->
      <div class="text-center">
        <UButton to="/poetry" variant="outline" icon="i-lucide-arrow-left">
          Back to Poetry Collection
        </UButton>
      </div>
    </UPageBody>
  </UPage>
</template>

<script setup lang="ts">
import TagList from '~/components/TagList.vue'

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
  text-align: center;
  line-height: 1.625;
}

.poem-content :deep(em) {
  font-style: italic;
  color: rgb(190 24 93);
}

.poem-content :deep(em):is(.dark *) {
  color: rgb(244 114 182);
}

.poem-content :deep(strong) {
  font-weight: 700;
  color: rgb(157 23 77);
}

.poem-content :deep(strong):is(.dark *) {
  color: rgb(249 168 212);
}
</style>

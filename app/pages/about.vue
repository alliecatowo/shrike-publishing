<template>
  <UContainer class="py-8">
    <div class="max-w-6xl mx-auto space-y-8">
      <ContentRenderer v-if="page" :value="page" />
    </div>
  </UContainer>
</template>

<script setup lang="ts">
// Query the about collection for MDC content
const { data: page } = await useAsyncData('about-page', () =>
  queryCollection('about').first()
)

// SEO configuration
useSeoMeta({
  title: page.value?.title,
  description: page.value?.description
})
</script>

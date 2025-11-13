<template>
  <UContainer class="py-8">
    <div class="max-w-4xl mx-auto space-y-12">
      <ContentRenderer v-if="page" :value="page" />
    </div>
  </UContainer>
</template>

<script setup lang="ts">
// Query the contact collection for MDC content
const { data: page } = await useAsyncData('contact-page', () =>
  queryCollection('contact').first()
)

// SEO configuration
useSeoMeta({
  title: page.value?.title,
  description: page.value?.description
})
</script>

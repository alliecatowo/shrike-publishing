<template>
  <ContentRenderer v-if="page" :value="page" />
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

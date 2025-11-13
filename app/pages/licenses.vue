<template>
  <div>
    <ContentRenderer v-if="page" :value="page" />
  </div>
</template>

<script setup lang="ts">
// Query the licenses collection for MDC content
const { data: page } = await useAsyncData('licenses-page', () =>
  queryCollection('licenses').first()
)

// SEO configuration
useSeoMeta({
  title: page.value?.title,
  description: page.value?.description
})
</script>

<template>
  <UPageSection
    :title="title"
    :description="description"
  >
    <UPageGrid :cols="{ default: 1, md: 2, lg: 3 }" class="gap-6">
      <slot />
    </UPageGrid>
  </UPageSection>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description?: string
}

defineProps<Props>()
</script>

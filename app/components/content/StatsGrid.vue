<template>
  <UPageSection
    :title="title"
    :description="description"
  >
    <UPageGrid :cols="{ default: 1, sm: 2, lg: 4 }" class="gap-6">
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

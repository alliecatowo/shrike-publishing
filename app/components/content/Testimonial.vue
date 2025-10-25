<template>
  <UPageCard
    :title="title"
    :description="quote"
    variant="subtle"
    class="hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
  >
    <template #leading>
      <UAvatar :text="avatar" size="lg" />
    </template>
    <template #footer>
      <div class="text-sm text-muted">
        {{ author }}
      </div>
    </template>
  </UPageCard>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  quote: string
  author: string
  avatar: string
}>()
</script>

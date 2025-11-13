<template>
  <UCard>
    <div class="flex flex-row gap-6 items-start">
      <UAvatar
        :src="avatarSrc"
        :alt="name"
        size="xl"
        class="shrink-0"
      />
      <div class="flex-1 prose prose-lg dark:prose-invert">
        <slot />
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
defineProps<{
  avatarSrc?: string
  name?: string
}>()
</script>

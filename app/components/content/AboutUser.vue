<template>
  <div class="flex flex-col md:flex-row gap-6 items-center md:items-start">
    <UAvatar
      :src="avatarSrc"
      :alt="name"
      size="6xl"
      class="shrink-0"
    />
    <UCard class="flex-1 w-full">
      <slot />
    </UCard>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  avatarSrc?: string
  name?: string
}>()
</script>

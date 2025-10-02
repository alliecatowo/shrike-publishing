<template>
  <UPageCard
    :title="game.title"
    :description="game.description"
    :to="`/games/${game.slug}`"
    orientation="horizontal"
  >
    <img :src="game.image" :alt="game.title" class="w-full h-48 object-cover rounded-md" >
  </UPageCard>
</template>

<script setup lang="ts">
defineProps<{
  game: {
    title: string;
    description: string;
    image: string;
    slug: string;
  };
}>();
</script>
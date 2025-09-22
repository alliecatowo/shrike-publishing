<template>
  <UCard class="flex flex-col">
    <template #header>
      <img :src="game.image" :alt="game.title" class="w-full h-48 object-cover mb-4 rounded-md" />
      <h3 class="text-xl font-bold">{{ game.title }}</h3>
    </template>
    <p class="text-gray-500 dark:text-gray-400 flex-grow">{{ game.description }}</p>
    <template #footer>
      <NuxtLink :to="`/games/${game.slug}`" class="text-primary-500 hover:underline">
        Learn More
      </NuxtLink>
    </template>
  </UCard>
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
<template>
  <UContainer class="py-8">
    <div class="max-w-4xl mx-auto space-y-12">
      <!-- Hero Section -->
      <UPageHero
        title="About Shrike Publishing"
        description="Baltimore-based storytelling studio creating tabletop games and literature. Our output focuses on telling stories of action and characters across tabletop games, written fiction, and other media!"
        :ui="{ container: 'text-center' }"
        class="shrike-heading"
      />

      <!-- Our Story -->
      <UCard>
        <template #header>
          <h2 class="shrike-heading text-2xl">Our Story</h2>
        </template>

        <div class="prose prose-lg dark:prose-invert max-w-none">
          <p>
            Shrike Tabletop makes tabletop roleplaying games (RPGs) about combat and cooperation. Our games Era of Silence and Blood Neon are love letters to traditional game design!
          </p>

          <p>
            Founded in 2020 as a Baltimore-based storytelling studio, Shrike Publishing emerged from a passion for creating meaningful gaming experiences that challenge players and spark imagination. What started as a small indie project has grown into a dedicated team committed to pushing the boundaries of tabletop gaming.
          </p>

          <p>
            Our name, inspired by the shrike bird known for its cunning hunting techniques, reflects our approach to game design: strategic, intelligent, and always one step ahead. We believe that great games are not just about rules and components, but about the stories they tell and the experiences they create across tabletop games, written fiction, and other media.
          </p>
        </div>
      </UCard>

      <!-- Our Values -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <UCard>
          <div class="text-center space-y-4">
            <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
              <Icon name="lucide:lightbulb" class="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 class="text-xl font-semibold">Innovation</h3>
            <p class="text-gray-600 dark:text-gray-400">
              We constantly explore new mechanics and themes to create fresh gaming experiences.
            </p>
          </div>
        </UCard>

        <UCard>
          <div class="text-center space-y-4">
            <div class="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto">
              <Icon name="lucide:sword" class="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <h3 class="text-xl font-semibold">Combat & Cooperation</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Our games emphasize strategic combat mechanics alongside cooperative storytelling, creating balanced experiences that challenge and unite players.
            </p>
          </div>
        </UCard>

        <UCard>
          <div class="text-center space-y-4">
            <div class="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto">
              <Icon name="lucide:star" class="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 class="text-xl font-semibold">Quality</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Every product undergoes rigorous testing and iteration to ensure the highest quality.
            </p>
          </div>
        </UCard>
      </div>

      <!-- Team Section -->
      <UCard>
        <template #header>
          <h2 class="shrike-heading text-2xl">Meet the Team</h2>
        </template>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="text-center space-y-3">
            <div class="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto">
              <Icon name="lucide:user" class="h-12 w-12 text-white" />
            </div>
            <div>
              <h3 class="font-semibold">Alex Rivera</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Game Designer & CEO</p>
              <p class="text-xs text-gray-500 mt-1">Designer of Era of Silence</p>
            </div>
          </div>

          <div class="text-center space-y-3">
            <div class="w-24 h-24 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center mx-auto">
              <Icon name="lucide:user" class="h-12 w-12 text-white" />
            </div>
            <div>
              <h3 class="font-semibold">Jamie Chen</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Lead Writer & Editor</p>
              <p class="text-xs text-gray-500 mt-1">Author of Blood Neon campaign</p>
            </div>
          </div>

          <div class="text-center space-y-3">
            <div class="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto">
              <Icon name="lucide:user" class="h-12 w-12 text-white" />
            </div>
            <div>
              <h3 class="font-semibold">Marcus Hale</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Artist & Illustrator</p>
              <p class="text-xs text-gray-500 mt-1">Creator of Shrike Publishing artwork</p>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Contact CTA -->
      <UPageHero
        title="Want to work with us?"
        description="We're always interested in collaborating with talented creators, retailers, and fellow publishers."
        orientation="horizontal"
        :ui="{ container: 'max-w-4xl' }"
      >
        <UButton to="/contact" icon="i-heroicons-envelope" size="lg">
          Get in Touch
        </UButton>
      </UPageHero>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
// SEO
useSeoMeta({
  title: 'About Us - Shrike Publishing',
  description: 'Learn about Shrike Publishing, our team, values, and commitment to creating innovative tabletop games and literature.'
})
</script>

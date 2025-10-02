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
            Founded in 2019 as Shrike Tabletop (DBA Shrike Publishing), this Baltimore-based storytelling studio is the work of Robin Val, creating left-wing science fantasy for ages 16-60. What started as a passion project has grown into a catalog of innovative tabletop games, fiction, and poetry that challenges players and readers to think differently.
          </p>

          <p>
            The name comes from the shrike bird, known for its cunning hunting techniques—a perfect metaphor for the strategic, intelligent game design you'll find here. Whether it's Era of Silence, Blood Neon, or the chaotic heist of Steal the Kilogram, every game is crafted to tell meaningful stories and create memorable experiences.
          </p>
        </div>
      </UCard>

      <!-- Our Values -->
      <UPageGrid :cols="{ default: 1, md: 3 }" class="gap-6">
        <UCard>
          <div class="text-center space-y-4">
            <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
              <UIcon name="i-lucide-lightbulb" class="h-8 w-8 text-blue-600 dark:text-blue-400" />
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
              <UIcon name="i-lucide-sword" class="h-8 w-8 text-red-600 dark:text-red-400" />
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
              <UIcon name="i-lucide-star" class="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 class="text-xl font-semibold">Quality</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Every product undergoes rigorous testing and iteration to ensure the highest quality.
            </p>
          </div>
        </UCard>
      </UPageGrid>

      <!-- About Robin -->
      <UCard>
        <template #header>
          <h2 class="shrike-heading text-2xl">About Robin</h2>
        </template>

        <div class="flex flex-col md:flex-row gap-6 items-start">
          <div class="w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
            <UIcon name="i-lucide-user" class="h-16 w-16 text-white" />
          </div>
          <div class="prose prose-lg dark:prose-invert max-w-none">
            <p>
              Robin Val (they/them) is a Baltimore-based game designer, writer, and creator. With a focus on narrative-driven tabletop experiences, Robin brings years of experience in game mechanics, storytelling, and world-building to every project.
            </p>
            <p>
              When not designing games or writing stories, Robin can be found exploring Baltimore's creative community, reading science fiction, or advocating for more inclusive and progressive narratives in gaming.
            </p>
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
        <UButton to="/contact" icon="i-lucide-mail" size="lg">
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

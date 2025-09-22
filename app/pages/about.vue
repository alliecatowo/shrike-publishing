<template>
  <UContainer class="py-8">
    <div class="max-w-4xl mx-auto space-y-12">
      <!-- Hero Section -->
      <UPageHero
        :title="page.title"
        :description="page.description"
        :ui="{ container: 'text-center' }"
        class="font-volkhov font-bold"
      />

      <!-- Our Story -->
      <UCard>
        <template #header>
          <h2 class="font-volkhov font-bold text-2xl">{{ page.storyTitle }}</h2>
        </template>

        <div class="prose prose-lg dark:prose-invert">
          <ContentRenderer :value="page" />
        </div>
      </UCard>

      <!-- Our Values -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <UCard v-for="(value, index) in page.values" :key="index">
          <div class="text-center space-y-4">
            <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
              <Icon :name="value.icon" class="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 class="text-xl font-semibold">{{ value.title }}</h3>
            <p class="text-gray-600 dark:text-gray-400">
              {{ value.description }}
            </p>
          </div>
        </UCard>
      </div>

      <!-- Team Section -->
      <UCard>
        <template #header>
          <h2 class="font-volkhov font-bold text-2xl">{{ page.teamTitle }}</h2>
        </template>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(member, index) in page.teamMembers" :key="index" class="text-center space-y-3">
            <div class="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto">
              <Icon :name="member.icon" class="h-12 w-12 text-white" />
            </div>
            <div>
              <h3 class="font-semibold">{{ member.name }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ member.role }}</p>
              <p class="text-xs text-gray-500 mt-1">{{ member.extra }}</p>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Contact CTA -->
      <UPageHero
        :title="page.contactCtaTitle"
        :description="page.contactCtaDescription"
        orientation="horizontal"
        :ui="{ container: 'max-w-4xl' }"
      >
        <UButton :to="page.contactCtaButtonLink" icon="i-heroicons-envelope" size="lg">
          {{ page.contactCtaButtonText }}
        </UButton>
      </UPageHero>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const { data: page } = await useAsyncData('about-page', () => queryContent('/pages/about').findOne())

// SEO
useSeoMeta({
  title: page.value?.metaTitle,
  description: page.value?.metaDescription
})
</script>
<template>
  <UContainer class="py-8">
    <UPageHero
      :title="content?.title"
      :description="content?.description"
      :ui="{ container: 'text-center' }"
    />

    <UPageGrid :cols="{ default: 1, md: 2 }" class="gap-8 mt-8">
      <UPageCard
        v-for="option in content?.supportOptions"
        :key="option.title"
        :icon="option.icon"
        :title="option.title"
        :description="option.description"
        :to="option.url"
        target="_blank"
        spotlight
        :spotlight-color="option.color"
        class="hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-xl"
      >
        <template #leading>
          <div :class="`w-16 h-16 bg-${option.color}-100 dark:bg-${option.color}-900 rounded-full flex items-center justify-center mx-auto`">
            <UIcon :name="option.icon" :class="`h-8 w-8 text-${option.color}-600 dark:text-${option.color}-400`" />
          </div>
        </template>
        <template #footer>
          <UButton
            :icon="option.icon"
            :color="option.color"
            variant="solid"
            target="_blank"
            rel="noopener"
            :to="option.url"
          >
            {{ option.buttonLabel }}
          </UButton>
        </template>
      </UPageCard>
    </UPageGrid>
  </UContainer>
</template>

<script setup lang="ts">
const { data: content } = await useAsyncData('support-content', () =>
  queryCollection('support').first()
)
</script>

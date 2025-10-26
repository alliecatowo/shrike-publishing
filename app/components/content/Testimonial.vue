<template>
  <UPageCard
    variant="subtle"
    class="hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
  >
    <template #leading>
      <UAvatar :text="avatar" size="lg" />
    </template>

    <template #header>
      <h3 class="font-semibold">
        <slot name="title" />
      </h3>
    </template>

    <p class="text-muted">
      <slot name="quote" />
    </p>

    <template #footer>
      <div class="text-sm text-muted">
        <slot name="author" />
      </div>
    </template>
  </UPageCard>
</template>

<script setup lang="ts">
/**
 * Testimonial Component
 *
 * A prose-friendly wrapper around UPageCard for displaying testimonials.
 * All text content comes from markdown slots.
 *
 * Usage in MDC:
 * ::::testimonial{avatar="SJ"}
 * #title
 * Absolutely incredible storytelling
 *
 * #quote
 * Era of Silence completely changed how I think about narrative-driven games.
 *
 * #author
 * Sarah Johnson, Game Master
 * ::::
 */
defineProps<{
  avatar: string
}>()
</script>

<template>
  <UPageSection
    :title="title"
    :description="description"
    class="py-4"
  >
    <UPageGrid :cols="{ default: 1, md: 2, lg: 3 }" class="gap-6">
      <TestimonialCard
        v-for="(testimonial, index) in testimonials"
        :key="index"
        :title="testimonial.heading"
        :author="testimonial.name"
        :role="testimonial.title"
        :avatar-text="testimonial.avatar"
      >
        {{ testimonial.quote }}
      </TestimonialCard>
    </UPageGrid>
  </UPageSection>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description?: string
}

defineProps<Props>()

// Get testimonials from page frontmatter via provide/inject
const testimonials = inject('testimonials', ref([]))
</script>

<template>
  <div class="relative pl-8 pb-8 border-l-2 border-[var(--ui-border)] last:pb-0 group transition-colors duration-300">
    <!-- Timeline dot/icon -->
    <div class="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
      <UIcon v-if="icon" :name="icon" class="h-4 w-4 text-white" />
      <UIcon v-else name="i-lucide-circle" class="h-2 w-2 text-white" />
    </div>

    <!-- Content card -->
    <NuxtLink
      v-if="to"
      :to="to"
      class="block group-hover:translate-x-2 transition-transform duration-300"
    >
      <UCard
        variant="outline"
        class="hover:shadow-lg transition-all duration-300"
      >
        <div class="space-y-2">
          <div class="flex items-center justify-between gap-4">
            <UBadge variant="soft" color="primary" size="sm">
              {{ date }}
            </UBadge>
          </div>

          <h3 class="text-lg font-bold text-highlighted group-hover:text-primary transition-colors">
            {{ title }}
          </h3>

          <p v-if="description" class="text-muted leading-relaxed">
            {{ description }}
          </p>

          <slot />
        </div>
      </UCard>
    </NuxtLink>

    <!-- Non-link version -->
    <div
      v-else
      class="space-y-2"
    >
      <UBadge variant="soft" color="primary" size="sm">
        {{ date }}
      </UBadge>

      <h3 class="text-lg font-bold text-highlighted">
        {{ title }}
      </h3>

      <p v-if="description" class="text-muted leading-relaxed">
        {{ description }}
      </p>

      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * TimelineItem Component
 *
 * Individual timeline entry with visual styling and hover effects.
 * Used within TimelineSection for better editability in Nuxt Studio.
 *
 * Props:
 * - date: Timeline item date/period (required)
 * - title: Timeline item title (required)
 * - description: Optional description
 * - icon: Optional Lucide icon name
 * - to: Optional link destination
 */

interface Props {
  date: string
  title: string
  description?: string
  icon?: string
  to?: string
}

withDefaults(defineProps<Props>(), {
  description: '',
  icon: '',
  to: ''
})
</script>

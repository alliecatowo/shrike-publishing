<script setup lang="ts">
/**
 * ContentStatCard Component
 *
 * A prose-friendly wrapper around UPageCard for displaying stats with spotlight effects.
 *
 * Usage in MDC:
 * ::::content-stat-card{title="50K+" description="Stories Created" icon="i-lucide-book-open" color="primary"}
 * ::::
 */

defineProps<{
  title: string
  description: string
  icon: string
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
}>()
</script>

<template>
  <UPageCard
    :title="title"
    :description="description"
    variant="soft"
    :spotlight="true"
    :spotlight-color="color || 'primary'"
    class="text-center group"
  >
    <template #header>
      <div class="flex justify-center mb-4">
        <div class="relative">
          <div
            class="absolute inset-0 blur-lg rounded-full transition-colors"
            :class="`bg-${color}/20 group-hover:bg-${color}/30`"
          />
          <div
            class="relative w-12 h-12 rounded-full flex items-center justify-center"
            :class="`bg-gradient-to-br from-${color}/20 to-${color}/10`"
          >
            <UIcon :name="icon" :class="`h-6 w-6 text-${color}`" />
          </div>
        </div>
      </div>
    </template>
  </UPageCard>
</template>

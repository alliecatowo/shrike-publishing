<template>
  <!-- This component doesn't render directly, it's just a data container -->
  <!-- The TimelineSection component extracts its props and passes to UTimeline -->
  <div style="display: none;">
    <slot />
  </div>
</template>

<script setup lang="ts">
/**
 * TimelineItem Component
 *
 * A data container component for timeline entries.
 * Used inside TimelineSection - doesn't render directly.
 *
 * Props are extracted by the parent TimelineSection and passed to UTimeline.
 */

interface Props {
  date?: string
  title?: string
  description?: string
  icon?: string
  value?: string | number
  to?: string
}

defineProps<Props>()

// Set component name for parent to identify it
defineOptions({
  name: 'TimelineItem'
})
</script>

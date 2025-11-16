<template>
  <div class="max-w-4xl mx-auto py-8">
    <UCard>
      <UTimeline
        :items="timelineItems"
        :color="color"
        :size="size"
        :default-value="defaultValue"
        :orientation="orientation"
      />
    </UCard>
  </div>
</template>

<script setup lang="ts">
/**
 * TimelineSection Component
 *
 * A prose-friendly wrapper that collects timeline-item components
 * and renders them using Nuxt UI's UTimeline component.
 *
 * Usage in MDC:
 * :::timeline-section{color="primary"}
 *   ::::timeline-item{date="Dec 2024" title="..." description="..." icon="..."}
 *   ::::
 * :::
 */

import type { TimelineItem } from '@nuxt/ui'

interface Props {
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  size?: '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  defaultValue?: string | number
  orientation?: 'horizontal' | 'vertical'
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
  size: 'md',
  defaultValue: undefined,
  orientation: 'vertical'
})

const slots = useSlots()

// Extract timeline items from slot components
const timelineItems = computed<TimelineItem[]>(() => {
  const defaultSlot = slots.default?.()
  if (!defaultSlot) {
    return []
  }

  const items = defaultSlot
    .filter(vnode => {
      // Filter for timeline-item components - check tag property for async components
      const tag = vnode.type && typeof vnode.type === 'object'
        ? (vnode.type as any).tag
        : null
      const componentName = vnode.type && typeof vnode.type === 'object'
        ? (vnode.type as any).name || (vnode.type as any).__name
        : null
      return componentName === 'TimelineItem' || tag === 'timeline-item'
    })
    .map(vnode => {
      // Extract props from each timeline-item
      const itemProps = vnode.props || {}
      return {
        date: itemProps.date,
        title: itemProps.title,
        description: itemProps.description,
        icon: itemProps.icon,
        value: itemProps.value,
        to: itemProps.to
      }
    })

  return items
})
</script>

<template>
  <div class="flex flex-wrap gap-1">
    <UBadge
      v-for="tag in tags"
      :key="tag"
      :color="color"
      :variant="variant"
      :to="clickable ? `/tags/${tag}` : undefined"
      class="cursor-pointer hover:opacity-80 transition-opacity"
    >
      {{ tag }}
    </UBadge>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  tags: {
    type: Array,
    required: true
  },
  color: {
    type: String,
    default: 'primary'
  },
  variant: {
    type: String,
    default: 'soft'
  },
  clickable: {
    type: Boolean,
    default: false
  }
})
</script>

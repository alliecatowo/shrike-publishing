<template>
  <UModal v-model="isOpen" fullscreen>
    <UCarousel
      v-slot="{ item }"
      :items="images"
      :start-index="startIndex"
      arrows
      class="w-full h-full"
    >
      <div class="flex items-center justify-center h-full">
        <img :src="item.image" :alt="item.title" class="max-w-full max-h-full object-contain">
      </div>
    </UCarousel>
    <div class="absolute top-4 right-4">
      <UButton icon="i-lucide-x" color="gray" variant="ghost" @click="isOpen = false" />
    </div>
  </UModal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    required: true
  },
  startIndex: {
    type: Number,
    default: 0
  },
  open: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:open'])

const isOpen = ref(props.open)

watch(() => props.open, (value) => {
  isOpen.value = value
})

watch(isOpen, (value) => {
  emit('update:open', value)
})
</script>

<template>
  <UModal v-model="isOpen" fullscreen>
    <UCarousel
      ref="carousel"
      v-slot="{ item }"
      :items="images"
      :start-index="startIndex"
      arrows
      class="w-full h-full"
      @update:model-value="currentIndex = $event"
    >
      <div class="flex items-center justify-center h-full p-8">
        <NuxtImg :src="item.image" :alt="item.title" class="max-w-full max-h-full object-contain" />
      </div>
    </UCarousel>

    <!-- Top controls bar -->
    <div class="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/60 to-transparent p-4">
      <div class="flex items-center justify-between">
        <div class="flex-1">
          <h3 v-if="currentImage?.title" class="text-white text-lg font-semibold">
            {{ currentImage.title }}
          </h3>
          <p v-if="currentImage?.description" class="text-white/80 text-sm mt-1">
            {{ currentImage.description }}
          </p>
        </div>
        <UButton icon="i-lucide-x" color="neutral" variant="ghost" @click="isOpen = false" />
      </div>
    </div>

    <!-- Bottom controls bar -->
    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
      <div class="flex items-center justify-between">
        <!-- Navigation indicator -->
        <div class="text-white/90 text-sm font-medium">
          {{ currentIndex + 1 }} of {{ images.length }}
        </div>

        <!-- Action buttons -->
        <div class="flex items-center gap-2">
          <UButton
            v-if="currentImage?.downloadUrl"
            icon="i-lucide-download"
            color="neutral"
            variant="soft"
            @click="downloadImage(currentImage)"
          >
            Download
          </UButton>
        </div>
      </div>
    </div>
  </UModal>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'

interface LightboxImage {
  image: string
  title?: string
  description?: string
  downloadUrl?: string
}

const props = defineProps({
  images: {
    type: Array as () => LightboxImage[],
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
const currentIndex = ref(props.startIndex)
const carousel = ref()

const currentImage = computed(() => {
  return props.images[currentIndex.value]
})

const downloadImage = (image: LightboxImage) => {
  if (!image.downloadUrl) return

  const link = document.createElement('a')
  link.href = image.downloadUrl
  link.download = image.title || 'image'
  link.click()
}

watch(() => props.open, (value) => {
  isOpen.value = value
  if (value) {
    currentIndex.value = props.startIndex
  }
})

watch(() => props.startIndex, (value) => {
  currentIndex.value = value
})

watch(isOpen, (value) => {
  emit('update:open', value)
})
</script>

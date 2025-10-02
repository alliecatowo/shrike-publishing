<template>
  <UProgress v-if="scrollProgress > 0" :value="scrollProgress" :max="100" class="fixed top-0 left-0 right-0 h-1 z-50" />
</template>

<script setup lang="ts">
const scrollProgress = ref(0)

onMounted(() => {
  window.addEventListener('scroll', updateProgress)
  updateProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
})

function updateProgress() {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  const scrollPercent = (scrollTop / docHeight) * 100
  scrollProgress.value = Math.min(Math.max(scrollPercent, 0), 100)
}
</script>
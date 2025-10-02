<template>
  <div class="fixed top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800 z-50">
    <div
      class="h-full bg-primary transition-all duration-150"
      :style="{ width: scrollProgress + '%' }"
    />
  </div>
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

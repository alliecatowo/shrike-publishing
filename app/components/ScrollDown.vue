<template>
  <button
    v-if="!isAtBottom"
    class="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 p-3 rounded-full bg-primary text-white shadow-lg hover:scale-110 transition-transform"
    aria-label="Scroll to next section"
    @click="scrollToNextSection"
  >
    <UIcon name="i-lucide-chevron-down" class="w-6 h-6 animate-bounce" />
  </button>
</template>

<script setup lang="ts">
const isAtBottom = ref(false)
const sections = ref<HTMLElement[]>([])

onMounted(() => {
  // Find all UPageSection components
  sections.value = Array.from(document.querySelectorAll('[data-page-section], section'))

  // Track scroll position
  window.addEventListener('scroll', checkScrollPosition)
  checkScrollPosition()
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScrollPosition)
})

function checkScrollPosition() {
  const scrollHeight = document.documentElement.scrollHeight
  const scrollTop = window.scrollY
  const clientHeight = window.innerHeight

  // Check if we're at the bottom (with 100px threshold)
  isAtBottom.value = scrollTop + clientHeight >= scrollHeight - 100
}

function scrollToNextSection() {
  const currentScrollY = window.scrollY
  const viewportHeight = window.innerHeight

  // Find the next section that's below the current viewport
  const nextSection = sections.value.find(section => {
    const rect = section.getBoundingClientRect()
    const absoluteTop = rect.top + currentScrollY
    return absoluteTop > currentScrollY + viewportHeight / 2
  })

  if (nextSection) {
    nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
  } else {
    // If no next section, scroll to bottom
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
  }
}
</script>

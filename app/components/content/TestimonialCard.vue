<template>
  <UPageCard
    :title="title"
    variant="soft"
    orientation="vertical"
    class="text-center max-w-md mx-auto"
  >
    <template #leading>
      <div class="flex justify-center">
        <UAvatar
          :text="avatarText"
          :src="avatarSrc"
          :alt="author"
          size="lg"
        />
      </div>
    </template>
    <template #body>
      <slot mdc-unwrap="p" />
    </template>
    <template #footer>
      <div class="text-sm text-muted">{{ author }}<span v-if="role"> - {{ role }}</span></div>
    </template>
  </UPageCard>
</template>

<script setup lang="ts">
interface Props {
  title: string
  author: string
  role?: string
  avatarText?: string
  avatarSrc?: string
}

const props = defineProps<Props>()

// Generate avatar text from author name if not provided
const avatarText = computed(() => {
  if (props.avatarText) return props.avatarText

  const names = props.author.split(' ')
  if (names.length >= 2) {
    return `${names[0][0]}${names[1][0]}`.toUpperCase()
  }
  return props.author.substring(0, 2).toUpperCase()
})
</script>

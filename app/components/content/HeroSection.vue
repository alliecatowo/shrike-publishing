<template>
  <UPageHero
    :title="title"
    :description="description"
    :links="processedLinks"
    class="bg-gradient-to-br from-primary/15 via-neutral-900/20 to-secondary/10 dark:from-primary/25 dark:via-neutral-900/30 dark:to-secondary/20"
  >
    <div class="absolute inset-0 bg-gradient-to-r from-primary/15 to-transparent pointer-events-none" />
    <slot />
  </UPageHero>
</template>

<script setup lang="ts">
interface Link {
  label: string
  to: string
  variant?: string
  icon?: string
  trailingIcon?: string
}

interface Props {
  title: string
  description?: string
  links?: Link[]
}

const props = withDefaults(defineProps<Props>(), {
  description: '',
  links: () => []
})

const processedLinks = computed(() => {
  return props.links.map(link => ({
    label: link.label,
    to: link.to,
    variant: link.variant || 'primary',
    ...(link.icon && { leadingIcon: link.icon }),
    ...(link.trailingIcon && { trailingIcon: link.trailingIcon })
  }))
})
</script>

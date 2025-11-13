<template>
  <UCard variant="outline" :class="`border-l-4 ${borderColorClass}`">
    <div class="space-y-6">
      <div class="flex items-start justify-between">
        <div class="flex items-start gap-4">
          <div :class="`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${iconBgClass}`">
            <UIcon :name="icon" class="h-6 w-6" :color="iconColor" />
          </div>
          <div>
            <h3 class="text-2xl font-bold mb-2">{{ title }}</h3>
            <UBadge :color="badgeColor" variant="soft">{{ badgeText }}</UBadge>
          </div>
        </div>
      </div>

      <div class="prose prose-lg dark:prose-invert max-w-none">
        <slot />
      </div>

      <div v-if="buttonText && buttonUrl" class="flex gap-3">
        <UButton
          :to="buttonUrl"
          :variant="buttonVariant"
          :icon="buttonIcon"
          :color="buttonColor"
        >
          {{ buttonText }}
        </UButton>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
interface Props {
  title: string
  icon: string
  badgeText: string
  badgeColor?: string
  borderColor?: string
  iconColor?: string
  buttonText?: string
  buttonUrl?: string
  buttonIcon?: string
  buttonVariant?: string
  buttonColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  badgeColor: 'primary',
  borderColor: 'primary',
  iconColor: 'primary',
  buttonVariant: 'outline',
  buttonColor: 'primary'
})

const borderColorClass = computed(() => {
  const colorMap = {
    primary: 'border-primary',
    pink: 'border-pink-500',
    purple: 'border-purple-500',
    green: 'border-green-500',
    blue: 'border-blue-500',
    success: 'border-green-500',
    error: 'border-red-500',
    warning: 'border-yellow-500'
  }
  return colorMap[props.borderColor as keyof typeof colorMap] || 'border-primary'
})

const iconBgClass = computed(() => {
  const colorMap = {
    primary: 'bg-primary/10',
    pink: 'bg-pink-500/10',
    purple: 'bg-purple-500/10',
    green: 'bg-green-500/10',
    blue: 'bg-blue-500/10',
    success: 'bg-green-500/10',
    error: 'bg-red-500/10',
    warning: 'bg-yellow-500/10'
  }
  return colorMap[props.borderColor as keyof typeof colorMap] || 'bg-primary/10'
})
</script>

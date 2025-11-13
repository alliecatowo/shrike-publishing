<template>
  <UCard class="hover:shadow-lg transition-shadow h-full">
    <div class="text-center space-y-4 p-6">
      <div
        :class="[
          'w-16 h-16 rounded-full flex items-center justify-center mx-auto',
          bgColorClass
        ]"
      >
        <UIcon :name="icon" class="h-8 w-8" :color="iconColor" />
      </div>
      <div>
        <h3 class="text-xl font-semibold mb-2">{{ title }}</h3>
        <div class="text-gray-600 dark:text-gray-400 text-sm mb-4">
          <slot mdc-unwrap="p" />
        </div>
        <UButton
          :icon="buttonIcon || icon"
          :color="iconColor"
          variant="solid"
          :target="external ? '_blank' : undefined"
          :rel="external ? 'noopener' : undefined"
          :href="url"
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
  url: string
  buttonText: string
  buttonIcon?: string
  color?: 'red' | 'blue' | 'indigo' | 'pink' | 'green' | 'primary' | 'info' | 'error' | 'warning' | 'success'
  external?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
  external: true
})

const bgColorClass = computed(() => {
  const colorMap = {
    red: 'bg-red-100 dark:bg-red-900',
    blue: 'bg-blue-100 dark:bg-blue-900',
    indigo: 'bg-indigo-100 dark:bg-indigo-900',
    pink: 'bg-pink-100 dark:bg-pink-900',
    green: 'bg-green-100 dark:bg-green-900',
    primary: 'bg-primary-100 dark:bg-primary-900',
    info: 'bg-blue-100 dark:bg-blue-900',
    error: 'bg-red-100 dark:bg-red-900',
    warning: 'bg-yellow-100 dark:bg-yellow-900',
    success: 'bg-green-100 dark:bg-green-900'
  }
  return colorMap[props.color]
})

const iconColor = computed(() => {
  const colorMap = {
    red: 'error',
    blue: 'info',
    indigo: 'info',
    pink: 'pink',
    green: 'success',
    primary: 'primary',
    info: 'info',
    error: 'error',
    warning: 'warning',
    success: 'success'
  }
  return colorMap[props.color] as any
})
</script>

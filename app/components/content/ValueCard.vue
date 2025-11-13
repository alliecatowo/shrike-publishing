<template>
  <UCard class="h-full">
    <div class="text-center space-y-4">
      <div
        :class="[
          'w-16 h-16 rounded-full flex items-center justify-center mx-auto',
          bgColorClass
        ]"
      >
        <UIcon :name="icon" class="h-8 w-8" :color="iconColor" />
      </div>
      <h3 class="text-xl font-semibold">{{ title }}</h3>
      <div class="text-gray-600 dark:text-gray-400">
        <slot mdc-unwrap="p" />
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
interface Props {
  title: string
  icon: string
  color?: 'blue' | 'red' | 'purple' | 'green' | 'yellow' | 'primary'
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary'
})

const bgColorClass = computed(() => {
  const colorMap = {
    blue: 'bg-blue-100 dark:bg-blue-900',
    red: 'bg-red-100 dark:bg-red-900',
    purple: 'bg-purple-100 dark:bg-purple-900',
    green: 'bg-green-100 dark:bg-green-900',
    yellow: 'bg-yellow-100 dark:bg-yellow-900',
    primary: 'bg-primary-100 dark:bg-primary-900'
  }
  return colorMap[props.color]
})

const iconColor = computed(() => {
  const colorMap = {
    blue: 'info',
    red: 'error',
    purple: 'purple',
    green: 'success',
    yellow: 'warning',
    primary: 'primary'
  }
  return colorMap[props.color]
})
</script>

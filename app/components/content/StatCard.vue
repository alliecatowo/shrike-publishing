<template>
  <UPageCard
    :title="title"
    variant="soft"
    :spotlight="true"
    :spotlight-color="color"
    class="text-center group"
  >
    <template #header>
      <div class="flex justify-center mb-4">
        <div class="relative">
          <div
            :class="[
              'absolute inset-0 blur-lg rounded-full transition-colors',
              `bg-${color}/20 group-hover:bg-${color}/30`
            ]"
          />
          <div
            :class="[
              'relative w-12 h-12 rounded-full flex items-center justify-center',
              `bg-gradient-to-br from-${color}/20 to-${color}/10`
            ]"
          >
            <UIcon :name="icon" :class="['h-6 w-6', `text-${color}`]" />
          </div>
        </div>
      </div>
    </template>
    <template #body>
      <slot mdc-unwrap="p" />
    </template>
  </UPageCard>
</template>

<script setup lang="ts">
interface Props {
  title: string
  icon: string
  color?: string
}

withDefaults(defineProps<Props>(), {
  color: 'primary'
})
</script>

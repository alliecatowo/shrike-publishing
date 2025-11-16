<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-20">
    <!-- Contact Form Card -->
    <UCard>
      <template #header>
        <h2 class="text-2xl font-bold">Send us a message</h2>
      </template>
      <ContactForm />
    </UCard>

    <!-- Business Information Card -->
    <UCard>
      <template #header>
        <h2 class="text-2xl font-bold">Business Information</h2>
      </template>
      <div class="space-y-8">
        <div>
          <h3 class="text-lg font-semibold mb-3">Mailing Address</h3>
          <div class="space-y-1 text-sm text-gray-600 dark:text-gray-400">
            <slot name="address" />
          </div>
        </div>
        <div class="border-t border-gray-200 dark:border-gray-800 pt-6">
          <h3 class="text-lg font-semibold mb-3">Business Hours</h3>
          <div class="space-y-1 text-sm text-gray-600 dark:text-gray-400">
            <slot name="hours" />
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
// Pure prose component - manages layout and styling
// Content passed via named slots
</script>

<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'

withDefaults(defineProps<{
  showHeading?: boolean
  title?: string
  description?: string
}>(), {
  showHeading: false,
  title: 'Stay Updated',
  description: 'Subscribe to receive updates about new releases, exclusive discounts, and behind-the-scenes content.'
})

const schema = v.object({
  email: v.pipe(v.string(), v.email('Invalid email address'))
})

type Schema = v.InferOutput<typeof schema>

const state = reactive({
  email: ''
})

const config = useRuntimeConfig()
const toast = useToast()
const loading = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  try {
    // Call Loops public API directly (works on static sites)
    const formBody = new URLSearchParams({ email: event.data.email }).toString()
    await $fetch(`https://app.loops.so/api/newsletter-form/${config.public.loopsFormId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formBody
    })

    toast.add({
      title: 'Success!',
      description: 'You\'re subscribed to our newsletter',
      color: 'success',
      icon: 'i-lucide-check-circle'
    })

    state.email = ''
  } catch (error: unknown) {
    console.error('Newsletter signup error:', error)
    toast.add({
      title: 'Subscription failed',
      description: 'Failed to subscribe. Please try again.',
      color: 'error',
      icon: 'i-lucide-x-circle'
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UPageCard
    variant="soft"
    orientation="vertical"
    class="max-w-3xl mx-auto"
    :spotlight="true"
    spotlight-color="primary"
  >
    <template #header>
      <div class="flex items-center justify-center">
        <div class="relative">
          <div class="absolute inset-0 blur-xl bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full" />
          <div class="relative w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
            <UIcon name="i-lucide-mail" class="h-8 w-8 text-white" />
          </div>
        </div>
      </div>
    </template>

    <template #body>
      <div v-if="showHeading" class="text-center space-y-3 mb-6">
        <h3 class="text-2xl font-bold">{{ title }}</h3>
        <p class="text-muted text-lg">
          {{ description }}
        </p>
      </div>

      <UForm :schema="schema" :state="state" @submit="onSubmit" class="max-w-md mx-auto">
        <UFormField name="email">
          <UInput
            v-model="state.email"
            type="email"
            placeholder="your@email.com"
            size="xl"
            :disabled="loading"
            icon="i-lucide-mail"
          >
            <template #trailing>
              <UButton
                type="submit"
                :loading="loading"
                size="md"
                icon="i-lucide-arrow-right"
                color="primary"
                :disabled="loading"
                aria-label="Subscribe"
              />
            </template>
          </UInput>
        </UFormField>
      </UForm>
    </template>

    <template #footer>
      <div class="text-center">
        <p class="text-sm text-muted flex items-center justify-center gap-2">
          <UIcon name="i-lucide-shield-check" class="h-4 w-4" />
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </template>
  </UPageCard>
</template>

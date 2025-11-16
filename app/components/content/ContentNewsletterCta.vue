<script setup lang="ts">
/**
 * NewsletterCTA Component
 *
 * A prose-friendly wrapper around UPageCTA for newsletter signup.
 * Uses slots for title, description, and footer text.
 *
 * Usage in MDC:
 * ::newsletter-cta
 * #title
 * Join Our Community
 *
 * #description
 * Subscribe to our newsletter...
 *
 * #footer
 * We respect your privacy. Unsubscribe at any time.
 * ::
 */

import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'

defineProps<{
  variant?: 'outline' | 'solid' | 'soft' | 'subtle' | 'naked'
  icon?: string
}>()

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
  <UPageCTA :variant="variant || 'soft'" orientation="vertical" class="relative overflow-hidden">
    <!-- Decorative gradient background -->
    <div class="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none" />
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(var(--color-primary-500)/0.1),transparent_50%)] pointer-events-none" />

    <template #header>
      <div class="flex flex-col items-center space-y-6">
        <div class="relative">
          <div class="absolute inset-0 blur-2xl bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full animate-pulse" />
          <div class="relative w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
            <UIcon name="i-lucide-mail" class="h-8 w-8 text-white" />
          </div>
        </div>

        <div class="text-center space-y-3">
          <h3 class="text-2xl font-bold">
            <slot name="title">Join Our Community</slot>
          </h3>
          <p class="text-base">
            <slot name="description">
              Subscribe to our newsletter and stay updated with our latest releases, behind-the-scenes content, and exclusive offers.
            </slot>
          </p>
        </div>
      </div>
    </template>

    <template #footer>
      <UForm :schema="schema" :state="state" class="w-full max-w-lg mx-auto mb-6" @submit="onSubmit">
        <UFormField name="email" class="w-full">
          <UInput
            v-model="state.email"
            type="email"
            placeholder="Enter your email address"
            size="xl"
            :disabled="loading"
            icon="i-lucide-mail"
            class="w-full py-1"
          >
            <template #trailing>
              <UButton
                type="submit"
                :loading="loading"
                size="lg"
                icon="i-lucide-arrow-right"
                color="primary"
                :disabled="loading"
                aria-label="Subscribe"
              >
                Subscribe
              </UButton>
            </template>
          </UInput>
        </UFormField>
      </UForm>

      <p class="text-sm text-muted flex items-center justify-center gap-2">
        <UIcon name="i-lucide-shield-check" class="h-4 w-4" />
        <slot name="footer">We respect your privacy. Unsubscribe at any time.</slot>
      </p>
    </template>
  </UPageCTA>
</template>

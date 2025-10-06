<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'

const props = withDefaults(defineProps<{
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
    const response = await $fetch(`https://app.loops.so/api/newsletter-form/${config.public.loopsFormId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formBody
    })

    toast.add({
      title: 'Success!',
      description: 'You\'re subscribed to our newsletter',
      color: 'green',
      icon: 'i-lucide-check-circle'
    })

    state.email = ''
  } catch (error: any) {
    console.error('Newsletter signup error:', error)
    toast.add({
      title: 'Subscription failed',
      description: 'Failed to subscribe. Please try again.',
      color: 'red',
      icon: 'i-lucide-x-circle'
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto text-center space-y-6">
    <div class="flex items-center justify-center">
      <div class="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
        <UIcon name="i-lucide-mail" class="h-6 w-6 text-primary" />
      </div>
    </div>

    <div v-if="showHeading" class="space-y-3">
      <h3 class="text-2xl font-bold">{{ title }}</h3>
      <p class="text-muted">
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
          :ui="{
            icon: { trailing: { pointer: '' } }
          }"
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

    <p class="text-sm text-muted">
      We respect your privacy. Unsubscribe at any time.
    </p>
  </div>
</template>

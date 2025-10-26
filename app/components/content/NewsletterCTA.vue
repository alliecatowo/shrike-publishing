<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'

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
  <UForm :schema="schema" :state="state" class="w-full max-w-md mx-auto" @submit="onSubmit">
    <UFormField name="email" class="w-full">
      <UInput
        v-model="state.email"
        type="email"
        placeholder="your@email.com"
        size="xl"
        :disabled="loading"
        icon="i-lucide-mail"
        class="w-full"
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

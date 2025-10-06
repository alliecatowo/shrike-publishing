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
  <UForm :schema="schema" :state="state" @submit="onSubmit">
    <UInput
      v-model="state.email"
      type="email"
      name="email"
      placeholder="your@email.com"
      size="lg"
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
          size="sm"
          icon="i-lucide-arrow-right"
          color="primary"
          :disabled="loading"
          aria-label="Subscribe"
        />
      </template>
    </UInput>
  </UForm>
</template>

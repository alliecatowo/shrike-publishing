<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'
import { TOAST_MESSAGES } from '~/constants/messages'

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
      ...TOAST_MESSAGES.newsletter.success,
      color: 'success'
    })

    state.email = ''
  } catch (error: unknown) {
    console.error('Newsletter signup error:', error)
    toast.add({
      ...TOAST_MESSAGES.newsletter.error,
      color: 'error'
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

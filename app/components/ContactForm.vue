<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'
import { CONTACT_FORM_SUBJECTS, TOAST_MESSAGES } from '~/constants/messages'

const schema = v.object({
  name: v.pipe(v.string(), v.minLength(2, 'Name must be at least 2 characters')),
  email: v.pipe(v.string(), v.email('Invalid email address')),
  subject: v.pipe(v.string(), v.minLength(1, 'Please select a subject')),
  message: v.pipe(v.string(), v.minLength(10, 'Message must be at least 10 characters'))
})

type Schema = v.InferOutput<typeof schema>

const state = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const toast = useToast()
const loading = ref(false)

const subjectOptions = CONTACT_FORM_SUBJECTS

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  try {
    // In a real app, you'd send this to your backend
    console.log('Form submitted:', event.data)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    toast.add({
      ...TOAST_MESSAGES.contact.success,
      color: 'success'
    })

    // Reset form
    Object.assign(state, {
      name: '',
      email: '',
      subject: '',
      message: ''
    })
  } catch (error) {
    console.error('Error submitting form:', error)
    toast.add({
      ...TOAST_MESSAGES.contact.error,
      color: 'error'
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-6" @submit="onSubmit">
    <UFormField label="Name" name="name" required>
      <UInput
        v-model="state.name"
        placeholder="Your name"
        :disabled="loading"
      />
    </UFormField>

    <UFormField label="Email" name="email" required>
      <UInput
        v-model="state.email"
        type="email"
        placeholder="your@email.com"
        :disabled="loading"
      />
    </UFormField>

    <UFormField label="Subject" name="subject" required>
      <USelectMenu
        v-model="state.subject"
        :items="subjectOptions"
        placeholder="Select a subject"
        :disabled="loading"
      />
    </UFormField>

    <UFormField label="Message" name="message" required>
      <UTextarea
        v-model="state.message"
        placeholder="Your message..."
        :rows="5"
        :disabled="loading"
      />
    </UFormField>

    <UButton type="submit" size="lg" :loading="loading">
      Send Message
    </UButton>
  </UForm>
</template>

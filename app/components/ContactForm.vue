<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'

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

const subjectOptions = [
  { label: 'General Inquiry', value: 'General Inquiry' },
  { label: 'Game Support', value: 'Game Support' },
  { label: 'Business Partnership', value: 'Business Partnership' },
  { label: 'Press/Media', value: 'Press/Media' },
  { label: 'Bug Report', value: 'Bug Report' },
  { label: 'Other', value: 'Other' }
]

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  try {
    // In a real app, you'd send this to your backend
    console.log('Form submitted:', event.data)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    toast.add({
      title: 'Message sent!',
      description: 'Thank you for your message! We\'ll get back to you soon.',
      color: 'green',
      icon: 'i-lucide-check-circle'
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
      title: 'Error',
      description: 'There was an error sending your message. Please try again.',
      color: 'red',
      icon: 'i-lucide-x-circle'
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

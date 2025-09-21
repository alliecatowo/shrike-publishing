<template>
  <UContainer class="py-8">
    <div class="max-w-4xl mx-auto space-y-12">
      <!-- Page Header -->
      <div class="text-center space-y-4">
        <h1 class="text-4xl font-bold">Contact & Connect</h1>
        <p class="text-xl text-gray-600 dark:text-gray-400">
          Get in touch and follow us across all platforms.
        </p>
      </div>

      <!-- Social Links Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Patreon -->
        <UCard class="hover:shadow-lg transition-shadow">
          <div class="text-center space-y-4 p-6">
            <div class="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto">
              <Icon name="mdi:heart-outline" class="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 class="text-xl font-semibold mb-2">Support Us</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Become a patron and get exclusive content, early access, and behind-the-scenes updates.
              </p>
              <UButton
                icon="i-heroicons-heart"
                color="error"
                variant="solid"
                target="_blank"
                rel="noopener"
                href="https://patreon.com/shrikepublishing"
              >
                Become a Patron
              </UButton>
            </div>
          </div>
        </UCard>

        <!-- Discord -->
        <UCard class="hover:shadow-lg transition-shadow">
          <div class="text-center space-y-4 p-6">
            <div class="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto">
              <Icon name="mdi:chat-outline" class="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 class="text-xl font-semibold mb-2">Join Our Community</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Connect with fellow gamers, share strategies, and get real-time updates from our team.
              </p>
              <UButton
                icon="i-heroicons-chat-bubble-left-right"
                color="info"
                variant="solid"
                target="_blank"
                rel="noopener"
                href="https://discord.gg/shrikepublishing"
              >
                Join Discord
              </UButton>
            </div>
          </div>
        </UCard>

        <!-- Twitter -->
        <UCard class="hover:shadow-lg transition-shadow">
          <div class="text-center space-y-4 p-6">
            <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
              <Icon name="mdi:at" class="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 class="text-xl font-semibold mb-2">Follow on Twitter</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Get quick updates, announcements, and engage with our community.
              </p>
              <UButton
                icon="i-heroicons-at-symbol"
                color="primary"
                variant="solid"
                target="_blank"
                rel="noopener"
                href="https://twitter.com/shrikepub"
              >
                Follow @shrikepub
              </UButton>
            </div>
          </div>
        </UCard>

        <!-- Instagram -->
        <UCard class="hover:shadow-lg transition-shadow">
          <div class="text-center space-y-4 p-6">
            <div class="w-16 h-16 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center mx-auto">
              <Icon name="mdi:camera-outline" class="h-8 w-8 text-pink-600 dark:text-pink-400" />
            </div>
            <div>
              <h3 class="text-xl font-semibold mb-2">Instagram</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
                See artwork, gameplay photos, and creative process behind our games.
              </p>
              <UButton
                icon="i-heroicons-camera"
                color="warning"
                variant="solid"
                target="_blank"
                rel="noopener"
                href="https://instagram.com/shrikepublishing"
              >
                Follow on Instagram
              </UButton>
            </div>
          </div>
        </UCard>

        <!-- Facebook -->
        <UCard class="hover:shadow-lg transition-shadow">
          <div class="text-center space-y-4 p-6">
            <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
              <Icon name="mdi:web" class="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 class="text-xl font-semibold mb-2">Facebook</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Join our community page for discussions and event updates.
              </p>
              <UButton
                icon="i-heroicons-globe-alt"
                color="primary"
                variant="solid"
                target="_blank"
                rel="noopener"
                href="https://facebook.com/shrikepublishing"
              >
                Like on Facebook
              </UButton>
            </div>
          </div>
        </UCard>

        <!-- Email -->
        <UCard class="hover:shadow-lg transition-shadow">
          <div class="text-center space-y-4 p-6">
            <div class="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
              <Icon name="mdi:email-outline" class="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 class="text-xl font-semibold mb-2">Email Us</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Have questions about our games or want to get in touch? Send us an email.
              </p>
              <UButton
                icon="i-heroicons-envelope"
                color="success"
                variant="solid"
                href="mailto:hello@shrikepublishing.com"
              >
                Send Email
              </UButton>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Contact Form -->
      <UCard>
        <template #header>
          <h2 class="text-2xl font-bold">Send us a message</h2>
        </template>

        <UForm
          class="space-y-6"
          :schema="schema"
          :state="form"
          @submit="onSubmit"
        >
          <UFieldGroup label="Name" name="name">
            <UInput
              v-model="form.name"
              placeholder="Your name"
              required
            />
          </UFieldGroup>

          <UFieldGroup label="Email" name="email">
            <UInput
              v-model="form.email"
              type="email"
              placeholder="your@email.com"
              required
            />
          </UFieldGroup>

          <UFieldGroup label="Subject" name="subject">
            <USelect
              v-model="form.subject"
              :options="subjectOptions"
              placeholder="Select a subject"
              required
            />
          </UFieldGroup>

          <UFieldGroup label="Message" name="message">
            <UTextarea
              v-model="form.message"
              placeholder="Your message..."
              :rows="5"
              required
            />
          </UFieldGroup>

          <UButton type="submit" size="lg" :loading="loading">
            Send Message
          </UButton>
        </UForm>
      </UCard>

      <!-- Business Information -->
      <UCard>
        <h2 class="text-2xl font-bold mb-4">Business Information</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="font-semibold mb-2">Mailing Address</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Shrike Publishing<br>
              [Your Address]<br>
              [City, State ZIP]<br>
              [Country]
            </p>
          </div>
          <div>
            <h3 class="font-semibold mb-2">Business Hours</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Monday - Friday: 9:00 AM - 6:00 PM EST<br>
              Email responses within 24-48 hours
            </p>
          </div>
        </div>
      </UCard>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const loading = ref(false)

const subjectOptions = [
  'General Inquiry',
  'Game Support',
  'Business Partnership',
  'Press/Media',
  'Bug Report',
  'Other'
]

const schema = {
  name: { type: 'string', required: true, minLength: 2 },
  email: { type: 'string', required: true, format: 'email' },
  subject: { type: 'string', required: true },
  message: { type: 'string', required: true, minLength: 10 }
}

const onSubmit = async () => {
  loading.value = true
  try {
    // In a real app, you'd send this to your backend
    console.log('Form submitted:', form)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Reset form
    Object.assign(form, {
      name: '',
      email: '',
      subject: '',
      message: ''
    })

    // Show success message
    alert('Thank you for your message! We\'ll get back to you soon.')
  } catch (error) {
    console.error('Error submitting form:', error)
    alert('There was an error sending your message. Please try again.')
  } finally {
    loading.value = false
  }
}

// SEO
useSeoMeta({
  title: 'Contact - Shrike Publishing',
  description: 'Get in touch with Shrike Publishing. Find us on social media, support us on Patreon, and send us a message.'
})
</script>

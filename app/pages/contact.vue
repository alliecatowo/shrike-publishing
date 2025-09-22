<template>
  <UContainer class="py-8">
    <div class="max-w-4xl mx-auto space-y-12">
      <!-- Page Header -->
      <div class="text-center space-y-4">
        <h1 class="text-4xl font-bold">{{ page.title }}</h1>
        <p class="text-xl text-gray-600 dark:text-gray-400">
          {{ page.description }}
        </p>
      </div>

      <!-- Social Links Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UCard v-for="(link, index) in page.socialLinks" :key="index" class="hover:shadow-lg transition-shadow">
          <div class="text-center space-y-4 p-6">
            <div
              class="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
              :class="`bg-${link.bgColor} dark:bg-${link.bgColor.replace('-100', '-900')}`"
            >
              <Icon :name="link.icon" class="h-8 w-8" :class="`text-${link.textColor} dark:text-${link.textColor.replace('-600', '-400')}`" />
            </div>
            <div>
              <h3 class="text-xl font-semibold mb-2">{{ link.platform }}</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {{ link.description }}
              </p>
              <UButton
                :icon="link.buttonIcon"
                :color="link.buttonColor"
                variant="solid"
                target="_blank"
                rel="noopener"
                :href="link.url"
              >
                {{ link.buttonText }}
              </UButton>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Contact Form -->
      <UCard>
        <template #header>
          <h2 class="text-2xl font-bold">{{ page.contactFormTitle }}</h2>
        </template>

        <UForm
          class="space-y-6"
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
        <h2 class="text-2xl font-bold mb-4">{{ page.businessInfoTitle }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="font-semibold mb-2">Mailing Address</h3>
            <p class="text-gray-600 dark:text-gray-400" v-html="page.mailingAddress.replace(/\n/g, '<br>')"></p>
          </div>
          <div>
            <h3 class="font-semibold mb-2">Business Hours</h3>
            <p class="text-gray-600 dark:text-gray-400" v-html="page.businessHours.replace(/\n/g, '<br>')"></p>
          </div>
        </div>
      </UCard>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const { data: page } = await useAsyncData('contact-page', () => queryContent('/pages/contact').findOne())

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
  title: page.value?.metaTitle,
  description: page.value?.metaDescription
})
</script>

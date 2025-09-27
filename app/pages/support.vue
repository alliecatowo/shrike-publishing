<template>
  <UContainer class="py-8">
    <UPageHero
      title="Support Us"
      description="If you enjoy our work, please consider supporting us on Patreon or Ko-fi. Your support helps us create more content."
      :ui="{ container: 'text-center' }"
    />

    <UPageGrid :cols="{ default: 1, md: 2 }" class="gap-8 mt-8">
      <UPageCard
        icon="i-lucide-users"
        title="Become a Patron"
        description="Get exclusive access to behind-the-scenes content, early releases, and a special role in our Discord community. Your support helps us create more of the content you love!"
        to="https://patreon.com/shrikepublishing"
        target="_blank"
        spotlight
        spotlight-color="primary"
        class="hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-xl"
      >
        <template #leading>
          <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto">
            <UIcon name="i-lucide-users" class="h-8 w-8 text-primary-600 dark:text-primary-400" />
          </div>
        </template>
        <template #footer>
          <UButton
            icon="i-lucide-users"
            color="primary"
            variant="solid"
            target="_blank"
            rel="noopener"
            to="https://patreon.com/shrikepublishing"
          >
            Become a Patron
          </UButton>
        </template>
      </UPageCard>

      <UPageCard
        icon="i-lucide-coffee"
        title="Buy Us a Coffee"
        description="A one-time donation to show your appreciation. Every coffee helps us stay fueled and focused on creating great games and stories for you to enjoy!"
        to="https://ko-fi.com/shrikepublishing"
        target="_blank"
        spotlight
        spotlight-color="secondary"
        class="hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-xl"
      >
        <template #leading>
          <div class="w-16 h-16 bg-secondary-100 dark:bg-secondary-900 rounded-full flex items-center justify-center mx-auto">
            <UIcon name="i-lucide-coffee" class="h-8 w-8 text-secondary-600 dark:text-secondary-400" />
          </div>
        </template>
        <template #footer>
          <UButton
            icon="i-lucide-coffee"
            color="secondary"
            variant="solid"
            target="_blank"
            rel="noopener"
            to="https://ko-fi.com/shrikepublishing"
          >
            Buy us a coffee
          </UButton>
        </template>
      </UPageCard>
    </UPageGrid>
  </UContainer>
</template>

<script setup>
// No custom JS or CSS needed for spotlight effect with UPageCard
</script>

<style>
/* No custom CSS needed for spotlight effect with UPageCard */
</style>

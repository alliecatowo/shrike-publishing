<template>
  <UContainer class="py-8">
    <UPageHero
      title="Support Us"
      description="If you enjoy our work, please consider supporting us on Patreon or Ko-fi. Your support helps us create more content."
      :ui="{ container: 'text-center' }"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      <UPageCard
        icon="simple-icons:patreon"
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
            <Icon name="simple-icons:patreon" class="h-8 w-8 text-primary-600 dark:text-primary-400" />
          </div>
        </template>
        <template #footer>
          <UButton
            icon="i-simple-icons-patreon"
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
        icon="simple-icons:kofi"
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
            <Icon name="simple-icons:kofi" class="h-8 w-8 text-secondary-600 dark:text-secondary-400" />
          </div>
        </template>
        <template #footer>
          <UButton
            icon="i-simple-icons-kofi"
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
    </div>
  </UContainer>
</template>

<script setup>
// No custom JS or CSS needed for spotlight effect with UPageCard
</script>

<style>
/* No custom CSS needed for spotlight effect with UPageCard */
</style>

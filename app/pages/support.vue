<template>
  <UContainer class="py-8">
    <UPageHeader
      title="Support Us"
      description="If you enjoy our work, please consider supporting us on Patreon or Ko-fi. Your support helps us create more content."
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      <UCard class="hover:shadow-lg transition-shadow">
        <div class="text-center space-y-4 p-6">
          <div class="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto">
            <Icon name="simple-icons:patreon" class="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-2">Patreon</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Become a patron and get exclusive content, early access, and behind-the-scenes updates.
            </p>
            <UButton
              icon="i-simple-icons-patreon"
              color="red"
              variant="solid"
              target="_blank"
              rel="noopener"
              to="https://patreon.com/shrikepublishing"
            >
              Become a Patron
            </UButton>
          </div>
        </div>
      </UCard>

      <UCard class="hover:shadow-lg transition-shadow">
        <div class="text-center space-y-4 p-6">
          <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
            <Icon name="simple-icons:kofi" class="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-2">Ko-fi</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Buy us a coffee to show your support.
            </p>
            <UButton
              icon="i-simple-icons-kofi"
              color="blue"
              variant="solid"
              target="_blank"
              rel="noopener"
              to="https://ko-fi.com/shrikepublishing"
            >
              Buy us a coffee
            </UButton>
          </div>
        </div>
      </UCard>
    </div>
  </UContainer>
</template>
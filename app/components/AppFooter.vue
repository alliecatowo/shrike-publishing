<template>
  <UFooter>
    <template #top>
      <UContainer>
        <UFooterColumns :columns="appConfig.footer.columns">
          <template #right>
            <div class="space-y-4">
              <h3 class="text-sm font-semibold text-highlighted">{{ appConfig.footer.newsletter.title }}</h3>
              <p class="text-sm text-muted leading-relaxed">
                {{ appConfig.footer.newsletter.description }}
              </p>
              <NewsletterSignup />
              <div class="flex gap-2 pt-2">
                <UButton
                  v-for="social in appConfig.footer.social"
                  :key="social.icon"
                  :icon="social.icon"
                  color="neutral"
                  variant="ghost"
                  :to="social.to"
                />
              </div>
            </div>
          </template>
        </UFooterColumns>
      </UContainer>
    </template>

    <template #default>
      <UContainer>
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p class="text-sm text-muted">
            {{ appConfig.footer.copyright.replace('{year}', new Date().getFullYear().toString()) }}
          </p>
          <div class="flex gap-4">
            <ULink
              v-for="link in appConfig.footer.bottom"
              :key="link.to"
              :to="link.to"
              class="text-sm text-muted hover:text-primary"
            >
              {{ link.label }}
            </ULink>
          </div>
        </div>
      </UContainer>
    </template>
  </UFooter>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()
</script>

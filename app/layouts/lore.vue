<script setup lang="ts">
// Fetch lore navigation for the sidebar
const { data: loreNavigation } = await useAsyncData('lore-navigation-layout', () =>
  queryCollectionNavigation('lore')
)
</script>

<template>
  <div>
    <AppHeader />
    <UMain>
      <UContainer>
        <UPage>
          <template #left>
            <UPageAside>
              <UContentNavigation
                v-if="loreNavigation && loreNavigation.length > 0"
                :navigation="loreNavigation"
                highlight
                color="primary"
                variant="pill"
              />
            </UPageAside>
          </template>

          <UPageMain>
            <slot />
          </UPageMain>
        </UPage>
      </UContainer>
    </UMain>
    <AppFooter />
  </div>
</template>

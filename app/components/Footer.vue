<template>
  <UFooter class="border-t border-primary/15 dark:bg-neutral-900/60 dark:supports-[backdrop-filter]:bg-neutral-900/50">
    <UContainer>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Brand Section -->
        <div class="space-y-4">
          <NuxtLink to="/" class="flex items-center">
            <NuxtImg
              src="/ShrikeLogoNov2021.png"
              alt="Shrike Publishing"
              class="h-8 w-auto"
              loading="lazy"
            />
          </NuxtLink>
          <p class="text-sm text-muted max-w-xs leading-relaxed">
            {{ footer?.tagline || 'Independent tabletop game publisher creating immersive worlds and unforgettable stories.' }}
          </p>
        </div>

        <!-- Quick Links -->
        <div class="space-y-4">
          <h3 class="text-sm font-semibold text-highlighted">Quick Links</h3>
          <div class="space-y-2">
            <UButton
              v-for="link in quickLinks"
              :key="link.label"
              :to="link.to"
              variant="ghost"
              size="sm"
              class="justify-start p-0 h-auto text-muted hover:text-primary"
            >
              {{ link.label }}
            </UButton>
          </div>
        </div>

        <!-- Games -->
        <div class="space-y-4">
          <h3 class="text-sm font-semibold text-highlighted">Games</h3>
          <div class="space-y-2">
            <UButton
              v-for="game in gameLinks"
              :key="game.label"
              :to="game.to"
              variant="ghost"
              size="sm"
              class="justify-start p-0 h-auto text-muted hover:text-primary"
            >
              {{ game.label }}
            </UButton>
          </div>
        </div>

        <!-- Connect -->
        <div class="space-y-4">
          <h3 class="text-sm font-semibold text-highlighted">Connect</h3>
          <p class="text-sm text-muted leading-relaxed">
            Stay updated with our latest releases and news.
          </p>
          <div class="flex gap-2">
            <UButton
              to="/contact"
              size="sm"
              variant="outline"
              leading-icon="i-lucide-mail"
            >
              Contact
            </UButton>
            <UButton
              to="/blog"
              size="sm"
              variant="ghost"
              leading-icon="i-lucide-rss"
            >
              Blog
            </UButton>
          </div>
        </div>
      </div>

      <!-- Bottom Section -->
      <USeparator class="my-8" />
      <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
        <p class="text-sm text-muted">
          {{ footer?.copyright || `© ${new Date().getFullYear()} Shrike Publishing. All rights reserved.` }}
        </p>
        <div class="flex gap-4">
          <UButton to="/about" variant="ghost" size="sm" class="text-muted hover:text-primary">
            About
          </UButton>
          <UButton to="/contact" variant="ghost" size="sm" class="text-muted hover:text-primary">
            Contact
          </UButton>
          <UButton to="/manuals" variant="ghost" size="sm" class="text-muted hover:text-primary">
            Manuals
          </UButton>
        </div>
      </div>
    </UContainer>
  </UFooter>
</template>

<script setup lang="ts">
const { data: footer } = await useAsyncData('footer-content', () =>
  queryCollection('footer').first()
)

// Static navigation links
const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Stories', to: '/stories' },
  { label: 'Announcements', to: '/announcements' },
  { label: 'Manuals', to: '/manuals' }
]

const gameLinks = [
  { label: 'All Games', to: '/games' },
  { label: 'Blood Neon', to: '/games/blood-neon' },
  { label: 'Era of Silence', to: '/games/era-of-silence' }
]
</script>

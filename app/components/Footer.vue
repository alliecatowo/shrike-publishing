<template>
  <UFooter>
    <template #top>
      <UContainer>
        <UFooterColumns :columns="footerColumns">
          <template #right>
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
          </template>
        </UFooterColumns>
      </UContainer>
    </template>

    <template #default>
      <UContainer>
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p class="text-sm text-muted">
            {{ footer?.copyright || `© ${new Date().getFullYear()} Shrike Publishing. All rights reserved.` }}
          </p>
          <div class="flex gap-4">
            <ULink to="/about" class="text-sm text-muted hover:text-primary">About</ULink>
            <ULink to="/contact" class="text-sm text-muted hover:text-primary">Contact</ULink>
            <ULink to="/manuals" class="text-sm text-muted hover:text-primary">Manuals</ULink>
          </div>
        </div>
      </UContainer>
    </template>
  </UFooter>
</template>

<script setup lang="ts">
import type { FooterColumn } from '@nuxt/ui/dist/runtime/types';

const { data: footer } = await useAsyncData('footer-content', () =>
  queryCollection('footer').first()
)

const footerColumns: FooterColumn[] = [
  {
    label: 'Quick Links',
    children: [
      { label: 'Home', to: '/' },
      { label: 'Stories', to: '/stories' },
      { label: 'Announcements', to: '/announcements' },
      { label: 'Manuals', to: '/manuals' },
    ],
  },
  {
    label: 'Games',
    children: [
      { label: 'All Games', to: '/games' },
      { label: 'Blood Neon', to: '/games/blood-neon' },
      { label: 'Era of Silence', to: '/games/era-of-silence' },
    ],
  },
]
</script>

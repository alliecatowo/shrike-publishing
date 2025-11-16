<template>
  <div>
    <!-- Hero Section -->
    <UPageHero
      title="Shop Shrike Publishing"
      description="Support independent tabletop game publishing. Purchase our games, support us on Ko-fi, or browse our digital storefronts."
      class="bg-gradient-to-br from-pink-100/50 via-purple-100/30 to-rose-100/50 dark:from-pink-900/20 dark:via-purple-900/15 dark:to-rose-900/20"
    >
      <template #links>
        <UButton
          to="#storefronts"
          size="lg"
          color="pink"
          trailing-icon="i-lucide-shopping-bag"
        >
          Browse Our Games
        </UButton>
        <UButton
          to="#support"
          variant="outline"
          size="lg"
          trailing-icon="i-lucide-heart"
        >
          Support Us
        </UButton>
      </template>
    </UPageHero>

    <!-- Ko-fi Support Section -->
    <UPageSection
      id="support"
      title="Support Our Work"
      description="Help us create more amazing tabletop experiences"
      :ui="{ container: 'text-center' }"
    >
      <div class="max-w-2xl mx-auto">
        <UCard variant="outline" class="border-pink-200 dark:border-pink-800">
          <div class="space-y-6">
            <div class="flex items-center justify-center">
              <div class="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                <UIcon name="i-lucide-coffee" class="h-8 w-8 text-white" />
              </div>
            </div>

            <div class="space-y-3">
              <h3 class="text-2xl font-bold">Buy Us a Coffee on Ko-fi</h3>
              <p class="text-gray-600 dark:text-gray-400">
                Your support helps us continue creating innovative games and content.
                Every contribution goes directly toward development, art, and publishing costs.
              </p>
            </div>

            <!-- Ko-fi Widget Embed -->
            <div class="flex justify-center">
              <div class="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <iframe
                  id="kofiframe"
                  src="https://ko-fi.com/shrikepublishing/?hidefeed=true&widget=true&embed=true&preview=true"
                  style="border:none;width:100%;padding:4px;background:#f9f9f9;"
                  height="712"
                  title="shrikepublishing"
                  class="rounded"
                />
              </div>
            </div>

            <div class="text-sm text-gray-500">
              <p>Secure payments through Ko-fi. One-time or monthly support available.</p>
            </div>
          </div>
        </UCard>
      </div>
    </UPageSection>

    <!-- Digital Storefronts -->
    <UPageSection
      id="storefronts"
      title="Our Digital Storefronts"
      description="Purchase our games from your favorite platform"
      :ui="{ container: 'text-center' }"
    >
      <UPageGrid :cols="{ default: 1, md: 2 }" class="gap-8 max-w-4xl mx-auto">
        <!-- Itch.io Card -->
        <UCard
          variant="outline"
          class="group hover:shadow-xl transition-all duration-300 hover:border-pink-300 dark:hover:border-pink-700 hover:-translate-y-1"
        >
          <div class="space-y-6">
            <div class="flex items-center justify-center">
              <div class="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <UIcon name="i-lucide-gamepad-2" class="h-10 w-10 text-white" />
              </div>
            </div>

            <div class="space-y-3">
              <h3 class="text-2xl font-bold">Itch.io</h3>
              <p class="text-gray-600 dark:text-gray-400">
                Browse our complete catalog of digital games, supplements, and pay-what-you-want content.
              </p>
            </div>

            <div class="space-y-2">
              <div class="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <UIcon name="i-lucide-check-circle" class="h-4 w-4 " color="success" />
                <span>Instant digital downloads</span>
              </div>
              <div class="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <UIcon name="i-lucide-check-circle" class="h-4 w-4 " color="success" />
                <span>Pay what you want options</span>
              </div>
              <div class="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <UIcon name="i-lucide-check-circle" class="h-4 w-4 " color="success" />
                <span>Community ratings & reviews</span>
              </div>
            </div>

            <UButton
              to="https://shrikepublishing.itch.io/"
              target="_blank"
              external
              size="lg"
              color="pink"
              block
              trailing-icon="i-lucide-external-link"
            >
              Visit Our Itch.io Store
            </UButton>
          </div>
        </UCard>

        <!-- DriveThruRPG Card -->
        <UCard
          variant="outline"
          class="group hover:shadow-xl transition-all duration-300 hover:border-purple-300 dark:hover:border-purple-700 hover:-translate-y-1"
        >
          <div class="space-y-6">
            <div class="flex items-center justify-center">
              <div class="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <UIcon name="i-lucide-book-open" class="h-10 w-10 text-white" />
              </div>
            </div>

            <div class="space-y-3">
              <h3 class="text-2xl font-bold">DriveThruRPG</h3>
              <p class="text-gray-600 dark:text-gray-400">
                Find our tabletop RPG products on the world's largest RPG marketplace.
              </p>
            </div>

            <div class="space-y-2">
              <div class="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <UIcon name="i-lucide-check-circle" class="h-4 w-4 " color="success" />
                <span>PDF & print-on-demand</span>
              </div>
              <div class="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <UIcon name="i-lucide-check-circle" class="h-4 w-4 " color="success" />
                <span>Publisher spotlight</span>
              </div>
              <div class="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <UIcon name="i-lucide-check-circle" class="h-4 w-4 " color="success" />
                <span>Organized by product line</span>
              </div>
            </div>

            <UButton
              to="https://www.drivethrurpg.com/en/product/411680/era-of-silence-starter-kit"
              target="_blank"
              external
              size="lg"
              color="purple"
              block
              trailing-icon="i-lucide-external-link"
            >
              Visit Our DriveThruRPG Store
            </UButton>
          </div>
        </UCard>
      </UPageGrid>
    </UPageSection>

    <!-- Featured Products -->
    <UPageSection
      title="Featured Products"
      description="Check out our most popular releases"
      :ui="{ container: 'text-center' }"
    >
      <UPageGrid :cols="{ default: 1, sm: 2, lg: 3 }" class="gap-6">
        <UCard
          v-for="product in featuredProducts"
          :key="product.title"
          variant="outline"
          class="hover:shadow-lg transition-shadow"
        >
          <template #header>
            <div class="aspect-[4/3] bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900 dark:to-purple-900 rounded-t-lg flex items-center justify-center">
              <UIcon :name="product.icon" class="h-16 w-16 " color="pink" />
            </div>
          </template>

          <div class="space-y-3">
            <h3 class="text-lg font-bold">{{ product.title }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ product.description }}
            </p>
            <div class="flex items-center justify-between pt-2">
              <span class="text-xl font-bold text-pink-600 dark:text-pink-400">
                ${{ product.price }}
              </span>
              <UBadge :color="product.badge.color" variant="soft">
                {{ product.badge.text }}
              </UBadge>
            </div>
          </div>
        </UCard>
      </UPageGrid>
    </UPageSection>

    <!-- Newsletter Signup -->
    <UPageSection
      title="Stay Updated on New Releases"
      description="Get notified about new games, sales, and exclusive content"
      :ui="{ container: 'text-center' }"
    >
      <NewsletterSignup />
    </UPageSection>

    <!-- Call to Action -->
    <UPageCTA
      title="Questions About Our Products?"
      description="Get in touch with us for bulk orders, licensing inquiries, or custom game design."
      :links="[
        {
          label: 'Contact Us',
          to: '/contact',
          leadingIcon: 'i-lucide-mail'
        },
        {
          label: 'View All Games',
          to: '/games',
          variant: 'outline',
          leadingIcon: 'i-lucide-gamepad-2'
        }
      ]"
    />
  </div>
</template>

<script setup lang="ts">
// Load shop content from markdown
const { data: shopContent } = await useAsyncData('shop-content', () =>
  queryCollection('shop').first()
)

const featuredProducts = computed(() => shopContent.value?.featuredProducts || [])

// SEO
useSeoMeta({
  title: shopContent.value?.seo?.title || 'Shop - Shrike Publishing',
  description: shopContent.value?.seo?.description || 'Purchase tabletop games from Shrike Publishing.',
  keywords: shopContent.value?.seo?.keywords
})
</script>

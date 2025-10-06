<template>
  <div>
    <!-- Hero Section -->
    <UPageHero
      title="Licensing Information"
      description="Learn about how you can use our games, content, and intellectual property in your own projects."
      class="bg-gradient-to-br from-blue-100/50 via-purple-100/30 to-indigo-100/50 dark:from-blue-900/20 dark:via-purple-900/15 dark:to-indigo-900/20"
    />

    <!-- Overview Section -->
    <UPageSection
      title="Our Licensing Philosophy"
      description="We believe in supporting the creative community"
      :ui="{ container: 'text-center' }"
    >
      <div class="max-w-3xl mx-auto">
        <UCard variant="outline">
          <div class="prose prose-lg dark:prose-invert max-w-none">
            <p class="text-gray-600 dark:text-gray-400">
              At Shrike Publishing, we encourage creativity and collaboration. We offer several licensing
              options to help you create content compatible with our games or use our systems in your own
              projects. Whether you're a content creator, publisher, or hobbyist, we have options for you.
            </p>
          </div>
        </UCard>
      </div>
    </UPageSection>

    <!-- License Types -->
    <UPageSection>
      <div class="max-w-5xl mx-auto space-y-8">
        <!-- Era of Silence License -->
        <UCard variant="outline" class="border-l-4 border-primary">
          <div class="space-y-6">
            <div class="flex items-start justify-between">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <UIcon name="i-lucide-file-text" class="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 class="text-2xl font-bold mb-2">Era of Silence Third-Party License</h3>
                  <UBadge color="success" variant="soft">Open License</UBadge>
                </div>
              </div>
            </div>

            <div class="prose prose-lg dark:prose-invert max-w-none">
              <p class="text-gray-600 dark:text-gray-400">
                Create and publish your own content for Era of Silence under our third-party license.
              </p>

              <h4 class="text-lg font-semibold mt-6 mb-3">What You Can Do:</h4>
              <ul class="space-y-2">
                <li>Create adventures, campaigns, and supplements for Era of Silence</li>
                <li>Publish and sell your content on platforms like Itch.io and DriveThruRPG</li>
                <li>Use our game mechanics and setting elements in your work</li>
                <li>Reference official Era of Silence materials in your products</li>
              </ul>

              <h4 class="text-lg font-semibold mt-6 mb-3">Requirements:</h4>
              <ul class="space-y-2">
                <li>Include the Era of Silence Third-Party License notice in your product</li>
                <li>Clearly indicate your product is not official Shrike Publishing content</li>
                <li>Do not use our trademarked logos or official artwork without permission</li>
                <li>Maintain the spirit and tone of the Era of Silence setting</li>
              </ul>

              <h4 class="text-lg font-semibold mt-6 mb-3">License Text:</h4>
              <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-sm font-mono">
                <p class="mb-2">[Product Name] is an independent production by [Author/Publisher Name] and is not affiliated with Shrike Publishing.</p>
                <p>It is published under the Era of Silence Third-Party License.</p>
                <p class="mt-2 italic">Era of Silence is copyright Shrike Publishing.</p>
              </div>
            </div>

            <div class="flex gap-3">
              <UButton to="/games/era-of-silence" variant="outline" icon="i-lucide-book-open">
                Learn About Era of Silence
              </UButton>
            </div>
          </div>
        </UCard>

        <!-- Blood Neon License -->
        <UCard variant="outline" class="border-l-4 border-pink-500">
          <div class="space-y-6">
            <div class="flex items-start justify-between">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-pink-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <UIcon name="i-lucide-zap" class="h-6 w-6 " color="pink" />
                </div>
                <div>
                  <h3 class="text-2xl font-bold mb-2">Blood Neon Compatibility License</h3>
                  <UBadge color="pink" variant="soft">Open License</UBadge>
                </div>
              </div>
            </div>

            <div class="prose prose-lg dark:prose-invert max-w-none">
              <p class="text-gray-600 dark:text-gray-400">
                Design cyberpunk content compatible with Blood Neon's fast-paced system.
              </p>

              <h4 class="text-lg font-semibold mt-6 mb-3">What You Can Do:</h4>
              <ul class="space-y-2">
                <li>Create adventures, characters, and gear for Blood Neon</li>
                <li>Design new corporations, factions, and districts</li>
                <li>Publish commercial or free content under this license</li>
                <li>Adapt Blood Neon mechanics for your own cyberpunk settings</li>
              </ul>

              <h4 class="text-lg font-semibold mt-6 mb-3">Requirements:</h4>
              <ul class="space-y-2">
                <li>Include the Blood Neon Compatibility License notice</li>
                <li>State clearly that your product requires Blood Neon Core Rules</li>
                <li>Do not reproduce the core mechanics verbatim without permission</li>
                <li>Credit Shrike Publishing as the creator of Blood Neon</li>
              </ul>

              <h4 class="text-lg font-semibold mt-6 mb-3">License Text:</h4>
              <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-sm font-mono">
                <p class="mb-2">[Product Name] is an independent production by [Author/Publisher Name] and is not affiliated with Shrike Publishing.</p>
                <p>It is compatible with Blood Neon and published under the Blood Neon Compatibility License.</p>
                <p class="mt-2 italic">Blood Neon is copyright Shrike Publishing.</p>
              </div>
            </div>

            <div class="flex gap-3">
              <UButton to="/games/blood-neon" variant="outline" icon="i-lucide-zap">
                Learn About Blood Neon
              </UButton>
            </div>
          </div>
        </UCard>

        <!-- Commercial Licensing -->
        <UCard variant="outline" class="border-l-4 border-purple-500">
          <div class="space-y-6">
            <div class="flex items-start justify-between">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <UIcon name="i-lucide-briefcase" class="h-6 w-6 " color="purple" />
                </div>
                <div>
                  <h3 class="text-2xl font-bold mb-2">Commercial & Custom Licensing</h3>
                  <UBadge color="purple" variant="soft">Contact Required</UBadge>
                </div>
              </div>
            </div>

            <div class="prose prose-lg dark:prose-invert max-w-none">
              <p class="text-gray-600 dark:text-gray-400">
                Need more flexibility or want to use our IP in unique ways? Let's talk.
              </p>

              <h4 class="text-lg font-semibold mt-6 mb-3">Custom Arrangements For:</h4>
              <ul class="space-y-2">
                <li>Large-scale commercial projects or translations</li>
                <li>Use of official artwork, logos, or trademarked elements</li>
                <li>Creating derivative games based on our systems</li>
                <li>Digital adaptations (video games, apps, etc.)</li>
                <li>Podcast, streaming, or video content partnerships</li>
              </ul>

              <p class="text-gray-600 dark:text-gray-400 mt-4">
                We're open to creative partnerships and are happy to work with you to find an arrangement
                that benefits both parties. Every project is unique, and we approach each opportunity
                with flexibility and enthusiasm.
              </p>
            </div>

            <div class="flex gap-3">
              <UButton to="/contact" color="purple" icon="i-lucide-mail">
                Contact Us for Licensing
              </UButton>
            </div>
          </div>
        </UCard>

        <!-- Fan Content Policy -->
        <UCard variant="outline" class="border-l-4 border-green-500">
          <div class="space-y-6">
            <div class="flex items-start justify-between">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <UIcon name="i-lucide-heart" class="h-6 w-6 " color="success" />
                </div>
                <div>
                  <h3 class="text-2xl font-bold mb-2">Fan Content Policy</h3>
                  <UBadge color="success" variant="soft">Always Allowed</UBadge>
                </div>
              </div>
            </div>

            <div class="prose prose-lg dark:prose-invert max-w-none">
              <p class="text-gray-600 dark:text-gray-400">
                We love seeing what the community creates! Here's what you can do without asking.
              </p>

              <h4 class="text-lg font-semibold mt-6 mb-3">You're Always Welcome To:</h4>
              <ul class="space-y-2">
                <li>Share actual play videos, podcasts, and streams</li>
                <li>Create fan art, fiction, and character builds</li>
                <li>Design and share homebrew content for personal use</li>
                <li>Write reviews, guides, and tutorials</li>
                <li>Share your experiences on social media</li>
              </ul>

              <h4 class="text-lg font-semibold mt-6 mb-3">We Just Ask That You:</h4>
              <ul class="space-y-2">
                <li>Make it clear you're a fan, not officially affiliated</li>
                <li>Don't use our content in ways that could harm others</li>
                <li>Tag us so we can see and share your awesome work!</li>
              </ul>
            </div>
          </div>
        </UCard>
      </div>
    </UPageSection>

    <!-- FAQ Section -->
    <UPageSection
      title="Licensing FAQ"
      description="Common questions about using our content"
      :ui="{ container: 'text-center' }"
    >
      <div class="max-w-3xl mx-auto">
        <UAccordion :items="faqItems" multiple />
      </div>
    </UPageSection>

    <!-- Call to Action -->
    <UPageCTA
      title="Ready to Create?"
      description="Start building your own content for our games or reach out with licensing questions."
      :links="[
        {
          label: 'Browse Our Games',
          to: '/games',
          leadingIcon: 'i-lucide-gamepad-2'
        },
        {
          label: 'Contact Us',
          to: '/contact',
          variant: 'outline',
          leadingIcon: 'i-lucide-mail'
        }
      ]"
    />
  </div>
</template>

<script setup lang="ts">
// FAQ Items
const faqItems = [
  {
    label: 'Do I need to pay royalties to use your third-party licenses?',
    content: 'No! Our third-party licenses are free to use. You can publish and sell your content without paying us royalties. We only ask that you follow the license requirements and give proper credit.',
    defaultOpen: true
  },
  {
    label: 'Can I use artwork from your official books?',
    content: 'Official artwork, logos, and trademarked elements are not covered under the third-party licenses. If you need to use these, please contact us for custom licensing arrangements.'
  },
  {
    label: 'What platforms can I sell my third-party content on?',
    content: 'You can sell your licensed content on any platform you choose, including Itch.io, DriveThruRPG, your own website, or through crowdfunding platforms like Kickstarter.'
  },
  {
    label: 'Can I create content in other languages?',
    content: 'Yes! Translations and content in any language are welcome under our third-party licenses. We love seeing our games reach global audiences.'
  },
  {
    label: 'How do I get my content featured on your website?',
    content: 'We love featuring community content! Reach out to us through our contact page with information about your project. We regularly spotlight third-party content on our blog and social media.'
  },
  {
    label: 'What if I want to use your system for a different setting?',
    content: 'You can use mechanics and system elements under our licenses, but if you want to create a substantially different game or setting, please contact us to discuss custom licensing options.'
  }
]

// SEO
useSeoMeta({
  title: 'Licensing - Shrike Publishing',
  description: 'Learn about licensing options for creating third-party content for Era of Silence, Blood Neon, and other Shrike Publishing games.',
  keywords: 'third-party license, game licensing, OGL, creative commons, tabletop RPG license'
})
</script>

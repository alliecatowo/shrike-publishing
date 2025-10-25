# Migration Guide: Converting index.vue to MDC

This guide shows how to convert sections from `/app/pages/index.vue` to MDC markdown using the new components.

## Before & After Examples

### Hero Section

**Before (index.vue):**
```vue
<UPageHero
  :title="components?.hero?.title || 'Welcome to Shrike Publishing'"
  :description="components?.hero?.subtitle || 'Independent tabletop game publisher...'"
  :links="[...]"
  class="bg-gradient-to-br from-primary/15 via-neutral-900/20 to-secondary/10..."
>
  <div class="absolute inset-0 bg-gradient-to-r from-primary/15 to-transparent pointer-events-none" />
</UPageHero>
```

**After (MDC):**
```md
::hero-section{title="Welcome to Shrike Publishing" description="Independent tabletop game publisher creating immersive worlds and unforgettable stories" :links='[{"label": "Explore Games", "to": "/games", "variant": "primary", "trailingIcon": "i-lucide-arrow-right"}]'}
::
```

---

### Stats Section

**Before (index.vue):**
```vue
<UPageSection
  title="Our Impact"
  description="Join thousands of players in immersive storytelling adventures"
>
  <UPageGrid :cols="{ default: 1, sm: 2, lg: 4 }" class="gap-6">
    <UPageCard
      title="50K+"
      description="Stories Created"
      variant="soft"
      :spotlight="true"
      spotlight-color="primary"
      class="text-center group"
    >
      <template #header>
        <div class="flex justify-center mb-4">
          <div class="relative">
            <div class="absolute inset-0 blur-lg bg-primary/20 rounded-full..." />
            <div class="relative w-12 h-12 bg-gradient-to-br from-primary/20...">
              <UIcon name="i-lucide-book-open" class="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
      </template>
    </UPageCard>
    <!-- More cards... -->
  </UPageGrid>
</UPageSection>
```

**After (MDC):**
```md
::stats-grid{title="Our Impact" description="Join thousands of players in immersive storytelling adventures"}

  ::stat-card{title="50K+" icon="i-lucide-book-open" color="primary"}
  Stories Created
  ::

  ::stat-card{title="12K+" icon="i-lucide-users" color="secondary"}
  Active Players
  ::

  ::stat-card{title="8" icon="i-lucide-gamepad-2" color="success"}
  Published Games
  ::

  ::stat-card{title="4.9★" icon="i-lucide-star" color="warning"}
  Average Rating
  ::

::
```

---

### Testimonials Section

**Before (index.vue):**
```vue
<UPageSection
  title="What Players Say"
  description="Don't just take our word for it - hear from our community"
>
  <UPageGrid :cols="{ default: 1, md: 2, lg: 3 }" class="gap-6">
    <UPageCard
      title="Absolutely incredible storytelling"
      description="Era of Silence completely changed how I think about tabletop RPGs..."
      variant="soft"
      orientation="vertical"
      class="text-center max-w-md mx-auto"
    >
      <template #leading>
        <div class="flex justify-center">
          <UAvatar text="SJ" alt="Sarah Johnson" size="lg" />
        </div>
      </template>
      <template #footer>
        <div class="text-sm text-muted">Sarah Johnson - Game Master</div>
      </template>
    </UPageCard>
    <!-- More testimonials... -->
  </UPageGrid>
</UPageSection>
```

**After (MDC):**
```md
::testimonials-grid{title="What Players Say" description="Don't just take our word for it - hear from our community"}

  ::testimonial-card{title="Absolutely incredible storytelling" author="Sarah Johnson" role="Game Master"}
  Era of Silence completely changed how I think about tabletop RPGs. The world-building is phenomenal and every session leaves me wanting more.
  ::

  ::testimonial-card{title="Best investment in gaming" author="Mike Chen" role="Player"}
  Blood Neon has become our weekly ritual. The mechanics are innovative and the story keeps us engaged for hours.
  ::

  ::testimonial-card{title="Professional quality" author="Alex Rivera" role="Content Creator"}
  The production value and attention to detail in these games rivals anything from major publishers. Truly impressive work.
  ::

::
```

---

### Timeline Section

**Before (index.vue - script section):**
```typescript
const recentReleases = [
  {
    date: 'Dec 2024',
    title: 'The Silent Observer',
    description: 'New cyberpunk short story published...',
    icon: 'i-lucide-book-open',
    to: '/stories/the-last-whisper'
  },
  // More items...
]
```

**Before (index.vue - template):**
```vue
<UPageSection
  title="Recent Releases"
  description="Check out our latest games and updates"
>
  <UTimeline :items="recentReleases" orientation="vertical" />
</UPageSection>
```

**After (MDC):**
```md
::timeline-section{title="Recent Releases" description="Check out our latest games and updates" :items='[{"date": "Dec 2024", "title": "The Silent Observer", "description": "New cyberpunk short story published on our stories page", "icon": "i-lucide-book-open", "to": "/stories/the-last-whisper"}, {"date": "Nov 2024", "title": "Era of Silence - Quick Reference Guide", "description": "Updated quick reference guide with clarifications and new content", "icon": "i-lucide-file-text", "to": "/resources/era-of-silence-quick-reference"}, {"date": "Oct 2024", "title": "Blood Neon Expansion", "description": "Corporate Shadows expansion released with new mechanics", "icon": "i-lucide-gamepad-2", "to": "/announcements/blood-neon-expansion"}]'}
::
```

---

## Complete MDC Page Example

Here's how a complete home page would look in MDC format:

**File: `/content/home.md`**

```md
---
title: Home
description: Welcome to Shrike Publishing
navigation: false
---

::hero-section{title="Welcome to Shrike Publishing" description="Independent tabletop game publisher creating immersive worlds and unforgettable stories" :links='[{"label": "Explore Games", "to": "/games", "variant": "primary", "trailingIcon": "i-lucide-arrow-right"}]'}
::

::stats-grid{title="Our Impact" description="Join thousands of players in immersive storytelling adventures"}

  ::stat-card{title="50K+" icon="i-lucide-book-open" color="primary"}
  Stories Created
  ::

  ::stat-card{title="12K+" icon="i-lucide-users" color="secondary"}
  Active Players
  ::

  ::stat-card{title="8" icon="i-lucide-gamepad-2" color="success"}
  Published Games
  ::

  ::stat-card{title="4.9★" icon="i-lucide-star" color="warning"}
  Average Rating
  ::

::

::testimonials-grid{title="What Players Say" description="Don't just take our word for it - hear from our community"}

  ::testimonial-card{title="Absolutely incredible storytelling" author="Sarah Johnson" role="Game Master"}
  Era of Silence completely changed how I think about tabletop RPGs. The world-building is phenomenal and every session leaves me wanting more.
  ::

  ::testimonial-card{title="Best investment in gaming" author="Mike Chen" role="Player"}
  Blood Neon has become our weekly ritual. The mechanics are innovative and the story keeps us engaged for hours.
  ::

  ::testimonial-card{title="Professional quality" author="Alex Rivera" role="Content Creator"}
  The production value and attention to detail in these games rivals anything from major publishers. Truly impressive work.
  ::

::

::timeline-section{title="Recent Releases" description="Check out our latest games and updates" :items='[{"date": "Dec 2024", "title": "The Silent Observer", "description": "New cyberpunk short story", "icon": "i-lucide-book-open", "to": "/stories/the-last-whisper"}, {"date": "Nov 2024", "title": "Era of Silence - Guide", "description": "Updated reference guide", "icon": "i-lucide-file-text", "to": "/resources/era-of-silence-quick-reference"}]'}
::
```

## Benefits of MDC Approach

### 1. Content Management
- **Editable in Nuxt Studio**: Visual editing without code
- **Version Control**: Easy to track changes in markdown
- **No Build Required**: Update content without rebuilding

### 2. Maintainability
- **Separated Concerns**: Content separated from logic
- **Reusable Components**: Use same components across pages
- **Type Safety**: Props validated by TypeScript

### 3. Team Workflow
- **Non-Technical Edits**: Content team can edit without Vue knowledge
- **Preview Changes**: Live preview in Studio
- **Consistent Design**: Components enforce design system

### 4. Performance
- **Static Generation**: Content pre-rendered at build
- **Optimized Loading**: Only needed components loaded
- **Cache Friendly**: Markdown files cache efficiently

## Migration Steps

### Option 1: Create New MDC Page (Recommended)

1. Create `/content/home.md`
2. Add frontmatter with page metadata
3. Use MDC components for sections
4. Test in Nuxt Studio
5. Update routing if needed

### Option 2: Hybrid Approach

1. Keep `/app/pages/index.vue` for dynamic content (games, posts)
2. Create `/content/partials/` for static sections
3. Import MDC partials into Vue page
4. Gradually migrate sections

### Option 3: Progressive Enhancement

1. Start with one section (e.g., testimonials)
2. Create MDC component and test
3. Replace Vue section with MDC include
4. Repeat for other sections
5. Eventually convert entire page

## Best Practices

1. **Use Descriptive Titles**: Help with SEO and accessibility
2. **Keep Content Concise**: Especially for stats and testimonials
3. **Provide Alt Text**: For avatars and images
4. **Test Responsively**: Preview on mobile, tablet, desktop
5. **Version Control**: Commit changes with descriptive messages

## Dynamic vs Static Content

### Keep in Vue (Dynamic):
- Featured games (from database/API)
- Latest blog posts (queried content)
- Announcements (filtered by date)
- User-specific content
- Real-time data

### Move to MDC (Static):
- Hero section
- Stats/metrics
- Testimonials
- Timeline/history
- About sections
- Feature lists

## Troubleshooting Migration

### Props Not Binding

**Problem**: Props appear as text instead of values
```md
<!-- Wrong -->
::stat-card{title=title}

<!-- Correct -->
::stat-card{title="50K+"}
```

### Complex Props

**Problem**: Arrays/objects not working
```md
<!-- Wrong -->
:links="[{label: 'Click'}]"

<!-- Correct -->
:links='[{"label": "Click"}]'
```
Note: Single quotes outside, double quotes inside

### Nested Components

**Problem**: Child components not rendering
```md
<!-- Wrong -->
::stats-grid{title="Stats"}
::stat-card{title="100"}
Value
::
::

<!-- Correct (note indentation) -->
::stats-grid{title="Stats"}

  ::stat-card{title="100"}
  Value
  ::

::
```

### Slot Content

**Problem**: Description not showing
```md
<!-- Wrong -->
::stat-card{title="100" description="Users"}
::

<!-- Correct -->
::stat-card{title="100"}
Users
::
```
Content goes in slot, not description prop

## Next Steps

1. Review `QUICKSTART.md` for syntax reference
2. Check `EXAMPLE.md` for more patterns
3. Read `README.md` for complete prop documentation
4. Test in Nuxt Studio before deploying
5. Update team documentation

## Questions?

- See component source files for implementation details
- Check Nuxt Content docs for MDC syntax
- Review Nuxt UI docs for component props
- Contact development team for support

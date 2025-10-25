# MDC Components Directory

Custom Vue components for use in Nuxt Content MDC markdown files, optimized for Nuxt Studio editing.

## Directory Structure

```
/app/components/content/
├── HeroSection.vue           # Hero with gradient background
├── StatsGrid.vue             # Stats section wrapper
├── StatCard.vue              # Individual stat card
├── TestimonialsGrid.vue      # Testimonials section wrapper
├── TestimonialCard.vue       # Individual testimonial
├── TimelineSection.vue       # Timeline wrapper
├── TimelineItem.vue          # Timeline entry helper
├── index.ts                  # TypeScript definitions
├── README.md                 # Full documentation
├── QUICKSTART.md            # Quick start for editors
├── EXAMPLE.md               # Usage examples
└── COMPONENTS.md            # This file
```

## Components Overview

| Component | Type | Purpose | Children |
|-----------|------|---------|----------|
| HeroSection | Section | Page hero with gradient | - |
| StatsGrid | Wrapper | Statistics container | StatCard |
| StatCard | Item | Individual stat display | - |
| TestimonialsGrid | Wrapper | Testimonials container | TestimonialCard |
| TestimonialCard | Item | Individual testimonial | - |
| TimelineSection | Section | Timeline display | TimelineItem |
| TimelineItem | Item | Timeline entry | - |

## Component Hierarchy

```
Hero Section (standalone)

Stats Grid
└── Stat Card (multiple)

Testimonials Grid
└── Testimonial Card (multiple)

Timeline Section
└── Timeline Item (multiple, optional)
```

## Usage in MDC

### Basic Syntax

```md
::component-name{prop="value"}
Content goes here
::
```

### With Multiple Items

```md
::wrapper-component{title="Section Title"}

  ::child-component{prop="value"}
  Content
  ::

  ::child-component{prop="value"}
  More content
  ::

::
```

## Feature Highlights

### All Components Include:

- **Nuxt UI Integration**: Built on UPageSection, UPageCard, UPageGrid
- **Responsive Design**: Mobile-first with breakpoint support
- **Slot Support**: MDC content through slots with proper unwrapping
- **TypeScript**: Full type definitions in index.ts
- **Original Styling**: Preserves design from index.vue

### Special Features by Component:

**HeroSection**
- Gradient background (primary/secondary)
- Link array support
- Icon support for CTAs

**StatsGrid/StatCard**
- 4-column responsive grid
- Animated icon backgrounds
- Color-coded spotlights
- Hover effects

**TestimonialsGrid/TestimonialCard**
- 3-column responsive grid
- Avatar support (text or image)
- Auto-generated initials
- Role/title display

**TimelineSection**
- Vertical timeline
- Icon support
- Date/title/description
- Optional links

## Nuxt Studio Compatibility

All components are designed for easy editing in Nuxt Studio:

1. **Visual Props Editing**: Edit props through Studio UI
2. **Markdown Content**: Edit slot content as markdown
3. **Live Preview**: See changes in real-time
4. **Type Safety**: Full TypeScript support
5. **Auto-complete**: Component suggestions in editor

## File Descriptions

### Vue Components (*.vue)

- **HeroSection.vue**: Hero section with gradient background, supports title, description, and CTA links
- **StatsGrid.vue**: Container component using UPageGrid for displaying statistics in a responsive grid
- **StatCard.vue**: Individual stat card with icon, title, color theming, and spotlight effect
- **TestimonialsGrid.vue**: Container for testimonial cards in a responsive 3-column grid
- **TestimonialCard.vue**: Individual testimonial with avatar, quote, author info, and role
- **TimelineSection.vue**: Timeline container using UTimeline component
- **TimelineItem.vue**: Helper component for structuring timeline entries

### Documentation (*.md)

- **README.md**: Complete component documentation with props, examples, and features
- **QUICKSTART.md**: Quick reference guide for content editors
- **EXAMPLE.md**: Practical usage examples and patterns
- **COMPONENTS.md**: This file - directory overview and structure

### TypeScript (*.ts)

- **index.ts**: Type definitions, interfaces, and component metadata

## Getting Started

### For Developers

1. Read `README.md` for detailed documentation
2. Check `index.ts` for TypeScript interfaces
3. Review component source for implementation details

### For Content Editors

1. Start with `QUICKSTART.md` for basic usage
2. Reference `EXAMPLE.md` for common patterns
3. Use `README.md` when you need more details

### For Designers

- Components use Nuxt UI theme system
- Color props: primary, secondary, success, warning, error, info
- Icons from Lucide icon set (i-lucide-*)
- Responsive breakpoints: default, sm, md, lg

## Component Props Reference

### Required Props (All Components)

```typescript
title: string  // Main heading/title
```

### Common Optional Props

```typescript
description?: string       // Subtitle/description
icon?: string             // Lucide icon name
color?: ComponentColor    // Theme color
to?: string               // Link destination
```

### Component-Specific Props

See `index.ts` or `README.md` for complete prop definitions.

## Best Practices

1. **Use Semantic Titles**: Clear, descriptive titles help with accessibility
2. **Provide Descriptions**: Help users understand the section purpose
3. **Choose Appropriate Icons**: Match icons to content meaning
4. **Use Color Meaningfully**:
   - primary/secondary: Brand colors
   - success: Achievements, positive metrics
   - warning: Ratings, attention items
   - error: Critical items
   - info: Information, neutral items
5. **Test Responsiveness**: Preview on different screen sizes
6. **Keep Content Concise**: Especially for stat descriptions and testimonials

## Icon Reference

Common icons for gaming/publishing content:

- `i-lucide-book-open` - Books, stories, content
- `i-lucide-gamepad-2` - Games, gaming
- `i-lucide-users` - Community, players
- `i-lucide-star` - Ratings, favorites
- `i-lucide-trophy` - Achievements, awards
- `i-lucide-rocket` - Launches, new releases
- `i-lucide-heart` - Favorites, love
- `i-lucide-download` - Downloads, files
- `i-lucide-mail` - Newsletter, contact
- `i-lucide-arrow-right` - Navigation, CTAs

Full icon library: [lucide.dev](https://lucide.dev)

## Troubleshooting

### Component Not Rendering

- Verify kebab-case naming (hero-section, not HeroSection)
- Check for matching opening and closing `::`
- Ensure proper indentation for nested components

### Props Not Working

- String props: `title="value"`
- Complex props: `:links='[...]'` (note the colon)
- Boolean props: `:spotlight="true"`

### Styling Issues

- Verify color names match available options
- Check that you're using Nuxt UI v4 components
- Ensure parent theme colors are configured

### Content Not Displaying

- Check slot content is between `::` markers
- For descriptions, use `mdc-unwrap="p"` in component
- Verify markdown formatting is correct

## Support & Resources

- [Nuxt Content MDC Docs](https://content.nuxt.com/usage/markdown)
- [Nuxt UI Components](https://ui.nuxt.com)
- [Lucide Icons](https://lucide.dev)
- Internal: See index.vue for original implementation

## Version Info

- Created: October 2025
- Nuxt UI: v4
- Nuxt Content: v3+
- Vue: 3.x
- TypeScript: 5.x

---

For questions or issues, contact the development team or refer to the component source files.

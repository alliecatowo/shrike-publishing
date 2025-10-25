# Quick Start Guide - MDC Components

This guide helps content editors quickly start using the custom MDC components in Nuxt Studio.

## What Are MDC Components?

MDC (Markdown Components) allows you to use Vue components directly in your markdown files using a special syntax: `::component-name{props}`

## The 4 Main Components

### 1. Hero Section

Use this at the top of your page for a big, impactful introduction.

```md
::hero-section{title="Welcome!" description="Your tagline here" :links='[{"label": "Click Me", "to": "/page"}]'}
::
```

### 2. Stats Grid

Show impressive numbers in a beautiful grid.

```md
::stats-grid{title="Our Achievements" description="Numbers that matter"}

  ::stat-card{title="1000+" icon="i-lucide-users" color="primary"}
  Happy Customers
  ::

  ::stat-card{title="50+" icon="i-lucide-star" color="warning"}
  Five Star Reviews
  ::

::
```

### 3. Testimonials

Display customer reviews or quotes.

```md
::testimonials-grid{title="Reviews" description="What people say"}

  ::testimonial-card{title="Amazing!" author="John Smith" role="Customer"}
  This is the best product I've ever used. Highly recommend!
  ::

::
```

### 4. Timeline

Show chronological events or releases.

```md
::timeline-section{title="History" :items='[{"date": "2024", "title": "Launched", "icon": "i-lucide-rocket"}]'}
::
```

## Common Props

Most components share these props:

- `title` - The main heading (required)
- `description` - Subtitle or explanation (optional)
- `icon` - Icon name from Lucide (optional)
- `color` - Color scheme: primary, secondary, success, warning (optional)

## Icon Names

All icons use the Lucide icon set with prefix `i-lucide-`:

- `i-lucide-book-open` - Book
- `i-lucide-users` - People/Community
- `i-lucide-star` - Star
- `i-lucide-gamepad-2` - Gaming
- `i-lucide-rocket` - Launch/Speed
- `i-lucide-trophy` - Achievement
- `i-lucide-heart` - Love/Like
- `i-lucide-mail` - Email
- `i-lucide-arrow-right` - Right arrow

Find more icons at [lucide.dev](https://lucide.dev)

## Color Options

- `primary` - Brand primary color (default)
- `secondary` - Brand secondary color
- `success` - Green (achievements, positive)
- `warning` - Yellow/Orange (attention, ratings)
- `error` - Red (alerts, important)
- `info` - Blue (information)

## Tips for Nuxt Studio

1. **Start Simple**: Begin with just title and description
2. **Add Content**: Write content between the opening `::` and closing `::`
3. **Test Icons**: Try different icons to see what fits best
4. **Use Colors**: Match colors to your content (success for positive, warning for ratings)
5. **Preview Often**: Use Studio's preview to see changes live

## Common Patterns

### Full Home Page Structure

```md
---
title: Home
---

::hero-section{title="Welcome" :links='[{"label": "Get Started", "to": "/start"}]'}
::

::stats-grid{title="Stats"}
  ::stat-card{title="100+" icon="i-lucide-users"}
  Users
  ::
::

::testimonials-grid{title="Reviews"}
  ::testimonial-card{title="Great!" author="Jane Doe"}
  Love it!
  ::
::
```

### Stats Section

```md
::stats-grid{title="By The Numbers"}
  ::stat-card{title="5000+" icon="i-lucide-download" color="success"}
  Downloads
  ::

  ::stat-card{title="4.9★" icon="i-lucide-star" color="warning"}
  Rating
  ::

  ::stat-card{title="50K+" icon="i-lucide-users" color="primary"}
  Community Members
  ::
::
```

### Testimonials Section

```md
::testimonials-grid{title="What Our Players Say"}
  ::testimonial-card{title="Best game ever!" author="Sarah J" role="Player"}
  The storytelling is incredible. Can't wait for the next release!
  ::

  ::testimonial-card{title="Professional quality" author="Mike C" role="Game Master"}
  The production value is outstanding. Worth every penny.
  ::
::
```

## Troubleshooting

**Component not showing?**
- Check that component name is in kebab-case (hero-section, not HeroSection)
- Ensure you have both opening `::` and closing `::`

**Props not working?**
- For text: `title="Your Text"`
- For arrays/objects: `:links='[{"label": "Text"}]'` (note the `:` before prop name)

**Icons not appearing?**
- Use full icon name: `i-lucide-star` not just `star`
- Check spelling matches Lucide icon names

**Styling looks wrong?**
- Ensure you're using valid color names
- Check that nested components are properly indented

## Need Help?

- See `README.md` for detailed component documentation
- See `EXAMPLE.md` for more complex examples
- Check `index.ts` for TypeScript interfaces and prop definitions

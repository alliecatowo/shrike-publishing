# Example MDC Usage

This file demonstrates how to use the custom MDC components in your Nuxt Content pages.

## Full Example Home Page

```md
---
title: Home
description: Welcome to Shrike Publishing
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

::timeline-section{title="Recent Releases" description="Check out our latest games and updates" :items='[{"date": "Dec 2024", "title": "The Silent Observer", "description": "New cyberpunk short story published", "icon": "i-lucide-book-open", "to": "/stories/the-silent-observer"}, {"date": "Nov 2024", "title": "Era of Silence - Quick Reference Guide", "description": "Updated quick reference guide with new content", "icon": "i-lucide-file-text", "to": "/resources/era-of-silence-guide"}, {"date": "Oct 2024", "title": "Blood Neon Expansion", "description": "Corporate Shadows expansion released", "icon": "i-lucide-gamepad-2", "to": "/announcements/blood-neon-expansion"}]'}
::
```

## Individual Component Examples

### Hero Section

```md
::hero-section{title="Your Amazing Title" description="A compelling subtitle" :links='[{"label": "Get Started", "to": "/start", "trailingIcon": "i-lucide-arrow-right"}]'}
::
```

### Stats Grid with Cards

```md
::stats-grid{title="By The Numbers" description="Our achievements"}

  ::stat-card{title="100+" icon="i-lucide-trophy" color="warning"}
  Awards Won
  ::

  ::stat-card{title="5M+" icon="i-lucide-download" color="success"}
  Downloads
  ::

::
```

### Testimonials Grid

```md
::testimonials-grid{title="Customer Reviews" description="What people are saying"}

  ::testimonial-card{title="Great experience!" author="John Doe" role="CEO"}
  This product exceeded all my expectations. Highly recommended!
  ::

  ::testimonial-card{title="Simply amazing" author="Jane Smith" role="Designer" avatarSrc="/avatars/jane.jpg"}
  The attention to detail is incredible. Worth every penny.
  ::

::
```

### Timeline

```md
::timeline-section{title="Roadmap" description="What's coming next" :items='[{"date": "Q1 2025", "title": "New Features", "description": "Exciting updates", "icon": "i-lucide-sparkles"}, {"date": "Q2 2025", "title": "Major Release", "description": "Version 2.0", "icon": "i-lucide-rocket"}]'}
::
```

## Tips for Nuxt Studio

1. **Editing Props**: In Nuxt Studio, click on a component to edit its props in the sidebar
2. **Editing Content**: Click inside the component slots to edit the markdown content directly
3. **Array Props**: Use the JSON editor for complex props like `links` and `items`
4. **Icons**: Browse available Lucide icons at [lucide.dev](https://lucide.dev)
5. **Colors**: Available color options: primary, secondary, success, warning, error, info

## Color Options for StatCard

- `primary` - Brand primary color
- `secondary` - Brand secondary color
- `success` - Green/success color
- `warning` - Yellow/warning color
- `error` - Red/error color
- `info` - Blue/info color

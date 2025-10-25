# MDC Components for Shrike Publishing

This directory contains custom MDC (Markdown Components) that can be used in Nuxt Content files and edited through Nuxt Studio.

## Components

### HeroSection

A hero section with gradient background styling.

**Props:**
- `title` (string, required) - Main heading
- `description` (string, optional) - Subtitle text
- `links` (array, optional) - Array of link objects with `label`, `to`, `variant`, and `icon` properties

**Usage in MDC:**

```md
::hero-section{title="Welcome to Shrike Publishing" description="Creating immersive tabletop experiences" :links='[{"label": "Explore Games", "to": "/games", "trailingIcon": "i-lucide-arrow-right"}]'}
::
```

---

### StatsGrid

A grid container for displaying statistics with UPageCard components.

**Props:**
- `title` (string, required) - Section heading
- `description` (string, optional) - Section description

**Usage in MDC:**

```md
::stats-grid{title="Our Impact" description="Join thousands of players worldwide"}

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

### StatCard

Individual stat card to be used within StatsGrid (or standalone).

**Props:**
- `title` (string, required) - The main stat value
- `icon` (string, required) - Lucide icon name (e.g., "i-lucide-book-open")
- `color` (string, optional, default: "primary") - Color scheme (primary, secondary, success, warning, etc.)

**Slot Content:** The description text for the stat.

---

### TestimonialsGrid

A grid container for displaying testimonial cards.

**Props:**
- `title` (string, required) - Section heading
- `description` (string, optional) - Section description

**Usage in MDC:**

```md
::testimonials-grid{title="What Players Say" description="Hear from our community"}

  ::testimonial-card{title="Absolutely incredible storytelling" author="Sarah Johnson" role="Game Master"}
  Era of Silence completely changed how I think about tabletop RPGs. The world-building is phenomenal.
  ::

  ::testimonial-card{title="Best investment in gaming" author="Mike Chen" role="Player"}
  Blood Neon has become our weekly ritual. The mechanics are innovative and engaging.
  ::

  ::testimonial-card{title="Professional quality" author="Alex Rivera" role="Content Creator" avatarSrc="/avatars/alex.jpg"}
  The production value rivals anything from major publishers. Truly impressive work.
  ::

::
```

---

### TestimonialCard

Individual testimonial card to be used within TestimonialsGrid.

**Props:**
- `title` (string, required) - Quote/testimonial headline
- `author` (string, required) - Person's name
- `role` (string, optional) - Their role/title
- `avatarText` (string, optional) - Custom avatar initials (auto-generated from author name if not provided)
- `avatarSrc` (string, optional) - URL to avatar image

**Slot Content:** The testimonial text/quote.

---

### TimelineSection

Displays a vertical timeline of events/releases.

**Props:**
- `title` (string, required) - Section heading
- `description` (string, optional) - Section description
- `items` (array, optional) - Array of timeline item objects with `date`, `title`, `description`, `icon`, and `to` properties

**Usage in MDC:**

```md
::timeline-section{title="Recent Releases" description="Check out our latest games and updates" :items='[{"date": "Dec 2024", "title": "The Silent Observer", "description": "New cyberpunk short story", "icon": "i-lucide-book-open", "to": "/stories/the-silent-observer"}, {"date": "Nov 2024", "title": "Era of Silence Guide", "description": "Updated reference guide", "icon": "i-lucide-file-text", "to": "/resources/era-of-silence"}]'}
::
```

---

### TimelineItem

Helper component for individual timeline entries (used within TimelineSection).

**Props:**
- `date` (string, optional) - Timeline item date/period
- `title` (string, optional) - Timeline item title
- `description` (string, optional) - Item description
- `icon` (string, optional) - Lucide icon name
- `to` (string, optional) - Link destination

**Note:** This component provides structure for timeline items when more granular control is needed.

---

## Features

All components:
- Use high-level Nuxt UI components (UPageSection, UPageCard, UPageGrid, etc.)
- Accept content through slots for easy editing in Nuxt Studio
- Preserve the original styling from the index.vue page
- Are fully responsive with proper grid breakpoints
- Support MDC syntax for easy content management

## MDC Slot Unwrapping

Components use `<slot mdc-unwrap="p" />` where appropriate to ensure markdown content is properly rendered without unnecessary paragraph wrappers.

## Editing in Nuxt Studio

These components are designed to be easily editable in Nuxt Studio's visual editor:
1. Props can be edited through the Studio UI
2. Slot content can be edited as markdown
3. Arrays (links, items) can be managed through the JSON editor

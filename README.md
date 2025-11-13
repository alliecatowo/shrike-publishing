# Shrike Publishing

This is the official website for Shrike Publishing, a tabletop role-playing game company.

[![Made with Nuxt](https://img.shields.io/badge/Made%20with-Nuxt-00DC82?style=for-the-badge&logo=nuxt.js)](https://nuxt.com)
[![Vue.js](https://img.shields.io/badge/Vue.js-3-4FC08D?style=for-the-badge&logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![pnpm](https://img.shields.io/badge/pnpm-10-F69220?style=for-the-badge&logo=pnpm)](https://pnpm.io/)

## Setup

Make sure to install dependencies:

```bash
# pnpm
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# pnpm
pnpm dev
```

## Production

Build the application for production:

```bash
# pnpm
pnpm build
```

Locally preview production build:

```bash
# pnpm
pnpm preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Managing Content in Nuxt Studio

This website uses Nuxt Studio for content management. Here's how to manage different types of content:

### Managing Images

Images in this project are stored using IPFS (InterPlanetary File System) hashes. Here's what you need to know:

#### Image Fields in Content

Most content types (games, stories, blog posts, etc.) support these image fields in frontmatter:

- `image` - Primary image for the content (used in detail pages)
- `thumbnail` - Smaller version for list/grid views
- `coverImage` - Cover/hero image (optional)

#### Image Format

Images use IPFS hash URLs in this format:
```yaml
image: /bafkreiahgxziaisasw5ec2xoi27d2mk5k5s2ye3fk7rjr4vkwpwngumtsi.jpg
```

The hash starts with `bafkrei` followed by a long string of characters, ending with the file extension (`.jpg`, `.png`, etc.).

#### How to Update Images

1. **In Nuxt Studio:**
   - Navigate to the content file (e.g., `content/games/your-game.md`)
   - In the frontmatter editor, update the image fields with the new IPFS hash
   - Save the file

2. **Direct File Editing:**
   - Open the content file in the `content/` directory
   - Update the frontmatter fields:
   ```yaml
   ---
   image: /your-new-ipfs-hash.jpg
   thumbnail: /your-new-ipfs-hash.jpg
   coverImage: /your-new-ipfs-hash.jpg
   ---
   ```
   - Save the file

#### Image Best Practices

- **Always include all three fields** (image, thumbnail, coverImage) for games and featured content
- Use the **same IPFS hash** for all three if you don't have different versions
- **Featured content** should always have images set (check `featured: true` in frontmatter)
- For **artwork collections**, use `fullImage` and `thumbnail` fields instead

#### Troubleshooting Missing Images

If images aren't showing:

1. Check that the image field isn't empty (`image: ""` ← BAD)
2. Verify the IPFS hash is complete and starts with `/bafkrei`
3. Make sure the file extension matches the actual file type
4. For featured items, confirm `featured: true` is set in frontmatter

### Managing Navigation

Navigation is controlled by editing `content/navigation/main.yaml`:

```yaml
items:
  - label: 'Your Label'
    to: '/your-path'
    icon: 'lucide:your-icon'
```

To **hide/unlist a page**: Simply remove or comment out the navigation item. The page will still be accessible via direct URL but won't appear in menus.

### Managing Collections

The homepage shows different content collections (games, stories, blog, etc.). Control what appears by editing the frontmatter in `content/home.md`:

```yaml
collections:
  games:
    featured: true          # Show only featured games
    published: true         # Show only published games
    limit: 3               # How many to show
    order: date            # Sort by date
    direction: DESC        # Newest first
```

### Publishing and Featuring Content

Every content file supports these frontmatter fields:

- `published: true` - Makes content visible on the site
- `published: false` - Hides content (draft mode)
- `featured: true` - Shows in featured sections on homepage
- `featured: false` - Regular content, not featured

### SEO Configuration

Each page should have proper SEO metadata in frontmatter:

```yaml
---
title: Your Page Title - Shrike Publishing
description: A clear, concise description of the page content
---
```

These are used automatically for meta tags and social sharing.

### MDC Components

Content files use MDC (Markdown Components) syntax. Here are the main components:

#### Page Structure
```markdown
::u-page-hero
---
title: Your Title
description: Your description
---
::

::u-page-section
---
title: Section Title
description: Section description
---
Your content here
::
```

#### Cards and Layouts
```markdown
::u-card
#header
## Card Title

#default
Card content
::

::u-page-grid{:cols="{ default: 1, md: 2, lg: 3 }"}
Grid content (cards, etc.)
::
```

#### Custom Components

- `::value-card` - For values/features sections
- `::social-link-card` - For social media links
- `::license-card` - For licensing information
- `::timeline-section` - For timeline displays
- `::testimonials-grid` - For testimonials

Refer to existing content files for usage examples.
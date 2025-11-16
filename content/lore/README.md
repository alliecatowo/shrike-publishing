# Lore Wiki - Content Guide

Welcome to the Lore Wiki! This guide will help you add and organize your lore content.

## Quick Start

1. **Create a new file** in this directory (`/content/lore/`)
2. **Name it** with a descriptive slug (e.g., `my-character.md`)
3. **Copy the template** from `_template.md`
4. **Write your content** in Markdown
5. **Save** and your entry will automatically appear in the wiki!

## File Organization

You can organize your lore in folders:

```
/content/lore/
├── characters/
│   ├── hero-name.md
│   └── villain-name.md
├── locations/
│   ├── city-name.md
│   └── region-name.md
├── events/
│   └── great-war.md
└── my-standalone-entry.md
```

## Frontmatter Reference

At the top of each file, add this metadata (called frontmatter):

```yaml
---
title: 'Your Entry Title'
description: 'A brief one-sentence description'
category: 'Characters'  # Choose: Characters, Locations, Historical Events, Phenomena, Organizations, Guides
era: 'The Great Silence'  # Optional: Timeline era
game: 'Era of Silence'  # Optional: Associated game
tags: ['tag1', 'tag2', 'tag3']  # Optional: Searchable tags
published: true  # Set to false to hide
featured: true  # Set to true to show on homepage
date: 2024-01-20  # Today's date
relatedEntries:  # Optional: Link to other entries
  - 'characters/another-character'
  - 'locations/important-place'
timeline:  # Optional: Detailed timeline info
  year: 247
  era: 'The Great Silence'
  season: 'Summer'
image: '/images/my-image.jpg'  # Optional: Hero image
---
```

## Categories

Choose one of these categories:

- **Characters** - People, heroes, villains
- **Locations** - Cities, regions, landmarks
- **Historical Events** - Major events, battles, ceremonies
- **Phenomena** - Mysteries, magical effects, anomalies
- **Organizations** - Groups, factions, guilds
- **Guides** - How-to guides, survival tips

Each category gets its own icon and color in the wiki!

## Writing Content

After the frontmatter, write your content in Markdown:

```markdown
# Main Heading

Your introduction paragraph goes here.

## Subheading

- Bullet point 1
- Bullet point 2

### Smaller Heading

More content here.

**Bold text** and *italic text*.

> Blockquote for important notes
```

## Features

### Automatic Table of Contents
Headings (##, ###) automatically appear in the right sidebar.

### Related Entries
Use `relatedEntries` in frontmatter to link entries together.

### Search
All content is automatically searchable - just use the search bar!

### Navigation
Prev/Next buttons automatically appear to navigate between entries.

## Tips for Non-Technical Users

- **Edit in Nuxt Studio**: Use the visual editor at your production URL
- **File names**: Use lowercase with dashes (e.g., `my-character-name.md`)
- **Images**: Place images in `/public/images/lore/` and reference with `/images/lore/filename.jpg`
- **Preview**: Changes appear immediately when you save
- **Don't worry**: You can't break anything! Just edit and experiment.

## Common Patterns

### Creating a Character

```yaml
---
title: 'Character Name'
description: 'Brief description of who they are'
category: 'Characters'
era: 'Modern Era'
game: 'Your Game Name'
tags: ['hero', 'mage', 'protagonist']
published: true
featured: true
date: 2024-01-20
---

# Character Name

Brief introduction about the character.

## Background

Their history and origin.

## Abilities

What they can do.

## Relationships

Who they know and how.
```

### Creating a Location

```yaml
---
title: 'Location Name'
description: 'Brief description of the place'
category: 'Locations'
tags: ['city', 'coastal', 'trading-hub']
published: true
---

# Location Name

Description of the location.

## Geography

Physical description.

## History

How it came to be.

## Notable Features

What makes it special.
```

## Need Help?

- Check existing entries for examples
- Copy `_template.md` as a starting point
- Ask in the team chat if you're stuck
- The wiki automatically organizes everything for you!

## Publishing Checklist

Before publishing an entry:

- [ ] Frontmatter is complete
- [ ] Title and description are clear
- [ ] Category is set
- [ ] `published: true` is set
- [ ] Content is written in Markdown
- [ ] Spelling is checked
- [ ] Related entries are linked (if applicable)

That's it! Happy writing! 📖✨

# Shrike Publishing: Content Editing Guide

Welcome! This guide will walk you through everything you need to edit the Shrike Publishing website. No coding knowledge required.

---

## Getting Set Up (One-Time)

### 1. Create a GitHub Account

You need a free GitHub account to log in to the content editor.

1. Go to [https://github.com/signup](https://github.com/signup)
2. Sign up with the email address **that Allie added to the editor list** (e.g., `shriketabletop@gmail.com`)
3. Verify your email
4. That's it! You don't need to learn Git or code.

### 2. Log In to the Editor

1. Visit the website: **https://shrike-publishing.com** (or whatever the current URL is)
2. Press **Cmd + .** (Mac) or **Win + .** (Windows) on your keyboard
   - **Cmd** is the key with the Apple logo, next to the spacebar
   - **Win** is the Windows key, also next to the spacebar
   - **.** is just the period/full-stop key
3. You'll be redirected to a GitHub login page
4. Sign in with your GitHub account
5. The Studio editor will appear as an overlay on the site

> **Tip:** You can press this shortcut from any page on the site. After logging in, you'll be returned to the page you were on.

---

## Using the Content Editor (Nuxt Studio)

Once logged in, the Studio interface appears as a sidebar and toolbar overlay on the live site.

### The Sidebar

The left sidebar shows all your content files organized by type:

- **blog/** -- Blog posts
- **stories/** -- Short stories and fiction
- **poetry/** -- Poetry
- **announcements/** -- News and announcements
- **games/** -- Game listings
- **resources/** -- Downloadable resources

Click any file to open it for editing.

### Editing a Page

Each content file has two parts:

1. **Frontmatter** (the settings at the top) -- Title, description, date, tags, images, etc.
2. **Body** (the main content) -- The actual text of the page, written in Markdown

The Studio gives you a visual editor for both. You can click on fields to edit them directly.

### Creating New Content

To create a new blog post, story, poem, or announcement:

1. Navigate to the appropriate folder in the sidebar (e.g., `blog/`)
2. Click the **+** button to create a new file
3. Name the file using lowercase with hyphens (e.g., `my-new-blog-post.md`)
4. Fill in the frontmatter fields (title, description, date, etc.)
5. Write your content in the body area
6. Save when done

### Publishing and Unpublishing

Every content page has two important toggles in the frontmatter:

- **`published: true`** -- The page is visible on the live site
- **`published: false`** -- The page is hidden (draft mode)
- **`featured: true`** -- The page appears in featured sections on the homepage
- **`featured: false`** -- Normal visibility, not featured

To take something down temporarily, just set `published: false` and save.

---

## Writing Content (Markdown Basics)

Content is written in Markdown, which is a simple way to format text. Here's everything you need:

### Text Formatting

```markdown
**Bold text**
*Italic text*
~~Strikethrough~~
[Link text](https://example.com)
```

### Headings

```markdown
# Big Heading (H1)
## Section Heading (H2)
### Subsection (H3)
#### Small Heading (H4)
```

### Lists

```markdown
- Bullet point
- Another bullet
  - Nested bullet

1. Numbered item
2. Another numbered item
```

### Images

```markdown
![Description of image](/path/to/image.jpg)
```

### Block Quotes

```markdown
> This is a quote or callout
```

### Horizontal Line

```markdown
---
```

---

## Using Special Components (MDC Syntax)

The site has special components you can use in your content for richer layouts. These use a syntax called MDC (Markdown Components).

### Callout / Alert Boxes

```markdown
::callout{icon="lucide:info"}
This is an informational callout box.
::

::callout{icon="lucide:alert-triangle" color="warning"}
This is a warning callout.
::
```

### Page Hero Section

```markdown
::u-page-hero
---
title: Your Page Title
description: A brief description
---
::
```

### Page Sections

```markdown
::u-page-section
---
title: Section Title
description: Section description
---
Your content goes here.
::
```

### Cards

```markdown
::u-card
#header
## Card Title

#default
Card content goes here.
::
```

### Grid Layouts

```markdown
::u-page-grid{:cols="{ default: 1, md: 2, lg: 3 }"}
  <!-- Cards go here -->
::
```

> **Tip:** Look at existing content files for examples of how components are used. The easiest way to create a new page is to copy an existing similar page and modify it.

---

## Icons

The site uses the **Lucide** icon set. Icons are referenced like this: `lucide:icon-name`

### Browsing Available Icons

Visit **[https://lucide.dev/icons/](https://lucide.dev/icons/)** to browse all available icons. You can search by name or category.

### Common Icons Used on the Site

| Icon | Code | Use |
|------|------|-----|
| Book | `lucide:book-open` | Stories, reading |
| Pen | `lucide:pen-tool` | Writing, poetry |
| Gamepad | `lucide:gamepad-2` | Games |
| Megaphone | `lucide:megaphone` | Announcements |
| Download | `lucide:download` | Downloads |
| Mail | `lucide:mail` | Contact, email |
| Star | `lucide:star` | Featured |
| Calendar | `lucide:calendar` | Dates |
| Tag | `lucide:tag` | Tags, categories |
| Link | `lucide:external-link` | External links |

### Using Icons in Content

In frontmatter fields that accept icons:
```yaml
icon: lucide:book-open
```

In navigation (`content/navigation/main.yaml`):
```yaml
items:
  - label: Blog
    to: /blog
    icon: lucide:newspaper
```

---

## Images

### Adding Images to Content

Images referenced in content should be placed in the `public/images/` directory. Reference them with a path starting from `/`:

```yaml
image: /images/my-photo.jpg
thumbnail: /images/my-photo-small.jpg
```

### IPFS Images

Some older content uses IPFS hashes for images:
```yaml
image: /bafkreiahgxziaisasw5ec2xoi27d2mk5k5s2ye3fk7rjr4vkwpwngumtsi.jpg
```

These are hosted externally and will continue to work.

---

## Content Types Reference

### Blog Post (`content/blog/`)

```yaml
---
slug: my-post-url
title: My Blog Post Title
description: A short summary for previews and SEO
image: /images/blog/my-image.jpg
date: 2026-02-05
author: Your Name
tags: [news, games]
published: true
featured: false
---

Your blog post content here...
```

### Story (`content/stories/`)

```yaml
---
slug: story-url
title: Story Title
description: Brief synopsis
image: /images/stories/cover.jpg
date: 2026-02-05
author: Author Name
type: short-story
tags: [fiction, sci-fi]
published: true
series: Series Name (if part of a series)
seriesOrder: 1
---

Story content here...
```

### Poem (`content/poetry/`)

```yaml
---
slug: poem-url
title: Poem Title
description: Brief description
date: 2026-02-05
author: Poet Name
tags: [nature, reflection]
published: true
authorNote: Optional note about the poem
---

Poem content here...
```

### Announcement (`content/announcements/`)

```yaml
---
slug: announcement-url
title: Announcement Title
description: Brief summary
date: 2026-02-05
type: release
tags: [new-release]
published: true
---

Announcement content...
```

---

## Site Configuration

### Navigation

Edit `content/navigation/main.yaml` to change the site's top navigation menu:

```yaml
items:
  - label: Home
    to: /
    icon: lucide:home
  - label: Games
    to: /games
    icon: lucide:gamepad-2
  - label: Blog
    to: /blog
    icon: lucide:newspaper
```

### Footer

Edit `content/footer/main.yaml` to change footer links and social media.

### Homepage

The homepage is configured via `content/home.md` frontmatter, which controls which collections are featured and how many items appear.

---

## Saving and Publishing Changes

When you save changes in Studio, they are committed directly to the GitHub repository. The site will automatically redeploy within a couple of minutes.

1. Make your edits in Studio
2. Click **Save**
3. The change is saved to GitHub
4. Vercel automatically detects the change and rebuilds the site
5. Your changes are live in ~2 minutes

---

## Learning Resources and Links

Everything you need to explore on your own. Bookmark these!

### Everyday Editing

| What | Link | Why You Need It |
|------|------|-----------------|
| **Markdown basics** | [markdownguide.org/basic-syntax](https://www.markdownguide.org/basic-syntax/) | The foundation -- how to write formatted content |
| **Markdown cheat sheet** | [markdownguide.org/cheat-sheet](https://www.markdownguide.org/cheat-sheet/) | Quick one-page reference to print out |
| **Browse icons** | [lucide.dev/icons](https://lucide.dev/icons/) | Search and pick icons by name or category |
| **Nuxt Studio editor docs** | [nuxt.studio](https://nuxt.studio/) | How the visual editor works |

### Going Deeper

| What | Link | Why You Need It |
|------|------|-----------------|
| **MDC syntax (components in Markdown)** | [content.nuxt.com/docs/files/markdown](https://content.nuxt.com/docs/files/markdown#mdc-syntax) | How to use `::component` syntax in content |
| **Nuxt UI components** | [ui.nuxt.com](https://ui.nuxt.com/) | All the UI building blocks (cards, buttons, grids, etc.) |
| **Nuxt UI Prose components** | [ui.nuxt.com/components/prose](https://ui.nuxt.com/getting-started/writing/prose) | How Markdown renders into styled HTML -- headings, lists, tables, code blocks, etc. |
| **Nuxt Content docs** | [content.nuxt.com](https://content.nuxt.com/) | Full documentation for the content system |
| **YAML syntax** | [learnxinyminutes.com/yaml](https://learnxinyminutes.com/docs/yaml/) | Quick intro to YAML (used in frontmatter and config files) |

### If You Want to Learn More About the Tech

These are optional -- you don't need any of this to edit content, but if you're curious:

| What | Link | What It Is |
|------|------|------------|
| **Nuxt framework** | [nuxt.com/docs](https://nuxt.com/docs) | The web framework the site is built on |
| **Vue.js** | [vuejs.org/guide](https://vuejs.org/guide/introduction.html) | The JavaScript framework under Nuxt |
| **Tailwind CSS** | [tailwindcss.com/docs](https://tailwindcss.com/docs) | How styling works |
| **Git basics** | [docs.github.com/get-started](https://docs.github.com/en/get-started/start-your-journey/about-github-and-git) | Understanding version control (what happens when you save) |
| **Vercel (hosting)** | [vercel.com/docs](https://vercel.com/docs) | How the site gets deployed |

### Project-Specific Links

| What | Link |
|------|------|
| **GitHub repo** (source code + content) | [github.com/alliecatowo/shrike-publishing](https://github.com/alliecatowo/shrike-publishing) |
| **Vercel dashboard** (hosting) | [vercel.com/alliecatowos-projects/shrike-publishing](https://vercel.com/alliecatowos-projects/shrike-publishing) |
| **Loops dashboard** (newsletter) | [loops.so](https://loops.so/) |
| **GitHub OAuth App settings** | [github.com/settings/developers](https://github.com/settings/developers) (Allie's account) |

---

## Troubleshooting

**Can't log in?**
- Make sure you're using the GitHub account tied to the email Allie authorized
- Try clearing your browser cookies and logging in again
- The keyboard shortcut is Cmd+. (Mac) or Win+. (Windows) -- Ctrl+. will NOT work

**Changes not appearing?**
- Wait 2-3 minutes for the site to rebuild
- Try a hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- Check that `published: true` is set in the frontmatter

**Images not showing?**
- Make sure the image path starts with `/`
- Check that the file actually exists in the `public/images/` directory
- Verify the file extension matches the actual file type

**Something broke?**
- Don't panic! All changes are saved in Git, so anything can be reverted
- Contact Allie: Allisonemilycoleman@gmail.com

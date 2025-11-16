# Hardcoded Content Audit Report

**Date**: November 16, 2025
**Scope**: Full codebase audit for non-editable content
**Total Hardcoded Items Found**: 118+

## Executive Summary

The Shrike Publishing website has significant hardcoded content across Vue components and pages that prevents non-technical clients from editing content directly. The codebase uses Nuxt Content well for collection-based content (blog, stories, games), but UI text, navigation, forms, and static page content remains hardcoded in components.

---

## Detailed Findings

### 1. NAVIGATION & FOOTER (15+ items) - HIGH PRIORITY

**AppHeader.vue**
- Company name: `"Shrike Publishing"`
- Button label: `"Support Us"`
- Cannot be edited without code changes

**AppFooter.vue**
- Column labels: `"Quick Links"`, `"Games"`
- All footer links hardcoded (Home, Stories, Announcements, Resources, All Games, Blood Neon, Era of Silence)
- Newsletter section title: `"Stay Updated"`
- Newsletter description text
- Social media placeholder URLs: `"#"`

**Status**: Footer is critical for client to manage links and branding

---

### 2. HERO SECTIONS & PAGE HEADERS (30+ items) - HIGH PRIORITY

**portfolio.vue**
- Hero title: `"Portfolio"`
- Hero description: `"Showcasing our creative work..."`
- Hero button: `"View Our Work"`
- Section titles: `"Creative Excellence"`, `"Sample Pages Preview"`, etc.
- Tab headings: `"Game & Graphic Design"`, `"Writing & Narrative Design"`, `"Audio Production"`, `"Video Production"`
- Service titles and descriptions (3 services)
- CTA: `"Let's Create Something Amazing"`
- Portfolio sample pages hardcoded data

**shop.vue**
- Hero title: `"Shop Shrike Publishing"`
- Hero buttons: `"Browse Our Games"`, `"Support Us"`
- Ko-fi section title and description
- Ko-fi card content
- Storefronts section title
- Itch.io and DriveThruRPG card content and buttons
- Featured products data (titles, descriptions, prices)
- Newsletter section title and description
- CTA: `"Questions About Our Products?"`

**resources.vue**
- Hero title: `"Free Resources"`
- Hero description
- Category tabs: `"All Resources"`, `"Manuals"`, `"Character Sheets"`, `"Reference Guides"`, `"Maps & Assets"`, `"Templates"`, `"Tools"`
- Community Resources section (title, description, hardcoded resources data)
- FAQ section with hardcoded Q&A pairs
- Quick reference guides (hardcoded data)
- CTA: `"Need More Help?"`

**support.vue**
- Page title: `"Support Us"`
- Page description
- Patron card title and description
- Ko-fi card title and description

**Status**: All hero and section content is locked behind code

---

### 3. FORM LABELS & VALIDATION (20+ items) - MEDIUM PRIORITY

**ContactForm.vue**
- Field labels: `"Name"`, `"Email"`, `"Subject"`, `"Message"`
- Placeholders: `"Your name"`, `"your@email.com"`, `"Your message..."`
- Subject options (6 items): General Inquiry, Game Support, Business Partnership, Press/Media, Bug Report, Other
- Subject placeholder: `"Select a subject"`
- Submit button: `"Send Message"`
- Toast messages (success/error)
- Validation error messages

**NewsletterSignup.vue**
- Email placeholder: `"your@email.com"`
- Success message: `"Success!"` and description
- Error message: `"Subscription failed"` and description

**Status**: Clients cannot customize form without code changes

---

### 4. COLLECTION INDEX PAGES (20+ items) - MEDIUM PRIORITY

**blog/index.vue**
- Title fallback: `"Blog"`
- Description fallback: `"Insights into game design..."`
- Empty state: `"No blog posts yet"`, `"Check back soon for updates!"`
- Button: `"Read"`

**stories/index.vue**
- Title fallback: `"Stories & Literature"`
- Description fallback: `"Explore our published works..."`
- Category tabs: `"All Stories"`, `"Free Stories"`, `"Published Works"`
- Empty state messages
- Button: `"Read"`

**poetry/index.vue**
- Title: `"Poetry Collection"`
- Description: `"Verses exploring themes..."`
- Category tabs: `"All Poetry"`, `"Era of Silence"`, `"Blood Neon"`, `"Original"`
- Empty state messages

**announcements/index.vue**
- Title: `"Announcements"`
- Description: `"Stay updated with our latest news..."`
- Empty state: `"No announcements yet"`, `"Check back soon for updates!"`
- Button text: `"Read More →"`

**games/index.vue**
- Title fallback: `"Our Games"`
- Description fallback: `"Discover our collection..."`
- CTA title and description
- Button labels: `"Learn More"`, `"View Details"`

**Status**: These should use content collections instead of fallbacks

---

### 5. PROSE COMPONENTS (8+ items) - LOW PRIORITY

**LatestUpdates.vue**
- Default blog heading: `"Latest from the Blog"`
- Default blog link: `"View All"`
- Default announcements heading: `"Announcements"`
- Default announcements link: `"View All"`

**ContentNewsletterCta.vue**
- Default title: `"Join Our Community"`
- Default description: `"Subscribe to our newsletter..."`
- Email placeholder: `"Enter your email address"`
- Button label: `"Subscribe"`
- Privacy message: `"We respect your privacy. Unsubscribe at any time."`

**Status**: These have slots for customization - acceptable pattern

---

### 6. CONFIGURATION & MAPPINGS (10+ items) - LOW/MEDIUM PRIORITY

**resources.vue**
- Category label mappings (7 items)
- Icon type mappings (7 items)
- Color mappings (6 items)

**AppHeader.vue**
- Logo path: `/ShrikeLogoNov2021.png`
- Logo alt text: `"Shrike Publishing"`

**Status**: Mappings should be in config files for maintenance

---

## Priority Matrix

### HIGH PRIORITY (Do First)
1. **Footer Navigation** - Critical for branding/links
2. **Shop Page Content** - Featured products, pricing
3. **Portfolio Page** - Multiple section content
4. **Form Configuration** - Subject options, labels
5. **Hero Sections** - Page titles/descriptions across all pages

**Impact**: Client cannot update major content without developer
**Effort**: Medium (Move to content collections and YAML)

### MEDIUM PRIORITY (Do Next)
1. **Collection Index Pages** - Blog, stories, poetry, announcements
2. **Support & Resources Pages** - FAQ, community content
3. **Configuration Mappings** - Categories, icons, colors
4. **Empty State Messages** - Generic fallback text

**Impact**: Improved content flexibility
**Effort**: Low-Medium (Mostly moving text to config)

### LOW PRIORITY (Nice-to-have)
1. **Prose Component Defaults** - Already have slots
2. **Button Labels** - Scattered throughout
3. **Miscellaneous Text** - Helper text, placeholders

**Impact**: Polish and consistency
**Effort**: Low (Already somewhat configurable)

---

## Recommended Solutions

### 1. Content Collections (Best Practice)
```markdown
// content/pages/portfolio.md
---
title: Portfolio
description: Showcasing our creative work...
sections:
  - title: Creative Excellence
    description: Every aspect...
---

<!-- Content here -->
```

### 2. YAML Configuration
```yaml
# app/config/forms.yml
contactForm:
  fields:
    - name: Name
      placeholder: Your name
      required: true
    - name: Email
      placeholder: your@email.com
      required: true
  subjects:
    - General Inquiry
    - Game Support
    - Business Partnership
```

### 3. Prose Components with Slots
```markdown
::newsletter-signup
#title
Join Our Community

#description
Subscribe to get updates...
::
```

### 4. Environment/Config Files
```typescript
// app.config.ts
export default defineAppConfig({
  footer: {
    columns: [
      { label: 'Quick Links', items: [...] },
      { label: 'Games', items: [...] }
    ]
  }
})
```

---

## Contact Page - Model for Refactoring

The newly refactored contact page demonstrates the ideal pattern:

**ContactSection.vue** (Prose Component)
- Manages layout (2-column grid)
- Manages styling (cards, spacing)
- Uses named slots for content

**contact.md** (Fully Editable)
- Hero section (all text editable)
- Social cards (all text editable)
- Contact form (via component)
- Business info (via slots)

**Result**: Non-technical users can edit all content in markdown without touching code

---

## Implementation Roadmap

**Phase 1 (Week 1)**
- Refactor footer navigation to YAML config
- Move all shop page content to content collection
- Create form configuration file

**Phase 2 (Week 2)**
- Convert collection index pages to content-driven
- Add page content frontmatter to all pages
- Move portfolio section content

**Phase 3 (Week 3)**
- Create reusable section components (Hero, CTA, etc.)
- Build admin interface for easy editing
- Implement i18n for multi-language support

---

## Files to Refactor (Priority Order)

1. `/app/components/AppFooter.vue` - Move to config
2. `/app/pages/shop.vue` - Move to content collection
3. `/app/pages/portfolio.vue` - Move to content + config
4. `/app/components/ContactForm.vue` - Move to form config
5. `/app/pages/resources.vue` - Move FAQ & guides to content
6. `/app/pages/poetry/index.vue` - Use content-driven approach
7. `/app/pages/stories/index.vue` - Use content-driven approach
8. `/app/components/AppHeader.vue` - Move config to app.config.ts
9. `/app/pages/announcements/index.vue` - Use content collection
10. `/app/pages/blog/index.vue` - Use content collection

---

## Notes

- Codebase already has good patterns for content-driven pages (contact.md, blog, stories, etc.)
- The refactored contact page serves as a good template for other pages
- Nuxt Content is properly configured for collections
- Main gaps are in UI chrome (footer, headers, forms, CTAs)

**Contact page pattern should be replicated across the site for consistency.**

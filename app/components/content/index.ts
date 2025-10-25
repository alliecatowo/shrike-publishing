/**
 * MDC Content Components Index
 *
 * Custom components for use in Nuxt Content MDC files.
 * These components are automatically available in all .md files.
 *
 * Component Naming Convention:
 * - File: PascalCase.vue (e.g., HeroSection.vue)
 * - MDC Usage: kebab-case (e.g., ::hero-section::)
 *
 * @see README.md for detailed usage documentation
 * @see EXAMPLE.md for practical examples
 */

export const contentComponents = {
  // Main Section Components
  HeroSection: {
    description: 'Hero section with gradient background',
    props: ['title', 'description', 'links'],
    requiredProps: ['title'],
    slots: ['default'],
  },

  StatsGrid: {
    description: 'Grid container for statistics',
    props: ['title', 'description'],
    requiredProps: ['title'],
    slots: ['default'],
    children: ['StatCard'],
  },

  TestimonialsGrid: {
    description: 'Grid container for testimonials',
    props: ['title', 'description'],
    requiredProps: ['title'],
    slots: ['default'],
    children: ['TestimonialCard'],
  },

  TimelineSection: {
    description: 'Vertical timeline display',
    props: ['title', 'description', 'items'],
    requiredProps: ['title'],
    slots: ['default'],
    children: ['TimelineItem'],
  },

  // Child Components
  StatCard: {
    description: 'Individual stat card with icon',
    props: ['title', 'icon', 'color'],
    requiredProps: ['title', 'icon'],
    defaultProps: { color: 'primary' },
    slots: ['default'],
    parent: 'StatsGrid',
  },

  TestimonialCard: {
    description: 'Individual testimonial card',
    props: ['title', 'author', 'role', 'avatarText', 'avatarSrc'],
    requiredProps: ['title', 'author'],
    slots: ['default'],
    parent: 'TestimonialsGrid',
  },

  TimelineItem: {
    description: 'Individual timeline entry',
    props: ['date', 'title', 'description', 'icon', 'to'],
    requiredProps: [],
    slots: ['default'],
    parent: 'TimelineSection',
  },
} as const

export type ContentComponentName = keyof typeof contentComponents

/**
 * Available color schemes for components
 */
export const componentColors = [
  'primary',
  'secondary',
  'success',
  'warning',
  'error',
  'info',
] as const

export type ComponentColor = typeof componentColors[number]

/**
 * Component prop interfaces for type safety
 */
export interface HeroSectionProps {
  title: string
  description?: string
  links?: Array<{
    label: string
    to: string
    variant?: string
    icon?: string
    trailingIcon?: string
  }>
}

export interface StatsGridProps {
  title: string
  description?: string
}

export interface StatCardProps {
  title: string
  icon: string
  color?: ComponentColor
}

export interface TestimonialsGridProps {
  title: string
  description?: string
}

export interface TestimonialCardProps {
  title: string
  author: string
  role?: string
  avatarText?: string
  avatarSrc?: string
}

export interface TimelineSectionProps {
  title: string
  description?: string
  items?: Array<{
    date: string
    title: string
    description?: string
    icon?: string
    to?: string
  }>
}

export interface TimelineItemProps {
  date?: string
  title?: string
  description?: string
  icon?: string
  to?: string
}

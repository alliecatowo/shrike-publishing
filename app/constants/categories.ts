/**
 * Resource category filters
 * Used in resources page for filtering downloads
 */
export const RESOURCE_CATEGORIES = [
  { label: 'All Resources', value: 'all' },
  { label: 'Manuals', value: 'manual' },
  { label: 'Character Sheets', value: 'character-sheets' },
  { label: 'Reference Guides', value: 'reference' },
  { label: 'Maps & Assets', value: 'maps' },
  { label: 'Templates', value: 'templates' },
  { label: 'Tools', value: 'tools' }
] as const

/**
 * Portfolio category filters
 * Used in portfolio page
 */
export const PORTFOLIO_TABS = [
  { label: 'Design', value: 'design', icon: 'i-lucide-palette' },
  { label: 'Drawings', value: 'drawings', icon: 'i-lucide-image' },
  { label: 'Writing', value: 'writing', icon: 'i-lucide-pen-tool' },
  { label: 'Audio', value: 'audio', icon: 'i-lucide-music' },
  { label: 'Video', value: 'video', icon: 'i-lucide-video' }
] as const

export const GAME_FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Blood Neon', value: 'blood-neon' },
  { label: 'Era of Silence', value: 'era-of-silence' }
] as const

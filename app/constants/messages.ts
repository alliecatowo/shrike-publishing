/**
 * Toast notification messages
 * Centralized messages for consistency across the app
 */

export const TOAST_MESSAGES = {
  newsletter: {
    success: {
      title: 'Success!',
      description: "You're subscribed to our newsletter",
      icon: 'i-lucide-check-circle'
    },
    error: {
      title: 'Subscription failed',
      description: 'Failed to subscribe. Please try again.',
      icon: 'i-lucide-x-circle'
    }
  },
  contact: {
    success: {
      title: 'Message sent!',
      description: "Thank you for your message! We'll get back to you soon.",
      icon: 'i-lucide-check-circle'
    },
    error: {
      title: 'Error',
      description: 'There was an error sending your message. Please try again.',
      icon: 'i-lucide-x-circle'
    }
  }
} as const

/**
 * Form subject options
 */
export const CONTACT_FORM_SUBJECTS = [
  { label: 'General Inquiry', value: 'General Inquiry' },
  { label: 'Game Support', value: 'Game Support' },
  { label: 'Business Partnership', value: 'Business Partnership' },
  { label: 'Press/Media', value: 'Press/Media' },
  { label: 'Bug Report', value: 'Bug Report' },
  { label: 'Other', value: 'Other' }
] as const

/**
 * Common button labels
 */
export const BUTTON_LABELS = {
  readMore: 'Read More',
  learnMore: 'Learn More',
  viewAll: 'View All',
  download: 'Download',
  downloadPdf: 'Download PDF',
  contactUs: 'Contact Us',
  getInTouch: 'Get in Touch',
  subscribe: 'Subscribe',
  sendMessage: 'Send Message',
  browseGames: 'Browse Our Games',
  supportUs: 'Support Us'
} as const

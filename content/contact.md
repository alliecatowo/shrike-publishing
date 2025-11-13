---
title: Contact - Shrike Publishing
description: Get in touch with Shrike Publishing. Find us on social media, support us on Patreon, and send us a message.

# Business Information
business:
  address:
    name: Shrike Publishing
    line1: "[Your Address]"
    line2: "[City, State ZIP]"
    line3: "[Country]"
  hours:
    - "Monday - Friday: 9:00 AM - 6:00 PM EST"
    - "Email responses within 24-48 hours"
---

::u-page-hero
---
title: Contact & Connect
description: Get in touch and follow us across all platforms.
ui:
  container: text-center
---
::

::u-page-grid{:cols="{ default: 1, md: 2, lg: 3 }" class="gap-6 mb-12"}
:::social-link-card{title="Patreon" icon="i-lucide-heart" url="https://patreon.com/shrikepublishing" buttonText="Become a Patron" color="error" :external="true"}
Become a patron and get exclusive content, early access, and behind-the-scenes updates.
:::

:::social-link-card{title="Ko-fi" icon="i-lucide-coffee" url="https://ko-fi.com/shrikepublishing" buttonText="Buy us a coffee" color="info" :external="true"}
Buy us a coffee to show your support.
:::

:::social-link-card{title="Join Our Community" icon="i-lucide-message-circle" url="https://discord.gg/shrikepublishing" buttonText="Join Discord" color="indigo" :external="true"}
Connect with fellow gamers, share strategies, and get real-time updates from our team.
:::

:::social-link-card{title="Follow on Twitter" icon="i-lucide-at-sign" url="https://twitter.com/shrikepub" buttonText="Follow @shrikepub" color="primary" :external="true"}
Get quick updates, announcements, and engage with our community.
:::

:::social-link-card{title="Instagram" icon="i-lucide-camera" url="https://instagram.com/shrikepublishing" buttonText="Follow on Instagram" color="pink" :external="true"}
See artwork, gameplay photos, and creative process behind our games.
:::

:::social-link-card{title="Facebook" icon="i-lucide-globe" url="https://facebook.com/shrikepublishing" buttonText="Like on Facebook" color="primary" :external="true"}
Join our community page for discussions and event updates.
:::

:::social-link-card{title="Email Us" icon="i-lucide-mail" url="mailto:hello@shrikepublishing.com" buttonText="Send Email" color="success" :external="false"}
Have questions about our games or want to get in touch? Send us an email.
:::
::

::u-card{class="mb-12"}
#header
## Send us a message

#default
:contact-form
::

::u-card
## Business Information

::u-page-grid{:cols="{ default: 1, md: 2 }" class="gap-6"}
#### Mailing Address

{{ business.address.name }}
{{ business.address.line1 }}
{{ business.address.line2 }}
{{ business.address.line3 }}

#### Business Hours

{{ business.hours[0] }}
{{ business.hours[1] }}
::
::

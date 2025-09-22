#!/usr/bin/env node
/*
  Migration script: Squarespace (scraped-site) → Nuxt Content
  - Parses talonborne story pages from scraped HTML
  - Extracts title, author, date, description, tags
  - Converts body HTML → Markdown
  - Copies/downloads referenced media to public/images/stories
  - Writes Markdown with frontmatter into content/stories
*/

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import TurndownService from 'turndown'
import { load as loadHtml } from 'cheerio'
import fetch from 'node-fetch'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const projectRoot = path.resolve(__dirname, '..')
const scrapedRoot = path.resolve(projectRoot, 'scraped-site/shrikepublishing.com')
const talonborneDir = path.join(scrapedRoot, 'talonborne')
const outputDir = path.resolve(projectRoot, 'content/stories')
const publicImagesDir = path.resolve(projectRoot, 'public/images/stories')
const publicDocsDir = path.resolve(projectRoot, 'public/docs')

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

ensureDir(outputDir)
ensureDir(publicImagesDir)
ensureDir(publicDocsDir)

const turndown = new TurndownService({
  headingStyle: 'atx',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced'
})

const talonborneFiles = fs
  .readdirSync(talonborneDir)
  .filter((f) => f.endsWith('.html') && !f.includes('category') && !f.includes('tag'))

// Include multi-part Memory Leak pages at site root, if present
const extraRootFiles = ['memory-leak-2.html', 'memory-leak-3.html', 'memory-leak-end.html']
  .filter((f) => fs.existsSync(path.join(scrapedRoot, f)))

const htmlFiles = [
  ...talonborneFiles.map((f) => path.join('talonborne', f)),
  ...extraRootFiles
]

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')

async function downloadImage(url, targetFile) {
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Failed ${res.status}`)
    const buf = Buffer.from(await res.arrayBuffer())
    fs.writeFileSync(targetFile, buf)
  } catch (e) {
    console.warn(`WARN: Could not download ${url} → ${targetFile}: ${e.message}`)
  }
}

function deriveImageName(srcUrl, fallbackSlug) {
  try {
    const u = new URL(srcUrl)
    const base = path.basename(u.pathname)
    return base || `${fallbackSlug}.jpg`
  } catch {
    return `${fallbackSlug}.jpg`
  }
}

function extractText($, sel) {
  const el = $(sel).first()
  return el.text().trim()
}

function extractMeta($, prop) {
  const m = $(`meta[property="${prop}"]`).attr('content') || ''
  return m.trim()
}

function pickDescription($) {
  const og = extractMeta($, 'og:description')
  if (og) return og
  const metaDesc = $('meta[name="description"]').attr('content') || ''
  if (metaDesc) return metaDesc.trim()
  // try first paragraph inside content
  const firstP = $('.entry-content p').first().text().trim()
  return firstP || ''
}

function extractTags($) {
  // categories and tags show up as links under header; collect their text
  const tags = new Set()
  $('.entry-morefrom a, .entry-header .post-category a, .entry-header .post-tags a').each((_, a) => {
    const t = $(a).text().trim()
    if (t) tags.add(t)
  })
  return Array.from(tags)
}

function extractAuthor($) {
  const a = extractText($, '.entry-byline .entry-author, .post-author a, .post-author')
  return a || ($('meta[itemprop="author"]').attr('content') || '').trim() || 'Unknown'
}

function extractDate($) {
  const iso = $('time.dt-published').attr('datetime') || $('meta[itemprop="datePublished"]').attr('content') || ''
  if (iso) return iso.split('T')[0]
  return ''
}

function extractTitle($) {
  const h1 = extractText($, 'h1.entry-title, .post-title, h1 .u-url, h1 a.u-url, h1')
  if (h1) return h1
  const ogt = extractMeta($, 'og:title')
  return ogt || 'Untitled'
}

function extractMainImage($) {
  const img = $('#thumbnail img').attr('data-image') || $('#thumbnail img').attr('src') || ''
  return img
}

// note: body HTML is composed inline when normalizing; no standalone extractor needed

function normalizeHrefToPublic($, el) {
  const href = $(el).attr('href') || ''
  if (!href) return
  // Handle Squarespace /s/*.pdf links (can be '../s/..' or 's/...')
  const pdfMatch = href.match(/(?:^|\/)s\/([^?#]+\.pdf)(?:[?#].*)?$/i)
  if (pdfMatch) {
    const filename = pdfMatch[1]
    const src = path.join(scrapedRoot, 's', filename)
    const dest = path.join(publicDocsDir, filename)
    try {
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest)
        $(el).attr('href', `/docs/${filename}`)
      }
    } catch (e) {
      console.warn(`WARN: Copy PDF failed ${src} → ${dest}: ${e.message}`)
    }
  }
}

async function normalizeImgToPublic($, el, fallbackSlug) {
  const src = $(el).attr('data-image') || $(el).attr('src') || ''
  if (!src) return
  // Absolute URLs → download; relative inside scraped /s/ → copy
  if (/^https?:\/\//i.test(src)) {
    const imgName = deriveImageName(src, fallbackSlug)
    const target = path.join(publicImagesDir, imgName)
    await downloadImage(src, target)
    $(el).attr('src', `/images/stories/${imgName}`)
    $(el).removeAttr('data-image')
  } else if (/^(?:\.\.\/)?s\//i.test(src)) {
    const filename = src.replace(/^.*s\//i, '')
    const from = path.join(scrapedRoot, 's', filename)
    const to = path.join(publicImagesDir, filename)
    try {
      if (fs.existsSync(from)) {
        fs.copyFileSync(from, to)
        $(el).attr('src', `/images/stories/${filename}`)
        $(el).removeAttr('data-image')
      }
    } catch (e) {
      console.warn(`WARN: Copy image failed ${from} → ${to}: ${e.message}`)
    }
  }
}

async function processFile(relPath) {
  const full = path.join(scrapedRoot, relPath)
  const raw = fs.readFileSync(full, 'utf8')
  const $ = loadHtml(raw)

  let title = extractTitle($)
  title = title.replace(/\s+—\s+Shrike Publishing$/i, '').trim()
  const slug = slugify((path.basename(relPath).replace(/\.html$/, '')) || title)
  const author = extractAuthor($)
  const date = extractDate($)
  const description = pickDescription($)
  const tags = extractTags($)
  const type = 'free'

  let mainImgUrl = extractMainImage($)
  // If no banner image, look for first inline image in content
  if (!mainImgUrl) {
    const firstInline = $('.entry-content img').first()
    if (firstInline && firstInline.length) {
      mainImgUrl = firstInline.attr('data-image') || firstInline.attr('src') || ''
    }
  }
  let imagePath = ''
  let thumbPath = ''
  if (mainImgUrl) {
    const imgName = deriveImageName(mainImgUrl, slug)
    const target = path.join(publicImagesDir, imgName)
    await downloadImage(mainImgUrl, target)
    imagePath = `/images/stories/${imgName}`
    // simple thumbnail alias to same image (can be refined to resized later)
    thumbPath = imagePath
  }

  // Work within main content root and normalize media links before HTML→MD
  const $contentRoot = $('.entry-content')
  if ($contentRoot.length) {
    $contentRoot.find('a[href]').each((_, a) => normalizeHrefToPublic($, a, path.dirname(full)))
    const imgEls = $contentRoot.find('img')
    for (const el of imgEls.toArray()) {
      await normalizeImgToPublic($, el, slug)
    }
  }
  // Concatenate text blocks if present, else fallback to content root or #content
  let bodyHtml = ''
  const blocks = $contentRoot.find('.sqs-html-content')
  if (blocks.length) {
    bodyHtml = blocks.map((_, n) => $(n).html() || '').get().join('\n\n')
  } else if ($contentRoot.length) {
    bodyHtml = $contentRoot.html() || ''
  } else {
    bodyHtml = $('#content').html() || ''
  }
  const markdown = turndown.turndown(bodyHtml)

  // Use JSON.stringify for safe quoting of YAML scalars
  const stringify = (s) => JSON.stringify(String(s))
  const frontmatter = [
    '---',
    `slug: ${stringify(slug)}`,
    `title: ${stringify(title)}`,
    `description: ${stringify(description)}`,
    thumbPath ? `thumbnail: ${stringify(thumbPath)}` : '',
    imagePath ? `image: ${stringify(imagePath)}` : '',
    date ? `date: ${stringify(date)}` : '',
    `author: ${stringify(author)}`,
    `type: ${stringify(type)}`,
    tags.length ? 'tags:' : 'tags: []',
    ...tags.map((t) => `  - ${stringify(t)}`),
    'published: true',
    '---',
    ''
  ].filter(Boolean).join('\n')

  const outFile = path.join(outputDir, `${slug}.md`)
  fs.writeFileSync(outFile, `${frontmatter}\n${markdown}\n`)
  return { file: relPath, outFile }
}

;(async () => {
  const results = []
  for (const f of htmlFiles) {
    try {
      const r = await processFile(f)
      results.push(r)
      console.log(`OK ${f} → ${path.relative(projectRoot, r.outFile)}`)
    } catch (e) {
      console.error(`FAIL ${f}: ${e.message}`)
    }
  }
  console.log(`Done. Wrote ${results.length} markdown files.`)
})()



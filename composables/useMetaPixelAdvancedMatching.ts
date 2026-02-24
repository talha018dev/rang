/**
 * Meta Pixel Advanced Matching – pass em, ph, fn, ln, etc. to fbq('init', pixelId, options).
 * Values are hashed by the pixel (SHA-256). Stored in localStorage so the plugin can read on init.
 */
const STORAGE_KEY = 'meta_pixel_advanced_matching'

export interface MetaPixelAdvancedMatching {
  em?: string  // email
  ph?: string  // phone
  fn?: string  // first name
  ln?: string  // last name
  ct?: string  // city
  st?: string  // state
  zp?: string  // zip
  country?: string
}

function normalize(value: string | undefined | null): string | undefined {
  if (value == null || typeof value !== 'string') return undefined
  const t = value.trim()
  return t === '' ? undefined : t
}

function splitName(fullName: string): { fn: string; ln: string } {
  const parts = fullName.trim().split(/\s+/)
  if (parts.length === 0) return { fn: '', ln: '' }
  const first = parts[0] ?? ''
  if (parts.length === 1) return { fn: first, ln: '' }
  return { fn: first, ln: parts.slice(1).join(' ') }
}

export function setMetaPixelAdvancedMatching(data: {
  email?: string | null
  phone?: string | null
  name?: string | null
  city?: string | null
  state?: string | null
  zip?: string | null
  country?: string | null
}): void {
  if (typeof window === 'undefined') return
  const { fn, ln } = splitName((data.name || '').trim())
  const out: MetaPixelAdvancedMatching = {}
  const em = normalize(data.email)
  if (em) out.em = em.toLowerCase()
  const ph = normalize(data.phone)
  if (ph) out.ph = ph.replace(/\D/g, '') // digits only
  if (fn) out.fn = fn
  if (ln) out.ln = ln
  const ct = normalize(data.city)
  if (ct) out.ct = ct
  const st = normalize(data.state)
  if (st) out.st = st
  const zp = normalize(data.zip)
  if (zp) out.zp = zp
  const country = normalize(data.country)
  if (country) out.country = country
  try {
    if (Object.keys(out).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(out))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  } catch (_) {}
}

export function getMetaPixelAdvancedMatching(): MetaPixelAdvancedMatching | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Record<string, string>
    const out: MetaPixelAdvancedMatching = {}
    if (parsed.em) out.em = parsed.em
    if (parsed.ph) out.ph = parsed.ph
    if (parsed.fn) out.fn = parsed.fn
    if (parsed.ln) out.ln = parsed.ln
    if (parsed.ct) out.ct = parsed.ct
    if (parsed.st) out.st = parsed.st
    if (parsed.zp) out.zp = parsed.zp
    if (parsed.country) out.country = parsed.country
    return Object.keys(out).length > 0 ? out : null
  } catch (_) {
    return null
  }
}

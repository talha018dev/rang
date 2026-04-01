import { useRuntimeConfig } from 'nuxt/app'
import { useCurrency } from './useCurrency'

type MetaPixelTrackAction = 'track' | 'trackCustom'

type MetaPixelCategory = {
  name?: string | null
  slug?: string | null
}

type MetaPixelProductLike = {
  id?: number | string | null
  name?: string | null
  price?: number | null
  price_usd?: number | null
  category?: MetaPixelCategory | null
}

type MetaPixelCheckoutItemLike = MetaPixelProductLike & {
  quantity?: number | null
  product_id?: number | string | null
  variant_id?: number | string | null
}

declare global {
  interface Window {
    fbq?: (
      action: MetaPixelTrackAction,
      event: string,
      params?: Record<string, unknown>
    ) => void
    __metaPixelTrackedEvents?: Record<string, true>
  }
}

const normalizePixelId = (value: unknown): string | null => {
  const pixelId = String(value ?? '').trim()
  if (!pixelId || !/^\d+$/.test(pixelId)) return null
  return pixelId
}

const normalizeCurrencyCode = (value: unknown): 'BDT' | 'USD' | null => {
  const currency = String(value ?? '').trim().toUpperCase()
  if (currency === 'BDT' || currency === 'USD') return currency
  return null
}

const roundPrice = (value: number): number => {
  return Number(value.toFixed(2))
}

export const useMetaPixelEvents = () => {
  const runtimeConfig = useRuntimeConfig()
  const { currency, exchangeRate } = useCurrency()
  const pixelId = normalizePixelId(runtimeConfig.public.metaPixelId)

  const trackEvent = (
    action: MetaPixelTrackAction,
    event: string,
    params: Record<string, unknown>,
    dedupeKey?: string
  ) => {
    if (typeof window === 'undefined' || typeof window.fbq !== 'function') return

    if (dedupeKey) {
      window.__metaPixelTrackedEvents ||= {}
      if (window.__metaPixelTrackedEvents[dedupeKey]) return
      window.__metaPixelTrackedEvents[dedupeKey] = true
    }

    window.fbq(action, event, params)
  }

  const getContentId = (productId: unknown, variantId?: unknown): string | null => {
    const rawId = variantId ?? productId
    if (rawId === null || rawId === undefined || String(rawId).trim() === '') return null
    const normalizedId = String(rawId).trim()
    return pixelId ? `${pixelId}_${normalizedId}` : normalizedId
  }

  const getDisplayValue = (price?: number | null, priceUsd?: number | null): number => {
    const priceNumber = Number(price ?? 0)
    const priceUsdNumber = Number(priceUsd ?? 0)

    if (currency.value === 'USD') {
      if (Number.isFinite(priceUsdNumber) && priceUsdNumber > 0) return roundPrice(priceUsdNumber)
      if (Number.isFinite(priceNumber) && priceNumber > 0 && exchangeRate.value > 0) {
        return roundPrice(priceNumber / exchangeRate.value)
      }
      return 0
    }

    if (Number.isFinite(priceNumber) && priceNumber > 0) return roundPrice(priceNumber)
    return 0
  }

  const buildContents = (products: MetaPixelProductLike[], limit = 10) => {
    return products
      .slice(0, limit)
      .map((product) => {
        const id = getContentId(product.id)
        if (!id) return null
        return {
          id,
          quantity: 1
        }
      })
      .filter((item): item is { id: string; quantity: number } => item !== null)
  }

  const buildCheckoutContents = (items: MetaPixelCheckoutItemLike[], limit = 20) => {
    return items
      .slice(0, limit)
      .map((item) => {
        const id = getContentId(item.variant_id ?? item.product_id ?? item.id)
        if (!id) return null
        return {
          id,
          quantity: Math.max(1, Number(item.quantity) || 1)
        }
      })
      .filter((item): item is { id: string; quantity: number } => item !== null)
  }

  const trackViewContent = (
    product: MetaPixelProductLike,
    options?: { variantId?: unknown; dedupeKey?: string }
  ) => {
    const contentId = getContentId(product.id, options?.variantId)
    if (!contentId) return

    const payload: Record<string, unknown> = {
      content_name: product.name || 'Product',
      content_ids: [contentId],
      content_type: 'product_group',
      value: getDisplayValue(product.price, product.price_usd),
      currency: normalizeCurrencyCode(currency.value) ?? 'BDT'
    }

    if (product.category?.name) {
      payload.content_category = product.category.name
    }

    trackEvent('track', 'ViewContent', payload, options?.dedupeKey ?? `ViewContent:${contentId}`)
  }

  const trackViewCategory = (
    categoryName: string,
    products: MetaPixelProductLike[],
    dedupeKey?: string
  ) => {
    const trimmedName = categoryName.trim()
    if (!trimmedName) return

    const contents = buildContents(products)
    const payload: Record<string, unknown> = {
      content_category: trimmedName,
      content_type: 'product_group',
      num_items: contents.length
    }

    if (contents.length > 0) {
      payload.content_ids = contents.map((item) => item.id)
      payload.contents = contents
    }

    trackEvent('track', 'ViewCategory', payload, dedupeKey)
  }

  const trackSearch = (
    searchString: string,
    products: MetaPixelProductLike[],
    dedupeKey?: string
  ) => {
    const trimmedSearch = searchString.trim()
    if (trimmedSearch.length < 2) return

    const contents = buildContents(products, 6)
    const payload: Record<string, unknown> = {
      search_string: trimmedSearch,
      content_type: 'product_group',
      num_items: contents.length
    }

    if (contents.length > 0) {
      payload.content_ids = contents.map((item) => item.id)
      payload.contents = contents
    }

    trackEvent('track', 'Search', payload, dedupeKey)
  }

  const trackInitiateCheckout = (
    items: MetaPixelCheckoutItemLike[],
    options?: {
      value?: number | null
      currency?: unknown
      dedupeKey?: string
    }
  ) => {
    if (items.length === 0) return

    const contents = buildCheckoutContents(items)
    const numItems = contents.reduce((sum, item) => sum + item.quantity, 0)
    const fallbackValue = roundPrice(items.reduce((sum, item) => {
      const quantity = Math.max(1, Number(item.quantity) || 1)
      return sum + (getDisplayValue(item.price, item.price_usd) * quantity)
    }, 0))

    const rawValue = Number(options?.value)
    const value = Number.isFinite(rawValue) && rawValue > 0 ? roundPrice(rawValue) : fallbackValue
    const payload: Record<string, unknown> = {
      content_type: 'product_group',
      value,
      currency: normalizeCurrencyCode(options?.currency ?? currency.value) ?? 'BDT',
      num_items: numItems
    }

    if (contents.length > 0) {
      payload.content_ids = contents.map((item) => item.id)
      payload.contents = contents
    }

    trackEvent('track', 'InitiateCheckout', payload, options?.dedupeKey)
  }

  return {
    getContentId,
    trackInitiateCheckout,
    trackSearch,
    trackViewCategory,
    trackViewContent
  }
}

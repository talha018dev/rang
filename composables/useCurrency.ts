import { computed, ref } from 'vue'
import { useApi } from './useApi'

export type Currency = 'BDT' | 'USD'

// Exchange rate is not cookie-based; keep module-level for API cache
const exchangeRate = ref<number>(125)
let exchangeRateInitialized = false

const initializeExchangeRate = () => {
  if (exchangeRateInitialized || typeof window === 'undefined') {
    return
  }
  exchangeRateInitialized = true
  try {
    const { backendUrl } = useApi()
    $fetch<any>(`${backendUrl}/settings`)
      .then((res) => {
        if (res?.success && res?.data?.general?.currency_rate_usd) {
          const rate = parseFloat(res.data.general.currency_rate_usd)
          if (!isNaN(rate) && rate > 0) {
            exchangeRate.value = rate
          }
        }
      })
      .catch(() => {})
  } catch {
    // ignore
  }
}

export const useCurrency = () => {
  // SSR-safe: server reads cookie, client hydrates with same value → navbar and content match
  const currencyCookie = useCookie<Currency>('currency', {
    default: () => 'BDT',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax'
  })

  // On client only: migrate localStorage → cookie once when cookie is still default (e.g. first load after deploy)
  if (import.meta.client && typeof window !== 'undefined') {
    const fromStorage = localStorage.getItem('currency') as Currency | null
    if (fromStorage && (fromStorage === 'BDT' || fromStorage === 'USD') && currencyCookie.value === 'BDT') {
      currencyCookie.value = fromStorage
    }
  }

  initializeExchangeRate()

  const setCurrency = (newCurrency: Currency, isManual = false) => {
    currencyCookie.value = newCurrency
    if (typeof window !== 'undefined') {
      localStorage.setItem('currency', newCurrency)
      if (isManual) {
        localStorage.setItem('currency_manually_set', 'true')
      }
    }
  }

  const currencySymbol = computed(() => (currencyCookie.value === 'BDT' ? 'Tk' : '$'))
  const currencyCode = computed(() => currencyCookie.value)

  const formatPrice = (price: number | null | undefined, priceUsd?: number | null): string => {
    if (price === null || price === undefined || isNaN(price)) {
      price = 0
    }
    if (currencyCookie.value === 'USD') {
      let usdPrice: number
      if (priceUsd !== undefined && priceUsd !== null && priceUsd > 0) {
        usdPrice = priceUsd
      } else if (price && exchangeRate.value > 0) {
        usdPrice = price / exchangeRate.value
      } else {
        usdPrice = 0
      }
      if (!isFinite(usdPrice) || isNaN(usdPrice)) {
        usdPrice = 0
      }
      return `$${usdPrice.toFixed(2)}`
    }
    if (!isFinite(price) || isNaN(price)) {
      price = 0
    }
    return `Tk ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const getPrice = (price: number, priceUsd?: number): number => {
    if (currencyCookie.value === 'USD') {
      return priceUsd !== undefined ? priceUsd : price / exchangeRate.value
    }
    return price
  }

  const setExchangeRate = (rate: number) => {
    exchangeRate.value = rate
  }

  return {
    currency: currencyCookie,
    currencySymbol,
    currencyCode,
    setCurrency,
    formatPrice,
    getPrice,
    setExchangeRate,
    exchangeRate: computed(() => exchangeRate.value)
  }
}

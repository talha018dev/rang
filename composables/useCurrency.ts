import { computed, ref } from 'vue'

export type Currency = 'BDT' | 'USD'

// Initialize currency from localStorage if available, otherwise default to BDT
const getInitialCurrency = (): Currency => {
  if (typeof window !== 'undefined') {
    const savedCurrency = localStorage.getItem('currency') as Currency | null
    if (savedCurrency && (savedCurrency === 'BDT' || savedCurrency === 'USD')) {
      return savedCurrency
    }
  }
  return 'BDT'
}

const currency = ref<Currency>(getInitialCurrency())
const exchangeRate = ref<number>(110) // 1 USD = 110 BDT (example rate, can be updated)

export const useCurrency = () => {
  // Set currency
  const setCurrency = (newCurrency: Currency, isManual = false) => {
    currency.value = newCurrency
    if (typeof window !== 'undefined') {
      localStorage.setItem('currency', newCurrency)
      // Track if user manually selected currency (prevents auto-detection from overriding)
      if (isManual) {
        localStorage.setItem('currency_manually_set', 'true')
      }
    }
  }

  // Get currency symbol
  const currencySymbol = computed(() => {
    return currency.value === 'BDT' ? 'Tk' : '$'
  })

  // Get currency code
  const currencyCode = computed(() => {
    return currency.value
  })

  // Convert price based on currency
  const formatPrice = (price: number | null | undefined, priceUsd?: number | null): string => {
    // Handle null/undefined prices
    if (price === null || price === undefined || isNaN(price)) {
      price = 0
    }
    
    if (currency.value === 'USD') {
      // Use price_usd from API if available and valid, otherwise convert using exchange rate
      let usdPrice: number
      if (priceUsd !== undefined && priceUsd !== null && priceUsd > 0) {
        usdPrice = priceUsd
      } else if (price && exchangeRate.value > 0) {
        usdPrice = price / exchangeRate.value
      } else {
        usdPrice = 0
      }
      // Check for invalid values
      if (!isFinite(usdPrice) || isNaN(usdPrice)) {
        usdPrice = 0
      }
      return `$${usdPrice.toFixed(2)}`
    }
    // Check for invalid values before formatting
    if (!isFinite(price) || isNaN(price)) {
      price = 0
    }
    return `Tk ${price.toLocaleString()}`
  }

  // Get raw price in current currency
  const getPrice = (price: number, priceUsd?: number): number => {
    if (currency.value === 'USD') {
      // Use price_usd from API if available, otherwise convert using exchange rate
      return priceUsd !== undefined ? priceUsd : price / exchangeRate.value
    }
    return price
  }

  // Set exchange rate
  const setExchangeRate = (rate: number) => {
    exchangeRate.value = rate
  }

  return {
    currency: computed(() => currency.value),
    currencySymbol,
    currencyCode,
    setCurrency,
    formatPrice,
    getPrice,
    setExchangeRate,
    exchangeRate: computed(() => exchangeRate.value)
  }
}


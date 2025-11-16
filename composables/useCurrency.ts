import { ref, computed } from 'vue'

export type Currency = 'BDT' | 'USD'

const currency = ref<Currency>('BDT')
const exchangeRate = ref<number>(110) // 1 USD = 110 BDT (example rate, can be updated)

// Load currency from localStorage on initialization
if (process.client) {
  const savedCurrency = localStorage.getItem('currency') as Currency | null
  if (savedCurrency && (savedCurrency === 'BDT' || savedCurrency === 'USD')) {
    currency.value = savedCurrency
  }
}

export const useCurrency = () => {
  // Set currency
  const setCurrency = (newCurrency: Currency) => {
    currency.value = newCurrency
    if (process.client) {
      localStorage.setItem('currency', newCurrency)
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
  const formatPrice = (price: number): string => {
    if (currency.value === 'USD') {
      const usdPrice = price / exchangeRate.value
      return `$${usdPrice.toFixed(2)}`
    }
    return `Tk ${price.toLocaleString()}`
  }

  // Get raw price in current currency
  const getPrice = (price: number): number => {
    if (currency.value === 'USD') {
      return price / exchangeRate.value
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


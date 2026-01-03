// Currency detection plugin - automatically detects user location and sets currency
export default defineNuxtPlugin(() => {
  if (typeof window === 'undefined') return

  const { setCurrency, currency } = useCurrency()
  
  // Check if user has manually selected a currency before
  const hasManualCurrencySelection = localStorage.getItem('currency_manually_set') === 'true'
  
  // If user has manually selected currency, don't auto-detect
  if (hasManualCurrencySelection) {
    return
  }

  // Always detect location using IP-based geolocation and set currency accordingly
  // This will override any existing localStorage values (unless manually set)
  const detectCurrencyFromLocation = async () => {
    try {
      // Use a free IP geolocation service
      const response = await $fetch<{ country_code?: string; country?: string }>('https://ipapi.co/json/', {
        timeout: 5000,
        headers: {
          'Accept': 'application/json'
        }
      }).catch(() => {
        // Fallback to another service if first one fails
        return $fetch<{ countryCode?: string; country?: string }>('https://api.country.is/', {
          timeout: 5000
        }).catch(() => null)
      })

      if (!response) return

      // Get country code from response (different APIs return different field names)
      const countryCode = (response as any).country_code || (response as any).countryCode || ''
      const country = (response as any).country || ''

      // List of countries that typically use USD
      const usdCountries = [
        'US', 'USA', 'United States', 'United States of America',
        'CA', 'Canada', // Some regions
        'PR', 'Puerto Rico',
        'VI', 'US Virgin Islands',
        'GU', 'Guam',
        'AS', 'American Samoa',
        'MH', 'Marshall Islands',
        'FM', 'Micronesia',
        'PW', 'Palau'
      ]

      // Check if country matches USD countries
      const isUSDCountry = usdCountries.some(usdCountry => 
        countryCode?.toUpperCase() === usdCountry.toUpperCase() ||
        country?.toUpperCase() === usdCountry.toUpperCase()
      )

      // Set currency based on detected location
      // If USD country detected, set to USD, otherwise default to BDT
      if (isUSDCountry) {
        setCurrency('USD', false) // false = auto-detected, not manual
        console.log('Currency automatically set to USD based on location:', countryCode || country)
      } else {
        // Default to BDT for non-USD countries
        setCurrency('BDT', false) // false = auto-detected, not manual
        console.log('Currency automatically set to BDT based on location:', countryCode || country)
      }
    } catch (error) {
      // Silently fail - don't interrupt user experience
      // On error, default to BDT
      setCurrency('BDT', false)
      console.log('Currency auto-detection failed:', error)
    }
  }

  // Run detection after a short delay to not block page load
  setTimeout(() => {
    detectCurrencyFromLocation()
  }, 1000)
})


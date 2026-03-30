import type { Product } from '../types/homepage'
import { useCurrency } from './useCurrency'

/**
 * Product card badge text for `active_campaign` (same as tag listing).
 */
export function useCampaignBadge() {
  const { formatPrice, currency, exchangeRate } = useCurrency()

  const getCampaignBadgeText = (product: Pick<Product, 'active_campaign'>): string => {
    const campaign = product.active_campaign
    if (!campaign) return ''

    const discountValue = Number(campaign.discount_value || 0)
    const discountType = String(campaign.discount_type || '').toLowerCase()

    if (discountType === 'percentage') {
      return `${discountValue}% OFF`
    }

    if (discountType === 'fixed') {
      const fixedAmount =
        currency.value === 'USD' && exchangeRate.value > 0
          ? discountValue / exchangeRate.value
          : discountValue
      return `${formatPrice(
        currency.value === 'USD' ? 0 : fixedAmount,
        currency.value === 'USD' ? fixedAmount : undefined
      )} OFF`
    }

    return `${discountType} ${discountValue}`.trim()
  }

  return { getCampaignBadgeText }
}

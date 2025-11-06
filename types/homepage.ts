// TypeScript interfaces for Homepage API response

export interface ProductVariantAttributes {
  color: string
  fabric: string
  size: string
}

export interface ProductVariant {
  id: number
  name: string | null
  sku: string
  image: string
  price: number
  compare_price: number
  attributes: ProductVariantAttributes
}

export interface ProductCategory {
  name: string
  slug: string
}

export interface Product {
  id: number
  name: string
  slug: string
  sku: string
  image: string
  description: string
  price: number
  compare_price: number
  images: Record<string, string>
  category: ProductCategory
  variants: ProductVariant[]
}

export interface HomepageSection {
  type: string
  title: string
  products: Product[]
}

export interface HomepageData {
  banners: string[]
  sections: HomepageSection[]
}

export interface HomepageQuery {
  query: string
  bindings: string[]
  time: number
}

export interface HomepageResponse {
  success: boolean
  message: string
  data: HomepageData
  queries: HomepageQuery[]
}


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
  price_usd?: number
  compare_price_usd?: number
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
  price_usd?: number
  compare_price_usd?: number
  images: Record<string, string>
  category: ProductCategory
  variants: ProductVariant[]
}

export interface HomepageSection {
  type: string
  title: string
  products: Product[]
}

export interface HomepageCTA {
  title: string
  subtitle: string
  button_text: string
  button_url: string
}

export interface HomepageData {
  banners: string[]
  sections: HomepageSection[]
  cta?: HomepageCTA
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

// Category API types
export interface Category {
  name: string
  slug: string
  children: Category[]
  products_count: number
}

export interface CategoryQuery {
  query: string
  bindings: string[]
  time: number
}

export interface CategoryResponse {
  success: boolean
  message: string
  data: Category[]
  pagination: null
  queries: CategoryQuery[]
}

// Product API types
export interface ProductQuery {
  query: string
  bindings: string[]
  time: number
}

export interface PaginationData {
  current_page: number
  last_page: number
  per_page: number
  total: number
  from: number
  to: number
}

export interface ProductResponse {
  success: boolean
  message: string
  data: Product[]
  pagination: PaginationData | null
  queries: ProductQuery[]
}

// Product Detail API types
export interface ProductDetailQuery {
  query: string
  bindings: string[]
  time: number
}

export interface ProductDetailData {
  product: Product
  related?: Product[]
}

export interface ProductDetailResponse {
  success: boolean
  message: string
  data: Product | ProductDetailData
  queries: ProductDetailQuery[]
}

// Brand API types
export interface BrandImage {
  name: string
  url: string
}

export interface Brand {
  name: string
  slug: string
  image: BrandImage
}

export interface BrandQuery {
  query: string
  bindings: string[]
  time: number
}

export interface BrandResponse {
  success: boolean
  message: string
  data: Brand[]
  pagination: null
  queries: BrandQuery[]
}

// Settings API types
export interface MenuItem {
  id: number
  title: string
  link: string
  order: number
  icon: string | null
  new_tab: number
  children: MenuItem[]
}

export interface SettingsData {
  menu?: MenuItem[]
  [key: string]: any
}

export interface SettingsResponse {
  success: boolean
  message: string
  data: SettingsData
}


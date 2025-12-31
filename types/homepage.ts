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





















export interface HomePageResponse2 {
  success: boolean
  message: string
  data: HomePageData2
}

export interface HomePageData2 {
  banners: string[]
  sections: HomePageSection2[]
  cta: HomePageCta2
  dynamic_sections: HomePageDynamicSections2
}

export interface HomePageSection2 {
  type: string
  title: string
  products: HomePageProduct2[]
}

export interface HomePageProduct2 {
  id: number
  name: string
  slug: string
  sku: string
  image: string
  description: string
  is_combo: boolean
  price: number
  compare_price: number
  price_usd: number
  compare_price_usd: number
  images: HomePageImages2
  category: HomePageCategory2
  variants: HomePageVariant2[]
  combo_products: any[]
}

export interface HomePageImages2 {
  "products/1defa8b2-6cda-4748-9c72-8e749763fa89.webp"?: string
  "products/4ff767b6-074d-425b-be4e-a6858d35a9e9.webp"?: string
  "products/77f78fd4-7296-4024-828b-6db39fe9b985.webp"?: string
  "products/a05f1464-c608-4b08-8aad-a863e9f7f440.webp"?: string
  "NG-PNJ-01048-B"?: string
  "products/b0d68e12-e81c-4d4a-a618-31dd35cef81f.webp"?: string
  "RBL-RBLS-00106 s"?: string
  "products/e92a13aa-ed8d-4b8a-aac9-a218bc0ece8f.webp"?: string
  "products/d7985836-6280-47c4-b70c-2e1c0301faba.webp"?: string
  "RBL-BLS-00145 (1)"?: string
  "products/4046bd13-160c-400d-beb3-f26503c6eb0d.webp"?: string
  "products/a91f471d-845f-4a3f-93c2-db5cc2b3c265.webp"?: string
  "SST-RBJ-TST-00065 (1)"?: string
  "products/8dc82de5-3324-4e97-bb6a-36e369d24989.webp"?: string
  "TRF-CTI-00061 (1)"?: string
  "products/f7630879-a14c-4abe-8784-76f14a10575a.webp"?: string
  "products/b1214b19-2891-45e7-9848-eb7841940560.webp"?: string
  "products/37c9655e-12f9-4ee3-bad1-7ff79951298b.webp"?: string
  "products/a2bc4527-aae6-4c05-b019-c30b46866e78.webp"?: string
  "products/fc2579ff-6be3-4421-b30e-f4d1af0b5c0b.webp"?: string
  "products/a0de44c9-e335-4afb-b5f6-a676f145c8e3.webp"?: string
  "products/6fee42b1-5b11-4059-b935-c84a2ec2febd.webp"?: string
  "products/c0afb5c3-e5c8-4764-bb0c-db3d5f031e8c.webp"?: string
  "products/d8fbc69d-c60c-426d-b70d-eb66838b964a.webp"?: string
  "products/8474f544-47b0-4114-95ac-d3668743e6a9.webp"?: string
  "products/19ee4764-aadf-4277-aa27-b783f4067294.webp"?: string
  "products/78efaad7-158e-4df3-8f44-afcd7ae27cf7.webp"?: string
  "products/046071df-a244-41f5-951b-9ab4e7605de8.webp"?: string
  "products/0ba2e7ce-bb92-49c6-b521-9fe72a81d664.webp"?: string
  "products/617bb0ff-58e9-497f-8f74-f93ae17d8eb3.webp"?: string
  "products/00ce123f-ac20-4196-acc8-61e7e7e5551b.webp"?: string
  "products/ae746880-3ca7-489e-b56b-450dd7c1067e.webp"?: string
  "products/9b172c29-4b51-4053-a177-9df3c9ca9e88.webp"?: string
  "products/d3de01da-a509-4d18-8fb5-1f936e811616.webp"?: string
  "products/b93c36f2-6de6-4e4c-a5fa-9fedead48894.webp"?: string
  "products/cc4ca4b9-22ee-40bc-9da6-922ddd3df3dc.webp"?: string
  "products/f736f627-a5b1-4362-b6e0-ad2f90aeefae.webp"?: string
  "products/0abc4975-de39-4365-b977-1fe9f3847a7d.webp"?: string
  "products/44f58297-dfa2-4558-b5dd-132d8d9fb5a9.webp"?: string
  "products/1475d8e5-734e-4945-8d87-2163a66d8c52.webp"?: string
  "products/1bc83d09-7a08-4256-a10a-464c93ee6c40.webp"?: string
  "products/4ed72653-3e20-4ee1-bea7-871d5155d7e0.webp"?: string
  "products/59960837-7253-4dbd-b641-a7a156a50069.webp"?: string
  "products/7dc055b4-d965-41e2-93d1-a673f4d736ad.webp"?: string
  "products/c5a3fd27-5c58-48a7-aa64-facbe1fa21be.webp"?: string
  "products/58b07001-ceff-420d-83c3-1f99ddb91361.webp"?: string
  "products/4e87a478-4344-4d9e-957d-ad071cd5b5f9.webp"?: string
  "products/fc7570ea-1239-48e4-89c7-c718ccfd533d.webp"?: string
  "products/de8c727f-01e1-4fca-ae40-c985a932b73b.webp"?: string
  "RBL-SHR-00667 (3)"?: string
  "products/989daeec-90dc-4c00-b6f3-2e140a393961.webp"?: string
  "products/297a199a-4a33-413e-ad04-aa507ba9460b.webp"?: string
  "products/51770ae2-786a-40e1-9c6a-a0075341d753.webp"?: string
  "products/3223eda0-5d47-4bf5-b856-30ea27cfd10b.webp"?: string
  "RBL-SHR-00363 (3)"?: string
  "products/74e70eaf-58a6-4eeb-be2c-65fb9111f7b4.webp"?: string
  "products/80f09b67-f236-40d7-9cda-eb3119ab0da2.webp"?: string
  "Rang Bangladesh RBL-SHR-00410 (2) copy"?: string
  "products/1d8c25a4-5a4e-4297-891a-cbd539839dab.webp"?: string
  "products/5c1da617-d34e-4507-8637-57fbc1ed0a7c.webp"?: string
  "products/56055df1-575e-46df-aff2-3af64f976c7a.webp"?: string
  "products/6d39e17d-bf0f-4a5b-be25-6592d6e57d1b.webp"?: string
}

export interface HomePageCategory2 {
  name: string
  slug: string
  cover?: Cover
  parent?: Parent
}

export interface Cover {
  id: string
  original_url: string
  preview_url: string
  thumbnail_url: string
}

export interface Parent {
  name: string
  slug: string
  cover: any
}

export interface HomePageVariant2 {
  id: number
  name: any
  sku: string
  image: string
  price: number
  compare_price: number
  attributes: HomePageAttributes2
}

export interface HomePageAttributes2 {
  color: string
  fabric?: string
  size: string
}

export interface HomePageCta2 {
  title: string
  subtitle: string
  button_text: string
  button_url: string
}

export interface HomePageDynamicSections2 {
  explore_rangbd: HomePageExploreRangbd2[]
  shop_by_category: HomePageShopByCategory2[]
  shop_by_theme: HomePageShopByTheme2[]
}

export interface HomePageExploreRangbd2 {
  title: string
  url: string
  image: Image
}

export interface Image {
  id: string
  original_url: string
  preview_url: string
  thumbnail_url: string
}

export interface HomePageShopByCategory2 {
  title: string
  url: string
  image: Image2
}

export interface Image2 {
  id: string
  original_url: string
  preview_url: string
  thumbnail_url: string
}

export interface HomePageShopByTheme2 {
  title: string
  url: string
  image: Image3
}

export interface Image3 {
  id: string
  original_url: string
  preview_url: string
  thumbnail_url: string
}

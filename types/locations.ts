// TypeScript interfaces for Locations API response

export interface WorkingHours {
  [key: string]: string
}

export interface Location {
  id: number
  name: string
  address: string
  phone: string
  working_hours: WorkingHours
  off_day: string | null
  fb_page_link: string | null
  email: string | null
  google_map_url: string | null
  image: string
}

export interface LocationQuery {
  query: string
  bindings: (string | boolean | number)[]
  time: number
}

export interface LocationResponse {
  success: boolean
  message: string
  data: Location[]
  pagination: null
  queries?: LocationQuery[]
}


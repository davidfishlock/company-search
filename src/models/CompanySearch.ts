export type CompanySearch = {
  items: CompanySearchItem[]
  items_per_page: number
  kind: string
  page_number: number
  start_index: number
  total_results: number
}

export type CompanySearchItem = {
  address?: CompanyAddress
  address_snippet: string
  company_number: string
  company_status: string
  company_type: string
  date_of_cessation?: string
  date_of_creation: string
  description?: string
  description_identifier: string[]
  kind: string
  links: {
    self?: string
  }
  snippet?: string
  title: string
}

export type CompanyAddress = {
  address_line_1: string
  address_line_2?: string
  care_of?: string
  country?: string
  locality?: string
  po_box?: string
  postal_code?: string
  region?: string
}

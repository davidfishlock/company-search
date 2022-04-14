import axios from 'axios'
import { CompanySearch } from '../models/CompanySearch'
import { API_BASE_URL, API_KEY, COMPANY_SEARCH_ENDPOINT } from '../api/constants'
import { Buffer } from 'buffer'

const SEARCH_RESULTS_PAGE_SIZE = 20

const DEFAULT_HEADERS = {
  Authorization: `Basic ${Buffer.from(API_KEY).toString('base64')}`,
}

export async function getCompanySearchResults(searchText: string, startIndex: number) {
  const queryParams = new URLSearchParams({
    q: searchText,
    items_per_page: SEARCH_RESULTS_PAGE_SIZE + '',
    start_index: startIndex + '',
  })
  const res = await axios.get<CompanySearch>(
    `${API_BASE_URL}/${COMPANY_SEARCH_ENDPOINT}?${queryParams.toString()}`,
    {
      headers: DEFAULT_HEADERS,
    },
  )
  return res.data
}

export function getNextCompanySearchPagingIndex(lastPage: CompanySearch) {
  const nextRequiredIndex = lastPage.page_number * SEARCH_RESULTS_PAGE_SIZE + 1
  return lastPage.total_results > nextRequiredIndex ? nextRequiredIndex : null
}

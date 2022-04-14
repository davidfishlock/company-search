import React from 'react'
import { render, screen, within } from '@testing-library/react'
import CompanySearchView from './CompanySearchView'
import { CompanySearch } from '../../models/CompanySearch'
import { useInfiniteQuery } from 'react-query'

const mockedQuery = useInfiniteQuery as jest.Mock
jest.mock('react-query')

const SEARCH_RESPONSE_STUB = {
  kind: 'search#companies',
  total_results: 2,
  start_index: 0,
  page_number: 1,
  items_per_page: 20,
  items: [
    {
      matches: {
        snippet: [],
        title: [1, 6],
      },
      description: '12119619 - Incorporated on 24 July 2019',
      date_of_creation: '2019-07-24',
      company_number: '12119619',
      company_status: 'active',
      kind: 'searchresults#company',
      links: {
        self: '/company/12119619',
      },
      title: 'WIBBLE LTD',
      address_snippet: '102 Knightsfield, Welwyn Garden City, England, AL8 7HB',
      company_type: 'ltd',
      description_identifier: ['incorporated-on'],
      snippet: '',
      address: {
        postal_code: 'AL8 7HB',
        premises: '102',
        locality: 'Welwyn Garden City',
        address_line_1: 'Knightsfield',
        country: 'England',
      },
    },
    {
      company_number: '08608591',
      date_of_creation: '2013-07-15',
      company_status: 'active',
      address_snippet:
        'Ls8, Armstrong House First Avenue, Doncaster Finningley Airport, Doncaster, England, DN9 3GA',
      title: 'LAND GROUP HOLDINGS LIMITED',
      links: {
        self: '/company/08608591',
      },
      kind: 'searchresults#company',
      matches: {
        snippet: [1, 6],
      },
      description: '08608591 - Incorporated on 15 July 2013',
      address: {
        postal_code: 'DN9 3GA',
        premises: 'Ls8, Armstrong House First Avenue',
        locality: 'Doncaster',
        address_line_1: 'Doncaster Finningley Airport',
        country: 'England',
      },
      snippet: 'WIBBLE ',
      company_type: 'ltd',
      description_identifier: ['incorporated-on'],
    },
  ],
} as unknown as CompanySearch

describe('CompanySearchView', () => {
  beforeEach(() => {
    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = jest.fn()
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    })
    window.IntersectionObserver = mockIntersectionObserver
  })

  test('renders an item for each search result', () => {
    mockedQuery.mockImplementation(() => ({
      isFetching: false,
      status: 'success',
      data: { pages: [SEARCH_RESPONSE_STUB] },
    }))

    render(<CompanySearchView />)

    const resultsList = screen.getByRole('list')
    const { getAllByRole } = within(resultsList)
    const items = getAllByRole('listitem')

    expect(items.length).toBe(SEARCH_RESPONSE_STUB.items.length)
    expect(screen.getByText(SEARCH_RESPONSE_STUB.items[0].title)).toBeInTheDocument()
    expect(screen.getByText(SEARCH_RESPONSE_STUB.items[1].title)).toBeInTheDocument()
  })

  test('renders text indicating the number of results', () => {
    mockedQuery.mockImplementation(() => ({
      isFetching: false,
      status: 'success',
      data: { pages: [SEARCH_RESPONSE_STUB] },
    }))

    render(<CompanySearchView />)

    expect(
      screen.getByText(`${SEARCH_RESPONSE_STUB.items.length} Results Found`),
    ).toBeInTheDocument()
  })

  test('renders a loading indicator when the query is fetching', () => {
    mockedQuery.mockImplementation(() => ({
      isFetching: true,
      status: 'loading',
      data: { pages: [] },
    }))

    render(<CompanySearchView />)

    expect(screen.getByLabelText('Loading')).toBeInTheDocument()
  })
})

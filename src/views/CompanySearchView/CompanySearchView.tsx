import React, { useEffect } from 'react'
import { useInfiniteQuery } from 'react-query'
import { getCompanySearchResults, getNextCompanySearchPagingIndex } from '../../api/requests'
import SearchInput from '../../components/SearchInput/SearchInput'
import { useInView } from 'react-intersection-observer'
import SearchResultsList from '../../components/SearchResultsList/SearchResultsList'
import classes from './CompanySearchView.module.css'
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator'

const CompanySearchView: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('')
  const { ref: scrollFooterRef, inView } = useInView()

  const { status, data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
    searchQuery,
    ({ pageParam = 0 }) => getCompanySearchResults(searchQuery, pageParam),
    {
      enabled: !!searchQuery,
      getNextPageParam: getNextCompanySearchPagingIndex,
    },
  )

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage])

  const totalResults = data?.pages.length ? data.pages[0].total_results : 0

  return (
    <div className={classes.companySearchView}>
      <SearchInput onSearchSubmit={setSearchQuery} />

      {status === 'success' && data?.pages.length && (
        <p className={classes.statusText}>
          {data.pages[0].total_results ? `${totalResults} Results Found` : `No results found for "${searchQuery}"`}
        </p>
      )}

      {status === 'error' && (
        <p className={classes.statusText}>{`An error occurred while performing the search.`}</p>
      )}

      {data && <SearchResultsList items={data.pages.flatMap((page) => page.items)} />}

      {<div ref={scrollFooterRef}>{isFetching && <LoadingIndicator />}</div>}
    </div>
  )
}

export default CompanySearchView

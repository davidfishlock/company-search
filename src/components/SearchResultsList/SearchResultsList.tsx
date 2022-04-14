import React from 'react'
import { CompanySearchItem } from '../../models/CompanySearch'
import SearchResultsItem from '../SearchResultsItem/SearchResultsItem'
import classes from './SearchResultsList.module.css'

type Props = {
  items: CompanySearchItem[]
}

const SearchResultsList: React.FC<Props> = ({ items }) => {
  return (
    <ul className={classes.searchResultsList}>
      {items.map((item) => (
        <SearchResultsItem key={item.company_number} item={item} />
      ))}
    </ul>
  )
}

export default SearchResultsList

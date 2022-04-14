import React from 'react'
import { CompanySearchItem } from '../../models/CompanySearch'
import classes from './SearchResultsItem.module.css'
import { formatDate } from '../../utilities/date'

type Props = {
  item: CompanySearchItem
}

const SearchResultsItem: React.FC<Props> = ({ item }) => {
  return (
    <li className={classes.searchResultItem} key={item.company_number}>
      <p>{item.title}</p>
      <p>{item.date_of_creation ? `Created on: ${formatDate(item.date_of_creation)}` : ''}</p>
      <p className={classes.companyNumber}>
        <strong>Company Number: </strong>
        {item.company_number}
      </p>
    </li>
  )
}

export default SearchResultsItem

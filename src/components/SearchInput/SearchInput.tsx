import React from 'react'
import classes from './SearchInput.module.css'

type Props = {
  onSearchSubmit: (searchTerm: string) => void
}

const SearchInput: React.FC<Props> = ({ onSearchSubmit }) => {
  const [textInput, setTextInput] = React.useState('')

  return (
    <form className={classes.searchInput} onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="Enter company name to search ..."
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
      />

      <button disabled={!textInput} onClick={() => onSearchSubmit(textInput)}>
        Search
      </button>
    </form>
  )
}

export default SearchInput

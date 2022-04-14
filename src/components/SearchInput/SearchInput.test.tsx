import React from 'react'
import { render, screen } from '@testing-library/react'
import SearchInput from './SearchInput'
import userEvent from '@testing-library/user-event'

const onSearchSubmitMock = jest.fn()

describe('SearchInput', () => {
  test('search submission is disabled when no text is input', () => {
    render(<SearchInput onSearchSubmit={onSearchSubmitMock} />)

    expect(screen.getByText('Search')).toBeDisabled()
  })

  test('calls onSearchSubmit with search text on form submission', () => {
    const textInput = 'test input'

    render(<SearchInput onSearchSubmit={onSearchSubmitMock} />)
    userEvent.type(screen.getByLabelText('Company name'), textInput)
    userEvent.click(screen.getByText('Search'))

    expect(onSearchSubmitMock).toBeCalledTimes(1)
    expect(onSearchSubmitMock).toBeCalledWith(textInput)
  })
})

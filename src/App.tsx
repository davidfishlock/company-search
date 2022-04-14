import React from 'react'
import CompanySearchView from './views/CompanySearchView/CompanySearchView'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <div id="pageContainer">
      <QueryClientProvider client={queryClient}>
        <CompanySearchView />
      </QueryClientProvider>
    </div>
  )
}

export default App

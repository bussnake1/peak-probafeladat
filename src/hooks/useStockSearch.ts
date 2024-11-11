import { useState, useCallback } from 'react'
import { SearchResult, StockMatch } from '@/types/search'
import debounce from 'lodash/debounce'

export function useStockSearch() {
  const [selected, setSelected] = useState<SearchResult | null>(null)
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])

  const fetchResults = async (searchQuery: string) => {
    try {
      const response = await fetch(`/api/symbol-search?keywords=${encodeURIComponent(searchQuery)}`)
      const data = await response.json()
      
      if (data.bestMatches) {
        const formattedResults = data.bestMatches
          .map((match: StockMatch) => ({
            symbol: match['1. symbol'],
            name: match['2. name']
          }))
          .slice(0, 20)
        setResults(formattedResults)
      }
      setLoading(false)
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
      setLoading(false)
    }
  }

  const debouncedFetch = useCallback(
    debounce(fetchResults, 300),
    []
  )

  const handleSearch = (searchQuery: string) => {
    console.log('handleSearch', searchQuery)
    setQuery(searchQuery)
    setLoading(true)

    if (searchQuery.length === 0) {
      setResults([])
      setLoading(false)
      return
    }

    debouncedFetch(searchQuery)
  }

  return {
    selected,
    setSelected,
    query,
    loading,
    setQuery,
    results,
    handleSearch,
  }
}

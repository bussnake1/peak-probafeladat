import { useState, useCallback, useEffect, useMemo } from 'react'
import { SearchResult } from '@/types/search'
import { stockAPI } from '@/services/api'
import debounce from 'lodash/debounce'

export function useStockSearch() {
  const [selected, setSelected] = useState<SearchResult | null>(null)
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])

  const fetchResults = useCallback(async (searchQuery: string) => {
    try {
      setLoading(true)
      const searchResults = await stockAPI.searchStocks(searchQuery)
      setResults(searchResults)
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])
  
  const debouncedFetch = useMemo(
    () => debounce(fetchResults, 300),
    [fetchResults]
  )

  // cancel the debounced function on unmount
  useEffect(() => {
    return () => {
      debouncedFetch.cancel()
    }
  }, [debouncedFetch])

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)

    if (searchQuery.length === 0) {
      setResults([])
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

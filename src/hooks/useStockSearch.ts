import { useState, useCallback, useEffect, useMemo } from 'react'
import { SearchResult, StockMatch } from '@/types/search'
import { cache } from '@/utils/cache'
import debounce from 'lodash/debounce'

const SEARCH_TTL = 10 * 1000 // 10 seconds for search results

export function useStockSearch() {
  const [selected, setSelected] = useState<SearchResult | null>(null)
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])

  const fetchResults = useCallback(async (searchQuery: string) => {
    try {
      const cacheKey = `search_${searchQuery}`
      
      // Try to get from cache first
      const cachedResults = cache.get<SearchResult[]>(cacheKey)
      if (cachedResults) {
        setResults(cachedResults)
        setLoading(false)
        return
      }

      const response = await fetch(`/api/symbol-search?keywords=${encodeURIComponent(searchQuery)}`)
      const data = await response.json()
  
      if (data.bestMatches) {
        const formattedResults = data.bestMatches
          .map((match: StockMatch) => ({
            symbol: match['1. symbol'],
            name: match['2. name']
          }))
          .slice(0, 20)

        // Store in cache and update state
        cache.set(cacheKey, formattedResults, { ttl: SEARCH_TTL })
        setResults(formattedResults)
      }
      setLoading(false)
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
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

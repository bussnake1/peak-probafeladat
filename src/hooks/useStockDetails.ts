import { useState, useEffect } from 'react'
import { GlobalQuote } from '@/types/stock'
import { cache } from '@/utils/cache'

const STOCK_DETAILS_TTL = 30 * 1000 // 30 seconds for real-time data

export function useStockDetails(symbol: string) {
  const [stockData, setStockData] = useState<GlobalQuote | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const cacheKey = `stock_details_${symbol}`
        
        // Try to get from cache first
        const cachedData = cache.get<GlobalQuote>(cacheKey, { ttl: STOCK_DETAILS_TTL })
        if (cachedData) {
          setStockData(cachedData)
          setLoading(false)
          return
        }

        // If not in cache, fetch from API
        const response = await fetch(`/api/stock/${symbol}`)
        const data = await response.json()

        if (data["Error Message"]) {
          setError(data["Error Message"])
          return
        }

        // Store in cache and update state
        cache.set(cacheKey, data, { ttl: STOCK_DETAILS_TTL })
        setStockData(data)
      } catch {
        setError('Failed to fetch stock data')
      } finally {
        setLoading(false)
      }
    }

    fetchStockData()
  }, [symbol])

  const formatPrice = (price: string) => `$${price}`
  const formatVolume = (volume: string) => parseInt(volume).toLocaleString()
  const getChangeStatus = (change: string) => parseFloat(change) >= 0

  return {
    stockData,
    error,
    loading,
    formatters: {
      formatPrice,
      formatVolume,
      getChangeStatus
    }
  }
}

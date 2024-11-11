import { useState, useEffect } from 'react'
import { ChartData, TimeSeriesResponse } from '@/types/stock'
import { cache } from '@/utils/cache'

const HISTORY_TTL = 5 * 60 * 1000 // 5 minutes for historical data

export function useStockHistory(symbol: string) {
  const [data, setData] = useState<ChartData[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const cacheKey = `stock_history_${symbol}`
        
        // Try to get from cache first
        const cachedData = cache.get<ChartData[]>(cacheKey, { ttl: HISTORY_TTL })
        if (cachedData) {
          setData(cachedData)
          setLoading(false)
          return
        }

        // If not in cache, fetch from API
        const response = await fetch(`/api/stock/${symbol}/history`)
        const result = await response.json()

        if (result["Error Message"]) {
          setError(result["Error Message"])
          return
        }

        // Transform the data for the chart
        const timeSeriesData = (result as TimeSeriesResponse)["Time Series (Daily)"]
        const chartData = Object.entries(timeSeriesData)
          .map(([date, values]) => ({
            date,
            price: parseFloat(values["4. close"])
          }))
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

        // Store in cache and update state
        cache.set(cacheKey, chartData, { ttl: HISTORY_TTL })
        setData(chartData)
      } catch {
        setError('Failed to fetch historical data')
      } finally {
        setLoading(false)
      }
    }

    fetchHistoricalData()
  }, [symbol])

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`
  }

  return {
    data,
    error,
    loading,
    formatters: {
      formatDate,
      formatPrice
    }
  }
}

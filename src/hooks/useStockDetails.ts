import { useState, useEffect } from 'react'
import { GlobalQuote } from '@/types/stock'

export function useStockDetails(symbol: string) {
  const [stockData, setStockData] = useState<GlobalQuote | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch(`/api/stock/${symbol}`)
        const data = await response.json()

        if (data["Error Message"]) {
          setError(data["Error Message"])
          return
        }

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

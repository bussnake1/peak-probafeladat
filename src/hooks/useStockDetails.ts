import { useState, useEffect } from 'react'
import { GlobalQuote } from '@/types/stock'
import { stockAPI } from '@/services/api'

export function useStockDetails(symbol: string) {
  const [stockData, setStockData] = useState<GlobalQuote | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const data = await stockAPI.getStockDetails(symbol)
        setStockData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch stock data')
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

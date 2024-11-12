import { useState, useEffect } from 'react'
import { ChartData } from '@/types/stock'
import { stockAPI } from '@/services/api'

export function useStockHistory(symbol: string) {
  const [data, setData] = useState<ChartData[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const chartData = await stockAPI.getStockHistory(symbol)
        setData(chartData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch historical data')
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

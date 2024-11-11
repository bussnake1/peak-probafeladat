import { useState, useEffect } from 'react'
import { ChartData, TimeSeriesResponse } from '@/types/stock'

export function useStockHistory(symbol: string) {
  const [data, setData] = useState<ChartData[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
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

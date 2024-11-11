'use client'

import { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

type ChartData = {
  date: string
  price: number
}

type DailyValue = {
  "1. open": string
  "2. high": string
  "3. low": string
  "4. close": string
  "5. volume": string
}

type ApiResponse = {
  "Time Series (Daily)": {
    [key: string]: DailyValue
  }
}

export function PriceChart({ symbol }: { symbol: string }) {
  const [data, setData] = useState<ChartData[]>([])
  const [error, setError] = useState<string | null>(null)

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
        const timeSeriesData = (result as ApiResponse)["Time Series (Daily)"]
        const chartData = Object.entries(timeSeriesData)
          .map(([date, values]) => ({
            date,
            price: parseFloat(values["4. close"])
          }))
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

        setData(chartData)
      } catch {
        setError('Failed to fetch historical data')
      }
    }

    fetchHistoricalData()
  }, [symbol])

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  if (data.length === 0) {
    return <div>Loading chart data...</div>
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`
  }

  return (
    <div className="w-full h-[400px] mt-8">
      <h3 className="text-xl font-semibold mb-4">Price History</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            interval="preserveStartEnd"
          />
          <YAxis
            tickFormatter={formatPrice}
            domain={['auto', 'auto']}
          />
          <Tooltip
            labelFormatter={formatDate}
            formatter={(value: number) => [formatPrice(value), 'Price']}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#2563eb"
            dot={false}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

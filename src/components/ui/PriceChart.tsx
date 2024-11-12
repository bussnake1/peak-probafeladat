'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { ChartData } from '@/types/stock'

type Props = {
  data: ChartData[]
  error?: string | null
}

export function PriceChart({ data, error }: Props) {
  if (error) {
    return <div className="text-red-500">{error}</div>
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

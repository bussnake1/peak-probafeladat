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
import { useStockHistory } from '@/hooks/useStockHistory'

export function PriceChart({ symbol }: { symbol: string }) {
  const { data, error, loading, formatters } = useStockHistory(symbol)
  const { formatDate, formatPrice } = formatters

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  if (loading || data.length === 0) {
    return <div>Loading chart data...</div>
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

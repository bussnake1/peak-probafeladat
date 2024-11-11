'use client'

import { PriceChart } from './PriceChart'
import { useStockDetails } from '@/hooks/useStockDetails'

export function StockDetails({ symbol }: { symbol: string }) {
  const { stockData, error, loading, formatters } = useStockDetails(symbol)
  const { formatPrice, formatVolume, getChangeStatus } = formatters

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  if (loading || !stockData) {
    return <div>Loading...</div>
  }

  const quote = stockData["Global Quote"]
  const changeIsPositive = getChangeStatus(quote["09. change"])

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{quote["01. symbol"]}</h2>
          <div className={`text-lg font-semibold ${changeIsPositive ? 'text-green-500' : 'text-red-500'}`}>
            {formatPrice(quote["05. price"])}
            <span className="ml-2">
              {changeIsPositive ? '+' : ''}{quote["09. change"]} ({quote["10. change percent"]})
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
          <div>
            <p>Open</p>
            <p className="font-medium">{formatPrice(quote["02. open"])}</p>
          </div>
          <div>
            <p>Previous Close</p>
            <p className="font-medium">{formatPrice(quote["08. previous close"])}</p>
          </div>
          <div>
            <p>High</p>
            <p className="font-medium">{formatPrice(quote["03. high"])}</p>
          </div>
          <div>
            <p>Low</p>
            <p className="font-medium">{formatPrice(quote["04. low"])}</p>
          </div>
          <div>
            <p>Volume</p>
            <p className="font-medium">{formatVolume(quote["06. volume"])}</p>
          </div>
          <div>
            <p>Latest Trading Day</p>
            <p className="font-medium">{quote["07. latest trading day"]}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg pb-20 pt-6 px-12">
        <PriceChart symbol={symbol} />
      </div>
    </div>
  )
}

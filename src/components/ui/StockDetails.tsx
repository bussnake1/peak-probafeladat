'use client'

import { useEffect, useState } from 'react'
import { PriceChart } from './PriceChart'

type GlobalQuote = {
  "Global Quote": {
    "01. symbol": string
    "02. open": string
    "03. high": string
    "04. low": string
    "05. price": string
    "06. volume": string
    "07. latest trading day": string
    "08. previous close": string
    "09. change": string
    "10. change percent": string
  }
}

export function StockDetails({ symbol }: { symbol: string }) {
  const [stockData, setStockData] = useState<GlobalQuote | null>(null)
  const [error, setError] = useState<string | null>(null)

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
      }
    }

    fetchStockData()
  }, [symbol])

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  if (!stockData) {
    return <div>Loading...</div>
  }

  const quote = stockData["Global Quote"]
  const changeIsPositive = parseFloat(quote["09. change"]) >= 0

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{quote["01. symbol"]}</h2>
          <div className={`text-lg font-semibold ${changeIsPositive ? 'text-green-500' : 'text-red-500'}`}>
            ${quote["05. price"]}
            <span className="ml-2">
              {changeIsPositive ? '+' : ''}{quote["09. change"]} ({quote["10. change percent"]})
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
          <div>
            <p>Open</p>
            <p className="font-medium">${quote["02. open"]}</p>
          </div>
          <div>
            <p>Previous Close</p>
            <p className="font-medium">${quote["08. previous close"]}</p>
          </div>
          <div>
            <p>High</p>
            <p className="font-medium">${quote["03. high"]}</p>
          </div>
          <div>
            <p>Low</p>
            <p className="font-medium">${quote["04. low"]}</p>
          </div>
          <div>
            <p>Volume</p>
            <p className="font-medium">{parseInt(quote["06. volume"]).toLocaleString()}</p>
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

import { GlobalQuote } from '@/types/stock'

type Props = {
  data: GlobalQuote
  error?: string | null
}

export function StockDetails({ data, error }: Props) {
  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  const quote = data["Global Quote"]
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
    </div>
  )
}

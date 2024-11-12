import { stockAPI } from '@/services/api'
import { PriceChart } from '@/components/ui/PriceChart'

async function getStockHistory(symbol: string) {
  const data = await stockAPI.getStockHistory(symbol)
  return data
}

export async function PriceChartServer({ symbol }: { symbol: string }) {
  try {
    const data = await getStockHistory(symbol)
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg pb-20 pt-6 px-12">
        <PriceChart data={data} />
      </div>
    )
  } catch (error) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg pb-20 pt-6 px-12">
        <PriceChart 
          data={[]} 
          error={error instanceof Error ? error.message : 'Failed to fetch historical data'} 
        />
      </div>
    )
  }
}

import { Suspense } from 'react'
import { stockAPI } from '@/services/api'
import { PriceChart } from '@/components/ui/PriceChart'
import { PriceChartSkeleton } from '@/components/ui/Skeletons'

async function PriceChartContent({ symbol }: { symbol: string }) {
  try {
    const data = await stockAPI.getStockHistory(symbol)
    return <PriceChart data={data} />
  } catch (error) {
    return (
      <PriceChart 
        data={[]} 
        error={error instanceof Error ? error.message : 'Failed to fetch historical data'} 
      />
    )
  }
}

export function PriceChartServer({ symbol }: { symbol: string }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg pb-20 pt-6 px-2 lg:px-12">
      <Suspense fallback={<PriceChartSkeleton />}>
        <PriceChartContent symbol={symbol} />
      </Suspense>
    </div>
  )
}

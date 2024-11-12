import { Suspense } from 'react'
import { stockAPI } from '@/services/api'
import { StockDetails } from '@/components/ui/StockDetails'
import { StockDetailsSkeleton } from '@/components/ui/Skeletons'

async function StockDetailsContent({ symbol }: { symbol: string }) {
  try {
    const stockData = await stockAPI.getStockDetails(symbol)
    return <StockDetails data={stockData} />
  } catch (error) {
    return <StockDetails 
      data={null} 
      error={error instanceof Error ? error.message : 'Failed to fetch stock data'} 
    />
  }
}

export function StockDetailsServer({ symbol }: { symbol: string }) {
  return (
    <Suspense fallback={<StockDetailsSkeleton />}>
      <StockDetailsContent symbol={symbol} />
    </Suspense>
  )
}

import { Suspense } from 'react'
import { StockDetails } from '@/components/ui/StockDetails'
import { StockDetailsWithFavorites } from '@/components/ui/StockDetailsWithFavorites'
import { StockDetailsSkeleton } from '@/components/ui/Skeletons'
import { stockAPI } from '@/services/api'

async function StockDetailsContent({ symbol }: { symbol: string }) {
  try {
    const stockData = await stockAPI.getStockDetails(symbol)
    return <StockDetailsWithFavorites data={stockData} symbol={symbol} />
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch stock data'
    return <StockDetailsWithFavorites 
      data={null} 
      error={errorMessage}
      symbol={symbol}
    />
  }
}

export function StockDetailsWithFavoritesServer({ symbol }: { symbol: string }) {
  return (
    <Suspense fallback={<StockDetailsSkeleton />}>
      <StockDetailsContent symbol={symbol} />
    </Suspense>
  )
}

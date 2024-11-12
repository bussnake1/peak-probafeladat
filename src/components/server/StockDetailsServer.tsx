import { stockAPI } from '@/services/api'
import { StockDetails } from '@/components/ui/StockDetails'

async function getStockDetails(symbol: string) {
  const data = await stockAPI.getStockDetails(symbol)
  return data
}

export async function StockDetailsServer({ symbol }: { symbol: string }) {
  try {
    const stockData = await getStockDetails(symbol)
    return <StockDetails data={stockData} />
  } catch (error) {
    return <StockDetails 
      data={null as any} 
      error={error instanceof Error ? error.message : 'Failed to fetch stock data'} 
    />
  }
}

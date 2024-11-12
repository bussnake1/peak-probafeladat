import Link from 'next/link'
import { Suspense } from 'react'
import { StockDetailsServer } from '@/components/server/StockDetailsServer'
import { PriceChartServer } from '@/components/server/PriceChartServer'
import { notFound } from 'next/navigation'

type PageProps = {
  params: {
    symbol: string
  }
}

export default function StockDetailPage({ params }: PageProps) {
  const { symbol } = params

  if (!symbol) {
    notFound()
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="w-full max-w-5xl">
        <div className="mb-6">
          <Link 
            href="/" 
            className="text-primary hover:text-primary/80 flex items-center"
          >
            ← Back to Search
          </Link>
        </div>
        
        <Suspense fallback={<div>Loading stock details...</div>}>
          <StockDetailsServer symbol={symbol} />
        </Suspense>

        <Suspense fallback={<div className="mt-8">Loading price history...</div>}>
          <PriceChartServer symbol={symbol} />
        </Suspense>
      </div>
    </main>
  )
}

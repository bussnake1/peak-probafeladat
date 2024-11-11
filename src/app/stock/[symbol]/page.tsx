import Link from 'next/link'
import { StockDetails } from '@/components/ui/StockDetails'
import { notFound } from 'next/navigation'

type Props = {
  params: {
    symbol: string
  }
}

export default async function StockDetailPage({ params }: Props) {
  const { symbol } = await params

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
        <StockDetails symbol={symbol} />
      </div>
    </main>
  )
}

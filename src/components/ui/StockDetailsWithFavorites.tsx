'use client'

import { StockDetails } from './StockDetails'
import { useFavorites } from '@/hooks/useFavorites'
import { GlobalQuote } from '@/types/stock'

type Props = {
  data: GlobalQuote | null
  error?: string | null
  symbol: string
}

export function StockDetailsWithFavorites({ data, error, symbol }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const isFav = isFavorite(symbol)

  return (
    <div className="relative">
      <button
        onClick={() => toggleFavorite(symbol)}
        className={`absolute bottom-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-10 ${
          isFav ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
        }`}
        aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-7 w-7" 
          viewBox="0 0 20 20" 
          fill={isFav ? 'currentColor' : 'none'}
          stroke="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
            clipRule="evenodd" 
          />
        </svg>
      </button>
      <StockDetails data={data} error={error} />
    </div>
  )
}

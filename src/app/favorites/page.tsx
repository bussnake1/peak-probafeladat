'use client'

import { useFavorites } from '@/hooks/useFavorites'
import { useStockDetails } from '@/hooks/useStockDetails'
import Link from 'next/link'

export default function FavoritesPage() {
  const { favorites } = useFavorites()

  return (
    <div className="p-4 sm:p-6 lg:p-24 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Favorite Stocks</h1>
        <Link 
          href="/"
          className="text-blue-500 hover:text-blue-600 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Search
        </Link>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
          <p className="text-gray-600 dark:text-gray-300 mb-4">You haven&apos;t added any stocks to your favorites yet.</p>
          <Link 
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Search Stocks
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {favorites.map((symbol) => (
            <FavoriteStockCard key={symbol} symbol={symbol} />
          ))}
        </div>
      )}
    </div>
  )
}

function FavoriteStockCard({ symbol }: { symbol: string }) {
  const { stockData, loading, error, formatters } = useStockDetails(symbol)
  const { toggleFavorite, isFavorite } = useFavorites()
  const isFav = isFavorite(symbol)

  if (loading) {
    return (
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <h2 className="text-xl font-semibold">{symbol}</h2>
            <p className="text-red-500 mt-2">{error}</p>
          </div>
          <button
            onClick={() => toggleFavorite(symbol)}
            className={`bottom-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-10 ${
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
        </div>
      </div>
    )
  }

  if (!stockData) {
    return null;
  }

  const quote = stockData["Global Quote"]

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-center">
        <Link 
          href={`/stock/${symbol}`}
          className="flex-1"
        >
          <h2 className="text-xl font-semibold">{symbol}</h2>
          <div className="mt-2">
            <p className="text-lg">
              Price: {formatters.formatPrice(quote["05. price"])}
            </p>
            <p className={`text-sm ${
              formatters.getChangeStatus(quote["09. change"])
                ? 'text-green-500' 
                : 'text-red-500'
            }`}>
              Change: {quote["09. change"]} ({quote["10. change percent"]})
            </p>
          </div>
        </Link>
        <button
          onClick={() => toggleFavorite(symbol)}
          className={`bottom-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-10 ${
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
      </div>
    </div>
  )
}

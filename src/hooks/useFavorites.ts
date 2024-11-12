import { useState, useEffect } from 'react'
import { persistentCache } from '@/utils/cache/factory'

const FAVORITES_KEY = 'favorites'
const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    const storedFavorites = persistentCache.get<string[]>(FAVORITES_KEY)
    if (storedFavorites) {
      setFavorites(storedFavorites)
    }
  }, [])

  const addFavorite = (symbol: string) => {
    const newFavorites = [...favorites, symbol]
    setFavorites(newFavorites)
    persistentCache.set(FAVORITES_KEY, newFavorites, { ttl: ONE_YEAR_MS })
  }

  const removeFavorite = (symbol: string) => {
    const newFavorites = favorites.filter(s => s !== symbol)
    setFavorites(newFavorites)
    persistentCache.set(FAVORITES_KEY, newFavorites, { ttl: ONE_YEAR_MS })
  }

  const isFavorite = (symbol: string) => favorites.includes(symbol)

  const toggleFavorite = (symbol: string) => {
    if (isFavorite(symbol)) {
      removeFavorite(symbol)
    } else {
      addFavorite(symbol)
    }
  }

  return {
    favorites,
    isFavorite,
    toggleFavorite
  }
}

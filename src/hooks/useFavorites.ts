import { useState, useEffect } from 'react'
import { LocalStorage } from '@/utils/cache/local-storage'
import { CacheItem } from '@/utils/cache/types'

const storage = new LocalStorage()
const FAVORITES_KEY = 'favorites'
const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    const storedFavorites = storage.get<string[]>(FAVORITES_KEY)
    if (storedFavorites) {
      setFavorites(storedFavorites)
    }
  }, [])

  const createCacheItem = (data: string[]): CacheItem<string[]> => ({
    data,
    timestamp: Date.now(),
    ttl: ONE_YEAR_MS
  })

  const addFavorite = (symbol: string) => {
    const newFavorites = [...favorites, symbol]
    setFavorites(newFavorites)
    storage.set(FAVORITES_KEY, createCacheItem(newFavorites))
  }

  const removeFavorite = (symbol: string) => {
    const newFavorites = favorites.filter(s => s !== symbol)
    setFavorites(newFavorites)
    storage.set(FAVORITES_KEY, createCacheItem(newFavorites))
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

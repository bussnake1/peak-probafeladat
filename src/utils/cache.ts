import { DEFAULT_CACHE_TTL, CACHE_CLEANUP_INTERVAL } from '@/constants'

type CacheItem<T> = {
  data: T
  timestamp: number
  ttl: number
}

type CacheOptions = {
  ttl: number // Time to live in milliseconds
}

type CacheValue = string | number | boolean | object | null

class Cache {
  private memoryCache: Map<string, CacheItem<CacheValue>>
  private prefix: string
  private cleanupInterval: NodeJS.Timeout | null

  constructor(prefix: string = 'stock_app_') {
    this.memoryCache = new Map()
    this.prefix = prefix
    this.cleanupInterval = null
    this.startCleanupInterval()
    this.cleanupExpiredItems() // Initial cleanup on instantiation
  }

  private getStorageKey(key: string): string {
    return `${this.prefix}${key}`
  }

  private isExpired(item: CacheItem<unknown>): boolean {
    return Date.now() - item.timestamp > item.ttl
  }

  private startCleanupInterval(): void {
    // Clear any existing interval
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval)
    }

    // Start new cleanup interval
    this.cleanupInterval = setInterval(() => {
      this.cleanupExpiredItems()
    }, CACHE_CLEANUP_INTERVAL)
  }

  private cleanupExpiredItems(): void {
    // Cleanup memory cache
    for (const [key, item] of this.memoryCache.entries()) {
      if (this.isExpired(item)) {
        this.memoryCache.delete(key)
      }
    }

    // Cleanup localStorage
    try {
      const storageKeys = Object.keys(localStorage)
        .filter(key => key.startsWith(this.prefix))

      storageKeys.forEach(key => {
        const item = localStorage.getItem(key)
        if (item) {
          try {
            const parsed: CacheItem<CacheValue> = JSON.parse(item)
            if (this.isExpired(parsed)) {
              localStorage.removeItem(key)
            }
          } catch {
            // If we can't parse the item, remove it
            localStorage.removeItem(key)
          }
        }
      })
    } catch (error) {
      console.warn('Failed to cleanup localStorage:', error)
    }
  }

  set<T extends CacheValue>(key: string, data: T, options: CacheOptions = { ttl: DEFAULT_CACHE_TTL }): void {
    const item: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      ttl: options.ttl
    }

    // Set in memory
    this.memoryCache.set(key, item as CacheItem<CacheValue>)

    // Set in localStorage
    try {
      localStorage.setItem(
        this.getStorageKey(key),
        JSON.stringify(item)
      )
    } catch (error) {
      console.warn('Failed to save to localStorage:', error)
    }
  }

  get<T extends CacheValue>(key: string): T | null {
    // Try memory cache first
    const memoryItem = this.memoryCache.get(key)
    if (memoryItem && !this.isExpired(memoryItem)) {
      return memoryItem.data as T
    }

    // Try localStorage if not in memory or expired
    try {
      const storageItem = localStorage.getItem(this.getStorageKey(key))
      if (storageItem) {
        const item: CacheItem<T> = JSON.parse(storageItem)
        if (!this.isExpired(item)) {
          // Update memory cache
          this.memoryCache.set(key, item as CacheItem<CacheValue>)
          return item.data
        } else {
          // Remove expired item from localStorage
          localStorage.removeItem(this.getStorageKey(key))
        }
      }
    } catch (error) {
      console.warn('Failed to read from localStorage:', error)
    }

    return null
  }

  remove(key: string): void {
    this.memoryCache.delete(key)
    try {
      localStorage.removeItem(this.getStorageKey(key))
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error)
    }
  }

  clear(): void {
    this.memoryCache.clear()
    try {
      Object.keys(localStorage)
        .filter(key => key.startsWith(this.prefix))
        .forEach(key => localStorage.removeItem(key))
    } catch (error) {
      console.warn('Failed to clear localStorage:', error)
    }
  }

  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval)
      this.cleanupInterval = null
    }
    this.clear()
  }
}

export const cache = new Cache()

// Cleanup on window unload
if (typeof window !== 'undefined') {
  window.addEventListener('unload', () => {
    cache.destroy()
  })
}

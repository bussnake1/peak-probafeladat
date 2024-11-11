type CacheItem<T> = {
  data: T
  timestamp: number
}

type CacheOptions = {
  ttl: number // Time to live in milliseconds
}

const DEFAULT_TTL = 5 * 60 * 1000 // 5 minutes

class Cache {
  private memoryCache: Map<string, CacheItem<any>>
  private prefix: string

  constructor(prefix: string = 'stock_app_') {
    this.memoryCache = new Map()
    this.prefix = prefix
  }

  private getStorageKey(key: string): string {
    return `${this.prefix}${key}`
  }

  private isExpired(timestamp: number, ttl: number): boolean {
    return Date.now() - timestamp > ttl
  }

  set<T>(key: string, data: T, options: CacheOptions = { ttl: DEFAULT_TTL }): void {
    const item: CacheItem<T> = {
      data,
      timestamp: Date.now()
    }

    // Set in memory
    this.memoryCache.set(key, item)

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

  get<T>(key: string, options: CacheOptions = { ttl: DEFAULT_TTL }): T | null {
    // Try memory cache first
    const memoryItem = this.memoryCache.get(key)
    if (memoryItem && !this.isExpired(memoryItem.timestamp, options.ttl)) {
      return memoryItem.data
    }

    // Try localStorage if not in memory or expired
    try {
      const storageItem = localStorage.getItem(this.getStorageKey(key))
      if (storageItem) {
        const item: CacheItem<T> = JSON.parse(storageItem)
        if (!this.isExpired(item.timestamp, options.ttl)) {
          // Update memory cache
          this.memoryCache.set(key, item)
          return item.data
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
}

export const cache = new Cache()

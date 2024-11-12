import { ICache, IStorage, CacheItem, CacheOptions, CacheValue } from './types'
import { DEFAULT_CACHE_TTL, CACHE_CLEANUP_INTERVAL } from '@/constants'

export class Cache implements ICache {
  private storage: IStorage[]
  private cleanupInterval: NodeJS.Timeout | null = null

  constructor(storage: IStorage[]) {
    this.storage = storage
    this.startCleanupInterval()
  }

  private startCleanupInterval(): void {
    if (typeof window !== 'undefined') {
      // Run initial cleanup
      this.cleanupExpiredItems()
      
      // Set up interval for future cleanups
      this.cleanupInterval = setInterval(() => {
        this.cleanupExpiredItems()
      }, CACHE_CLEANUP_INTERVAL)
    }
  }

  private cleanupExpiredItems(): void {
    this.storage.forEach(storage => {
      storage.clearExpired()
    })
  }

  get<T extends CacheValue>(key: string): T | null {
    // Try each storage in order
    for (const storage of this.storage) {
      if (storage.isExpired(key)) {
        storage.remove(key)
        continue
      }
      const value = storage.get<T>(key)
      if (value !== null) {
        return value
      }
    }
    return null
  }

  set<T extends CacheValue>(key: string, data: T, options: CacheOptions = { ttl: DEFAULT_CACHE_TTL }): void {
    const item: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      ttl: options.ttl
    }

    // Set in all storage implementations
    this.storage.forEach(storage => {
      storage.set(key, item)
    })
  }

  remove(key: string): void {
    this.storage.forEach(storage => {
      storage.remove(key)
    })
  }

  clear(): void {
    this.storage.forEach(storage => {
      storage.clear()
    })
  }

  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval)
      this.cleanupInterval = null
    }
    this.clear()
  }
}

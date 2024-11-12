import { ICache, IStorage, CacheItem, CacheOptions, CacheValue } from './types'

const DEFAULT_TTL = 5 * 60 * 1000 // 5 minutes

export class Cache implements ICache {
  private storage: IStorage[]
  private cleanupInterval: NodeJS.Timeout | null = null

  constructor(storage: IStorage[]) {
    this.storage = storage
    this.startCleanupInterval()
  }

  private startCleanupInterval(): void {
    this.cleanupInterval = setInterval(() => {
      this.cleanupExpiredItems()
    }, 15 * 60 * 1000) // 15 minutes
  }

  private isExpired(item: CacheItem<unknown>): boolean {
    return Date.now() - item.timestamp > item.ttl
  }

  private cleanupExpiredItems(): void {
    // We'll implement this if needed
    // For now, we let each storage implementation handle its own cleanup
  }

  get<T extends CacheValue>(key: string): T | null {
    // Try each storage in order
    for (const storage of this.storage) {
      const value = storage.get<T>(key)
      if (value !== null) {
        return value
      }
    }
    return null
  }

  set<T extends CacheValue>(key: string, data: T, options: CacheOptions = { ttl: DEFAULT_TTL }): void {
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

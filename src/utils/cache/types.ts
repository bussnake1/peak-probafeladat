export type CacheItem<T> = {
  data: T
  timestamp: number
  ttl: number
}

export type CacheOptions = {
  ttl: number // Time to live in milliseconds
}

export type CacheValue = string | number | boolean | object | null

export interface IStorage {
  get<T extends CacheValue>(key: string): T | null
  set<T extends CacheValue>(key: string, item: CacheItem<T>): void
  remove(key: string): void
  clear(): void
  isExpired(key: string): boolean
  clearExpired(): void
}

export interface ICache {
  get<T extends CacheValue>(key: string): T | null
  set<T extends CacheValue>(key: string, data: T, options?: CacheOptions): void
  remove(key: string): void
  clear(): void
}

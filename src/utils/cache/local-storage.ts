import { IStorage, CacheItem, CacheValue } from './types'

export class LocalStorage implements IStorage {
  private prefix: string
  private excludedKeys: string[] = ['stock_app_persistent_favorites'] // Keys that should not be cleared

  constructor(prefix: string = 'stock_app_') {
    this.prefix = prefix
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`
  }

  private removePrefix(key: string): string {
    return key.slice(this.prefix.length)
  }

  private getRaw<T extends CacheValue>(key: string): CacheItem<T> | null {
    try {
      const item = localStorage.getItem(this.getKey(key))
      if (!item) return null

      return JSON.parse(item) as CacheItem<T>
    } catch (error) {
      console.warn('Failed to read raw data from localStorage:', error)
      return null
    }
  }

  get<T extends CacheValue>(key: string): T | null {
    const item = this.getRaw<T>(key)
    if (!item) return null
    return item.data
  }

  set<T extends CacheValue>(key: string, item: CacheItem<T>): void {
    try {
      localStorage.setItem(
        this.getKey(key),
        JSON.stringify(item)
      )
    } catch (error) {
      console.warn('Failed to write to localStorage:', error)
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(this.getKey(key))
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error)
    }
  }

  clear(): void {
    try {
      Object.keys(localStorage)
        .filter(key => 
          key.startsWith(this.prefix) && 
          !this.excludedKeys.includes(key)
        )
        .forEach(key => localStorage.removeItem(key))
    } catch (error) {
      console.warn('Failed to clear localStorage:', error)
    }
  }

  isExpired(key: string): boolean {
    const item = this.getRaw(key)
    if (!item) return false
    return Date.now() - item.timestamp > item.ttl
  }

  clearExpired(): void {
    try {
      Object.keys(localStorage)
        .filter(key => key.startsWith(this.prefix))
        .forEach(key => {
          const unprefixedKey = this.removePrefix(key)
          if (!this.excludedKeys.includes(key) && this.isExpired(unprefixedKey)) {
            localStorage.removeItem(key)
          }
        })
    } catch (error) {
      console.warn('Failed to clear expired items from localStorage:', error)
    }
  }
}

import { IStorage, CacheItem, CacheValue } from './types'

export class LocalStorage implements IStorage {
  private prefix: string

  constructor(prefix: string = 'stock_app_') {
    this.prefix = prefix
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`
  }

  get<T extends CacheValue>(key: string): T | null {
    try {
      const item = localStorage.getItem(this.getKey(key))
      if (!item) return null

      const cacheItem: CacheItem<T> = JSON.parse(item)
      return cacheItem.data
    } catch (error) {
      console.warn('Failed to read from localStorage:', error)
      return null
    }
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
        .filter(key => key.startsWith(this.prefix))
        .forEach(key => localStorage.removeItem(key))
    } catch (error) {
      console.warn('Failed to clear localStorage:', error)
    }
  }
}

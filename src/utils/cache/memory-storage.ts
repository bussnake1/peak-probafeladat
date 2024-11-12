import { IStorage, CacheItem, CacheValue } from './types'

export class MemoryStorage implements IStorage {
  private storage: Map<string, CacheItem<CacheValue>>

  constructor() {
    this.storage = new Map()
  }

  get<T extends CacheValue>(key: string): T | null {
    const item = this.storage.get(key)
    return item ? item.data as T : null
  }

  set<T extends CacheValue>(key: string, item: CacheItem<T>): void {
    this.storage.set(key, item as CacheItem<CacheValue>)
  }

  remove(key: string): void {
    this.storage.delete(key)
  }

  clear(): void {
    this.storage.clear()
  }
}

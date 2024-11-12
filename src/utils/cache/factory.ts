import { Cache } from './cache'
import { MemoryStorage } from './memory-storage'
import { LocalStorage } from './local-storage'
import { IStorage } from './types'

export function createCache(): Cache {
  const storage: IStorage[] = [
    new MemoryStorage()
  ]

  // Add localStorage in browser environment
  if (typeof window !== 'undefined') {
    storage.push(new LocalStorage())
  }

  return new Cache(storage)
}

// Export a singleton instance
export const cache = createCache()

// Cleanup on window unload in browser environment
if (typeof window !== 'undefined') {
  window.addEventListener('unload', () => {
    cache.destroy()
  })
}

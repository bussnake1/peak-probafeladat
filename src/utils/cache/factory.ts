import { Cache } from './cache'
import { MemoryStorage } from './memory-storage'
import { LocalStorage } from './local-storage'
import { IStorage } from './types'

// Create separate storage instances for temporary cache and persistent data
const createTemporaryStorage = (): IStorage[] => {
  const storage: IStorage[] = [
    new MemoryStorage()
  ]

  if (typeof window !== 'undefined') {
    // Use a different prefix for temporary cache items
    storage.push(new LocalStorage('stock_app_temp_'))
  }

  return storage
}

// Create a separate cache instance for persistent data (favorites)
const createPersistentStorage = (): IStorage[] => {
  const storage: IStorage[] = []

  if (typeof window !== 'undefined') {
    // Use a different prefix for persistent items
    storage.push(new LocalStorage('stock_app_persistent_'))
  }

  return storage
}

// Export separate cache instances
export const cache = new Cache(createTemporaryStorage())
export const persistentCache = new Cache(createPersistentStorage())

// Cleanup only temporary cache on window unload
if (typeof window !== 'undefined') {
  window.addEventListener('unload', () => {
    cache.destroy() // Only destroy temporary cache
  })
}

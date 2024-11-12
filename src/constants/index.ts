// Cache TTLs
export const CACHE_TTL = {
  STOCK_DETAILS: 30 * 1000, // 30 seconds for real-time data
  HISTORY: 5 * 60 * 1000,   // 5 minutes for historical data
  SEARCH: 10 * 1000,        // 10 seconds for search results
} as const

// Cache prefixes
export const CACHE_PREFIX = {
  STOCK_DETAILS: 'stock_details_',
  HISTORY: 'stock_history_',
  SEARCH: 'search_',
} as const

// Default cache cleanup interval
export const CACHE_CLEANUP_INTERVAL = 15 * 60 * 1000 // 15 minutes

// Default cache TTL
export const DEFAULT_CACHE_TTL = 5 * 60 * 1000 // 5 minutes

// API endpoints
export const API_ENDPOINTS = {
  STOCK_DETAILS: (symbol: string) => `/api/stock/${symbol}`,
  STOCK_HISTORY: (symbol: string) => `/api/stock/${symbol}/history`,
  SEARCH: (query: string) => `/api/symbol-search?keywords=${encodeURIComponent(query)}`,
} as const

// Maximum search results
export const MAX_SEARCH_RESULTS = 20

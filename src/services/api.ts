import { GlobalQuote, ChartData, TimeSeriesResponse } from '@/types/stock'
import { SearchResult, StockMatch } from '@/types/search'
import { cache } from '@/utils/cache'
import { CACHE_TTL, CACHE_PREFIX, BASE_URL, API_ENDPOINTS } from '@/constants'

class StockAPI {
  private static instance: StockAPI

  private constructor() {}

  public static getInstance(): StockAPI {
    if (!StockAPI.instance) {
      StockAPI.instance = new StockAPI()
    }
    return StockAPI.instance
  }

  private getBaseUrl() {
    return typeof window === 'undefined' ? BASE_URL : ''
  }

  async getStockDetails(symbol: string): Promise<GlobalQuote> {
    const cacheKey = `${CACHE_PREFIX.STOCK_DETAILS}${symbol}`
    
    // Try to get from cache first
    const cachedData = cache.get<GlobalQuote>(cacheKey)
    if (cachedData) {
      return cachedData
    }

    // If not in cache, fetch from API
    const response = await fetch(`${this.getBaseUrl()}${API_ENDPOINTS.STOCK_DETAILS(symbol)}`)
    const data = await response.json()

    if (data["Error Message"]) {
      throw new Error(data["Error Message"])
    }

    // Store in cache and return
    cache.set(cacheKey, data, { ttl: CACHE_TTL.STOCK_DETAILS })
    return data
  }

  async getStockHistory(symbol: string): Promise<ChartData[]> {
    const cacheKey = `${CACHE_PREFIX.HISTORY}${symbol}`
    
    // Try to get from cache first
    const cachedData = cache.get<ChartData[]>(cacheKey)
    if (cachedData) {
      return cachedData
    }

    // If not in cache, fetch from API
    const response = await fetch(`${this.getBaseUrl()}${API_ENDPOINTS.STOCK_HISTORY(symbol)}`)
    const result = await response.json()

    if (result["Error Message"]) {
      throw new Error(result["Error Message"])
    }

    // Transform the data for the chart
    const timeSeriesData = (result as TimeSeriesResponse)["Time Series (Daily)"]
    const chartData = Object.entries(timeSeriesData)
      .map(([date, values]) => ({
        date,
        price: parseFloat(values["4. close"])
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    // Store in cache and return
    cache.set(cacheKey, chartData, { ttl: CACHE_TTL.HISTORY })
    return chartData
  }

  async searchStocks(query: string): Promise<SearchResult[]> {
    const cacheKey = `${CACHE_PREFIX.SEARCH}${query}`
    
    // Try to get from cache first
    const cachedResults = cache.get<SearchResult[]>(cacheKey)
    if (cachedResults) {
      return cachedResults
    }

    // If not in cache, fetch from API
    const response = await fetch(`${this.getBaseUrl()}${API_ENDPOINTS.SEARCH(query)}`)
    const data = await response.json()

    if (!data.bestMatches) {
      return []
    }

    const formattedResults = data.bestMatches
      .map((match: StockMatch) => ({
        symbol: match['1. symbol'],
        name: match['2. name']
      }))
      .slice(0, 20)

    // Store in cache and return
    cache.set(cacheKey, formattedResults, { ttl: CACHE_TTL.SEARCH })
    return formattedResults
  }
}

export const stockAPI = StockAPI.getInstance()

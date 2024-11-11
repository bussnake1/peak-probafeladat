// Stock Details Types
export type GlobalQuote = {
  "Global Quote": {
    "01. symbol": string
    "02. open": string
    "03. high": string
    "04. low": string
    "05. price": string
    "06. volume": string
    "07. latest trading day": string
    "08. previous close": string
    "09. change": string
    "10. change percent": string
  }
}

// Price Chart Types
export type ChartData = {
  date: string
  price: number
}

export type DailyValue = {
  "1. open": string
  "2. high": string
  "3. low": string
  "4. close": string
  "5. volume": string
}

export type TimeSeriesResponse = {
  "Time Series (Daily)": {
    [key: string]: DailyValue
  }
}

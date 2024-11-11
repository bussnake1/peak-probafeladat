const mockData = {
  // SYMBOL SEARCH endpoint mock data
  symbolSearch: {
    bestMatches: [
      {
        "1. symbol": "AAPL",
        "2. name": "Apple Inc.",
        "3. type": "Equity",
        "4. region": "United States",
        "5. marketOpen": "09:30",
        "6. marketClose": "16:00",
        "7. timezone": "UTC-04",
        "8. currency": "USD",
        "9. matchScore": "1.0000"
      },
      {
        "1. symbol": "MSFT",
        "2. name": "Microsoft Corporation",
        "3. type": "Equity",
        "4. region": "United States",
        "5. marketOpen": "09:30",
        "6. marketClose": "16:00",
        "7. timezone": "UTC-04",
        "8. currency": "USD",
        "9. matchScore": "1.0000"
      },
      {
        "1. symbol": "GOOGL",
        "2. name": "Alphabet Inc.",
        "3. type": "Equity",
        "4. region": "United States",
        "5. marketOpen": "09:30",
        "6. marketClose": "16:00",
        "7. timezone": "UTC-04",
        "8. currency": "USD",
        "9. matchScore": "1.0000"
      },
      {
        "1. symbol": "AMZN",
        "2. name": "Amazon.com Inc.",
        "3. type": "Equity",
        "4. region": "United States",
        "5. marketOpen": "09:30",
        "6. marketClose": "16:00",
        "7. timezone": "UTC-04",
        "8. currency": "USD",
        "9. matchScore": "0.9500"
      },
      {
        "1. symbol": "META",
        "2. name": "Meta Platforms Inc.",
        "3. type": "Equity",
        "4. region": "United States",
        "5. marketOpen": "09:30",
        "6. marketClose": "16:00",
        "7. timezone": "UTC-04",
        "8. currency": "USD",
        "9. matchScore": "0.9500"
      },
      {
        "1. symbol": "TSLA",
        "2. name": "Tesla Inc.",
        "3. type": "Equity",
        "4. region": "United States",
        "5. marketOpen": "09:30",
        "6. marketClose": "16:00",
        "7. timezone": "UTC-04",
        "8. currency": "USD",
        "9. matchScore": "0.9000"
      },
      {
        "1. symbol": "NVDA",
        "2. name": "NVIDIA Corporation",
        "3. type": "Equity",
        "4. region": "United States",
        "5. marketOpen": "09:30",
        "6. marketClose": "16:00",
        "7. timezone": "UTC-04",
        "8. currency": "USD",
        "9. matchScore": "0.9000"
      },
      {
        "1. symbol": "JPM",
        "2. name": "JPMorgan Chase & Co.",
        "3. type": "Equity",
        "4. region": "United States",
        "5. marketOpen": "09:30",
        "6. marketClose": "16:00",
        "7. timezone": "UTC-04",
        "8. currency": "USD",
        "9. matchScore": "0.8500"
      },
      {
        "1. symbol": "BAC",
        "2. name": "Bank of America Corporation",
        "3. type": "Equity",
        "4. region": "United States",
        "5. marketOpen": "09:30",
        "6. marketClose": "16:00",
        "7. timezone": "UTC-04",
        "8. currency": "USD",
        "9. matchScore": "0.8500"
      },
      {
        "1. symbol": "WMT",
        "2. name": "Walmart Inc.",
        "3. type": "Equity",
        "4. region": "United States",
        "5. marketOpen": "09:30",
        "6. marketClose": "16:00",
        "7. timezone": "UTC-04",
        "8. currency": "USD",
        "9. matchScore": "0.8000"
      },
      {
        "1. symbol": "JNJ",
        "2. name": "Johnson & Johnson",
        "3. type": "Equity",
        "4. region": "United States",
        "5. marketOpen": "09:30",
        "6. marketClose": "16:00",
        "7. timezone": "UTC-04",
        "8. currency": "USD",
        "9. matchScore": "0.8000"
      },
      {
        "1. symbol": "PG",
        "2. name": "Procter & Gamble Company",
        "3. type": "Equity",
        "4. region": "United States",
        "5. marketOpen": "09:30",
        "6. marketClose": "16:00",
        "7. timezone": "UTC-04",
        "8. currency": "USD",
        "9. matchScore": "0.7500"
      },
      {
        "1. symbol": "XOM",
        "2. name": "Exxon Mobil Corporation",
        "3. type": "Equity",
        "4. region": "United States",
        "5. marketOpen": "09:30",
        "6. marketClose": "16:00",
        "7. timezone": "UTC-04",
        "8. currency": "USD",
        "9. matchScore": "0.7500"
      },
      {
        "1. symbol": "VZ",
        "2. name": "Verizon Communications Inc.",
        "3. type": "Equity",
        "4. region": "United States",
        "5. marketOpen": "09:30",
        "6. marketClose": "16:00",
        "7. timezone": "UTC-04",
        "8. currency": "USD",
        "9. matchScore": "0.7000"
      },
      {
        "1. symbol": "KO",
        "2. name": "The Coca-Cola Company",
        "3. type": "Equity",
        "4. region": "United States",
        "5. marketOpen": "09:30",
        "6. marketClose": "16:00",
        "7. timezone": "UTC-04",
        "8. currency": "USD",
        "9. matchScore": "0.7000"
      },
      {
        "1. symbol": "DIS",
        "2. name": "The Walt Disney Company",
        "3. type": "Equity",
        "4. region": "United States",
        "5. marketOpen": "09:30",
        "6. marketClose": "16:00",
        "7. timezone": "UTC-04",
        "8. currency": "USD",
        "9. matchScore": "0.6500"
      },
      {
        "1. symbol": "NFLX",
        "2. name": "Netflix Inc.",
        "3. type": "Equity",
        "4. region": "United States",
        "5. marketOpen": "09:30",
        "6. marketClose": "16:00",
        "7. timezone": "UTC-04",
        "8. currency": "USD",
        "9. matchScore": "0.6500"
      },
      {
        "1. symbol": "INTC",
        "2. name": "Intel Corporation",
        "3. type": "Equity",
        "4. region": "United States",
        "5. marketOpen": "09:30",
        "6. marketClose": "16:00",
        "7. timezone": "UTC-04",
        "8. currency": "USD",
        "9. matchScore": "0.6000"
      },
      {
        "1. symbol": "AMD",
        "2. name": "Advanced Micro Devices Inc.",
        "3. type": "Equity",
        "4. region": "United States",
        "5. marketOpen": "09:30",
        "6. marketClose": "16:00",
        "7. timezone": "UTC-04",
        "8. currency": "USD",
        "9. matchScore": "0.6000"
      },
      {
        "1. symbol": "CSCO",
        "2. name": "Cisco Systems Inc.",
        "3. type": "Equity",
        "4. region": "United States",
        "5. marketOpen": "09:30",
        "6. marketClose": "16:00",
        "7. timezone": "UTC-04",
        "8. currency": "USD",
        "9. matchScore": "0.5500"
      }
    ]
  },

  // GLOBAL QUOTE endpoint mock data
  globalQuotes: {
    "AAPL": {
      "Global Quote": {
        "01. symbol": "AAPL",
        "02. open": "170.35",
        "03. high": "172.28",
        "04. low": "169.93",
        "05. price": "171.21",
        "06. volume": "51014975",
        "07. latest trading day": "2024-01-19",
        "08. previous close": "170.12",
        "09. change": "1.09",
        "10. change percent": "0.6407%"
      }
    },
    "MSFT": {
      "Global Quote": {
        "01. symbol": "MSFT",
        "02. open": "388.47",
        "03. high": "390.68",
        "04. low": "387.76",
        "05. price": "389.47",
        "06. volume": "21922355",
        "07. latest trading day": "2024-01-19",
        "08. previous close": "388.47",
        "09. change": "1.00",
        "10. change percent": "0.2575%"
      }
    },
    "GOOGL": {
      "Global Quote": {
        "01. symbol": "GOOGL",
        "02. open": "142.72",
        "03. high": "143.71",
        "04. low": "141.50",
        "05. price": "142.28",
        "06. volume": "21571585",
        "07. latest trading day": "2024-01-19",
        "08. previous close": "142.65",
        "09. change": "-0.37",
        "10. change percent": "-0.2594%"
      }
    },
    "AMZN": {
      "Global Quote": {
        "01. symbol": "AMZN",
        "02. open": "155.20",
        "03. high": "156.45",
        "04. low": "154.70",
        "05. price": "155.32",
        "06. volume": "18234567",
        "07. latest trading day": "2024-01-19",
        "08. previous close": "155.15",
        "09. change": "0.17",
        "10. change percent": "0.1096%"
      }
    },
    "META": {
      "Global Quote": {
        "01. symbol": "META",
        "02. open": "375.80",
        "03. high": "378.42",
        "04. low": "374.25",
        "05. price": "376.13",
        "06. volume": "15678234",
        "07. latest trading day": "2024-01-19",
        "08. previous close": "375.60",
        "09. change": "0.53",
        "10. change percent": "0.1411%"
      }
    },
    "TSLA": {
      "Global Quote": {
        "01. symbol": "TSLA",
        "02. open": "212.50",
        "03. high": "215.30",
        "04. low": "211.20",
        "05. price": "213.75",
        "06. volume": "25432167",
        "07. latest trading day": "2024-01-19",
        "08. previous close": "212.19",
        "09. change": "1.56",
        "10. change percent": "0.7351%"
      }
    },
    "NVDA": {
      "Global Quote": {
        "01. symbol": "NVDA",
        "02. open": "525.70",
        "03. high": "528.90",
        "04. low": "523.45",
        "05. price": "527.80",
        "06. volume": "19876543",
        "07. latest trading day": "2024-01-19",
        "08. previous close": "525.50",
        "09. change": "2.30",
        "10. change percent": "0.4377%"
      }
    },
    "JPM": {
      "Global Quote": {
        "01. symbol": "JPM",
        "02. open": "167.80",
        "03. high": "169.25",
        "04. low": "167.15",
        "05. price": "168.95",
        "06. volume": "12345678",
        "07. latest trading day": "2024-01-19",
        "08. previous close": "167.50",
        "09. change": "1.45",
        "10. change percent": "0.8657%"
      }
    },
    "BAC": {
      "Global Quote": {
        "01. symbol": "BAC",
        "02. open": "32.45",
        "03. high": "32.90",
        "04. low": "32.20",
        "05. price": "32.75",
        "06. volume": "14567890",
        "07. latest trading day": "2024-01-19",
        "08. previous close": "32.40",
        "09. change": "0.35",
        "10. change percent": "1.0802%"
      }
    },
    "WMT": {
      "Global Quote": {
        "01. symbol": "WMT",
        "02. open": "162.30",
        "03. high": "163.45",
        "04. low": "161.90",
        "05. price": "162.80",
        "06. volume": "8765432",
        "07. latest trading day": "2024-01-19",
        "08. previous close": "162.15",
        "09. change": "0.65",
        "10. change percent": "0.4009%"
      }
    },
    "JNJ": {
      "Global Quote": {
        "01. symbol": "JNJ",
        "02. open": "161.75",
        "03. high": "162.50",
        "04. low": "161.20",
        "05. price": "162.10",
        "06. volume": "7654321",
        "07. latest trading day": "2024-01-19",
        "08. previous close": "161.60",
        "09. change": "0.50",
        "10. change percent": "0.3094%"
      }
    },
    "PG": {
      "Global Quote": {
        "01. symbol": "PG",
        "02. open": "148.90",
        "03. high": "149.75",
        "04. low": "148.40",
        "05. price": "149.20",
        "06. volume": "6543210",
        "07. latest trading day": "2024-01-19",
        "08. previous close": "148.80",
        "09. change": "0.40",
        "10. change percent": "0.2689%"
      }
    },
    "XOM": {
      "Global Quote": {
        "01. symbol": "XOM",
        "02. open": "102.80",
        "03. high": "103.45",
        "04. low": "102.30",
        "05. price": "103.10",
        "06. volume": "9876543",
        "07. latest trading day": "2024-01-19",
        "08. previous close": "102.70",
        "09. change": "0.40",
        "10. change percent": "0.3894%"
      }
    },
    "VZ": {
      "Global Quote": {
        "01. symbol": "VZ",
        "02. open": "39.80",
        "03. high": "40.25",
        "04. low": "39.60",
        "05. price": "40.05",
        "06. volume": "5432109",
        "07. latest trading day": "2024-01-19",
        "08. previous close": "39.75",
        "09. change": "0.30",
        "10. change percent": "0.7547%"
      }
    },
    "KO": {
      "Global Quote": {
        "01. symbol": "KO",
        "02. open": "59.90",
        "03. high": "60.35",
        "04. low": "59.70",
        "05. price": "60.15",
        "06. volume": "4321098",
        "07. latest trading day": "2024-01-19",
        "08. previous close": "59.85",
        "09. change": "0.30",
        "10. change percent": "0.5012%"
      }
    },
    "DIS": {
      "Global Quote": {
        "01. symbol": "DIS",
        "02. open": "93.80",
        "03. high": "94.50",
        "04. low": "93.40",
        "05. price": "94.20",
        "06. volume": "8765432",
        "07. latest trading day": "2024-01-19",
        "08. previous close": "93.70",
        "09. change": "0.50",
        "10. change percent": "0.5336%"
      }
    },
    "NFLX": {
      "Global Quote": {
        "01. symbol": "NFLX",
        "02. open": "485.60",
        "03. high": "488.90",
        "04. low": "484.20",
        "05. price": "487.35",
        "06. volume": "6543210",
        "07. latest trading day": "2024-01-19",
        "08. previous close": "485.30",
        "09. change": "2.05",
        "10. change percent": "0.4224%"
      }
    },
    "INTC": {
      "Global Quote": {
        "01. symbol": "INTC",
        "02. open": "47.80",
        "03. high": "48.35",
        "04. low": "47.50",
        "05. price": "48.10",
        "06. volume": "7654321",
        "07. latest trading day": "2024-01-19",
        "08. previous close": "47.70",
        "09. change": "0.40",
        "10. change percent": "0.8386%"
      }
    },
    "AMD": {
      "Global Quote": {
        "01. symbol": "AMD",
        "02. open": "167.90",
        "03. high": "169.45",
        "04. low": "167.20",
        "05. price": "168.80",
        "06. volume": "9876543",
        "07. latest trading day": "2024-01-19",
        "08. previous close": "167.75",
        "09. change": "1.05",
        "10. change percent": "0.6260%"
      }
    },
    "CSCO": {
      "Global Quote": {
        "01. symbol": "CSCO",
        "02. open": "50.40",
        "03. high": "50.85",
        "04. low": "50.20",
        "05. price": "50.65",
        "06. volume": "5432109",
        "07. latest trading day": "2024-01-19",
        "08. previous close": "50.35",
        "09. change": "0.30",
        "10. change percent": "0.5958%"
      }
    }
  }
};

export default mockData;

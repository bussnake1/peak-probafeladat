import mockData from '../../../mock/data'
import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { GlobalQuote } from '@/types/stock'
import { ALPHA_VANTAGE } from '@/constants'

type GlobalQuotes = {
  [key: string]: GlobalQuote
}

type Params = Promise<{ symbol: string }>

async function fetchFromAlphaVantage(symbol: string) {
  const params = new URLSearchParams({
    function: ALPHA_VANTAGE.FUNCTIONS.STOCK_DETAILS,
    symbol,
    apikey: process.env.ALPHA_VANTAGE_API_KEY || ''
  })

  const response = await fetch(`${ALPHA_VANTAGE.BASE_URL}?${params}`)
  console.log('fetched from alphavantage: ', `${ALPHA_VANTAGE.BASE_URL}?${params}`)
  if (!response.ok) {
    throw new Error(`Alpha Vantage API error: ${response.statusText}`)
  }
  
  return response.json()
}

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { symbol } = await params
    const useMockData = process.env.USE_MOCK_DATA === 'true'

    if (!symbol) {
      return new NextResponse(
        JSON.stringify({ "Error Message": "The symbol parameter is invalid or missing." }),
        { status: 400 }
      )
    }

    if (useMockData) {
      const stockData = (mockData.globalQuotes as GlobalQuotes)[symbol.toUpperCase()]
      if (!stockData) {
        return new NextResponse(
          JSON.stringify({ "Error Message": "No data found for the provided symbol." }),
          { status: 404 }
        )
      }
      return NextResponse.json(stockData)
    }

    const data = await fetchFromAlphaVantage(symbol)
    
    if (data["Error Message"]) {
      return new NextResponse(
        JSON.stringify({ "Error Message": data["Error Message"] }),
        { status: 404 }
      )
    }

    if (data["Information"]) {
      console.warn('Alpha Vantage API Information:', data["Information"])
      return NextResponse.json({
        "Error Message": "API rate limit exceeded. Please try again later."
      }, { status: 429 })
    }

    // Check if we got an empty response
    if (!data["Global Quote"] || Object.keys(data["Global Quote"]).length === 0) {
      return new NextResponse(
        JSON.stringify({ "Error Message": "No data found for the provided symbol." }),
        { status: 404 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Stock data error:', error)
    return new NextResponse(
      JSON.stringify({ "Error Message": "An internal error occurred. Please try again later." }),
      { status: 500 }
    )
  }
}

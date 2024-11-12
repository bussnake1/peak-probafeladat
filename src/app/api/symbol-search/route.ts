import mockData from '../../mock/data'
import { NextResponse } from 'next/server'
import { ALPHA_VANTAGE } from '@/constants'

async function fetchFromAlphaVantage(keywords: string) {
  const params = new URLSearchParams({
    function: ALPHA_VANTAGE.FUNCTIONS.SEARCH,
    keywords,
    apikey: process.env.ALPHA_VANTAGE_API_KEY || ''
  })

  const response = await fetch(`${ALPHA_VANTAGE.BASE_URL}?${params}`)
  console.log('fetched from alphavantage: ', `${ALPHA_VANTAGE.BASE_URL}?${params}`)

  if (!response.ok) {
    throw new Error(`Alpha Vantage API error: ${response.statusText}`)
  }
  
  return response.json()
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const keywords = searchParams.get('keywords')
    const useMockData = process.env.USE_MOCK_DATA === 'true'

    if (!keywords) {
      return NextResponse.json({
        "Error Message": "The query parameters are invalid or missing. Please specify a keywords parameter."
      }, { status: 400 })
    }

    if (useMockData) {
      const results = mockData.symbolSearch.bestMatches.filter(match => 
        match["1. symbol"].toLowerCase().includes(keywords.toLowerCase()) ||
        match["2. name"].toLowerCase().includes(keywords.toLowerCase())
      )
      return NextResponse.json({ bestMatches: results })
    }

    const data = await fetchFromAlphaVantage(keywords)
    
    if (data["Error Message"]) {
      return NextResponse.json({
        "Error Message": data["Error Message"]
      }, { status: 404 })
    }

    if (data["Information"]) {
      console.warn('Alpha Vantage API Information:', data["Information"])
      return NextResponse.json({
        "Error Message": "API rate limit exceeded. Please try again later."
      }, { status: 429 })
    }

    // If no matches found, return empty array instead of null
    if (!data.bestMatches) {
      return NextResponse.json({ bestMatches: [] })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Symbol search error:', error)
    return NextResponse.json({
      "Error Message": "An internal error occurred. Please try again later."
    }, { status: 500 })
  }
}

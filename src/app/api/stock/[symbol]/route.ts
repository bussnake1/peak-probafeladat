import mockData from '../../../mock/data'
import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { GlobalQuote } from '@/types/stock'

type GlobalQuotes = {
  [key: string]: GlobalQuote
}

type Params = Promise<{ symbol: string }>

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { symbol } = await params

    if (!symbol) {
      return new NextResponse(
        JSON.stringify({ "Error Message": "The symbol parameter is invalid or missing." }),
        { status: 400 }
      )
    }

    const stockData = (mockData.globalQuotes as GlobalQuotes)[symbol.toUpperCase()]

    if (!stockData) {
      return new NextResponse(
        JSON.stringify({ "Error Message": "No data found for the provided symbol." }),
        { status: 404 }
      )
    }

    return NextResponse.json(stockData)
  } catch (error) {
    console.error('Stock data error:', error)
    return new NextResponse(
      JSON.stringify({ "Error Message": "An internal error occurred. Please try again later." }),
      { status: 500 }
    )
  }
}

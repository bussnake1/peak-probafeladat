import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { TimeSeriesResponse } from '@/types/stock'

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

    try {
      const stockData = await import(`@/app/mock/timeSeriesDaily/${symbol}.js`)
      const timeSeriesData = stockData.mockData.timeSeriesDaily[symbol] as TimeSeriesResponse
      return NextResponse.json(timeSeriesData)
    } catch {
      return new NextResponse(
        JSON.stringify({ "Error Message": "No historical data found for the provided symbol." }),
        { status: 404 }
      )
    }
  } catch (error) {
    console.error('Stock history error:', error)
    return new NextResponse(
      JSON.stringify({ "Error Message": "An internal error occurred. Please try again later." }),
      { status: 500 }
    )
  }
}

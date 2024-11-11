import { NextResponse } from 'next/server';
import { TimeSeriesResponse } from '@/types/stock';

export async function GET(
  request: Request,
  { params }: { params: { symbol: string } }
) {
  try {
    const { symbol } = params;

    if (!symbol) {
      return NextResponse.json({
        "Error Message": "The symbol parameter is invalid or missing."
      }, { status: 400 });
    }

    try {
      const stockData = await import(`@/app/mock/timeSeriesDaily/${symbol}.js`);
      const timeSeriesData = stockData.mockData.timeSeriesDaily[symbol] as TimeSeriesResponse;
      return NextResponse.json(timeSeriesData);
    } catch {
      return NextResponse.json({
        "Error Message": "No historical data found for the provided symbol."
      }, { status: 404 });
    }
  } catch (error) {
    console.error('Stock history error:', error);
    return NextResponse.json({
      "Error Message": "An internal error occurred. Please try again later."
    }, { status: 500 });
  }
}

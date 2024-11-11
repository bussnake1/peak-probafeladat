import mockData from '../../../mock/data';
import { NextResponse } from 'next/server';

type GlobalQuote = {
  "Global Quote": {
    "01. symbol": string;
    "02. open": string;
    "03. high": string;
    "04. low": string;
    "05. price": string;
    "06. volume": string;
    "07. latest trading day": string;
    "08. previous close": string;
    "09. change": string;
    "10. change percent": string;
  }
}

type GlobalQuotes = {
  [key: string]: GlobalQuote;
}

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

    const stockData = (mockData.globalQuotes as GlobalQuotes)[symbol.toUpperCase()];

    if (!stockData) {
      return NextResponse.json({
        "Error Message": "No data found for the provided symbol."
      }, { status: 404 });
    }

    return NextResponse.json(stockData);
  } catch (error) {
    console.error('Stock data error:', error);
    return NextResponse.json({
      "Error Message": "An internal error occurred. Please try again later."
    }, { status: 500 });
  }
}

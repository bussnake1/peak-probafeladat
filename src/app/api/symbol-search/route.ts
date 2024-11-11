import mockData from '../../mock/data';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const keywords = searchParams.get('keywords');

    if (!keywords) {
      return NextResponse.json({
        "Error Message": "The query parameters are invalid or missing. Please specify a keywords parameter."
      }, { status: 400 });
    }

    // Filter results based on symbol or name matching the keywords
    const results = mockData.symbolSearch.bestMatches.filter(match => 
      match["1. symbol"].toLowerCase().includes(keywords.toLowerCase()) ||
      match["2. name"].toLowerCase().includes(keywords.toLowerCase())
    );

    return NextResponse.json({ bestMatches: results });
  } catch (error) {
    console.error('Symbol search error:', error);
    return NextResponse.json({
      "Error Message": "An internal error occurred. Please try again later."
    }, { status: 500 });
  }
}

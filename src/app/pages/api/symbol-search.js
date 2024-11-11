import mockData from '../../mock/data';

export default function handler(req, res) {
  try {
    const { keywords } = req.query;

    if (!keywords) {
      return res.status(400).json({
        "Error Message": "The query parameters are invalid or missing. Please specify a keywords parameter."
      });
    }

    // Filter results based on symbol or name matching the keywords
    const results = mockData.symbolSearch.bestMatches.filter(match => 
      match["1. symbol"].toLowerCase().includes(keywords.toLowerCase()) ||
      match["2. name"].toLowerCase().includes(keywords.toLowerCase())
    );

    return res.status(200).json({ bestMatches: results });
  } catch (error) {
    console.error('Symbol search error:', error);
    return res.status(500).json({
      "Error Message": "An internal error occurred. Please try again later."
    });
  }
}

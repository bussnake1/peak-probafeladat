import mockData from '../../mock/data';

export default function handler(req, res) {
  try {
    const { symbol } = req.query;

    if (!symbol) {
      return res.status(400).json({
        "Error Message": "The query parameters are invalid or missing. Please specify a symbol parameter."
      });
    }

    const quote = mockData.globalQuotes[symbol.toUpperCase()];
    
    if (!quote) {
      return res.status(404).json({
        "Error Message": "The requested symbol was not found in our database."
      });
    }

    return res.status(200).json(quote);
  } catch (error) {
    console.error('Global quote error:', error);
    return res.status(500).json({
      "Error Message": "An internal error occurred. Please try again later."
    });
  }
}

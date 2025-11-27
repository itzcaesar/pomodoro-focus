import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query, orientation } = req.query;

  if (!query || !orientation) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

  if (!PIXABAY_API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query as string)}&image_type=photo&orientation=${orientation}&per_page=50&safesearch=true`;
    
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Pixabay API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Return the data to the client
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching from Pixabay:', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
}

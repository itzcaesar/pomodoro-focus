import { PexelsImage } from '../types';

const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

const AESTHETIC_QUERIES = [
  'aesthetic lofi',
  'lofi aesthetic',
  'cozy aesthetic',
  'minimalist aesthetic',
  'pastel aesthetic',
  'soft aesthetic',
  'calm aesthetic',
  'peaceful aesthetic',
  'vintage aesthetic',
  'dreamy aesthetic',
  'warm aesthetic',
  'lofi vibes',
  'aesthetic room',
  'aesthetic workspace',
  'aesthetic nature'
];

export async function fetchAestheticBackground(isMobile: boolean = false): Promise<PexelsImage | null> {
  if (!PEXELS_API_KEY) {
    console.error('Pexels API key not found. Please check your .env file');
    return null;
  }

  console.log('Fetching background from Pexels...', { isMobile });

  try {
    const randomQuery = AESTHETIC_QUERIES[Math.floor(Math.random() * AESTHETIC_QUERIES.length)];
    
    // Desktop: landscape (16:9), Mobile: portrait (9:16)
    const orientation = isMobile ? 'portrait' : 'landscape';
    
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(randomQuery)}&orientation=${orientation}&per_page=30`;
    console.log('Pexels API Request:', { url, query: randomQuery, orientation });
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': PEXELS_API_KEY,
      },
    });

    console.log('Pexels API Response Status:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Pexels API error: ${response.status}`, errorText);
      
      // If 401 or 403, API key is invalid
      if (response.status === 401 || response.status === 403) {
        console.error('Invalid API key. Please check your Pexels API key at https://www.pexels.com/api/');
      }
      
      throw new Error(`Pexels API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Pexels API Response:', { totalResults: data.total_results, photosCount: data.photos?.length });
    
    if (!data.photos || data.photos.length === 0) {
      console.warn('No photos found for query:', randomQuery);
      return null;
    }

    // Get random photo from results
    const randomIndex = Math.floor(Math.random() * data.photos.length);
    const selectedPhoto = data.photos[randomIndex];
    console.log('Selected photo:', { id: selectedPhoto.id, photographer: selectedPhoto.photographer });
    return selectedPhoto;
  } catch (error) {
    console.error('Error fetching background from Pexels:', error);
    
    // Check if it's a network/CORS error
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      console.error('Network error - possible CORS issue or invalid API key');
      console.error('Please verify:');
      console.error('1. Your API key is correct: https://www.pexels.com/api/');
      console.error('2. Your API key is active and not rate-limited');
      console.error('3. Try regenerating your API key if issues persist');
    }
    
    return null;
  }
}

export function getTriggerPhotoUrl(photographer: string, photographerUrl: string): string {
  // Pexels requires attribution with UTM parameters
  return `${photographerUrl}?utm_source=pomodoro-focus&utm_medium=referral`;
}

export function getPexelsUrl(): string {
  return 'https://www.pexels.com?utm_source=pomodoro-focus&utm_medium=referral';
}

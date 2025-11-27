import { PixabayImage } from '../types';

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
  'aesthetic room',
  'aesthetic workspace',
  'aesthetic nature',
  'pastel colors',
  'soft colors'
];

export async function fetchAestheticBackground(isMobile: boolean = false): Promise<PixabayImage | null> {
  console.log('Fetching background from Pixabay...', { isMobile });

  try {
    const randomQuery = AESTHETIC_QUERIES[Math.floor(Math.random() * AESTHETIC_QUERIES.length)];
    
    // Desktop: horizontal, Mobile: vertical
    const orientation = isMobile ? 'vertical' : 'horizontal';
    
    // Use serverless function to keep API key secure
    const url = `/api/background?query=${encodeURIComponent(randomQuery)}&orientation=${orientation}`;
    console.log('Fetching from API route:', { query: randomQuery, orientation });
    
    const response = await fetch(url);

    console.log('API Response Status:', response.status, response.statusText);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`API error: ${response.status}`, errorData);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('API Response:', { totalHits: data.totalHits, hitsCount: data.hits?.length });
    
    if (!data.hits || data.hits.length === 0) {
      console.warn('No images found for query:', randomQuery);
      return null;
    }

    // Get random image from results
    const randomIndex = Math.floor(Math.random() * data.hits.length);
    const selectedImage = data.hits[randomIndex];
    console.log('Selected image:', { id: selectedImage.id, user: selectedImage.user });
    return selectedImage;
  } catch (error) {
    console.error('Error fetching background:', error);
    return null;
  }
}

export function getPhotographerUrl(pageURL: string): string {
  return `${pageURL}?utm_source=pomodoro-focus&utm_medium=referral`;
}

export function getPixabayUrl(): string {
  return 'https://pixabay.com?utm_source=pomodoro-focus&utm_medium=referral';
}

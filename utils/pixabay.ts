import { PixabayImage } from '../types';

const PIXABAY_API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

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
  if (!PIXABAY_API_KEY) {
    console.error('Pixabay API key not found. Please check your .env file');
    return null;
  }

  console.log('Fetching background from Pixabay...', { isMobile });

  try {
    const randomQuery = AESTHETIC_QUERIES[Math.floor(Math.random() * AESTHETIC_QUERIES.length)];
    
    // Desktop: horizontal, Mobile: vertical
    const orientation = isMobile ? 'vertical' : 'horizontal';
    
    const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(randomQuery)}&image_type=photo&orientation=${orientation}&per_page=50&safesearch=true`;
    console.log('Pixabay API Request:', { query: randomQuery, orientation });
    
    const response = await fetch(url);

    console.log('Pixabay API Response Status:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Pixabay API error: ${response.status}`, errorText);
      
      if (response.status === 400) {
        console.error('Invalid API key. Please check your Pixabay API key at https://pixabay.com/api/docs/');
      }
      
      throw new Error(`Pixabay API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Pixabay API Response:', { totalHits: data.totalHits, hitsCount: data.hits?.length });
    
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
    console.error('Error fetching background from Pixabay:', error);
    
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      console.error('Network error. Please verify:');
      console.error('1. Your API key is correct: https://pixabay.com/api/docs/');
      console.error('2. Your API key is active');
    }
    
    return null;
  }
}

export function getPhotographerUrl(pageURL: string): string {
  return `${pageURL}?utm_source=pomodoro-focus&utm_medium=referral`;
}

export function getPixabayUrl(): string {
  return 'https://pixabay.com?utm_source=pomodoro-focus&utm_medium=referral';
}

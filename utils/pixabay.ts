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
    
    // Check if we're in development (localhost) or production (Vercel)
    const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    let data;
    
    if (isDevelopment) {
      // Local development: call Pixabay API directly with VITE_ prefixed key
      const apiKey = import.meta.env.VITE_PIXABAY_API_KEY;
      
      if (!apiKey) {
        console.error('Pixabay API key not found. Add VITE_PIXABAY_API_KEY to your .env file');
        return null;
      }
      
      const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(randomQuery)}&image_type=photo&orientation=${orientation}&per_page=50&safesearch=true`;
      console.log('Development: Calling Pixabay directly');
      
      const response = await fetch(url);
      
      if (!response.ok) {
        console.error(`Pixabay API error: ${response.status}`);
        throw new Error(`Pixabay API error: ${response.status}`);
      }
      
      data = await response.json();
    } else {
      // Production: use serverless API route
      const url = `/api/background?query=${encodeURIComponent(randomQuery)}&orientation=${orientation}`;
      console.log('Production: Using serverless API route');
      
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error(`API error: ${response.status}`, errorData);
        throw new Error(`API error: ${response.status}`);
      }
      
      data = await response.json();
    }

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

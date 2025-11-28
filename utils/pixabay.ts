import { PixabayImage } from '../types';

const CACHE_KEY = 'pomodoro-bg-cache';
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

interface CachedBackground {
  image: PixabayImage;
  timestamp: number;
  orientation: string;
}

function getCachedBackground(orientation: string): PixabayImage | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const data: CachedBackground = JSON.parse(cached);
      const isValid = Date.now() - data.timestamp < CACHE_DURATION;
      const matchesOrientation = data.orientation === orientation;
      if (isValid && matchesOrientation) {
        return data.image;
      }
    }
  } catch (e) {
    // Ignore cache errors
  }
  return null;
}

function setCachedBackground(image: PixabayImage, orientation: string): void {
  try {
    const data: CachedBackground = {
      image,
      timestamp: Date.now(),
      orientation
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch (e) {
    // Ignore cache errors
  }
}

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
  // Desktop: horizontal, Mobile: vertical
  const orientation = isMobile ? 'vertical' : 'horizontal';
  
  // Check cache first for faster loading
  const cached = getCachedBackground(orientation);
  if (cached) {
    console.log('Using cached background image');
    return cached;
  }
  
  console.log('Fetching background from Pixabay...', { isMobile });

  try {
    const randomQuery = AESTHETIC_QUERIES[Math.floor(Math.random() * AESTHETIC_QUERIES.length)];
    
    // Check if we're in development (localhost)
    const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    let data;
    
    if (isDevelopment && import.meta.env.VITE_PIXABAY_API_KEY) {
      // Development: Use direct API call with VITE_ prefixed key
      const apiKey = import.meta.env.VITE_PIXABAY_API_KEY;
      const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(randomQuery)}&image_type=photo&orientation=${orientation}&per_page=50&safesearch=true`;
      console.log('Fetching directly from Pixabay (development mode)');
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Pixabay API error: ${response.status}`);
      }
      data = await response.json();
    } else {
      // Production: Use serverless function to keep API key secure
      const url = `/api/background?query=${encodeURIComponent(randomQuery)}&orientation=${orientation}`;
      console.log('Fetching from API route:', { query: randomQuery, orientation });
      
      const response = await fetch(url);
      console.log('API Response Status:', response.status, response.statusText);

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
    
    // Cache the result
    setCachedBackground(selectedImage, orientation);
    
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

// Spotify Configuration
export const SPOTIFY_CONFIG = {
  CLIENT_ID: process.env.SPOTIFY_API_KEY,
  REDIRECT_URI: window.location.origin,
  SCOPES: [
    'streaming',
    'user-read-email',
    'user-read-private',
    'user-read-playback-state',
    'user-modify-playback-state',
  ].join(' '),
};

// Generate random string for state parameter
const generateRandomString = (length: number): string => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], '');
};

// SHA256 hash function
const sha256 = async (plain: string): Promise<ArrayBuffer> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return crypto.subtle.digest('SHA-256', data);
};

// Base64 URL encode
const base64encode = (input: ArrayBuffer): string => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};

// Store tokens in localStorage
export const setTokens = (accessToken: string, refreshToken: string, expiresIn: number) => {
  const expiresAt = Date.now() + expiresIn * 1000;
  localStorage.setItem('spotify_access_token', accessToken);
  localStorage.setItem('spotify_refresh_token', refreshToken);
  localStorage.setItem('spotify_expires_at', expiresAt.toString());
};

export const getAccessToken = (): string | null => {
  const token = localStorage.getItem('spotify_access_token');
  const expiresAt = localStorage.getItem('spotify_expires_at');
  
  if (!token || !expiresAt) return null;
  if (Date.now() >= parseInt(expiresAt)) {
    // Token expired
    clearTokens();
    return null;
  }
  
  return token;
};

export const clearTokens = () => {
  localStorage.removeItem('spotify_access_token');
  localStorage.removeItem('spotify_refresh_token');
  localStorage.removeItem('spotify_expires_at');
  localStorage.removeItem('spotify_code_verifier');
};

// Initiate Spotify OAuth flow with PKCE
export const initiateSpotifyAuth = async () => {
  const codeVerifier = generateRandomString(64);
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);
  
  // Store code verifier for later use
  localStorage.setItem('spotify_code_verifier', codeVerifier);
  
  const authUrl = new URL('https://accounts.spotify.com/authorize');
  const params = {
    client_id: SPOTIFY_CONFIG.CLIENT_ID,
    response_type: 'code',
    redirect_uri: SPOTIFY_CONFIG.REDIRECT_URI,
    scope: SPOTIFY_CONFIG.SCOPES,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
  };
  
  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString();
};

// Handle OAuth callback
export const handleSpotifyCallback = async (): Promise<boolean> => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  
  if (!code) return false;
  
  const codeVerifier = localStorage.getItem('spotify_code_verifier');
  if (!codeVerifier) return false;
  
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: SPOTIFY_CONFIG.CLIENT_ID,
        grant_type: 'authorization_code',
        code,
        redirect_uri: SPOTIFY_CONFIG.REDIRECT_URI,
        code_verifier: codeVerifier,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to exchange code for token');
    }
    
    const data = await response.json();
    setTokens(data.access_token, data.refresh_token, data.expires_in);
    
    // Clean up URL
    window.history.replaceState({}, document.title, window.location.pathname);
    
    return true;
  } catch (error) {
    console.error('Error exchanging code for token:', error);
    return false;
  }
};

// Get lofi playlist tracks from Spotify
export const getLofiTracks = async (accessToken: string) => {
  try {
    // Using a popular lofi playlist (you can change this to any lofi playlist ID)
    const playlistId = '37i9dQZF1DWWQRwui0ExPn'; // Lofi Beats playlist
    
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=20`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch tracks');
    }
    
    const data = await response.json();
    return data.items.map((item: any) => ({
      id: item.track.id,
      title: item.track.name,
      artist: item.track.artists.map((a: any) => a.name).join(', '),
      uri: item.track.uri,
      artwork: item.track.album.images[0]?.url,
      previewUrl: item.track.preview_url,
    }));
  } catch (error) {
    console.error('Error fetching lofi tracks:', error);
    return [];
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return getAccessToken() !== null;
};

// TMDB API utility functions

import { MovieListResponse, DetailedMovie, TMDBGenresResponse, Credits } from '@/types/tmdb';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

const API_KEY = process.env.TMDB_API_KEY;

function ensureApiKey() {
  if (!API_KEY) {
    throw new Error('TMDB API key is not configured');
  }
}

const isBearerToken = API_KEY?.startsWith('eyJ');
const headers: HeadersInit = isBearerToken && API_KEY
  ? { Authorization: `Bearer ${API_KEY}` }
  : {};

/**
 * Constructs a full image URL from TMDB image path
 * @param path - The image path from TMDB (e.g., '/abc.jpg')
 * @param size - The image size (default: 'w500')
 * @returns Full image URL
 */
export function getImageUrl(path: string | null, size: string = 'w500'): string {
  if (!path) return '/fallback-poster.jpg';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

function buildUrl(path: string, params: Record<string, string | number | undefined> = {}) {
  ensureApiKey();
  const url = new URL(`${TMDB_BASE_URL}${path}`);
  const defaultParams = { api_key: API_KEY, language: 'en-US' };
  const merged = { ...defaultParams, ...params };
  Object.entries(merged).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value));
    }
  });
  return url;
}

async function fetchFromTMDB<T>(url: URL, revalidateSeconds = 3600): Promise<T> {
  try {
    const response = await fetch(url, {
      headers,
      next: { revalidate: revalidateSeconds },
    });
    if (!response.ok) {
      throw new Error(`TMDB API error ${response.status}: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching from TMDB:', error);
    throw error;
  }
}

export async function getPopularMovies(page: number = 1): Promise<MovieListResponse> {
  const url = buildUrl('/movie/popular', { page });
  return fetchFromTMDB<MovieListResponse>(url);
}

export async function getTopRatedMovies(page: number = 1): Promise<MovieListResponse> {
  const url = buildUrl('/movie/top_rated', { page });
  return fetchFromTMDB<MovieListResponse>(url);
}

export async function getUpcomingMovies(page: number = 1): Promise<MovieListResponse> {
  const url = buildUrl('/movie/upcoming', { page });
  return fetchFromTMDB<MovieListResponse>(url);
}

export async function getNowPlayingMovies(page: number = 1): Promise<MovieListResponse> {
  const url = buildUrl('/movie/now_playing', { page });
  return fetchFromTMDB<MovieListResponse>(url);
}

export async function getMoviesByGenre(genreId: number, page: number = 1): Promise<MovieListResponse> {
  const url = buildUrl('/discover/movie', { with_genres: genreId, page });
  return fetchFromTMDB<MovieListResponse>(url);
}

export async function fetchMovieDetails(id: number): Promise<DetailedMovie> {
  const url = buildUrl(`/movie/${id}`);
  return fetchFromTMDB<DetailedMovie>(url);
}

export async function fetchGenres(): Promise<TMDBGenresResponse> {
  const url = buildUrl('/genre/movie/list');
  return fetchFromTMDB<TMDBGenresResponse>(url, 86400);
}

export async function getMovieDetails(id: number): Promise<DetailedMovie> {
  const url = buildUrl(`/movie/${id}`, { append_to_response: 'credits,videos,similar' });
  try {
    return await fetchFromTMDB<DetailedMovie>(url);
  } catch (error) {
    if (error instanceof Error && error.message.includes('TMDB API error 404')) {
      throw new Error('Movie not found');
    }
    throw error;
  }
}

export async function getMovieCredits(id: number): Promise<Credits> {
  const url = buildUrl(`/movie/${id}/credits`);
  return fetchFromTMDB<Credits>(url);
}

export async function getSimilarMovies(id: number, page: number = 1): Promise<MovieListResponse> {
  const url = buildUrl(`/movie/${id}/similar`, { page });
  return fetchFromTMDB<MovieListResponse>(url);
}

export function formatRuntime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

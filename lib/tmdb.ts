// TMDB API utility functions

import { Movie, TMDBResponse, DetailedMovie, Genre, TMDBGenresResponse } from '@/types/tmdb';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

const API_KEY = process.env.TMDB_API_KEY;

if (!API_KEY) {
  throw new Error('TMDB_API_KEY environment variable is not set');
}

/**
 * Constructs a full image URL from TMDB image path
 * @param path - The image path from TMDB (e.g., '/abc.jpg')
 * @param size - The image size (default: 'w500')
 * @returns Full image URL
 */
export function getImageUrl(path: string, size: string = 'w500'): string {
  if (!path) return '';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

/**
 * Fetches popular movies
 * @param page - Page number (default: 1)
 * @returns Promise of TMDBResponse
 */
export async function fetchPopularMovies(page: number = 1): Promise<TMDBResponse> {
  const url = `${TMDB_BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch popular movies: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Fetches movies by genre
 * @param genreId - Genre ID
 * @param page - Page number (default: 1)
 * @returns Promise of TMDBResponse
 */
export async function fetchMoviesByGenre(genreId: number, page: number = 1): Promise<TMDBResponse> {
  const url = `${TMDB_BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch movies by genre: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Fetches detailed movie information by ID
 * @param id - Movie ID
 * @returns Promise of DetailedMovie
 */
export async function fetchMovieDetails(id: number): Promise<DetailedMovie> {
  const url = `${TMDB_BASE_URL}/movie/${id}?api_key=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch movie details: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Fetches list of genres
 * @returns Promise of TMDBGenresResponse
 */
export async function fetchGenres(): Promise<TMDBGenresResponse> {
  const url = `${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch genres: ${response.statusText}`);
  }
  return response.json();
}
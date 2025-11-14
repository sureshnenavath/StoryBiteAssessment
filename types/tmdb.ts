// TypeScript interfaces for TMDB API responses

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  popularity: number;
}

export interface TMDBResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface DetailedMovie extends Movie {
  genres: Genre[];
  runtime: number;
  budget: number;
  revenue: number;
  status: string;
  tagline: string;
  // Add more fields as needed
}

export interface Genre {
  id: number;
  name: string;
}

export interface TMDBGenresResponse {
  genres: Genre[];
}
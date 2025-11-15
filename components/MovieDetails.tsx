'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Play, Info, ArrowLeft } from 'lucide-react';
import { DetailedMovie } from '@/types/tmdb';
import { getImageUrl, formatRuntime } from '@/lib/tmdb';

interface MovieDetailsProps {
  movie: DetailedMovie;
}

export default function MovieDetails({ movie }: MovieDetailsProps) {
  return (
    <div className="relative h-[60vh] md:h-[80vh] w-full">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={getImageUrl(movie.backdrop_path, 'original')}
          alt={movie.title}
          fill
          priority
          className="object-cover object-center"
          style={{ objectPosition: 'center 20%' }}
          sizes="100vw"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-transparent to-transparent" />
      </div>

      {/* Back Button */}
      <div className="absolute top-20 left-4 md:left-12 lg:left-16 z-20">
        <Link
          href="/"
          className="flex items-center gap-2 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded backdrop-blur-sm transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Back</span>
        </Link>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-end pb-20 md:pb-32 px-0 md:px-12 lg:px-16">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full max-w-7xl">
          {/* Movie Poster */}
          <div className="flex-shrink-0 w-[200px] md:w-[300px]">
            <div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-2xl">
              <Image
                src={getImageUrl(movie.poster_path, 'w500')}
                alt={movie.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 200px, 300px"
              />
            </div>
          </div>

          {/* Movie Information */}
          <div className="flex-1 space-y-4 md:space-y-6">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-2xl leading-tight">
              {movie.title}
            </h1>

            {/* Tagline */}
            {movie.tagline && (
              <p className="text-lg md:text-xl italic text-gray-300">
                "{movie.tagline}"
              </p>
            )}

            {/* Metadata Row */}
            <div className="flex flex-wrap items-center gap-4 text-base md:text-lg">
              {/* Rating */}
              <div className="flex items-center gap-2">
                <span className="text-yellow-400 text-xl">★</span>
                <span className="text-white font-semibold">
                  {movie.vote_average.toFixed(1)}
                </span>
                <span className="text-gray-400">/10</span>
              </div>

              {/* Year */}
              {movie.release_date && (
                <>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-300 font-medium">
                    {new Date(movie.release_date).getFullYear()}
                  </span>
                </>
              )}

              {/* Runtime */}
              {movie.runtime && (
                <>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-300 font-medium">
                    {formatRuntime(movie.runtime)}
                  </span>
                </>
              )}
            </div>

            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-white/20"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {/* Overview */}
            <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-3xl drop-shadow-lg">
              {movie.overview}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded font-bold text-base md:text-lg hover:bg-white/90 transition-all shadow-lg hover:scale-105">
                <Play className="w-6 h-6 fill-current" />
                <span>Play</span>
              </button>
              <button className="flex items-center gap-2 bg-gray-600/80 text-white px-8 py-3 rounded font-semibold text-base md:text-lg hover:bg-gray-600 transition-all backdrop-blur-sm shadow-lg">
                <Info className="w-6 h-6" />
                <span>More Info</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

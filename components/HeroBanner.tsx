'use client';

import Image from 'next/image';
import { Play, Info } from 'lucide-react';
import { Movie } from '@/types/tmdb';
import { getImageUrl } from '@/lib/tmdb';

interface HeroBannerProps {
  movie: Movie;
}

export default function HeroBanner({ movie }: HeroBannerProps) {
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
          sizes="100vw"
          style={{ objectPosition: 'center 20%' }}
        />
        {/* Gradient Overlays */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.95) 80%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, transparent 45%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-end justify-start pb-16 md:pb-24">
        <div className="w-full max-w-[1920px] mx-auto px-0 md:px-12 lg:px-16">
          <div className="max-w-3xl space-y-4 md:space-y-6 text-left">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-2xl leading-tight">
              {movie.title}
            </h1>

            {/* Rating and Year */}
            <div className="flex flex-wrap items-center gap-4 text-base md:text-lg text-white/80">
              <div className="flex items-center gap-2 font-semibold">
                <span className="text-yellow-400 text-xl">★</span>
                <span>{movie.vote_average.toFixed(1)}</span>
              </div>
              <span className="text-gray-300 font-medium">
                {movie.release_date ? new Date(movie.release_date).getFullYear() : '—'}
              </span>
            </div>

            {/* Overview */}
            <p className="text-base md:text-lg text-white/90 leading-relaxed line-clamp-4 max-w-2xl drop-shadow-lg">
              {movie.overview}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-md font-bold text-base md:text-lg hover:bg-white/90 transition-transform shadow-lg hover:scale-105">
                <Play className="w-6 h-6 fill-current" />
                <span>Play</span>
              </button>
              <button className="flex items-center gap-2 bg-gray-600/80 text-white px-8 py-3 rounded-md font-semibold text-base md:text-lg hover:bg-gray-600 transition-colors backdrop-blur-sm shadow-lg">
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

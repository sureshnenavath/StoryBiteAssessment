'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/types/tmdb';
import { getImageUrl } from '@/lib/tmdb';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link
      href={`/movie/${movie.id}`}
      className="group relative flex-shrink-0 cursor-pointer block z-0 group-hover:z-50"
    >
      {/* Container with padding to allow scale without clipping */}
      <div className="p-3">
        <div className="relative w-[160px] md:w-[200px] lg:w-[240px] aspect-[2/3] rounded-md overflow-hidden shadow-xl bg-gray-800 transition-all duration-300 ease-out group-hover:scale-105 group-hover:shadow-2xl group-hover:z-10">
          <Image
            src={getImageUrl(movie.poster_path, 'w500')}
            alt={movie.title}
            fill
            sizes="(max-width: 768px) 160px, (max-width: 1024px) 200px, 240px"
            className="object-cover"
          />
          
          {/* Hover Overlay - appears on hover */}
          {/* Overlay that appears on hover: keep it inside the rounded card but allow room for full title and metadata. */}
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-0 z-20">
            <div className="p-4 w-full space-y-1.5 min-h-[44%] md:min-h-[20%]">
              {/* Show full title on hover if possible; add `title` for accessibility and to show a tooltip on truncation. */}
              <h3 title={movie.title} className="text-white font-bold text-sm md:text-base leading-tight line-clamp-2 md:line-clamp-3 break-words">
                {movie.title}
              </h3>
              <div className="flex items-center gap-2 text-xs md:text-sm">
                <div className="flex items-center gap-1 text-yellow-400 font-semibold">
                  <span>★</span>
                  <span>{movie.vote_average.toFixed(1)}</span>
                </div>
                {movie.release_date && (
                  <span className="text-gray-300">
                    {movie.release_date.split('-')[0]}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
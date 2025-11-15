'use client';

import { useRef, useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import ScrollButtons from './ui/ScrollButtons';
import { Movie } from '@/types/tmdb';
import { useScrollWithButtons } from '@/lib/scrollUtils';

interface MovieRowProps {
  movies: Movie[];
  title: string;
}

export default function MovieRow({ movies, title }: MovieRowProps) {
  const { scrollContainerRef, showLeftButton, showRightButton, scrollLeft, scrollRight } = useScrollWithButtons();

  return (
    <div className="mb-12">
      {/* Category Title */}
      <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
        {title}
      </h2>

      {/* Scrollable Container */}
      <div className="relative overflow-visible">
        <ScrollButtons
          onScrollLeft={scrollLeft}
          onScrollRight={scrollRight}
          showLeft={showLeftButton}
          showRight={showRightButton}
        />

        <div
          ref={scrollContainerRef}
          className="flex gap-2 md:gap-4 overflow-x-scroll overflow-y-hidden scroll-smooth pb-6"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}

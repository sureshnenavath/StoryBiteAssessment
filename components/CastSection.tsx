'use client';

import Image from 'next/image';
import { Cast } from '@/types/tmdb';
import { getImageUrl } from '@/lib/tmdb';
import { User } from 'lucide-react';
import ScrollButtons from './ui/ScrollButtons';
import { useScrollWithButtons } from '@/lib/scrollUtils';

interface CastSectionProps {
  cast: Cast[];
}

export default function CastSection({ cast }: CastSectionProps) {
  const { scrollContainerRef, showLeftButton, showRightButton, scrollLeft, scrollRight } = useScrollWithButtons();

  if (!cast || cast.length === 0) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-white">Cast</h2>
      
      <div className="relative overflow-visible">
        <ScrollButtons
          onScrollLeft={scrollLeft}
          onScrollRight={scrollRight}
          showLeft={showLeftButton}
          showRight={showRightButton}
        />

        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-scroll overflow-y-hidden scroll-smooth pb-4 -mb-4"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
        {cast.map((member) => (
          <div
            key={member.cast_id}
            className="shrink-0 w-32 md:w-36 text-center group cursor-pointer"
          >
            {/* Profile Image */}
            <div className="relative w-32 h-32 md:w-36 md:h-36 mx-auto mb-3 overflow-hidden rounded-full bg-gray-800 group-hover:ring-4 group-hover:ring-white/20 transition-all">
              {member.profile_path ? (
                <Image
                  src={getImageUrl(member.profile_path, 'w185')}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 128px, 144px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-700">
                  <User className="w-12 h-12 text-gray-500" />
                </div>
              )}
            </div>

            {/* Actor Name */}
            <p className="font-semibold text-white text-sm mb-1 line-clamp-2">
              {member.name}
            </p>

            {/* Character Name */}
            <p className="text-gray-400 text-xs line-clamp-2">
              {member.character}
            </p>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}

'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ScrollButtonsProps {
  onScrollLeft: () => void;
  onScrollRight: () => void;
  showLeft: boolean;
  showRight: boolean;
}

export default function ScrollButtons({
  onScrollLeft,
  onScrollRight,
  showLeft,
  showRight,
}: ScrollButtonsProps) {
  return (
    <>
      {/* Left Scroll Button */}
      {showLeft && (
        <button
          onClick={onScrollLeft}
          className="absolute left-0 top-0 bottom-0 z-10 w-12 bg-linear-to-r from-black/80 to-transparent hover:from-black/90 transition-all"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-8 h-8 text-white mx-auto" />
        </button>
      )}

      {/* Right Scroll Button */}
      {showRight && (
        <button
          onClick={onScrollRight}
          className="absolute right-0 top-0 bottom-0 z-10 w-12 bg-linear-to-l from-black/80 to-transparent hover:from-black/90 transition-all"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-8 h-8 text-white mx-auto" />
        </button>
      )}
    </>
  );
}

'use client';

import { useRef, useState, useEffect, useCallback } from 'react';

export function useScrollWithButtons() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const updateButtonVisibility = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  useEffect(() => {
    updateButtonVisibility();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', updateButtonVisibility);
      window.addEventListener('resize', updateButtonVisibility);
      return () => {
        container.removeEventListener('scroll', updateButtonVisibility);
        window.removeEventListener('resize', updateButtonVisibility);
      };
    }
  }, [updateButtonVisibility]);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      const targetScroll =
        direction === 'left'
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth',
      });
    }
  }, []);

  return {
    scrollContainerRef,
    showLeftButton,
    showRightButton,
    scrollLeft: () => scroll('left'),
    scrollRight: () => scroll('right'),
  };
}
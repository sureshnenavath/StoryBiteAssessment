'use client'

import MovieCard from './MovieCard'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'

type MovieSummary = { imdbID: string; Title: string; Poster?: string | null }
type ExpandedData = { movie: MovieSummary; rect: DOMRect }

export default function MovieRow({ movies, categoryTitle }: { movies: MovieSummary[]; categoryTitle: string }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState<ExpandedData | null>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 group animate-slideIn">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white via-red-100 to-red-300 bg-clip-text text-transparent drop-shadow-lg tracking-tight">{categoryTitle}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 hover:border-red-500 transition-all duration-300 hover:scale-110 backdrop-blur z-10"
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 hover:border-red-500 transition-all duration-300 hover:scale-110 backdrop-blur z-10"
            aria-label="Scroll right"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="relative group/scroll">
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-red-600/90 text-white p-3 rounded-full opacity-0 group-hover/scroll:opacity-100 transition-all duration-300 hover:scale-110 shadow-xl backdrop-blur-sm border border-white/20"
          aria-label="Scroll left"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div 
          ref={scrollContainerRef}
          className="flex gap-3 sm:gap-4 lg:gap-5 overflow-x-auto scrollbar-hide pb-6 snap-x snap-mandatory scroll-smooth"
        >
          {movies.length === 0 && <p className="text-gray-400 animate-pulse">No movies available</p>}
          {movies.map((m, index) => (
            <div
              key={m.imdbID}
              className="snap-start animate-fadeIn flex-shrink-0"
              style={{ animationDelay: `${index * 0.05}s` }}
              onMouseEnter={(e) => {
                const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
                setExpanded({ movie: m, rect })
              }}
            >
              <MovieCard imdbId={m.imdbID} title={m.Title} posterUrl={m.Poster || null} />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-red-600/90 text-white p-3 rounded-full opacity-0 group-hover/scroll:opacity-100 transition-all duration-300 hover:scale-110 shadow-xl backdrop-blur-sm border border-white/20"
          aria-label="Scroll right"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        {expanded && (
          <ExpandedOverlay data={expanded} onClose={() => setExpanded(null)} />
        )}
      </div>
    </section>
  )
}

function ExpandedOverlay({ data, onClose }: { data: ExpandedData; onClose: () => void }) {
  const { movie, rect } = data
  const cardRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  useLayoutEffect(() => {
    if (!cardRef.current || !backdropRef.current) return
    const targetWidth = Math.min(window.innerWidth * 0.9, 1280)
    const targetHeight = targetWidth * 9/16
    const finalX = (window.innerWidth - targetWidth) / 2
    const finalY = (window.innerHeight - targetHeight) / 2
    const scaleX = rect.width / targetWidth
    const scaleY = rect.height / targetHeight
    const translateX = rect.left - finalX
    const translateY = rect.top - finalY

    const el = cardRef.current
    el.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`
    el.style.opacity = '0.6'
    backdropRef.current.style.opacity = '0'

    requestAnimationFrame(() => {
      el.style.transition = 'transform 450ms cubic-bezier(0.4,0.0,0.2,1), opacity 450ms'
      if (backdropRef.current) {
        backdropRef.current.style.transition = 'opacity 450ms'
        backdropRef.current.style.opacity = '1'
      }
      el.style.transform = 'translate(0px, 0px) scale(1,1)'
      el.style.opacity = '1'
    })
  }, [rect])

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      onMouseLeave={onClose}
    >
      <div
        ref={cardRef}
        className="relative w-[90vw] max-w-[1280px] aspect-video bg-gradient-to-br from-neutral-800 via-neutral-900 to-black rounded-xl shadow-2xl overflow-hidden group transform-gpu"
        onClick={(e) => e.stopPropagation()}
      >
        {movie.Poster && movie.Poster !== 'N/A' && (
          <Image
            src={movie.Poster}
            alt={movie.Title}
            fill
            sizes="90vw"
            className="object-cover object-center opacity-60 group-hover:opacity-70 transition-opacity duration-500"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 p-6 flex flex-col justify-end gap-4">
          <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-red-200 to-red-400 text-transparent bg-clip-text drop-shadow-lg">
            {movie.Title}
          </h3>
          <div className="flex gap-3">
            <button
              className="px-5 py-2.5 rounded-md bg-white text-black font-semibold flex items-center gap-2 hover:bg-gray-200 hover:scale-105 transition-all shadow-lg"
              aria-label="Play"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              Play
            </button>
            <button
              className="px-5 py-2.5 rounded-md bg-red-600 text-white font-semibold flex items-center gap-2 hover:bg-red-500 hover:scale-105 transition-all shadow-lg"
              aria-label="Details"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              Details
            </button>
            <button
              onClick={onClose}
              className="ml-auto px-4 py-2 rounded-md bg-black/60 border border-white/20 text-white hover:bg-black/80 hover:border-red-500 transition-all"
              aria-label="Close"
            >
              Close (Esc)
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

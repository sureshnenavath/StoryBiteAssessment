'use client';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-800 border-t-red-600 rounded-full animate-spin"></div>
        <div className="mt-4 text-center text-gray-400">Loading...</div>
      </div>
    </div>
  );
}

export function MovieCardSkeleton() {
  return (
    <div className="shrink-0 w-[150px] md:w-[180px] lg:w-[200px]">
      <div className="aspect-2/3 bg-gray-800 rounded-md animate-pulse"></div>
    </div>
  );
}

export function MovieRowSkeleton() {
  return (
    <div className="mb-8 px-0 md:px-8 lg:px-16">
      <div className="h-8 w-48 bg-gray-800 rounded mb-4 animate-pulse"></div>
      <div className="flex gap-4 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

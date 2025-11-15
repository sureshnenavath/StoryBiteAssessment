export default function Loading() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section Skeleton */}
      <div className="relative h-[60vh] md:h-[80vh] w-full bg-gray-900 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <div className="relative h-full flex items-end pb-20 md:pb-32 px-4 md:px-12 lg:px-16">
          <div className="flex flex-col md:flex-row gap-8 w-full max-w-7xl">
            {/* Poster Skeleton */}
            <div className="flex-shrink-0 w-[200px] md:w-[300px] aspect-[2/3] bg-gray-800 rounded-lg animate-pulse" />
            
            {/* Info Skeleton */}
            <div className="flex-1 space-y-4">
              {/* Title */}
              <div className="h-12 md:h-16 bg-gray-800 rounded w-3/4 animate-pulse" />
              
              {/* Tagline */}
              <div className="h-6 bg-gray-800 rounded w-1/2 animate-pulse" />
              
              {/* Meta */}
              <div className="flex gap-4">
                <div className="h-6 w-20 bg-gray-800 rounded animate-pulse" />
                <div className="h-6 w-20 bg-gray-800 rounded animate-pulse" />
                <div className="h-6 w-24 bg-gray-800 rounded animate-pulse" />
              </div>
              
              {/* Genres */}
              <div className="flex gap-2">
                <div className="h-8 w-20 bg-gray-800 rounded-full animate-pulse" />
                <div className="h-8 w-24 bg-gray-800 rounded-full animate-pulse" />
                <div className="h-8 w-20 bg-gray-800 rounded-full animate-pulse" />
              </div>
              
              {/* Overview */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-800 rounded animate-pulse" />
                <div className="h-4 bg-gray-800 rounded animate-pulse" />
                <div className="h-4 bg-gray-800 rounded w-3/4 animate-pulse" />
              </div>
              
              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <div className="h-12 w-32 bg-gray-800 rounded animate-pulse" />
                <div className="h-12 w-40 bg-gray-800 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cast Section Skeleton */}
      <div className="px-4 md:px-12 lg:px-16 py-8">
        <div className="h-8 w-32 bg-gray-800 rounded mb-6 animate-pulse" />
        <div className="flex gap-4 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex-shrink-0">
              <div className="w-32 h-32 bg-gray-800 rounded-full mb-2 animate-pulse" />
              <div className="h-4 bg-gray-800 rounded w-28 mb-1 animate-pulse" />
              <div className="h-3 bg-gray-800 rounded w-24 animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* Similar Movies Skeleton */}
      <div className="px-4 md:px-12 lg:px-16 pb-20">
        <div className="h-8 w-48 bg-gray-800 rounded mb-6 animate-pulse" />
        <div className="flex gap-4 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-[160px] md:w-[200px] lg:w-[240px] aspect-[2/3] bg-gray-800 rounded-md animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}

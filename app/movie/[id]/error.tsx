'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, Home, RotateCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Movie detail error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <AlertCircle className="w-20 h-20 text-red-600 mx-auto mb-6" />
        
        <h1 className="text-4xl font-bold text-white mb-4">
          Oops! Something Went Wrong
        </h1>
        
        <p className="text-gray-400 text-lg mb-8">
          We couldn't load this movie. It might not exist or there was a problem fetching the details.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded font-semibold hover:bg-gray-200 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </button>
          
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-gray-600/80 text-white px-6 py-3 rounded font-semibold hover:bg-gray-600 transition-colors"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

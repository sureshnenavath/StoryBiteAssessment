'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4 text-center text-white">
      <p className="text-sm uppercase tracking-[0.3em] text-red-500">StreamHub</p>
      <h1 className="mt-2 text-4xl font-bold">Something went wrong.</h1>
      <p className="mt-4 max-w-xl text-gray-400">
        {error?.message || 'We couldn\'t load the content right now.'}
      </p>
      <button
        onClick={() => reset()}
        className="mt-8 rounded-full bg-red-600 px-8 py-3 text-base font-semibold text-white transition hover:bg-red-500"
      >
        Try Again
      </button>
    </div>
  );
}

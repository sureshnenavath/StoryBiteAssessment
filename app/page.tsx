import HeroBanner from '@/components/HeroBanner';
import MovieRow from '@/components/MovieRow';
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
} from '@/lib/tmdb';

export default async function Home() {
  try {
    const [popularData, topRatedData, upcomingData, nowPlayingData] = await Promise.all([
      getPopularMovies(),
      getTopRatedMovies(),
      getUpcomingMovies(),
      getNowPlayingMovies(),
    ]);

    const heroMovie = popularData.results[0];

    return (
      <main className="min-h-screen bg-black">
        {heroMovie && <HeroBanner movie={heroMovie} />}

        <section className="relative z-10 -mt-16 space-y-10 pb-20">
          <div className="w-full mx-auto px-0 md:px-12 lg:px-16 space-y-10">
            <MovieRow title="Popular on StreamHub" movies={popularData.results} />
            <MovieRow title="Top Rated" movies={topRatedData.results} />
            <MovieRow title="Coming Soon" movies={upcomingData.results} />
            <MovieRow title="Now Playing" movies={nowPlayingData.results} />
          </div>
        </section>
      </main>
    );
  } catch (error) {
    console.error('Error fetching movies:', error);
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Oops! Something went wrong</h1>
          <p className="text-gray-400 mb-8">
            We couldn&apos;t load the movies. Please check your API key and try again.
          </p>
          <p className="text-sm text-gray-500">
            Make sure `TMDB_API_KEY` is set in your `.env.local` file
          </p>
        </div>
      </main>
    );
  }
}

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMovieDetails, getSimilarMovies, getImageUrl } from '@/lib/tmdb';
import MovieDetails from '@/components/MovieDetails';
import CastSection from '@/components/CastSection';
import MovieRow from '@/components/MovieRow';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params;
    const movie = await getMovieDetails(parseInt(id));
    
    return {
      title: `${movie.title} - StreamHub`,
      description: movie.overview,
      openGraph: {
        title: movie.title,
        description: movie.overview,
        images: [getImageUrl(movie.backdrop_path, 'original')],
      },
    };
  } catch (error) {
    return {
      title: 'Movie Not Found - StreamHub',
    };
  }
}

export default async function MovieDetailPage({ params }: Props) {
  try {
    const { id } = await params;
    const movieId = parseInt(id);
    
    // Fetch movie details and similar movies in parallel
    const [movieData, similarData] = await Promise.all([
      getMovieDetails(movieId),
      getSimilarMovies(movieId),
    ]);

    // Extract credits from the append_to_response
    const credits = (movieData as any).credits;

    return (
      <div className="min-h-screen bg-black">
        {/* Movie Details Hero */}
        <MovieDetails movie={movieData} />

        {/* Cast Section */}
        {credits?.cast && credits.cast.length > 0 && (
          <div className="px-6 md:px-12 lg:px-16 py-8">
            <CastSection cast={credits.cast.slice(0, 12)} />
          </div>
        )}

        {/* Similar Movies */}
        {similarData.results.length > 0 && (
          <div className="pb-20">
            <MovieRow title="More Like This" movies={similarData.results} />
          </div>
        )}
      </div>
    );
  } catch (error) {
    notFound();
  }
}


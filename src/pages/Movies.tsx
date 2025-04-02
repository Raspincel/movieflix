import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import LoadingPage from '../components/layout/Loading';
import ErrorPage from '../components/layout/Error';
import { useEffect, useState } from 'react';
import Pagination from '../components/search/Pagination';
import { useTranslation } from '../hooks/useTranslation';
import MovieCard from '../components/movie/MovieCard';
import { useSearchParams } from 'react-router-dom';
import { Movie } from '../types/movie';
import { MOVIES_PER_PAGE } from '../utils/constants';

interface Props {
  title: string;
  useGetMovies: (data: { page: number }) => {
    movies: Movie[];
    isError: boolean;
    isLoading: boolean;
    totalPages: number;
    totalResults: number;
  }
}

const MoviesPage = ({ useGetMovies, title }: Props) => {
  const [params, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(params.get('page')) || 1);

  const { t } = useTranslation();
  const { isError, isLoading, movies, totalPages, totalResults } = useGetMovies({ page });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [])

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  // Calcula o intervalo de resultados exibidos
  const from = MOVIES_PER_PAGE * (page - 1) + 1;
  const to = MOVIES_PER_PAGE * (page - 1) + movies.length;

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setPage(page);
      setSearchParams({ page: page.toString() });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <Header />
      <main className="container mx-auto px-4">
        <h2 className="mt-4 text-2xl font-bold">{title}</h2>
        <div className="mt-6 pb-16">
          <div className="text-gray-300 mb-4">
            {movies.length === 0
              ? t('search.notFound')
              : t('search.resultsCount')
                  .replace('{from}', from.toString())
                  .replace('{to}', to.toString())
                  .replace('{total}', `${totalResults}`)}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          <Pagination currentPage={page} totalPages={totalPages} goToPage={goToPage} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MoviesPage;

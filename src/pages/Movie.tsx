import { useParams } from 'react-router-dom';
import useFetchMovie from '../hooks/useFetchMovie';
import Header from '../components/layout/Header';
import BehindTheScenes from '../components/movie/BehindTheScenes';
import AboutTheMovie from '../components/movie/AboutTheMovie';
import SimilarMovie from '../components/movie/SimilarMovie';
import LoadingPage from '../components/layout/Loading';
import ErrorPage from '../components/layout/Error';
import NotFoundPage from '../components/layout/NotFound';
import { useTranslation } from '../hooks/useTranslation';

// Página que exibe informações sobre um filme específico
const MoviePage = () => {
  const { id } = useParams();
  const { isError, isLoading, movie } = useFetchMovie(Number(id));
  const { t } = useTranslation();

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  if (!movie) {
    return <NotFoundPage message={t('movie.notFound')} />;
  }

  return (
    <>
      <Header transparent />
      <div className="min-h-screen bg-gray-900 text-white">
        <AboutTheMovie movie={movie} />
        <BehindTheScenes movie={movie} />
        <SimilarMovie id={movie.id} />
      </div>
    </>
  );
};

export default MoviePage;

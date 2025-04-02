import MovieDetails from './pages/Movie';
import Home from './pages/Home';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MoviesPage from './pages/Movies';
import NotFoundPage from './components/layout/NotFound';
import { useTranslation } from './hooks/useTranslation';
import CategoryMoviesPage from './pages/Category';
import usePopularMovies from './hooks/usePopularMovies';
import useTopRatedMovies from './hooks/useTopRatedMovies';
function App() {
  const { t } = useTranslation();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filme/:id" element={<MovieDetails />} />
        <Route path="/categoria/populares" element={<MoviesPage useGetMovies={usePopularMovies} title={t('movies.popular')}/>} />
        <Route path="/categoria/melhores" element={<MoviesPage useGetMovies={useTopRatedMovies} title={t('movies.topRated')} />} />
        <Route path="/categoria/:genreId" element={<CategoryMoviesPage />} />
        <Route path="*" element={<NotFoundPage message={t('pageNotFound')} />} />
      </Routes>
    </Router>
  );
}

export default App;

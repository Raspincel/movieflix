import MovieDetails from './pages/Movie';
import Home from './pages/Home';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PopularMoviesPage from './pages/Popular';
import NotFoundPage from './components/layout/NotFound';
import { useTranslation } from './hooks/useTranslation';
import CategoryMoviesPage from './pages/Category';
function App() {
  const { t } = useTranslation();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filme/:id" element={<MovieDetails />} />
        <Route path="/categoria/popular" element={<PopularMoviesPage />} />
        <Route path="/categoria/:genreId" element={<CategoryMoviesPage />} />
        <Route path="*" element={<NotFoundPage message={t('pageNotFound')} />} />
      </Routes>
    </Router>
  );
}

export default App;

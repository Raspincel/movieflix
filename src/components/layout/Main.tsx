import usePopularMovies from '../../hooks/usePopularMovies';
import useTopRatedMovies from '../../hooks/useTopRatedMovies';
import { useTranslation } from '../../hooks/useTranslation';
import BrowseCategories from '../movies/BrowseCategories';
import CategoriesList from '../movies/CategoriesList';
import CategorySection from '../movies/CategorySection';

const Main = () => {
  const { t } = useTranslation();

  return (
    <>
      <BrowseCategories />
      <CategorySection id="populares" fetchMovies={() => usePopularMovies({ page: 1 })} title={t('home.popular')} />
      <CategorySection id="melhores" fetchMovies={() => useTopRatedMovies({ page: 1 })} title={t('home.theBest')} />
      <CategoriesList />
    </>
  );
};

export default Main;

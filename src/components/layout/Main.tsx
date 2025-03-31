import usePopularMovies from '../../hooks/usePopularMovies';
import { useTranslation } from '../../hooks/useTranslation';
import BrowseCategories from '../movies/BrowseCategories';
import CategoriesList from '../movies/CategoriesList';
import CategorySection from '../movies/CategorySection';

const Main = () => {
  const { t } = useTranslation();

  return (
    <>
      <BrowseCategories />
      <CategorySection id="Popular" fetchMovies={() => usePopularMovies({ page: 1 })} title={t('home.theBest')} />
      <CategoriesList />
    </>
  );
};

export default Main;

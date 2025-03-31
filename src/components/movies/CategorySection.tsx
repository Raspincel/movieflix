import { Link } from 'react-router-dom';
import MoviesCarousel from './MoviesCarousel';
import { useTranslation } from '../../hooks/useTranslation';

interface Props {
  fetchMovies: () => any;
  title: string;
  id: string | number;
}

const CategorySection = ({ fetchMovies, title, id }: Props) => {
  const { t } = useTranslation();

  return (
    <section className="bg-gray-900 mb-8" id={title}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <h2 className="text-3xl font-bold">{title}</h2>
          <Link to={`/categoria/${id}`} className="text-gray-400 hidden sm:block hover:text-gray-300 transition-colors">
            {t('home.seeAll')}
          </Link>
        </div>
        <MoviesCarousel fetchMovies={fetchMovies} />
        <Link to={`/categoria/${id}`} className="text-gray-400 sm:hidden hover:text-gray-300 transition-colors">
          {t('home.seeAll')}
        </Link>
      </div>
    </section>
  );
};

export default CategorySection;

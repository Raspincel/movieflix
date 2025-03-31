import { useQuery } from '@tanstack/react-query';
import { genresApi } from '../../api/genresApi';
import { useTranslation } from '../../hooks/useTranslation';

const BrowseCategories = () => {
  const { t } = useTranslation();

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryFn: genresApi.getGenres,
    queryKey: ['genres'],
  });

  if (isLoading || isError || !isSuccess) {
    return null;
  }

  return (
    <section className="py-8 bg-gray-900" id="Gêneros">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">{t('home.genres')}</h2>
        <div className="flex flex-wrap gap-4">
          {data.genres.map(({ id, name }) => (
            <a
              key={id}
              href={`#${name}`}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              {name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseCategories;

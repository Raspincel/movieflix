import { useTranslation } from '../../hooks/useTranslation';

interface Props {
  director?: string;
  budget: string;
  revenue: string;
}

const MovieDetails = ({ budget, director, revenue }: Props) => {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center md:text-start">{t('movie.details.title')}</h2>
      <div className="space-y-4">
        <div className="flex justify-between border-b border-gray-700 pb-2">
          <span>{t('movie.details.director')}</span>
          <span className="text-gray-300">{director}</span>
        </div>
        <div className="flex justify-between border-b border-gray-700 pb-2">
          <span>{t('movie.details.budget')}</span>
          <span className="text-gray-300">{budget}</span>
        </div>
        <div className="flex justify-between border-b border-gray-700 pb-2">
          <span>{t('movie.details.revenue')}</span>
          <span className="text-gray-300">{revenue}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

import { useTranslation } from '../../hooks/useTranslation';
import { DetailedMovie } from '../../types/movie';
import { User2Icon } from 'lucide-react';
interface Props {
  cast: DetailedMovie['cast'];
}

const MovieCast = ({ cast }: Props) => {
  const { t } = useTranslation();

  if (!cast.length) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center md:text-start">{t('movie.cast')}</h2>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4 justify-center">
        {cast.map((actor, index) => (
          <li key={index} className="flex flex-col items-center gap-3 ">
            <span className="font-bold">{actor.name}</span>
            {actor.picture ? (
              <img src={actor.picture} alt={actor.name} className="w-20 h-20 rounded-full object-cover" />
            ) : (
              <span className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center">
                <User2Icon />
              </span>
            )}
            <span className="text-gray-300 text-sm text-center">{actor.character}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;

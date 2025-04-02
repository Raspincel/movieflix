import { useState } from 'react';
import useSimilar from '../../hooks/useSimilar';
import MoviesCarousel from '../movies/MoviesCarousel';
import { useTranslation } from '../../hooks/useTranslation';

interface Props {
  id: number;
}

// Seção de filmes similares ao filme atual
const SimilarMovie = ({ id }: Props) => {
  const [show, setShow] = useState(true);
  const { t } = useTranslation();

  if (!show) return null;

  return (
    <div className="flex flex-col items-center mt-10">
      <h3 className="text-2xl font-bold">{t('movie.similar')}</h3>
      <MoviesCarousel fetchMovies={() => useSimilar(id)} onEmpty={() => setShow(false)} />
    </div>
  );
};

export default SimilarMovie;

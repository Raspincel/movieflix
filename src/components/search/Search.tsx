import { useState, useRef, useEffect } from 'react';
import SearchInput from './Input';
import Pagination from './Pagination';
import useQueryMovies from '../../hooks/useQueryMovies';
import MovieCard from '../movie/MovieCard';
import { useTranslation } from '../../hooks/useTranslation';
import { MOVIES_PER_PAGE } from '../../utils/constants';

interface Props {
  transparent?: boolean;
}

// Barra de busca. Quando recebe foco, expande-se para exibir os resultados da busca
const SearchBar = ({ transparent }: Props) => {
  const { t } = useTranslation();

  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const { isError, isLoading, movies, totalPages, totalResults } = useQueryMovies({
    query: searchQuery,
    page: currentPage,
  });

  const handleClose = () => {
    setCurrentPage(1);
    setIsExpanded(false);
  };

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (isExpanded) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isExpanded]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Calcula o intervalo de resultados exibidos
  const from = MOVIES_PER_PAGE * (currentPage - 1) + 1;
  const to = MOVIES_PER_PAGE * (currentPage - 1) + movies.length;

  return (
    <div className="relative z-[1001] w-full h-10 max-w-96" ref={searchContainerRef}>
      <div
        className={`absolute top-0 left-0 w-full overflow-auto motion-reduce:transition-none ease-in-out ${
          isExpanded ? 'fixed transition-all duration-300 h-screen bg-gray-900/95' : 'h-16'
        } ${transparent && !isExpanded && 'opacity-70'}`}
      >
        <div
          className={`w-full ease-in-out ${
            isExpanded && 'px-4 py-8 md:py-12 max-w-screen-lg mx-auto transition-all duration-300'
          }`}
        >
          <SearchInput
            isLoading={isLoading}
            onClose={handleClose}
            onFocus={handleFocus}
            onChange={handleSearchChange}
            isExpanded={isExpanded}
            searchQuery={searchQuery}
          />

          {isExpanded && isError && (
            <div className="text-center mt-6 text-red-500 text-xl font-bold">{t('search.error')}</div>
          )}
          {isExpanded && !isError && (
            <div className="mt-6 pb-16">
              <div className="text-gray-300 mb-4">
                {movies.length === 0
                  ? t('search.notFound')
                  : t('search.resultsCount')
                      .replace('{from}', from.toString())
                      .replace('{to}', to.toString())
                      .replace('{total}', `${totalResults}`)}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>

              <Pagination currentPage={currentPage} totalPages={totalPages} goToPage={goToPage} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

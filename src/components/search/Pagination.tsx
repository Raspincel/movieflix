import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

interface Props {
  totalPages: number;
  currentPage: number;
  goToPage: (page: number) => void;
}

const Pagination = ({ currentPage, goToPage, totalPages }: Props) => {
  const { t } = useTranslation();

  if (totalPages <= 1) return null;

  const getPaginationItems = () => {
    const items = [];
    const maxPagesToShow = 5;

    // A seguir, o algoritmo para decidir quais páginas devem ser mostradas na paginação

    // Se a busca resultou em poucas páginas, mostra todas
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }

      // Apesar de items ser incondicionalmente retornado mais à frente,
      // Retornamos logo para não precisar aninhar o restante do código em um `else`
      return items
    }

    // Sempre exibe a primeira e a última página
    const firstPage = 1;
    const lastPage = totalPages;

    items.push(firstPage);

    // Exibe uma página antes e uma página depois da página atual
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(lastPage - 1, currentPage + 1);

    if (currentPage <= 2) {
      // Se a página atual for a primeira ou a segunda, exibe as 4 primeiras páginas
      endPage = Math.min(lastPage - 1, 4);
    } else if (currentPage >= lastPage - 1) {
      // Se a página atual for a penúltima ou a última, exibe as 4 últimas páginas
      startPage = Math.max(2, lastPage - 3);
    }

    // Se tiver mais de 2 páginas entre a primeira e a página atual, exibe um "..."
    if (startPage > 2) {
      items.push('ellipsis-start');
    }

    // Adiciona as páginas ao redor da página atual e a própria página atual
    for (let i = startPage; i <= endPage; i++) {
      items.push(i);
    }

    // Se tiver mais de 2 páginas entre a última e a página atual, exibe um "..."
    if (endPage < lastPage - 1) {
      items.push('ellipsis-end');
    }

    // Adiciona a última página
    if (lastPage !== firstPage) {
      items.push(lastPage);
    }

    return items;
  };

  return (
    <div className="flex justify-center mt-8">
      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-700 bg-gray-800 text-sm font-medium ${
            currentPage === 1 ? 'text-gray-500 cursor-not-allowed' : 'text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer'
          }`}
        >
          <span className="sr-only">{t('search.previous')}</span>
          <ArrowLeft className="w-5 h-5" />
        </button>

        {getPaginationItems().map((item, index) => {
          if (item === 'ellipsis-start' || item === 'ellipsis-end') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="relative inline-flex items-center px-4 py-2 border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 select-none"
              >
                ...
              </span>
            );
          }

          const page = item as number;
          return (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer ${
                currentPage === page
                  ? 'z-10 bg-red-600 border-red-600 text-white'
                  : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-700 bg-gray-800 text-sm font-medium ${
            currentPage === totalPages
              ? 'text-gray-500 cursor-not-allowed'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer'
          }`}
        >
          <span className="sr-only">{t('search.next')}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;

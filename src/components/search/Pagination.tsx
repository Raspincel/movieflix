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

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      const firstPage = 1;
      const lastPage = totalPages;

      items.push(firstPage);

      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(lastPage - 1, currentPage + 1);

      if (currentPage <= 2) {
        endPage = Math.min(lastPage - 1, 4);
      } else if (currentPage >= lastPage - 1) {
        startPage = Math.max(2, lastPage - 3);
      }

      if (startPage > 2) {
        items.push('ellipsis-start');
      }

      for (let i = startPage; i <= endPage; i++) {
        items.push(i);
      }

      if (endPage < lastPage - 1) {
        items.push('ellipsis-end');
      }

      if (lastPage !== firstPage) {
        items.push(lastPage);
      }
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

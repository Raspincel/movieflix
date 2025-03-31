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
            currentPage === 1 ? 'text-gray-500 cursor-not-allowed' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
        >
          <span className="sr-only">{t('search.previous')}</span>
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {getPaginationItems().map((item, index) => {
          if (item === 'ellipsis-start' || item === 'ellipsis-end') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="relative inline-flex items-center px-4 py-2 border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400"
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
              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
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
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
        >
          <span className="sr-only">{t('search.next')}</span>
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </nav>
    </div>
  );
};

export default Pagination;

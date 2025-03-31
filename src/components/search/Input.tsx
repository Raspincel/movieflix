import { X, LoaderIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useTranslation } from '../../hooks/useTranslation';

interface Props {
  searchQuery: string;
  isExpanded: boolean;
  isLoading: boolean;
  onChange: (value: string) => void;
  onFocus: () => void;
  onClose: () => void;
}

const SearchInput = ({ isExpanded, onFocus, searchQuery, onClose, onChange, isLoading }: Props) => {
  const { t } = useTranslation();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    onChange('');
    onClose();

    if (!searchInputRef.current) return;
    searchInputRef.current.value = '';
    searchInputRef.current.blur();
  };

  useEffect(() => {
    if (isExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }

    const removeFocus = (e: KeyboardEvent) => {
      if (searchInputRef.current && e.key === 'Escape') {
        handleClose();
      }
    };

    document.body.addEventListener('keydown', removeFocus);

    return () => {
      document.body.removeEventListener('keydown', removeFocus);
    };
  }, [isExpanded, searchInputRef, handleClose]);

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <svg
          className="w-5 h-5 text-red-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {isLoading ? (
        <LoaderIcon
          className={`absolute top-1/2 -translate-y-1/2 right-2 text-red-500 hover:text-red-700 transition-all duration-300 cursor-pointer hidden ${isExpanded && 'block!'} animate-spin`}
          onClick={handleClose}
        />
      ) : (
        <X
          size={48}
          className={`absolute top-1/2 -translate-y-1/2 right-2 text-red-500 hover:text-red-700 transition-all duration-300 cursor-pointer hidden ${isExpanded && 'block!'}`}
          onClick={handleClose}
        />
      )}

      <input
        ref={searchInputRef}
        type="text"
        className={`block md:ml-auto pl-10 pr-4 w-full py-2 border-2 border-red-600 focus:border-red-500 focus:ring-2 focus:ring-red-500 
        focus:outline-none rounded-lg text-gray-100 bg-gray-800 placeholder-gray-400 ease-in-out ${
          isExpanded ? 'text-xl md:text-2xl ml-0 py-3 md:py-4 transition-all duration-300' : 'text-sm'
        }`}
        placeholder={t('search.placeholder')}
        value={searchQuery}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
      />
    </div>
  );
};

export default SearchInput;

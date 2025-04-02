import { useLanguage } from '../../hooks/useLanguage';

interface Props {
  transparent?: boolean;
}

// Componente que exibe um botão para alternar entre os idiomas
export const LanguageSwitcher = ({ transparent }: Props) => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center gap-2 px-4 py-2 text-sm w-30 cursor-pointer justify-center font-medium text-gray-700 ${transparent ? 'sm:bg-gray-300/40 bg-gray-300/60' : 'bg-gray-300'} hover:bg-gray-50 rounded-md transition-colors`}
    >
      {language === 'en-US' ? '🇺🇸' : '🇧🇷'}
      <span>{language === 'en-US' ? 'English' : 'Português'}</span>
    </button>
  );
};

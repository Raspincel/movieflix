import { Link } from 'react-router-dom';
import SearchBar from '../search/Search';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { useTranslation } from '../../hooks/useTranslation';

interface Props {
  transparent?: boolean;
}

const Header = ({ transparent }: Props) => {
  const { t } = useTranslation();

  return (
    <header className={`${transparent ? 'absolute top-0 right-0 left-0 z-20' : 'bg-black shadow-lg'}`}>
      <div className="container mx-auto md:gap-10 gap-2 px-4 py-4 flex flex-col md:flex-row items-center justify-between">
        <Link to="/">
          <span className="text-red-600 text-3xl font-bold">{t('appTitle')}</span>
        </Link>
        <SearchBar transparent={transparent} />
        <LanguageSwitcher transparent={transparent} />
      </div>
    </header>
  );
};

export default Header;

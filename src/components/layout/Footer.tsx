import { useTranslation } from '../../hooks/useTranslation';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="mt-auto bg-black py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-around max-sm:text-center">
          <div>
            <h3 className="text-xl font-bold mb-4 text-red-500">{t('appTitle')}</h3>
            <p className="text-gray-400">{t('footer.message')}</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">{t('footer.quickLinks.title')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-red-500 transition-colors">
                  {t('footer.quickLinks.links.home')}
                </a>
              </li>
              <li>
                <a href="#Gêneros" className="hover:text-red-500 transition-colors">
                  {t('footer.quickLinks.links.genres')}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>{t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import Header from './Header';
import Footer from './Footer';
import { useTranslation } from '../../hooks/useTranslation';

const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <Header />
      <h2 className="text-4xl text-center mt-20">{t('errorPage')}</h2>
      <Footer />
    </div>
  );
};

export default ErrorPage;

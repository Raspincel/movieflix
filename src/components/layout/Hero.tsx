import { useTranslation } from '../../hooks/useTranslation';

// Seção de destaque da página inicial
const Hero = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-gradient-to-r from-black to-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-4 py-16 flex flex-col items-start relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{t('hero.title')}</h1>
        <p className="text-xl mb-8 max-w-2xl">{t('hero.subtitle')}</p>
        <a href="#Gêneros">
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors cursor-pointer">
            {t('hero.button')}
          </button>
        </a>
      </div>
      <div className="absolute inset-0 opacity-30 bg-cover bg-center" style={{ backgroundColor: '#000' }}></div>
    </section>
  );
};

export default Hero;

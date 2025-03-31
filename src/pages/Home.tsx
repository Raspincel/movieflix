import Hero from '../components/layout/Hero';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Main from '../components/layout/Main';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <Header />
      <Hero />
      <Main />
      <Footer />
    </div>
  );
};

export default HomePage;

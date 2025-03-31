import Header from './Header';
import Footer from './Footer';
import { LoaderCircleIcon } from 'lucide-react';

const LoadingPage = () => {
  return (
    <div className="flex h-screen flex-col bg-gray-900 text-gray-100">
      <Header />
      <div className="h-full">
        <LoaderCircleIcon className="w-16 h-16 text-white animate-spin mx-auto mt-20" />
      </div>
      <Footer />
    </div>
  );
};

export default LoadingPage;

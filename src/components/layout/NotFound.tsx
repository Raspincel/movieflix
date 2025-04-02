import Header from './Header';
import Footer from './Footer';

interface Props {
  message: string;
}

// Página exibida quando o livro ou URL acessada não existe
const NotFoundPage = ({ message }: Props) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <Header />
      <h2 className="text-4xl text-center mt-20">{message}</h2>
      <Footer />
    </div>
  );
};

export default NotFoundPage;

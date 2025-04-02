import { createContext, useState, useEffect, ReactNode } from 'react';
import { queryClient } from '../main';

export type Language = 'en-US' | 'pt-BR';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provedor de contexto de idioma. Salva o idiona selecionado no localStorage e propaga a mudança para toda a aplicação
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => localStorage.getItem('mytia-movie-app-language') === 'en-US' ? 'en-US' : 'pt-BR');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en-US' ? 'pt-BR' : 'en-US'));
    queryClient.refetchQueries();
  };

  useEffect(() => {
    localStorage.setItem('mytia-movie-app-language', language);
  }, [language]);

  return <LanguageContext.Provider value={{ language, toggleLanguage }}>{children}</LanguageContext.Provider>;
};

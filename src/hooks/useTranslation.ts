import { Language } from '../contexts/LanguageContext';
import { useLanguage } from './useLanguage';

interface TranslationStructure {
  appTitle: string;
  pageNotFound: string;
  errorPage: string;
  categoryPage: string;
  popularMovies: string;
  hero: {
    title: string;
    subtitle: string;
    button: string;
  };
  search: {
    placeholder: string;
    notFound: string;
    resultsCount: string;
    error: string;
    next: string;
    previous: string;
  };
  home: {
    theBest: string;
    genres: string;
    seeAll: string;
    carouselError: string;
  };
  footer: {
    message: string;
    quickLinks: {
      title: string;
      links: {
        home: string;
        genres: string;
      };
    };
    rights: string;
  };
  movie: {
    similar: string;
    cast: string;
    notFound: string;
    descriptionNotFound: string;
    details: {
      title: string;
      director: string;
      budget: string;
      revenue: string;
    };
  };
}

type Translations = {
  [key in Language]: TranslationStructure;
};

const translations = {
  'en-US': {
    appTitle: 'MovieFlix',
    categoryPage: '{category} movies',
    pageNotFound: 'Page not found',
    errorPage: 'An error occurred',
    popularMovies: 'Popular movies',
    hero: {
      title: 'Discover amazing movies',
      subtitle: 'Find your next favorite movie in our vast collection of classics and new releases.',
      button: 'Explore now',
    },
    home: {
      theBest: 'The best of all time',
      genres: 'Movies genres:',
      seeAll: 'See all',
      carouselError: 'An error occurred while fetching movies',
    },
    search: {
      placeholder: 'Search movies...',
      notFound: 'No results found',
      resultsCount: 'Showing results {from}-{to} of {total}',
      error: 'Error fetching data',
      next: 'Next',
      previous: 'Previous',
    },
    footer: {
      message: 'Your ultimate destination for movies of all kinds.',
      quickLinks: {
        title: 'Quick access links',
        links: {
          home: 'Home',
          genres: 'Genres',
        },
      },
      rights: '© 2025 MovieFlix. All rights reserved.',
    },
    movie: {
      similar: 'More movies like this:',
      cast: 'Cast',
      notFound: 'Movie not found',
      descriptionNotFound: 'Description unavailable for this movie.',
      details: {
        title: 'Details',
        director: 'Director',
        budget: 'Budget',
        revenue: 'Revenue',
      },
    },
  },
  'pt-BR': {
    categoryPage: 'Filmes de {category}',
    appTitle: 'MovieFlix',
    pageNotFound: 'Página não encontrada',
    errorPage: 'Ocorreu um erro',
    popularMovies: 'Filmes populares',
    hero: {
      title: 'Descubra filmes fantásticos',
      subtitle: 'Encontre o seu próximo filme favorito em nossa vasta coleção de clássicos e lançamentos.',
      button: 'Explore agora',
    },
    search: {
      placeholder: 'Buscar filmes...',
      notFound: 'Nenhum resultado encontrado',
      resultsCount: 'Mostrando resultados {from}-{to} de {total}',
      error: 'Erro ao buscar dados',
      next: 'Próximo',
      previous: 'Anterior',
    },
    home: {
      theBest: 'Os melhores de todos os tempos',
      genres: 'Gêneros de filmes:',
      seeAll: 'Ver todos',
      carouselError: 'Ocorreu um erro ao buscar os filmes',
    },
    footer: {
      message: 'O seu destino definitivo para filmes de todos os tipos.',
      quickLinks: {
        title: 'Links de acesso rápido',
        links: {
          home: 'Início',
          genres: 'Gêneros',
        },
      },
      rights: '© 2025 MovieFlix. Todos os direitos reservados.',
    },
    movie: {
      similar: 'Mais filmes como este:',
      cast: 'Elenco',
      notFound: 'Filme não encontrado',
      descriptionNotFound: 'Descrição indisponível para este filme.',
      details: {
        title: 'Detalhes',
        director: 'Direção',
        budget: 'Orçamento',
        revenue: 'Receita',
      },
    },
  },
} as const satisfies Translations;

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : Key;
}[keyof ObjectType & (string | number)];

type TranslationKey = NestedKeyOf<TranslationStructure>;

export const useTranslation = () => {
  const { language } = useLanguage();

  const t = <K extends TranslationKey>(key: K): string => {
    const keys = key.split('.') as [keyof TranslationStructure, ...string[]];

    const value = keys.reduce((acc, currentKey) => {
      if (acc && typeof acc === 'object' && currentKey in acc) {
        return acc[currentKey as keyof typeof acc];
      }
      return undefined;
    }, translations[language] as any);

    return value || key;
  };

  return { t };
};

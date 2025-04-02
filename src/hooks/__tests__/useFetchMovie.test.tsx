import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useFetchMovie from '../useFetchMovie';
import { moviesApi } from '../../api/moviesApi';
import { configApi } from '../../api/configApi';
import { formatCurrency, formatMinutes } from '../../utils/format';
import { 
  DetailedMovieFetchResponse, 
  FetchMovieCreditsResponse, 
  DetailedMovie 
} from '../../types/movie';
import { Cast } from '../../types/movie';
import { TMDBConfiguration } from '../../types/config';

// Mock the API modules
vi.mock('../api/moviesApi', () => ({
  moviesApi: {
    getMovie: vi.fn(),
    getMovieCredits: vi.fn()
  }
}));

vi.mock('../api/configApi', () => ({
  configApi: {
    getConfig: vi.fn()
  }
}));

// Mock formatting utilities
vi.mock('../utils/format', () => ({
  formatCurrency: vi.fn((value) => `$${value}`),
  formatMinutes: vi.fn((minutes) => `${minutes} min`)
}));

describe('useFetchMovie', () => {
  let queryClient: QueryClient;
  
  // Adding proper types to the wrapper
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    vi.clearAllMocks();
  });

  const mockMovieData: DetailedMovieFetchResponse = {
    id: 123,
    title: 'Test Movie',
    vote_average: 8.7,
    poster_path: '/poster.jpg',
    backdrop_path: '/backdrop.jpg',
    release_date: '2023-01-15',
    overview: 'A test movie description',
    genres: [{ id: 1, name: 'Action' }],
    runtime: 120,
    revenue: 1000000,
    budget: 500000
  };

  const mockConfigData: TMDBConfiguration = {
    change_keys: ['adult', 'air_date'],
    images: {
      backdrop_sizes: ['w300', 'w780', 'w1280', 'original'],
      base_url: 'https://image.tmdb.org/',
      logo_sizes: ['w45', 'w92', 'w154', 'w185', 'w300', 'w500', 'original'],
      poster_sizes: ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'],
      profile_sizes: ['w45', 'w185', 'h632', 'original'],
      secure_base_url: 'https://secure.tmdb.org/',
      still_sizes: ['w92', 'w185', 'w300', 'original']
    }
  };

  const mockCreditsData: FetchMovieCreditsResponse = {
    id: 123,
    crew: [
      { 
        id: 10, 
        name: 'Test Director', 
        job: 'Director',
        adult: true,
        gender: 2,
        known_for_department: 'Directing',
        original_name: 'Test Director',
        popularity: 15,
        profile_path: '/director.jpg',
        credit_id: 'abc123',
        order: 0,
        department: 'Directing'
      },
      { 
        id: 11, 
        name: 'Test Producer', 
        job: 'Producer',
        adult: true,
        gender: 1,
        known_for_department: 'Production',
        original_name: 'Test Producer',
        popularity: 10,
        profile_path: '/producer.jpg',
        credit_id: 'def456',
        order: 1,
        department: 'Production'
      }
    ],
    cast: Array.from({ length: 13 }, (_, i) => ({
      id: 20 + i,
      name: `Actor ${i + 1}`,
      profile_path: i === 3 ? null : `/actor${i + 1}.jpg`,
      character: `Character ${i + 1}`,
      popularity: 30 - i * (i % 3 === 0 ? 2 : 1), // Create varied popularity for testing sort
      adult: false,
      gender: i % 2 + 1,
      known_for_department: 'Acting',
      original_name: `Actor ${i + 1}`,
      credit_id: `cast${i}`,
      order: i,
      cast_id: i
    }))
  };

  it('should return loading state initially', () => {
    // Setup mocks to return promises that don't resolve yet
    vi.mocked(configApi.getConfig).mockImplementation(new Promise(() => {}) as any);
    vi.mocked(moviesApi.getMovie).mockImplementation(new Promise(() => {}) as any);

    const { result } = renderHook(() => useFetchMovie(123), { wrapper });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.movie).toBe(null);
  });

  it('should return a correctly formatted movie when all queries succeed', async () => {
    // Setup mocks
    vi.mocked(configApi.getConfig).mockResolvedValue(mockConfigData);
    vi.mocked(moviesApi.getMovie).mockResolvedValue(mockMovieData);
    vi.mocked(moviesApi.getMovieCredits).mockResolvedValue(mockCreditsData);

    const { result } = renderHook(() => useFetchMovie(123), { wrapper });

    // Wait for all queries to resolve
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Verify the formatted movie object
    expect(result.current.isError).toBe(false);

    const expectedMovie: DetailedMovie = {
      id: 123,
      title: 'Test Movie',
      rating: 8.7,
      cover: 'https://image.tmdb.org/w500/poster.jpg',
      year: '2023',
      description: 'A test movie description',
      genres: [{ id: 1, name: 'Action' }],
      backdrop: 'https://image.tmdb.org/original/backdrop.jpg',
      runtime: '120 min',
      revenue: '$1000000',
      budget: '$500000',
      director: {
        id: 10,
        name: 'Test Director'
      },
      cast: mockCreditsData.cast
        .sort((a: Cast, b: Cast) => b.popularity - a.popularity)
        .slice(0, 12)
        .map((actor: Cast) => ({
          id: actor.id,
          name: actor.name,
          picture: actor.profile_path ? mockConfigData.images.base_url + 'w500' + actor.profile_path : '',
          character: actor.character
        }))
    };

    expect(result.current.movie).toEqual(expectedMovie);

    // Check the formatters were called with correct values
    expect(formatMinutes).toHaveBeenCalledWith(120);
    expect(formatCurrency).toHaveBeenCalledWith(1000000);
    expect(formatCurrency).toHaveBeenCalledWith(500000);
  });

  it('should handle movie with missing data', async () => {
    const incompleteMovieData: DetailedMovieFetchResponse = {
      ...mockMovieData,
      poster_path: null as unknown as string, // Casting null as string to match the interface 
      revenue: 0,
      budget: 0,
      runtime: 0
    };

    vi.mocked(configApi.getConfig).mockResolvedValue(mockConfigData);
    vi.mocked(moviesApi.getMovie).mockResolvedValue(incompleteMovieData);
    vi.mocked(moviesApi.getMovieCredits).mockResolvedValue(mockCreditsData);

    const { result } = renderHook(() => useFetchMovie(123), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.movie).toMatchObject({
      cover: '',
      revenue: 'N/A',
      budget: 'N/A',
      runtime: 'N/A'
    });
  });

  it('should handle actor with missing profile image', async () => {
    // Create a new credits object with one actor who has a null profile path
    const creditsWithMissingProfile: FetchMovieCreditsResponse = {
      ...mockCreditsData,
      cast: [
        {
          id: 20,
          name: 'Actor 1',
          profile_path: null,
          character: 'Character 1',
          popularity: 10,
          adult: false,
          gender: 1,
          known_for_department: 'Acting',
          original_name: 'Actor 1',
          credit_id: 'cast0',
          order: 0,
          cast_id: 0
        }
      ]
    };

    vi.mocked(configApi.getConfig).mockResolvedValue(mockConfigData);
    vi.mocked(moviesApi.getMovie).mockResolvedValue(mockMovieData);
    vi.mocked(moviesApi.getMovieCredits).mockResolvedValue(creditsWithMissingProfile);

    const { result } = renderHook(() => useFetchMovie(123), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.movie?.cast[0].picture).toBe('');
  });

  it('should return error state when movie fetch fails', async () => {
    vi.mocked(configApi.getConfig).mockResolvedValue(mockConfigData);
    vi.mocked(moviesApi.getMovie).mockRejectedValue(new Error('Failed to fetch movie'));
    
    const { result } = renderHook(() => useFetchMovie(123), { wrapper });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.movie).toBe(null);
  });

  it('should return error state when config fetch fails', async () => {
    vi.mocked(configApi.getConfig).mockRejectedValue(new Error('Failed to fetch config'));
    vi.mocked(moviesApi.getMovie).mockResolvedValue(mockMovieData);
    
    const { result } = renderHook(() => useFetchMovie(123), { wrapper });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.movie).toBe(null);
  });

  it('should return error state when credits fetch fails', async () => {
    vi.mocked(configApi.getConfig).mockResolvedValue(mockConfigData);
    vi.mocked(moviesApi.getMovie).mockResolvedValue(mockMovieData);
    vi.mocked(moviesApi.getMovieCredits).mockRejectedValue(new Error('Failed to fetch credits'));
    
    const { result } = renderHook(() => useFetchMovie(123), { wrapper });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.movie).toBe(null);
  });

  it('should not fetch credits until movie data is available', () => {
    vi.mocked(configApi.getConfig).mockResolvedValue(mockConfigData);
    vi.mocked(moviesApi.getMovie).mockImplementation(new Promise(() => {}) as any); // Never resolves

    renderHook(() => useFetchMovie(123), { wrapper });

    expect(moviesApi.getMovieCredits).not.toHaveBeenCalled();
  });
});
export interface ApiMovie {
  genre_ids: number[];
  id: number;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieFetchResponse {
  results: ApiMovie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface Movie {
  title: string;
  genres: Genre[];
  rating: number;
  cover: string;
  year: string;
  id: number;
  description: string;
}

export interface DetailedMovieFetchResponse {
  genres: Genre[];
  id: number;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  backdrop_path: string;
  runtime: number;
  revenue: number;
  budget: number;
}

export interface DetailedMovie {
  title: string;
  genres: Genre[];
  rating: number;
  cover: string;
  backdrop: string;
  year: string;
  id: number;
  description: string;
  runtime: string;
  revenue: string;
  budget: string;
  director: {
    id: number;
    name: string;
  };
  cast: {
    id: number;
    name: string;
    character: string;
    picture: string;
  }[];
}

interface BasePerson {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  order: number;
}

export interface Cast extends BasePerson {
  character: string;
  cast_id: number;
}

export interface Crew extends BasePerson {
  department: string;
  job: string;
}

export interface FetchMovieCreditsResponse {
  id: number;
  cast: Cast[];
  crew: Crew[];
}

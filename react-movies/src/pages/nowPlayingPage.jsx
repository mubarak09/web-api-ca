import React from "react";
import { useQuery } from '@tanstack/react-query';
import PageTemplate from '../components/templateMovieListPage';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import { getNowPlayingMovies } from "../api/tmdb-api";

const NowPlayingPage = () => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['nowPlaying'],
    queryFn: getNowPlayingMovies,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;
  const favorites = movies.filter((m) => m.favorite);
  localStorage.setItem('favorites', JSON.stringify(favorites));

  return (
    <PageTemplate
      title='Now Playing Movies'
      movies={movies}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    />
  );
};

export default NowPlayingPage;

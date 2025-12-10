import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromWatchLater from "../components/cardIcons/removeFromWatchLater";

const WatchLaterMoviesPage = () => {
  const { watchLater: movieIds } = useContext(MoviesContext);

  // Create an array of queries and run in parallel
  const watchLaterMovieQueries = useQueries({
    queries: movieIds.map((movieId) => {
      return {
        queryKey: ['movie', { id: movieId }],
        queryFn: getMovie,
      }
    })
  });

  // Check if any of the parallel queries is still loading
  const isPending = watchLaterMovieQueries.find((m) => m.isPending === true);

  if (isPending) {
    return <Spinner />;
  }

  const movies = watchLaterMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id);
    return q.data;
  });

  return (
    <PageTemplate
      title="Watch Later"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemoveFromWatchLater movie={movie} />
          </>
        );
      }}
    />
  );
};

export default WatchLaterMoviesPage;
import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import { getFavorites } from "../api/tmdb-api";
import { MoviesContext } from "../contexts/moviesContext";
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";

const FavoriteMoviesPage = () => {
  const context = useContext(MoviesContext);

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  
  const movies = data.map((fav) => ({
    id: fav.movieId,
    title: fav.title,
    poster_path: fav.poster_path,
    release_date: fav.release_date,
    vote_average: 0,
    favorite: true, // force the heart avatar to show
  }));

  const favIds = movies.map((m) => m.id);
  if (context.favorites.length !== favIds.length) {
    favIds.forEach((id) => {
      if (!context.favorites.includes(id)) {
        context.addToFavorites({ id });
      }
    });
  }

    return (
    <PageTemplate
      title="Favorite Movies"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemoveFromFavorites movie={movie} />
            <WriteReview movie={movie} />
          </>
        );
      }}
    />
  );
};

export default FavoriteMoviesPage;

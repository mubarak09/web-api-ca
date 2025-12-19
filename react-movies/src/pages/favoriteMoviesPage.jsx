import { useQuery } from "@tanstack/react-query";
import { getFavorites } from "../api/tmdb-api";

const FavoriteMoviesPage = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites
  });

  if (isLoading) return <p>Loading favorites...</p>;
  if (isError) return <p>{error.message}</p>;

  return (
    <>
      <h2>My Favorites</h2>
      {data.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        data.map((fav) => (
          <p key={fav._id}>{fav.title}</p>
        ))
      )}
    </>
  );
};

export default FavoriteMoviesPage;

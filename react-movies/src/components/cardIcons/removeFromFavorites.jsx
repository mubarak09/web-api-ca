import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";
import { useAlert } from "../alert";
import { deleteFavorite } from "../../api/tmdb-api";
import { useQueryClient } from "@tanstack/react-query";

const RemoveFromFavoritesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const { showAlert } = useAlert();
  const queryClient = useQueryClient();

  const handleRemoveFromFavorites = async (e) => {
    e.preventDefault();
    try {
      await deleteFavorite(movie.id);
      context.removeFromFavorites(movie);
      await queryClient.invalidateQueries({ queryKey: ["favorites"] });
      showAlert(`${movie.title} removed from favorites`);
    } catch (error) {
      console.error("Remove favorite failed:", error);
      showAlert(`Failed to remove favorite: ${error.message}`);
    }
  };
  return (
    <IconButton
      aria-label="remove from favorites"
      onClick={handleRemoveFromFavorites}
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromFavoritesIcon;

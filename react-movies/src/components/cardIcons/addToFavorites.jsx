import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import { useAlert } from "../alert";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { addFavorite } from "../../api/tmdb-api";
import { useQueryClient } from "@tanstack/react-query";

const AddToFavoritesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const { showAlert } = useAlert();
  const queryClient = useQueryClient();

  const handleAddToFavorites = async (e) => {
    e.preventDefault();

    try {
      await addFavorite(movie);

      // update local UI
      context.addToFavorites(movie);

      // refetch favorites from MongoDB
      await queryClient.invalidateQueries({ queryKey: ["favorites"] });

      showAlert(`${movie.title} added to favorites`);
    } catch (err) {
      console.error("Add favorite failed:", err);
      showAlert(`Failed to add favorite: ${err.message}`);
    }
  };

  return (
    <IconButton aria-label="add to favorites" onClick={handleAddToFavorites}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavoritesIcon;

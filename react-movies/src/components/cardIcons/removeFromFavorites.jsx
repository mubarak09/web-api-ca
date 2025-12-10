import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";
import { useAlert } from "../alert";

const RemoveFromFavoritesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const { showAlert } = useAlert();

  const handleRemoveFromFavorites = (e) => {
    e.preventDefault();
    context.removeFromFavorites(movie);
    showAlert(`${movie.title} removed from favorites`);
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

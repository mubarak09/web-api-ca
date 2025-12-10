import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import { useAlert } from "../alert";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

const AddToFavoritesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const { showAlert } = useAlert();

  const handleAddToFavorites = (e) => {
    e.preventDefault();
    context.addToFavorites(movie);
    showAlert(`${movie.title} added to favorites`);
  };

  return (
    <IconButton aria-label="add to favorites" onClick={handleAddToFavorites}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavoritesIcon;

import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { MoviesContext } from "../../contexts/moviesContext";
import { useAlert } from "../alert";

const AddToWatchLaterIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const { showAlert } = useAlert();

  const handleAddToWatchLater = (e) => {
    e.preventDefault();
    context.addToWatchLater(movie);
    showAlert(`${movie.title} added to watch later`);
  };

  return (
    <IconButton aria-label="add to watch later" onClick={handleAddToWatchLater}>
      <PlaylistAddIcon fontSize="large" />
    </IconButton>
  );
};

export default AddToWatchLaterIcon;
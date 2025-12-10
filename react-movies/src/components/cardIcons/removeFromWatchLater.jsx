import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import { MoviesContext } from "../../contexts/moviesContext";

const RemoveFromWatchLater = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleRemoveFromWatchLater = (e) => {
    e.preventDefault();
    context.removeFromWatchLater(movie);
  };

  return (
    <IconButton aria-label="remove from watch later" onClick={handleRemoveFromWatchLater}>
      <PlaylistRemoveIcon fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromWatchLater;

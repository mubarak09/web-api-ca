import express from "express";
import asyncHandler from "express-async-handler";
import Favourite from "./favouriteModel";

const router = express.Router(); // eslint-disable-line

// GET logged-in user's favourites
router.get("/", asyncHandler(async (req, res) => {
  const favourites = await Favourite.find({ userId: req.user._id });
  res.status(200).json(favourites);
}));

// POST add a favourite (logged-in user)
router.post("/", asyncHandler(async (req, res) => {
  const { movieId, title, poster_path } = req.body;

  const fav = await Favourite.create({
    userId: req.user._id,
    movieId,
    title,
    poster_path,
  });

  res.status(201).json(fav);
}));

// DELETE remove a favourite by movieId (logged-in user)
router.delete("/:movieId", asyncHandler(async (req, res) => {
  const movieId = Number(req.params.movieId);

  const result = await Favourite.deleteOne({
    userId: req.user._id,
    movieId,
  });

  if (result.deletedCount) {
    res.status(204).json();
  } else {
    res.status(404).json({ code: 404, msg: "Favourite not found" });
  }
}));

export default router;

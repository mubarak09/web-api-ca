import express from 'express';
import asyncHandler from 'express-async-handler';
import { getMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
  getTopRatedMovies,
  getTrendingMovies,
  getMovieDetails,
  getGenres,
  getMovieImages,
  getMovieReviews,
  getMovieRecommendations,
  getMovieVideos 
} from '../tmdb-api';

const router = express.Router();

// movie routes to be added
router.get('/discover', asyncHandler(async (req, res) => {
    const discoverMovies = await getMovies();
    res.status(200).json(discoverMovies);
}));

router.get('/upcoming', asyncHandler(async (req, res) => {
  const movies = await getUpcomingMovies();
  res.status(200).json(movies);
}));

router.get('/now-playing', asyncHandler(async (req, res) => {
  const movies = await getNowPlayingMovies();
  res.status(200).json(movies);
}));

router.get('/top-rated', asyncHandler(async (req, res) => {
  const movies = await getTopRatedMovies();
  res.status(200).json(movies);
}));

router.get('/trending', asyncHandler(async (req, res) => {
  const movies = await getTrendingMovies();
  res.status(200).json(movies);
}));

router.get('/genres', asyncHandler(async (req, res) => {
  const genres = await getGenres();
  res.status(200).json(genres);
}));


router.get('/:id/images', asyncHandler(async (req, res) => {
  const images = await getMovieImages(req.params.id);
  res.status(200).json(images);
}));

router.get('/:id/reviews', asyncHandler(async (req, res) => {
  const reviews = await getMovieReviews(req.params.id);
  res.status(200).json(reviews);
}));


router.get('/:id/recommendations', asyncHandler(async (req, res) => {
  const recs = await getMovieRecommendations(req.params.id);
  res.status(200).json(recs);
}));


router.get('/:id/videos', asyncHandler(async (req, res) => {
  const vids = await getMovieVideos(req.params.id);
  res.status(200).json(vids);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const movie = await getMovieDetails(req.params.id);
  res.status(200).json(movie);
}));

export default router;

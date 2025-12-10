import React from "react";
import { useLocation } from "react-router";
import PageTemplate from "../components/templateMoviePage";
import MovieReview from "../components/movieReviews";

const MovieReviewPage = (props) => {
  let location = useLocation();
  const {movie, review} = location.state;
  
  return (
    <PageTemplate movie={movie}>
      <MovieReview review={review} />
    </PageTemplate>
  );
};

export default MovieReviewPage;

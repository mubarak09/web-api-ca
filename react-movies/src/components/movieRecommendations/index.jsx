import React from 'react';
import { getMovieRecommendations } from '../../api/tmdb-api';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../spinner';
import Movie from '../movieCard';
import Grid from '@mui/material/Grid';

const MovieRecommendations = (props) => {
  const { movieId } = props;
  const { data, error, isPending, isError } = useQuery({ //Fetches its own data using useQuery
    queryKey: ['movieRecommendations', { id: movieId }],
    queryFn: getMovieRecommendations,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const recommendations = data?.results || []; //

  // Return null if there are no recommendations
  if (recommendations.length === 0) return null; 


  // Render a list of movie cards for the first 4 recommendations.
  // Each recommendation is rendered in a grid with padding.
  // The movie data is passed to a Movie component.
 

  let movieCards = recommendations.slice(0, 4).map((m) => (
    <Grid key={m.id} size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2}} sx={{padding: "20px"}}>
      <Movie key={m.id} movie={m} action={props.action || (() => {})} />
    </Grid>
  ));
  
  return movieCards;
};

export default MovieRecommendations;

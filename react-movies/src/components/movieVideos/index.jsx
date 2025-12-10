import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMovieVideos } from '../../api/tmdb-api';
import Spinner from '../spinner';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const MovieVideos = (props) => {
  const { movieId } = props;
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['movieVideos', { id: movieId }],
    queryFn: getMovieVideos,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }


  const videos = data?.results || [];
  // Filter the videos array to get only the videos from YouTube
  // Then get the first video from the filtered array
  const firstVideo = videos.find(video => video.site === 'YouTube');

    //Return null if no videos found
  if (!firstVideo) return null;

  return (
    firstVideo && (  // Check if firstVideo exists before rendering the component
      <Grid container spacing={2} sx={{ mt: 4, mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          {/* 
            use an iframe to put a YouTube video into a card component. 
            src attribute of the iframe is set to the YouTube video URL with the key of the first video.
            title attribute is set to the name of the first video.
            width of the iframe is set to '100%' to make it responsive.
            border attribute is set to 'none' to remove the border around the iframe.
            allowFullScreen attribute allows the video to be shown in fullscreen mode.
          */}
          <Card>
            <CardMedia
              component="iframe"
              src={`https://www.youtube.com/embed/${firstVideo.key}`}
              title={firstVideo.name}
              sx={{
                width: '100%',
                border: 'none',
              }}
              allowFullScreen
            />
          </Card>
        </Grid>
      </Grid>
    )
  );
};

export default MovieVideos;

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import MoviesContextProvider from "./contexts/moviesContext";
import { AlertProvider } from "./components/alert";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import UpcomingMoviesPage from './pages/upcomingMoviesPage';
import NowPlayingPage from './pages/nowPlayingPage';
import MovieReviewPage from './pages/movieReviewPage';
import TopRatedMoviesPage from './pages/topRatedMoviesPage';
import TrendingMoviesPage from './pages/trendingMoviessPage';
import WatchLaterMoviesPage from './pages/watchLaterMoviesPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AlertProvider>
          <SiteHeader />
          <MoviesContextProvider>
            <Routes>
            <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
            <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
            <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
            <Route path="/movies/now-playing" element={<NowPlayingPage />} />
            <Route path="/movies/top-rated" element={<TopRatedMoviesPage />} />
            <Route path="/movies/trending" element={<TrendingMoviesPage />} />
            <Route path="/movies/watch-later" element={<WatchLaterMoviesPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={ <Navigate to="/" /> } />
          </Routes>
        </MoviesContextProvider>
      </AlertProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);

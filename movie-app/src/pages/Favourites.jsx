import React from "react";
import { Grid, Typography } from "@mui/material";
import { useFavourites } from "../context/FavouritesContext";
import MovieCard from "../components/MovieCard";

export default function Favourites() {
  const { favourites } = useFavourites();

  return (
    <div>
      <Typography variant="h4" gutterBottom>My Favourites</Typography>
      {favourites.length === 0 ? (
        <Typography>No favourites yet. Add some from search results.</Typography>
      ) : (
        <Grid container spacing={2}>
          {favourites.map(movie => (
            <Grid item key={movie.id} xs={12} sm={6} md={4}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

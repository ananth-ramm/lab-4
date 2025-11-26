import React from "react";
import { useParams } from "react-router-dom";
import { useMovieDetails } from "../hooks/useMovieDetails";
import { Typography, CircularProgress, Grid, CardMedia, Button } from "@mui/material";
import { useFavourites } from "../context/FavouritesContext";

export default function MovieDetails() {
  const { id } = useParams(); 
  const { details, loading, error } = useMovieDetails(id);
  const { isFavourite, addFavourite, removeFavourite } = useFavourites();

  if (loading) return <CircularProgress />;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!details) return <div>No details</div>;

  const fav = isFavourite(details.id);

  const poster = details.poster_path
    ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
    : `https://via.placeholder.com/300x445?text=No+Image`;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <CardMedia component="img" image={poster} alt={details.title} />
      </Grid>

      <Grid item xs={12} md={8}>
        <Typography variant="h4">
          {details.title} ({details.release_date?.slice(0, 4)})
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          {details.genres?.map(g => g.name).join(", ")} • {details.runtime} min
        </Typography>

        <Typography variant="body1" paragraph>
          {details.overview}
        </Typography>

        <div style={{ marginTop: 16 }}>
          <Button
            variant="contained"
            onClick={() =>
              fav
                ? removeFavourite(details.id)
                : addFavourite({
                    id: details.id,
                    title: details.title,
                    release_date: details.release_date,
                    poster_path: details.poster_path
                  })
            }
          >
            {fav ? "Remove Favourite" : "Add Favourite"}
          </Button>
        </div>
      </Grid>
    </Grid>
  );
}

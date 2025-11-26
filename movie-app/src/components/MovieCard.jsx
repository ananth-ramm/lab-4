import React from "react";
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useFavourites } from "../context/FavouritesContext";

export default function MovieCard({ movie }) {
  const { isFavourite, addFavourite, removeFavourite } = useFavourites();
  const fav = isFavourite(movie.id); 

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : `https://via.placeholder.com/300x445?text=No+Image`;

  return (
    <Card sx={{ maxWidth: 345, margin: 1 }}>
      <CardMedia
        component="img"
        height="445"
        image={poster}
        alt={movie.title}
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="h6">{movie.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.release_date?.slice(0, 4) || "N/A"}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button size="small" component={Link} to={`/movie/${movie.id}`}>
          Details
        </Button>

        <Button
          size="small"
          onClick={() => (fav ? removeFavourite(movie.id) : addFavourite(movie))}
        >
          {fav ? "Remove Favourite" : "Add Favourite"}
        </Button>
      </CardActions>
    </Card>
  );
}



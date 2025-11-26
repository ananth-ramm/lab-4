import React, { useState } from "react";
import { TextField, Button, Grid, CircularProgress, Box } from "@mui/material";
import { useMovieSearch } from "../hooks/useMovieSearch";
import MovieCard from "../components/MovieCard";

export default function Search() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const { data, loading, error } = useMovieSearch(submitted);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(query.trim());
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            fullWidth
            label="Search movies by title"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button type="submit" variant="contained">Search</Button>
        </Box>
      </form>

      {loading && <CircularProgress />}

      {error && <div style={{ color: "red" }}>{error}</div>}

      <Grid container spacing={2}>
        {data && data.length === 0 && submitted && !loading && <p>No results found.</p>}
        {data && data.map(movie => (
          <Grid item key={movie.id} xs={12} sm={6} md={4}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

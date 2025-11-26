import React from "react";
import { Typography, Container } from "@mui/material";

export default function Home() {
  return (
    <Container>
      <Typography variant="h3" gutterBottom sx={{ mt: 2 }}>
        Movie Finder
      </Typography>
      <Typography variant="body1">
        Search for your favourite movies, and save them to your favourites list! 
      </Typography>
    </Container>
  );
}

import React from "react";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar";
import AppRoutes from "./AppRoutes";
import { FavouritesProvider } from "./context/FavouritesContext";

export default function App() {
  return (
    <FavouritesProvider>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <AppRoutes />
      </Container>
    </FavouritesProvider>
  );
}

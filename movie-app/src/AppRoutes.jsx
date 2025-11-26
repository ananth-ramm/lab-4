import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import MovieDetails from "./pages/MovieDetails";
import Favourites from "./pages/Favourites";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/favourites" element={<Favourites />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

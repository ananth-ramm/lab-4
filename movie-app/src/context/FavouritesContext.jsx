import React, { createContext, useContext, useState, useEffect } from "react";

const FavouritesContext = createContext();

export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState(() => {
    try {
      const raw = localStorage.getItem("favourites_movies_v1");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("favourites_movies_v1", JSON.stringify(favourites));
  }, [favourites]);

  const addFavourite = (movie) => {
    if (!favourites.find(m => m.id === movie.id)) {
      setFavourites(prev => [...prev, movie]);
    }
  };

  const removeFavourite = (id) => {
    setFavourites(prev => prev.filter(m => m.id !== id));
  };

  const isFavourite = (id) => favourites.some(m => m.id === id);
  return (
    <FavouritesContext.Provider value={{ favourites, addFavourite, removeFavourite, isFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  return useContext(FavouritesContext);
}

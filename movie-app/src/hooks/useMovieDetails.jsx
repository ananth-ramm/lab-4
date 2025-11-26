import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export function useMovieDetails(movieId) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`;

    axios
      .get(url, { signal: controller.signal })
      .then(res => setDetails(res.data))
      .catch(err => {
        if (err.name !== "CanceledError") {
          setError(err.message || "Error fetching");
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [movieId]);

  return { details, loading, error };
}

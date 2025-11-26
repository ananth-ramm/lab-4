import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY; 
const BASE_URL = "https://api.themoviedb.org/3";

export function useMovieSearch(query) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      setData([]);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1&include_adult=false`;

    axios.get(url, { signal: controller.signal })
      .then(res => {
        if (res.data && res.data.results) {
          setData(res.data.results);
        } else {
          setData([]);
        }
      })
      .catch(err => {
        if (err.name !== "CanceledError") {
          setError(err.message || "Error fetching");
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [query]);

  return { data, loading, error };
}

